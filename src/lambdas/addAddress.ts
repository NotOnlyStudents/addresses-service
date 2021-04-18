import { Address, instanceOfAddress } from "src/models/Address";
import AddressResponse from "src/models/AddressResponse"
import AddressRepository from "src/repository/AddressRepository"
import { v4 } from "uuid";

const lambda = (userName: string, eventBody: string, repo: AddressRepository, uuidGenerator: typeof v4): Promise<AddressResponse> => {
    return new Promise((resolve, reject) => {
        let object: any;
        try {
            object = JSON.parse(eventBody);
        } catch {
            reject(new AddressResponse(400));
        }
        object.id = uuidGenerator();
        const newAddress = object as Address;
        if (instanceOfAddress(newAddress)) {
            repo.addNewAddress(userName, newAddress)
                .then((addr) => resolve(new AddressResponse(201, addr)))
                .catch(() => reject(new AddressResponse(500)))
        } else
            reject(new AddressResponse(400))
    });
}

export default lambda;