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

  async postUsers(request: Request, response: Response) {
    try {
      const repository = await getRepository(User);
      const { name, email } = request.body;
      const user = { name, email };

      // Checks existing email
      const existEmail = await repository.findOne({ email });
      if (existEmail)
        return response
          .status(401)
          .json({ messege: 'E-mail already registered' });

      await repository.save(user);
      return response.status(201).json(user);
    } catch (error) {
      return response.status(400).json({ messege: 'Erro to insert user' });
    }
  }
}
