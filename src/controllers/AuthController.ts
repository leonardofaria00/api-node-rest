import { Request, Response } from 'express';

export default class AuthController {
  authorize(request, response) {
    return response.json(request.body);
  }
}
