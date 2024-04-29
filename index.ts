import express, { json, Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import http from 'http';
import mongoose from "mongoose";
import { listen_port,db_conn_string } from './src/config/config';
const { urlencoded, json: _json } = bodyParser;
const app: Application = express();
const port: number | string = listen_port|| 3000;
const httpServer = http.createServer(app);


app.use(urlencoded({ extended: true }));
app.use(_json({ limit: "500mb" }));
app.use(json({ limit: "500mb" }));
app.use(cors());

// For CORS
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(db_conn_string || '');
}


/**
 * Listen on provided port, on all network interfaces.
 */
httpServer.listen(port);
httpServer.on('error', onError);
httpServer.on('listening', onListening);

function onError(error: NodeJS.ErrnoException): void {
  if (error.syscall !== "listen") throw error;

  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // Handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening(): void {
  const addr = httpServer.address();
  const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr?.port}`;
  console.log(`Listening on ${bind}`);
}
