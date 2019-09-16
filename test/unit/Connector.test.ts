import { IMock, Mock, It, Times } from 'typemoq';

import { Connector } from '../../src/connector/Connector';
import { ISalesforceService } from '../../src/salesforce/ISalesforceService.interface';

describe('Connector', () => {
  let salesforceServiceMock: IMock<ISalesforceService>;

  let connector: Connector;

  beforeEach(() => {
    salesforceServiceMock = Mock.ofType<ISalesforceService>();

    connector = new Connector(salesforceServiceMock.object);
  });

  afterEach(() => {
    salesforceServiceMock.verifyAll();
  });

  it('Should process user message', async () => {
    // Arrange
    const token = 'test_token';
    const message = 'test_message';
    salesforceServiceMockGetToken(token);
    salesforceServiceMockSendMessage(token, message);

    // Act
    await connector.processMessage(message);

    // Assert
    expect(true).toBeTruthy();
  });

  function salesforceServiceMockGetToken(token: string) {
    salesforceServiceMock
      .setup((x: ISalesforceService) => x.getToken())
      .returns(async () => token)
      .verifiable(Times.once());
  }

  function salesforceServiceMockSendMessage(token: string, message: string) {
    salesforceServiceMock
      .setup((x: ISalesforceService) => x.sendMessage(token, message))
      .returns(async () => Promise.resolve())
      .verifiable(Times.once());
  }
});
