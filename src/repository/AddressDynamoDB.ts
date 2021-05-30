import {
  attribute, table, hashKey, rangeKey,
} from '@aws/dynamodb-data-mapper-annotations';
import { Address } from 'src/models/Address';

@table(process.env.ADDRESS_TABLE_NAME)
class AddressWithDynamoAnnotations implements Address {
  @rangeKey()
  id: string;

  @hashKey()
  username: string;

  @attribute()
  nation: string;

  @attribute()
  city: string;

  @attribute()
  address: string;

  @attribute()
  cap: number;

  constructor(
    id: string = '',
    username: string = '',
    nation: string = '',
    city: string = '',
    address: string = '',
    cap: number = 0,
  ) {
    this.id = id;
    this.username = username;
    this.nation = nation;
    this.city = city;
    this.address = address;
    this.cap = cap;
  }
}

const annotate = (
  a: Address,
  username: string,
): AddressWithDynamoAnnotations => (
  new AddressWithDynamoAnnotations(a.id, username, a.nation, a.city, a.address, a.cap)
);

const deannotate = (dynamoAddr: AddressWithDynamoAnnotations): Address => {
  const out = { ...dynamoAddr };
  delete out.username;
  return out;
};

export { AddressWithDynamoAnnotations, annotate, deannotate };
