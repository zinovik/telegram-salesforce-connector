import { IConnector } from './IConnector.interface';
import { ISalesforceService } from '../salesforce/ISalesforceService.interface';

import { IMessageBody } from '../common/model/IMessageBody.interface';

export class Connector implements IConnector {
  constructor(private readonly salesforceService: ISalesforceService) {
    this.salesforceService = salesforceService;
  }

  async processMessage(message: string): Promise<boolean> {
    let token: string = '';

    try {
      token = await this.salesforceService.getToken();
    } catch (error) {
      console.error('Error getting salesforce token: ', error.message);
      return false;
    }

    try {
      await this.salesforceService.sendMessage(token, message);
    } catch (error) {
      console.error('Error sending salesforce message: ', error.message);
      return false;
    }

    return true;
  }
}
