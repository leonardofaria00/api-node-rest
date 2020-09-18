import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Post } from '@models/Post';

export class PostsController {
  async getPosts(request: Request, response: Response) {
    try {
      const repositoryPost = getRepository(Post);
      const posts = await repositoryPost.find({ relations: ['user'] });

      const newPosts = posts.map((post) => {
        const objectReturn = {
          post: {
            id: post.id,
            title: post.title,
            photo: post.photo,
            url: post.url,
            message: post.messege,
          },
          user: {
            id: post.user.id,
            name: post.user.name,
          },
        };
        return objectReturn;
      });

      return response.status(200).json(newPosts);
    } catch (error) {
      return response
        .status(400)
        .json({ messege: 'Opps, error to find Posts', error });
    }
  }

  async createPosts(request: Request, response: Response) {
    try {
      const { title, messege, userId, url } = request.body;
      const { filename } = request.file;

      if (!request.file)
        return response.json({ message: 'Please select an image to upload' });

      const repository = await getRepository(Post);

      const post = new Post();
      post.title = title;
      post.messege = messege;
      post.user = userId;
      post.photo = filename;
      post.url = url;

      await repository.save(post);
      return response
        .status(201)
        .json({ message: 'Post created sucess', ...post });
    } catch (error) {
      return response
        .status(400)
        .json({ messege: 'Opps, error to insert Post', error });
    }
  }

  putPosts(request: Request, response: Response) {
    return response.status(501).json({ messege: 'Method Not Implemented' });
  }
  deletePosts(request: Request, response: Response) {
    return response.status(501).json({ messege: 'Method Not Implemented' });
  }
}
