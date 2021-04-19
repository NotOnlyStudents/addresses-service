import AddressResponse from "src/models/AddressResponse"
import AddressRepository from "src/repository/AddressRepository"
import { uuidV4Regex } from "src/models/uuidRegex"
import { Address, instanceOfAddress } from "src/models/Address";

const lambda = (userName: string, addrId: string, eventBody: string, repo: AddressRepository): Promise<AddressResponse> => {
    return new Promise((resolve, reject) => {
        let object: object;
        try {
            object = JSON.parse(eventBody);
        } catch {
            reject(new AddressResponse(400));
        }
        const newAddress = { ...object, id: addrId } as Address;
        if (!(uuidV4Regex.test(addrId) && instanceOfAddress(newAddress)))
            reject(new AddressResponse(400));
        else
            repo.updateAddress(userName, newAddress)
                .then((addr) => resolve(new AddressResponse(200, addr)))
                .catch((err) => reject(new AddressResponse('code' in err && err.name === 'ConditionalCheckFailedException' ? 404 : 500)))
    });
}
export default lambda;