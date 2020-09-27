import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from 'src/models/User';
import bcrypt from 'bcryptjs';

export default class UsersController {
  async getUsers(request: Request, response: Response) {
    try {
      const repository = getRepository(User);
      const users = await repository.find();

      const userDTO = users.map((user) => {
        const obj = {
          id: user.id,
          name: user.name,
          email: user.email,
        };
        return obj;
      });

      return response.status(200).json(userDTO);
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
      const user = await repository.findOne(id);

      // Checks existing user in database
      if (!user)
        return response.status(404).json({ messege: 'User Not Found' });

      const userDTO = {
        id: user.id,
        name: user.name,
        email: user.email,
      };

      return response.status(200).json(userDTO);
    } catch (error) {
      return response
        .status(400)
        .json({ messege: 'Error to find user with id' });
    }
  }

  async postUsers(request: Request, response: Response) {
    try {
      const { name, email, password } = request.body;
      const repository = await getRepository(User);

      const hashPassword = await bcrypt.hashSync(`${password}`, 10);

      const user = { name, email, hashPassword };

      const emailExists = await repository.findOne({ email });
      if (emailExists)
        return response
          .status(409)
          .json({ messege: 'E-mail already registered' });

      const userState = await repository.save(user);

      const userDTO = {
        id: userState.id,
        name: userState.name,
        email: userState.email,
      };

      return response.status(201).json({
        message: 'User created successfully!',
        userDTO,
      });
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
      return response.status(200).json({
        messege: 'Success to remove User',
        name: user.name,
      });
    } catch (Error) {
      return response.status(400).json({ messege: 'Error to remove User' });
    }
  }

  private async checkExistsUser(id) {
    // TODO
    const repository = getRepository(User);
    return await repository.findOne(id);
  }
}
