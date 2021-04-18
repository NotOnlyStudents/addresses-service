import { Address } from "src/models/Address";
import AddressRepository from "./AddressRepository";
import { DynamoDB } from "aws-sdk";
import { DataMapper } from "@aws/dynamodb-data-mapper";
import { annotate } from "src/repository/AddressDynamoDB";


class AddressDynamoRepository implements AddressRepository {
    readonly mapper: DataMapper

    constructor(dbConnection: DynamoDB) {
        this.mapper = new DataMapper({ client: dbConnection });
    }

    addNewAddress(_userId: string, addr: Address): Promise<Address> {
        return this.mapper.put(annotate(addr)) as Promise<Address>;
    }

}

export default AddressDynamoRepository;