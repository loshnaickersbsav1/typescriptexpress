import { NextFunction, Request, Response } from 'express';
import { Application } from '@interfaces/applications.interface';
import BusinessCapabilityService from '@services/business.capabilties.service';

class BusinessCapabilityController {
  public bus = new BusinessCapabilityService();

  public getApplications = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      console.log('finding applications--');
      const findAllApplications: Application[] = await this.bus.findAllApplications();

      res.status(200).json({ data: findAllApplications, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };
}

export default BusinessCapabilityController;
