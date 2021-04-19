import AddressResponse from "src/models/AddressResponse"
import AddressRepository from "src/repository/AddressRepository"
import { uuidV4Regex } from "src/models/uuidRegex"

const lambda = (userName: string, addrId: string, repo: AddressRepository): Promise<AddressResponse> => {
    return new Promise((resolve, reject) => {
        if (!uuidV4Regex.test(addrId))
            reject(new AddressResponse(400));
        else
            repo.deleteAddress(userName, addrId)
                .then(() => resolve(new AddressResponse(200)))
                .catch((err) => reject(new AddressResponse('code' in err && err.name === 'ConditionalCheckFailedException' ? 404 : 500)))
    });
}
export default lambda;