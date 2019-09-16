import 'babel-polyfill';

import * as dotenv from 'dotenv';

import { ConfigParameterNotDefinedError } from './error/ConfigParameterNotDefinedError';
import { Connector } from '../connector/Connector';
import { SalesforceService } from '../salesforce/Salesforce.service';
import { IEvent } from './model/IEvent.interface';

dotenv.config();

exports.handler = async ({ body }: IEvent, context: never) => {
  if (process.env.CLIENT_ID === undefined) {
    throw new ConfigParameterNotDefinedError('CLIENT_ID');
  }
  if (process.env.CLIENT_SECRET === undefined) {
    throw new ConfigParameterNotDefinedError('CLIENT_SECRET');
  }
  if (process.env.SF_USERNAME === undefined) {
    throw new ConfigParameterNotDefinedError('USERNAME');
  }
  if (process.env.SF_PASSWORD === undefined) {
    throw new ConfigParameterNotDefinedError('PASSWORD');
  }
  if (process.env.REQUEST_URL === undefined) {
    throw new ConfigParameterNotDefinedError('PASSWORD');
  }

  const connector = new Connector(
    new SalesforceService(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      process.env.SF_USERNAME,
      process.env.SF_PASSWORD,
      process.env.REQUEST_URL,
    ),
  );

  try {
    await connector.processMessage(body);
  } catch (error) {
    console.error('Unexpected error occurred.', error.message);
  }

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      result: 'success',
    }),
  };
};
