import { db } from './connection';

import { Application } from 'interfaces/applications.interface';
class BusinessCapabilityService {
  public async findAllApplications(): Promise<Application[]> {
    return await db.query('select application from public."ENTERPRISE_TROUX_APPLICATION_TO_BUSINESS_TAXONOMY" limit 20 offset 50');
  }
}
export default BusinessCapabilityService;
