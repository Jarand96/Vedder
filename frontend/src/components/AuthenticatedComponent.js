import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import browserHistory from '../services/history'
import * as actionCreators from '../actions';
import { url } from '../index';


function mapStateToProps(state) {
    return {
        token: state.auth.token,
        userName: state.auth.userName,
        isAuthenticated: state.auth.isAuthenticated,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}


export function requireAuthentication(Component) {
    class AuthenticatedComponent extends React.Component {
        componentWillMount() {
            this.checkAuth();
            this.setState({
                loaded_if_needed: false,
            });

        }

        componentWillReceiveProps(nextProps) {
            this.checkAuth(nextProps);
        }

        checkAuth(props = this.props) {
            if (!props.isAuthenticated) {
                const token = localStorage.getItem('token');
                if (!token) {
                    browserHistory.push('/login');
                } else {
                    fetch(url + 'is_token_valid', {
                        method: 'post',
                        credentials: 'include',
                        headers: {
                            'Accept': 'application/json', // eslint-disable-line quote-props
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ token }),
                    })
                        .then(res => {
                            if (res.status === 200) {
                                this.props.loginSuccess(token);
                                this.setState({
                                    loaded_if_needed: true,
                                });
                            } else {
                                localStorage.removeItem('token');
                                browserHistory.push('/login');
                            }
                        });
                }
            } else {
                this.setState({
                    loaded_if_needed: true,
                });
            }
        }

        render() {
            return (
                <div>
                    {this.props.isAuthenticated && this.state.loaded_if_needed
                        ? <Component {...this.props} />
                        : null
                    }
                </div>
            );

        }
    }

    return connect(mapStateToProps, mapDispatchToProps)(AuthenticatedComponent);
}
