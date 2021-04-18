import { Address } from "src/models/Address";

interface AddressRepository {
    /**
     * @param userId UUID that identifies the user, string
     * @param addr Address inserted into the repository
     * @returns A promise of a copy of $userId on successful operations
     */
    addNewAddress(userId: string, addr: Address): Promise<Address>;
}

export default AddressRepository;