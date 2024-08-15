import express from 'express';
import 'express-async-errors';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import path from 'path';
import { fileURLToPath } from 'url';
import http from 'http';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Routes
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import quizRoutes from './routes/quizRoutes.js';
import lessonRoutes from './routes/lessonRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import kidRoutes from './routes/kidRoutes.js';
import messagesRoutes from './routes/messagesRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import classesRoutes from './routes/classesRoutes.js';
import conversationsRoutes from './routes/conversationRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import fileRoutes from './routes/fileRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import certificateRoutes from './routes/certificateRoutes.js';

import notFoundMiddleware from './middlewares/not-found.js';
import errorHandlerMiddleware from './middlewares/error-handler.js';
import { authenticateUser } from './middlewares/authentication.js';

import setupSocket from './socket.js';
import './cronJobs.js';

const server = http.createServer(app);
const io = setupSocket(server);

app.use(cookieParser());
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(express.json());
app.use(morgan('dev'));
app.use(fileUpload());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', authenticateUser, (req, res) => {
  res.send('Hello, World! ' + req.user.firstName);
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/v1/events', eventRoutes);
app.use('/api/v1/quizzes', quizRoutes);
app.use('/api/v1/messages', messagesRoutes);
app.use('/api/lessons', lessonRoutes);
app.use('/api/files', fileRoutes);

app.use('/api/kids', kidRoutes);
app.use('/api/v1/lessons', lessonRoutes);
app.use('/api/kids', kidRoutes);
app.use('/api/v1/notifications', notificationRoutes);
app.use('/api/v1/classes', classesRoutes);
app.use('/api/v1/conversations', conversationsRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/v1/certificates', certificateRoutes);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
app.use(
  fileUpload({
    createParentPath: true,
  })
);

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    server.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
