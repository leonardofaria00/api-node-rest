import { NextFunction, Request, Response } from 'express';

export default function authMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { authorization } = request.headers;
  console.log(authMiddleware);

  if (!authorization)
    return response.status(401).json({ error: 'Token Not valided' });
  console.log('Token Valid');
  return next();
}
