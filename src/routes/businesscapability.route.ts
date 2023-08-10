import { Router } from 'express';
import BusinessCapability from '@/controllers/business.capability.controller';
import { Routes } from '@interfaces/routes.interface';

class BusinessCapabilityRoutes implements Routes {
  public path = '/capabilities1';
  public router = Router();
  public businessCapability = new BusinessCapability();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.businessCapability.getApplications);
    this.router.get(`${this.path}/allCapabilities`, this.businessCapability.getApplications);
    this.router.get(`${this.path}/allCapabilitiesJson`, this.businessCapability.getAllCapabilities);
  }
}

export default BusinessCapabilityRoutes;
