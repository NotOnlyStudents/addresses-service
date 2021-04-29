import { Address, instanceOfAddress } from 'src/models/Address';
import AddressResponse from 'src/models/AddressResponse';
import AddressRepository from 'src/repository/AddressRepository';
import { v4 } from 'uuid';

const lambda = async (
  userName: string,
  eventBody: string,
  repo: AddressRepository,
  uuidGenerator: typeof v4,
): Promise<AddressResponse> => {
  let object: object;
  try {
    object = JSON.parse(eventBody);
  } catch {
    return new AddressResponse(400);
  }
  const newAddress = { ...object, id: uuidGenerator() } as Address;
  if (!instanceOfAddress(newAddress)) return new AddressResponse(400);
  return new AddressResponse(201, await repo.addNewAddress(userName, newAddress));
};

export default lambda;
