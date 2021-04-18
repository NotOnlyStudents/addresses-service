import { attribute, table, hashKey, rangeKey } from "@aws/dynamodb-data-mapper-annotations";
import { Address } from "src/models/Address";

@table(process.env.ADDRESS_TABLE_NAME)
class AddressWithDynamoAnnotations implements Address {
  @hashKey()
  id: string
  @attribute()
  owner: string
  @attribute()
  nation: string;
  @attribute()
  city: string;
  @attribute()
  address: string;
  @attribute()
  cap: number;

  constructor(id: string = "", owner: string = "", nation: string = "", city: string = "", address: string = "", cap: number = 0) {
    this.id = id;
    this.owner = owner;
    this.nation = nation;
    this.city = city;
    this.address = address;
    this.cap = cap;
  }
}

const annotate = (addr: Address, owner: string): AddressWithDynamoAnnotations => {
  return new AddressWithDynamoAnnotations(addr.id, owner, addr.nation, addr.city, addr.address, addr.cap);
}

const deannotate = (dynamoAddr: AddressWithDynamoAnnotations): Address => {
  delete dynamoAddr.owner;
  return dynamoAddr as Address;
}

export { AddressWithDynamoAnnotations, annotate, deannotate }; 