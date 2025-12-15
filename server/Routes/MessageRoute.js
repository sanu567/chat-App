import express from 'express'
import { proctedRoute } from '../MiddleWare/auth.js';
import { getMessage, getUserForSidebar, markMessageSeen, sendMessage } from '../conroller/messageController.js';

const messageRoute=express.Router();
messageRoute.get('/users',proctedRoute,getUserForSidebar);
messageRoute.get('/:id',proctedRoute,getMessage);
messageRoute.put('/mark/:id',proctedRoute,markMessageSeen);
messageRoute.post('/send/:id',proctedRoute,sendMessage);

export default messageRoute;