import { Address } from 'src/models/Address';

interface AddressRepository {
  /**
     * @param userId UUID that identifies the user
     * @param addr Address inserted into the repository
     * @returns A promise of a copy of the new address
     */
  addNewAddress(userId: string, addr: Address): Promise<Address>

  /**
     * @param userId UUID that identifies the user
     * @param addrIdg UUID of an address
     * @returns A promise of a copy of the desired address
     */
  getAddress(userId: string, addrId: string): Promise<Address>

  /**
     * @param userId UUID that identifies the user
     * @returns A list of addresses for the user
     */
  getAddresses(userId: string): AsyncIterable<Address>

  /**
     * @param userId UUID that identifies the user
     * @param addr Address to substitute
     * @returns A promise of a copy of the updated address
     */
  updateAddress(userId: string, addr: Address): Promise<Address>

  /**
     * @param userId UUID that identifies the user
     * @param addrIdg UUID of an address
     * @returns the deleted address
     */
  deleteAddress(userId: string, addrId: string): Promise<Address>
}

export default AddressRepository;
