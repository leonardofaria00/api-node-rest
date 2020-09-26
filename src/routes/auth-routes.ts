import AuthController from '@controllers/AuthController';

export class AuthRoutes {
  private controller: AuthController = new AuthController();

  public routes(app) {
    app.post('/oauth/authorize', this.controller.authorize);
  }
}
