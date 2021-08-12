import { User } from '@models/User';
import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
require('dotenv').config();

const authConfig = require('../config/auth.json');

export default class AuthController {
  async authorize(request: Request, response: Response) {
    const { email, password } = request.body;

    const repository = getRepository(User);

    const userExists = await repository.findOne({ email });

    if (!userExists)
      return response
        .status(404)
        .json({ error: 'User not found', status: 404 });

    if (!(await bcrypt.compare(`${password}`, userExists.hashPassword)))
      return response
        .status(404)
        .json({ error: 'Invalid password', status: 404 });

    function generateToken(id: {}) {
      return jwt.sign(id, authConfig.secret, {
        expiresIn: '1h',
      });
    }

    userExists.hashPassword = undefined;

    return response.json({
      user: userExists,
      token: generateToken({ id: userExists.id }),
    });
  }
}
