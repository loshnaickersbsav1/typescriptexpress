import { NextFunction, Request, Response } from 'express';
import { Application } from '@interfaces/applications.interface';
import BusinessCapabilityService from '@services/business.capabilties.service';
import { Capabilities } from '@/interfaces/capabilities.interface';
import { Levels } from '@/interfaces/capabilityRelationships';
import { BusinessCapabilities } from '@/models/businessCapabilities';
import { CapabilitiesWithChildren } from '@/models/capabilitiesWithChildren';
import { capability } from '@/models/capability';
import { AllCapabilities } from '@/interfaces/AllCapabilities.interface';
import { CapabilitiesWithoutChildren } from '@/models/capabilitiesWithoutChildren';

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

  public getL1L2 = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      console.log('getting related L1s and L2s--');
      const getL1L2: Levels[] = await this.bus.getL1L2();

      res.status(200).json({ data: getL1L2, message: 'getAll' });
    } catch (error) {
      next(error);
    }
  };

  public getL2L3 = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      console.log('getting related L1s and L2s--');
      const getL2L3: Levels[] = await this.bus.getL2L3();

      res.status(200).json({ data: getL2L3, message: 'getAll' });
    } catch (error) {
      next(error);
    }
  };

  public getL3L4 = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      console.log('getting related L3s and L4s--');
      const getL3L4: Levels[] = await this.bus.getL3L4();

      res.status(200).json({ data: getL3L4, message: 'getAll' });
    } catch (error) {
      next(error);
    }
  };

  public treeStructure = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      console.log('getting tree structure');

      let businessCapabilities: CapabilitiesWithChildren[];
      let tree: string[][][][];

      const getallCapabilities: AllCapabilities[] = await this.bus.allCapabilities();

      res.status(200).json({ data: getallCapabilities, message: 'getAll' });
    } catch (error) {
      next(error);
    }
  };

  storeValue = (currentRecord: AllCapabilities, type: string): CapabilitiesWithChildren => {
    const returnedValue: CapabilitiesWithChildren;
    switch (type) {
      case 'c':
        returnedValue.name = currentRecord.capability;
        returnedValue.level = 'l1';
        returnedValue.id = currentRecord.capability_id;
        break;
      case 's':
        returnedValue.name = currentRecord.sub_capability;
        returnedValue.level = 'l2';
        returnedValue.id = currentRecord.sub_capability_id;
        break;
      case 'b':
        returnedValue.name = currentRecord.business_function;
        returnedValue.level = 'l3';
        returnedValue.id = currentRecord.business_function_id;
      default:
        returnedValue.name = currentRecord.business_sub_function;
        returnedValue.level = 'l4';
        returnedValue.id = currentRecord.business_sub_function_id;
    }

    return returnedValue;
  };

  public getAllCapabilities = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      console.log('getting capabilities--');

      let businessCapabilities: BusinessCapabilities;
      let tree: AllCapabilities[][][][];

      const returnedCapabilities: AllCapabilities[] = await this.bus.allCapabilities();

      let storeCapability: CapabilitiesWithChildren;
      let storeSubCapability: CapabilitiesWithChildren;
      let storeBusinessFunction: CapabilitiesWithChildren;
      let storeBusinessSubFunction: CapabilitiesWithoutChildren;
      let lastCap = 0;
      let lastSubCap = 0;
      let lastBusFunction = 0;

      let record = 0;
      // refactor

      while (record < returnedCapabilities.length) {
        storeCapability = this.storeValue(returnedCapabilities[record], 'c');
        businessCapabilities.businessCapabilites.push(storeCapability);
        lastCap = businessCapabilities.businessCapabilites.length - 1;

        while (storeCapability.name === returnedCapabilities[record].capability) {
          storeSubCapability = this.storeValue(returnedCapabilities[record], 's');
          businessCapabilities.businessCapabilites[lastCap].children.push(storeCapability);
          lastSubCap = businessCapabilities.businessCapabilites[lastCap].children.length - 1;

          while (storeSubCapability.name === returnedCapabilities[record].sub_capability) {
            storeBusinessFunction = this.storeValue(returnedCapabilities[record], 'b');
            businessCapabilities.businessCapabilites[lastCap].children[lastSubCap].children.push(storeBusinessFunction);
            lastBusFunction = businessCapabilities.businessCapabilites[lastCap].children[lastSubCap].children.length - 1;

            while (storeBusinessFunction.name === returnedCapabilities[record].business_function) {
              storeBusinessSubFunction = this.storeValue(returnedCapabilities[record], 'sb');
              businessCapabilities.businessCapabilites[lastCap].children[lastSubCap].children[lastBusFunction].push(storeBusinessSubFunction);
              lastBusFunction = businessCapabilities.businessCapabilites.length - 1;

              record++;
            }
          }
        }
      }

      res.status(200).json({ data: businessCapabilities, message: 'getAllCapabilities' });
    } catch (error) {
      next(error);
    }
  };
}

export default BusinessCapabilityController;
