import { Router } from 'express';
import ExtractsController from '@controllers/extracts.controller';
import { Routes } from '@interfaces/routes.interface';
//import validationMiddleware from '@middlewares/validation.middleware';

class ExtractsRoute implements Routes {
  public path = '/extracts';
  public router = Router();
  public extractsController = new ExtractsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.extractsController.getExtracts);
    this.router.get(`${this.path}/all`, this.extractsController.getExtracts);
    this.router.post(`${this.path}`, this.extractsController.releaseExtracts);
  }
}

export default ExtractsRoute;
