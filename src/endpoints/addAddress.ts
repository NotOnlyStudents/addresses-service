import {
    APIGatewayProxyEvent,
    APIGatewayProxyResult,
    Handler
} from "aws-lambda";
import AddressResponse from "../models/AddressResponse";
import { Address, instanceOfAddress } from "../models/Address";
import { v4 as UUID } from "uuid";
import { DataMapper } from "@aws/dynamodb-data-mapper";
import { parseDocument } from "yaml";
import { DynamoDB } from "aws-sdk";
import { ClientConfiguration } from "aws-sdk/clients/dynamodb";
import { readFileSync as readFile } from 'fs';
import { annotate } from "src/models/AddressDynamoDB";

const handler: Handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    return new Promise((resolve, reject) => {
        const dynamoConfig: ClientConfiguration = parseDocument(readFile(process.env.DYNAMODB_CONFIG_FILE_PATH, 'utf-8')).toJSON();
        const db = new DynamoDB(dynamoConfig);
        const mapper = new DataMapper({ client: db });
        let object = JSON.parse(event.body);
        object.id = UUID();
        const newAddress = object as Address;
        console.log(annotate(object));
        if (instanceOfAddress(newAddress)) {
            mapper.put(annotate(newAddress))
                .then(() => resolve(new AddressResponse(201, newAddress as Address)))
                .catch((err) => { console.log(err); reject(new AddressResponse(500)) });
        } else
            reject(new AddressResponse(400));
    })
}

export default handler;