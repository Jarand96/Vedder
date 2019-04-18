import React, { Component } from "react";
import {store} from "react";
import { connect } from 'react-redux'
import { browserHistory } from 'react-router';
import { Navbar, Nav, NavItem, NavDropdown,MenuItem } from 'react-bootstrap';
import { requireAuthentication } from './AuthenticatedComponent';

class Navigation extends Component {

  constructor(props) {
   super(props);
   const {dispatch} = props;

 }

  componentDidMount() {
    let { dispatch } = this.props
  }

logout = () => {
   let { dispatch } = this.props;
   dispatch({type: "LOGOUT_REQUEST", payload: {}});
 }


 render_navigation(){
   if (this.props.auth.isAuthenticated){
     return (
      <Nav>
         <NavItem eventKey={2} onClick={()=>{browserHistory.push('/')}}>
           Home
         </NavItem>
         <NavItem eventKey={2} onClick={()=>{browserHistory.push('/settings')}}>
           Settings
         </NavItem>
         <NavItem eventKey={3} onClick={this.logout}>
           Logg ut
         </NavItem>
         <NavItem eventKey={1} onClick={()=>{browserHistory.push('/advancedpost')}}>
           Advanced posting
         </NavItem>
      </Nav>
     )
   }
   else{
     return (
       <Nav>
          <NavItem eventKey={1} onClick={()=>{browserHistory.push('/login')}}>
            Logg inn
          </NavItem>

          <NavItem eventKey={1} onClick={()=>{browserHistory.push('/advancedpost')}}>
            Advanced posting
          </NavItem>
       </Nav>
     )
   }
 }

  render(){
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a onClick={()=>{browserHistory.push('/')}}><img id="nav-logo" src="" /></a>
          </Navbar.Brand>
        </Navbar.Header>
          {this.render_navigation()}
      </Navbar>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(
  mapStateToProps,
)(Navigation);
