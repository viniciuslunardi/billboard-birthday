import { Router } from 'express';

export default abstract class BaseController {
  protected _router: Router;

  protected constructor(router: Router) {
    this._router = router;
  }

  get router(): Router {
    return this._router;
  }

  protected abstract initBinds(): void;
}
