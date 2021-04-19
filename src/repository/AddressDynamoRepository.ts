import { Address } from "src/models/Address";
import AddressRepository from "./AddressRepository";
import { DynamoDB } from "aws-sdk";
import { DataMapper, DeleteOptions, UpdateOptions } from "@aws/dynamodb-data-mapper";
import { ConditionExpression, equals } from "@aws/dynamodb-expressions"
import { AddressWithDynamoAnnotations, annotate, deannotate } from "src/repository/AddressDynamoDB";



class AddressDynamoRepository implements AddressRepository {
    readonly mapper: DataMapper

    constructor(dbConnection: DynamoDB) {
        this.mapper = new DataMapper({ client: dbConnection });
    }

    addNewAddress(userId: string, addr: Address): Promise<Address> {
        return new Promise((resolve, reject) => {
            this.mapper
                .put(annotate(addr, userId))
                .then((addr) => resolve(deannotate(addr)))
                .catch((err) => reject(err));
        });
    }

    getAddress(userId: string, addrId: string): Promise<Address> {
        return new Promise((resolve, reject) => {
            this.mapper
                .get(Object.assign(new AddressWithDynamoAnnotations, { id: addrId }))
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
            this.mapper
                .update(annotate(addr, userId), options)
                .then((addr) => resolve(deannotate(addr)))
                .catch((err) => reject(err));
        });
    }

    deleteAddress(userId: string, addrId: string): Promise<Address> {
        const conditionExpression = equals(userId);
        const options: DeleteOptions = {
            condition: {
                ...conditionExpression,
                subject: "owner"
            } as ConditionExpression
        }
        return this.mapper
            .delete(Object.assign(new AddressWithDynamoAnnotations, { id: addrId }), options)
    }
}

export default AddressDynamoRepository;