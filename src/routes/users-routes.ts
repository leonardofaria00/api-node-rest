import UsersController from '@controllers/UsersController';

export class UserRoutes {
  public controller: UsersController = new UsersController();

  public routes(app) {
    app.get('/users', this.controller.getUsers);
  }
}
