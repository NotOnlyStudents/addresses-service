import AddressResponse from "src/models/AddressResponse"
import AddressRepository from "src/repository/AddressRepository"
import { uuidV4Regex } from "src/models/uuidRegex"

const lambda = (userName: string, addrId: string, repo: AddressRepository): Promise<AddressResponse> => {
    return new Promise((resolve, reject) => {
        if (!uuidV4Regex.test(addrId))
            reject(new AddressResponse(400));
        else
            repo.getAddress(userName, addrId)
                .then((addr) => resolve(new AddressResponse(201, addr)))
                .catch((err) => { reject(new AddressResponse(err.name && err.name === 'ItemNotFoundException' ? 404 : 500)) })
    });
}

export default lambda;