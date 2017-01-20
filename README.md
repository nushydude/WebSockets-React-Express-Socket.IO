# WebSockets-React-Express-Socket.IO
A simple example of web sockets with ReactJS and Express server, using socket.io. 

Note: socket.io-client is used on the client end (i.e. react app).

## What it does 

When the react app mounts, it will emit a message to the server through the socket to fetch the list of files, which are stored in the files folder in the source root. This emission of a message will be performed from the componentDidMount life-cycle method. We could do this in the constructor as well.

Furthermore, we will be setting up an listener for the "files" event (socket.on("files", ... ) in the same componentDidMount method, where, when the files list is received through the socket, the state of the app will get updated causing a DOM rerender.

We can tell the server to create new files as well. In the form section, we can give a name for a file and it will emit a "createFile" event to the socket. The server will catch this and create the file. Once the file is created, it will emit a "files" event with all the files it's got in the folder. The app will catch this event on its "files" event we created in the componentDidMount method, and update the state of the app which will cause the DOM to be rerendered. 

I was originally planning to update the "files list" client when files were created in/removed from the server's file system by hand. Wanted to use fs.watch from the express server, but for the time being, this should do, because now I have a decent understanding of how web sockets work in a react app. 

## Installation

$npm install

// for webpack compilation
$npm run dev

// this will run the server
$npm run start 

Then you should be able to access the app from localhost:8081. 

React happily!
