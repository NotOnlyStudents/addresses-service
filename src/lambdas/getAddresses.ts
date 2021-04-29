import AddressResponse from 'src/models/AddressResponse';
import AddressRepository from 'src/repository/AddressRepository';
import { Address } from 'src/models/Address';

const lambda = async (userName: string, repo: AddressRepository): Promise<AddressResponse> => {
  const iterator = repo.getAddresses(userName);
  const addresses: Address[] = [];
  for await (const addr of iterator) {
    addresses.push(addr);
  }
  return new AddressResponse(200, addresses);
};

export default lambda;
