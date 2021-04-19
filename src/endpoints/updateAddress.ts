import {
    APIGatewayProxyEvent,
    APIGatewayProxyResult,
    Handler
} from "aws-lambda";
import AddressDynamoRepository from "src/repository/AddressDynamoRepository";
import { parseDocument } from "yaml";
import { DynamoDB } from "aws-sdk";
import { ClientConfiguration } from "aws-sdk/clients/dynamodb";
import { readFileSync as readFile } from 'fs';
import updateAddress from "src/lambdas/updateAddress";

const handler: Handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const dynamoConfig: ClientConfiguration = parseDocument(readFile(process.env.DYNAMODB_CONFIG_FILE_PATH, 'utf-8')).toJSON();
    const repo = new AddressDynamoRepository(new DynamoDB(dynamoConfig));
    return updateAddress("utente?", event.pathParameters.ID, event.body, repo);
}

export default handler;