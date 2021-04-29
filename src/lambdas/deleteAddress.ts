import AddressResponse from 'src/models/AddressResponse';
import AddressRepository from 'src/repository/AddressRepository';
import uuidV4Regex from 'src/models/uuidRegex';

const lambda = async (
  userName: string,
  addrId: string,
  repo: AddressRepository,
): Promise<AddressResponse> => {
  if (!uuidV4Regex.test(addrId)) return new AddressResponse(400);
  const result = await repo.deleteAddress(userName, addrId);
  return new AddressResponse(typeof result === 'undefined' ? 404 : 200);
};
export default lambda;
