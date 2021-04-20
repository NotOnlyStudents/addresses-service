import {
    APIGatewayProxyEvent,
    APIGatewayProxyResult,
    Handler
} from "aws-lambda"
import AddressDynamoRepository from "src/repository/AddressDynamoRepository"
import { parseDocument } from "yaml"
import { DynamoDB } from "aws-sdk"
import { ClientConfiguration } from "aws-sdk/clients/dynamodb"
import { readFileSync as readFile } from 'fs'
import getAddresses from "src/lambdas/getAddresses"

const handler: Handler = async (_event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const dynamoConfig: ClientConfiguration = parseDocument(readFile(process.env.DYNAMODB_CONFIG_FILE_PATH, 'utf-8')).toJSON()
    const repo = new AddressDynamoRepository(new DynamoDB(dynamoConfig))
    return getAddresses("utente", repo)
}

export default handler