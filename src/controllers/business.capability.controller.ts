import { NextFunction, Request, Response } from 'express';
import { Application } from '@interfaces/applications.interface';
import BusinessCapabilityService from '@services/business.capabilties.service';
import { Levels } from '@/interfaces/capabilityRelationships';
import { BusinessCapabilities } from '@/models/businessCapabilities';
import { CapabilitiesWithChildren } from '@/models/capabilitiesWithChildren';
import { AllCapabilities } from '@/interfaces/AllCapabilities.interface';
import { CapabilitiesWithoutChildren } from '@/models/capabilitiesWithoutChildren';
import { json } from 'envalid';

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

  storeValue = (currentRecord: AllCapabilities, type: string): any => {
    const returnedValue: CapabilitiesWithChildren = { id: '', name: '', level: '', children: [] };
    switch (type) {
      case 'c':
        returnedValue.name = currentRecord.capability;
        returnedValue.level = 'l1';
        returnedValue.id = currentRecord.capability_id;
        returnedValue.children = [];
        break;
      case 's':
        returnedValue.name = currentRecord.sub_capability;
        returnedValue.level = 'l2';
        returnedValue.id = currentRecord.sub_capability_id;
        returnedValue.children = [];
        break;
      case 'b':
        returnedValue.name = currentRecord.business_function;
        returnedValue.level = 'l3';
        returnedValue.id = currentRecord.business_function_id;
        returnedValue.children = [];
        break;
      default:
        returnedValue.name = currentRecord.business_sub_function;
        returnedValue.level = 'l4';
        returnedValue.id = currentRecord.business_sub_function_id;
        returnedValue.children = undefined;
    }

    return returnedValue;
  };

  public getAllCapabilities = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      console.log('getting capabilities--');

      const businessCapabilitiesModel: BusinessCapabilities = {
        values: [
          // {
          //   id: '',
          //   name: '',
          //   level: '',
          //   children: [
          //     {
          //       id: '',
          //       name: '',
          //       level: '',
          //       children: [
          //         {
          //           id: '',
          //           name: '',
          //           level: '',
          //           children: [
          //             {
          //               id: '',
          //               name: '',
          //               level: '',
          //             },
          //           ],
          //         },
          //       ],
          //     },
          //   ],
          // },
        ],
      };

      const returnedCapabilities: AllCapabilities[] = await this.bus.allCapabilities();

      let storeCapability: any;
      let storeSubCapability: any;
      let storeBusinessFunction: any;
      let storeBusinessSubFunction: any;
      let lastCap = 0;
      let lastSubCap = 0;
      let lastBusFunction = 0;

      let record = 0;
      // refactor

      while (record < returnedCapabilities.length) {
        storeCapability = this.storeValue(returnedCapabilities[record], 'c');
        console.log('Capability');
        console.log(JSON.stringify(storeCapability));
        businessCapabilitiesModel.values.push(storeCapability);
        lastCap = businessCapabilitiesModel.values.length - 1;
        console.log(lastCap);

        while (record < returnedCapabilities.length && storeCapability.name === returnedCapabilities[record].capability) {
          console.log('subCapability');
          storeSubCapability = this.storeValue(returnedCapabilities[record], 's');
          console.log(JSON.stringify(storeSubCapability));
          businessCapabilitiesModel.values[lastCap].children.push(storeSubCapability);
          lastSubCap = businessCapabilitiesModel.values[lastCap].children.length - 1;
          console.log(lastSubCap);

          while (record < returnedCapabilities.length && storeSubCapability.name === returnedCapabilities[record].sub_capability) {
            console.log('Business function');
            storeBusinessFunction = this.storeValue(returnedCapabilities[record], 'b');
            console.log(JSON.stringify(storeBusinessFunction));
            businessCapabilitiesModel.values[lastCap].children[lastSubCap].children.push(storeBusinessFunction);
            lastBusFunction = businessCapabilitiesModel.values[lastCap].children[lastSubCap].children.length - 1;
            console.log(lastBusFunction);
            while (record < returnedCapabilities.length && storeBusinessFunction.name === returnedCapabilities[record].business_function) {
              console.log('Business Sub function');
              storeBusinessSubFunction = this.storeValue(returnedCapabilities[record], 'sb');
              console.log(JSON.stringify(storeBusinessSubFunction));
              businessCapabilitiesModel.values[lastCap].children[lastSubCap].children[lastBusFunction].children.push(storeBusinessSubFunction);
              console.log(businessCapabilitiesModel);
              record++;
            }
          }
        }
      }

      res.status(200).json({ data: businessCapabilitiesModel, message: 'getAllCapabilities' });
    } catch (error) {
      next(error);
    }
  };
}

export default BusinessCapabilityController;
