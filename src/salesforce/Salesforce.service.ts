import axios from 'axios';
import * as qs from 'qs';

import { ISalesforceService } from './ISalesforceService.interface';

const SALESFORCE_URL = 'https://login.salesforce.com/services/oauth2/token';

export class SalesforceService implements ISalesforceService {
  constructor(
    private readonly clientId: string,
    private readonly clientSecret: string,
    private readonly username: string,
    private readonly password: string,
    private readonly requestUrl: string,
  ) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.username = username;
    this.password = password;
    this.requestUrl = requestUrl;
  }

  async getToken(): Promise<string> {
    const message = {
      grant_type: 'password',
      client_id: this.clientId,
      client_secret: this.clientSecret,
      username: this.username,
      password: this.password,
    };

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    console.log(`Getting salesforce token: ${qs.stringify(message)}`);

    const { data } = await axios.post(SALESFORCE_URL, qs.stringify(message), { headers });

    console.log(`Salesforce token was successfully got: ${JSON.stringify(data)}`);

    return data.access_token;
  }

  async sendMessage(token: string, message: string): Promise<void> {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };

    console.log(`Sending salesforce message: ${JSON.stringify(message)}...`);

    const { data } = await axios.post(this.requestUrl, message, { headers });

    console.log(`Salesforce message was successfully sent: ${JSON.stringify(data)}`);
  }
}
