import { db } from './connection';

import { Application } from 'interfaces/applications.interface';
import { Levels } from '@/interfaces/capabilityRelationships';
import { AllCapabilities } from '@/interfaces/AllCapabilities.interface';

class BusinessCapabilityService {
  public async findAllApplications(): Promise<Application[]> {
    return await db.query('select application from public."ENTERPRISE_TROUX_APPLICATION_TO_BUSINESS_TAXONOMY" limit 20 offset 50');
  }

  public async getL1L2(): Promise<Levels[]> {
    return await db.query(
      `select DISTINCT capability as "levelparentname", capability_id as "levelparentid",
       sub_capability as "levelchildname", sub_capability_id  as "levelchildid" 
       FROM public."ENTERPRISE_TROUX_APPLICATION_TO_BUSINESS_TAXONOMY_IDS" order BY capability;`,
    );
  }

  public async getL2L3(): Promise<Levels[]> {
    return await db.query(
      `select DISTINCT sub_capability  as "levelparentname",sub_capability_id  as "levelparentid", 
      business_function as "levelchildname", business_function_id  as "levelchildid" 
      FROM public."ENTERPRISE_TROUX_APPLICATION_TO_BUSINESS_TAXONOMY_IDS" order BY sub_capability;`,
    );
  }

  public async getL3L4(): Promise<Levels[]> {
    return await db.query(
      `select DISTINCT business_function  as "levelparentname", business_function_id  as "levelparentid", 
      business_sub_function as "levelchildname", business_sub_function_id   as "levelchildid" FROM 
      public."ENTERPRISE_TROUX_APPLICATION_TO_BUSINESS_TAXONOMY_IDS" order BY business_function;`,
    );
  }

  public async allCapabilities(): Promise<AllCapabilities[]> {
    return await db.query(
      'select DISTINCT capability, capability_id, sub_capability, sub_capability_id, business_function, business_function_id , business_sub_function, business_sub_function_id FROM public."ENTERPRISE_TROUX_APPLICATION_TO_BUSINESS_TAXONOMY_IDS" order BY capability, sub_capability, business_function, business_sub_function;',
    );
  }
}
export default BusinessCapabilityService;
