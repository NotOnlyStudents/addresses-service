import AddressResponse from 'src/models/AddressResponse';
import AddressRepository from 'src/repository/AddressRepository';
import uuidV4Regex from 'src/models/uuidRegex';

const lambda = async (
  userName: string,
  addrId: string,
  repo: AddressRepository,
): Promise<AddressResponse> => {
  if (!uuidV4Regex.test(addrId)) return new AddressResponse(400);
  const address = await repo.getAddress(userName, addrId);
  return typeof address !== 'undefined' ? new AddressResponse(200, address) : new AddressResponse(404);
};

export default lambda;
