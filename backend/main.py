from application import app
from application import socketio
from flask_socketio import SocketIO


if __name__ == '__main__':
socketio.run(app, debug=True, host='127.0.0.1')
