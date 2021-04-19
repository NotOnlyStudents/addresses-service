import { Address } from "src/models/Address";
import AddressRepository from "./AddressRepository";
import { DynamoDB } from "aws-sdk";
import { DataMapper, UpdateOptions } from "@aws/dynamodb-data-mapper";
import { ConditionExpression, equals } from "@aws/dynamodb-expressions"
import { AddressWithDynamoAnnotations, annotate, deannotate } from "src/repository/AddressDynamoDB";



class AddressDynamoRepository implements AddressRepository {
    readonly mapper: DataMapper

    constructor(dbConnection: DynamoDB) {
        this.mapper = new DataMapper({ client: dbConnection });
    }

    addNewAddress(userId: string, addr: Address): Promise<Address> {
        return new Promise((resolve, reject) => {
            console.log(annotate(addr, userId))
            this.mapper
                .put(annotate(addr, userId))
                .then((addr) => resolve(deannotate(addr)))
                .catch((err) => reject(err));
        });
    }

    getAddress(userId: string, addrId: string): Promise<Address> {
        return new Promise((resolve, reject) => {
            this.mapper.get(Object.assign(new AddressWithDynamoAnnotations, { id: addrId }))
                .then((addr) => { addr.owner === userId ? resolve(deannotate(addr)) : reject({ name: 'ItemNotFoundException' }) })
                .catch((err) => { reject(err) });
        });
    }

    updateAddress(userId: string, addr: Address): Promise<Address> {
        return new Promise((resolve, reject) => {
            const conditionExpression = equals(userId);
            const options: UpdateOptions = {
                condition: {
                    ...conditionExpression,
                    subject: "owner"
                } as ConditionExpression,
                onMissing: "remove"
            }
            console.log("Repo: " + userId)
            this.mapper.update(annotate(addr, userId), options)
                .then((addr) => resolve(deannotate(addr)))
                .catch((err) => { console.log(err); reject(err) });
        });
    }

}

export default AddressDynamoRepository;