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
      return response
        .status(400)
        .json({ messege: 'Opps, error to find users' });
    }
  }

  async getUserById(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const repository = getRepository(User);
      const existUser = await repository.findOne(id);

      // Checks existing user in database
      if (!existUser)
        return response.status(404).json({ messege: 'User Not Found' });

      return response.status(200).json(existUser);
    } catch (error) {
      return response
        .status(400)
        .json({ messege: 'Error to find user with id' });
    }
  }

  async postUsers(request: Request, response: Response) {
    try {
      const { name, email } = request.body;
      const repository = await getRepository(User);
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
      return response
        .status(400)
        .json({ messege: 'Opps, error to insert user' });
    }
  }

  async putUsers(request: Request, response: Response) {
    try {
      const { id, email } = request.body;
      const repository = getRepository(User);

      // Checks existing User
      const user = await repository.findOne(id);

      if (!user)
        return response.status(400).json({ messege: 'User Not Found' });

      user.email = email;
      await repository.save(user);

      return response.status(201).json({
        email: email,
        messege: 'Success to update User',
      });
    } catch (error) {
      return response.status(400).json({ messege: 'Error to update User' });
    }
  }

  async deleteUsers(request: Request, response: Response) {
    try {
      const { id } = request.body;
      const repository = getRepository(User);

      // Checks existing User
      const user = await repository.findOne(id);
      if (!user)
        return response.status(400).json({ messege: 'User Not Found' });

      await repository.remove(user);
      return response
        .status(200)
        .json({ messege: 'Success to remove User', name: user.name });
    } catch (Error) {
      return response.status(400).json({ messege: 'Error to remove User' });
    }
  }

  private async checkExistsUser(id: User) {
    // TODO
    const repository = getRepository(User);
    return await repository.findOne(id);
  }
}
