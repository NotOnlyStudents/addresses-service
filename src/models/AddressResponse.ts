import { APIGatewayProxyResult } from 'aws-lambda';
import { Address } from './Address';

class AddressResponse implements APIGatewayProxyResult {
  readonly headers = { 'Access-Control-Allow-Origin': '*' }; // CORS Support

  readonly statusCode: number;

  readonly body: string;

  constructor(statusCode: number, body?: Address | Address[]) {
    this.statusCode = statusCode;
    this.body = JSON.stringify({ data: body });
  }
}

export default AddressResponse;
