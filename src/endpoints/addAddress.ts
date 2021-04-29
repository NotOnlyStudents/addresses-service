import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Handler,
} from 'aws-lambda';
import { v4 } from 'uuid';
import AddressDynamoRepository from 'src/repository/AddressDynamoRepository';
import { parseDocument } from 'yaml';
import { DynamoDB } from 'aws-sdk';
import { ClientConfiguration } from 'aws-sdk/clients/dynamodb';
import { readFileSync as readFile } from 'fs';
import addAddress from 'src/lambdas/addAddress';
import AddressResponse from 'src/models/AddressResponse';

const handler: Handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const dynamoConfig: ClientConfiguration = parseDocument(readFile(process.env.DYNAMODB_CONFIG_FILE_PATH, 'utf-8')).toJSON();
  const repo = new AddressDynamoRepository(new DynamoDB(dynamoConfig));
  const userName = event.requestContext.authorizer.claims['conito:username'] as string;
  const userGroups = event.requestContext.authorizer.claims['conito:groups'] as string[];
  if (userGroups.includes('buyers')) return addAddress(userName, event.body, repo, v4);
  return new AddressResponse(401);
};

export default handler;
