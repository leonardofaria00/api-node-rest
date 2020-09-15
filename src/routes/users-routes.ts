import UsersController from '@controllers/UsersController';

export class UserRoutes {
  public controller: UsersController = new UsersController();

  public routes(app) {
    app.get('/users', this.controller.getUsers);
    app.get('/users/:id', this.controller.getUserById);
    app.post('/users', this.controller.postUsers);
    app.put('/users', this.controller.putUsers);
    app.delete('/users', this.controller.deleteUsers);
  }
}
