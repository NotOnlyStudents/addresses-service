import { Address } from 'src/models/Address';
import AddressResponse from '../src/models/AddressResponse';

describe('Check the address response', () => {
  it('Valid address response', () => {
    const address: Address = {
      id: '1',
      nation: 'Italy',
      city: 'Rome',
      address: 'Via Cavour, 10',
      cap: 40145,
    };

    const responseAddress = new AddressResponse(200, address);
    const responseAddresses = new AddressResponse(200, [address]);
    const responseCode = new AddressResponse(200);

    expect(responseAddress.statusCode).toEqual(200);
    expect(responseAddress.body).toEqual(JSON.stringify({ data: address }));

    expect(responseAddresses.statusCode).toEqual(200);
    expect(responseAddresses.body).toEqual(JSON.stringify({ data: [address] }));

    expect(responseCode.statusCode).toEqual(200);
    expect(responseCode.body).toEqual(JSON.stringify({}));
  });
});
