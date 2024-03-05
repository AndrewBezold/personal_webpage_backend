import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import * as fs from 'fs';
import https from 'https';
import { sendEmail } from './email';

dotenv.config()

const PORT = process.env.PORT || 3001;
const app = express();

const SSL_PRIVATE_KEY_PATH = process.env.SSL_PRIVATE_KEY || '';
const SSL_CERTIFICATE_PATH = process.env.SSL_CERTIFICATE || '';
const SSL_CA_PATH = process.env.SSL_CA || '';

const privateKey = fs.readFileSync(SSL_PRIVATE_KEY_PATH, 'utf8');
const certificate = fs.readFileSync(SSL_CERTIFICATE_PATH, 'utf8');
const ca = fs.readFileSync(SSL_CA_PATH, 'utf8');

const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca
};

const CORS_SETTINGS = {
  origin: "*",
}

app.use(cors(CORS_SETTINGS));
app.use(express.json());

app.get("/", async (req, res) => {
  res.send("Hello, World!");
});

app.post("/api/email", async (req, res) => {
  console.log("Sending a message");
  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.message;
  sendEmail(name, email, message).then(() => {
    res.json({});
  }).catch((error) => {
    console.log("There was an error sending the email");
    res.status(400).json({"error": error});
  });
});

https.createServer(credentials, app).listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
