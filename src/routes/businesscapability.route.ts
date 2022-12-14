import { Router } from 'express';
import BusinessCapability from '@/controllers/business.capability.controller';
import { CreateUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class BusinessCapabilityRoutes implements Routes {
  public path = '/capabilities';
  public router = Router();
  public businessCapability = new BusinessCapability();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.businessCapability.getApplications);
    this.router.get(`${this.path}/allCapabilities`, this.businessCapability.getApplications);
  }
}

export default BusinessCapabilityRoutes;
