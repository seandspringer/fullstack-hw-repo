# socketio

This was built following the [chat app](https://socket.io/get-started/chat) example from the socketio webpage. It creates a server in `src/index.js` that uses `websockets` to pass information to connected clients. The server should listen on `localhost` port `5001`.

`public/index.html` contains a small webpage which looks like a chat window. Here, messages can be sent and shared amongst connected clients. In addition, the following features were added to the app

1. Change username: input `/username {new username}` into the chat message to change the displayed user name.
2. Typing notifier: when a user has text in the message box that has not been sent, a message will appear on all clients indicating which user is currently typing.
3. Connection / Disconnection notifications

## How to Run

There is a `NPM` script defined in `package.json` called `start` which will run the server. Then navigate to `localhost:5001` to interact with the chat app.

```bash
cd hw3/socketio
npm install
npm run start
```
