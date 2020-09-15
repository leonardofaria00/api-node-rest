import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from 'src/models/User';

export default class UsersController {
  async getUsers(request: Request, response: Response) {
    try {
      const repository = getRepository(User);
      const users = await repository.find();
      return response.status(200).json(users);
    } catch (error) {
      return response.status(400).json({ messege: 'Erro to find users' });
    }
  }
}
