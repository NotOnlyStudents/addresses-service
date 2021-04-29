import AddressResponse from 'src/models/AddressResponse';
import AddressRepository from 'src/repository/AddressRepository';
import uuidV4Regex from 'src/models/uuidRegex';
import { Address, instanceOfAddress } from 'src/models/Address';

const lambda = async (
  userName: string,
  addrId: string,
  eventBody: string,
  repo: AddressRepository,
): Promise<AddressResponse> => {
  let object: object;
  try {
    object = JSON.parse(eventBody);
  } catch {
    return new AddressResponse(400);
  }
  const newAddress = { ...object, id: addrId } as Address;
  if (!(uuidV4Regex.test(addrId) && instanceOfAddress(newAddress))) return new AddressResponse(400);
  const address = await repo.updateAddress(userName, newAddress);
  return typeof address !== 'undefined' ? new AddressResponse(200, address) : new AddressResponse(404);
};
export default lambda;
