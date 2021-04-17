import { attribute } from "@aws/dynamodb-data-mapper-annotations";
import Address from "./Address";

class AddressWithDynamoAnnotations implements Address {
  @attribute()
  nation: string;
  @attribute()
  city: string;
  @attribute()
  address: string;
  @attribute()
  cap: number;

  constructor(nation: string = "", city: string = "", address: string = "", cap: number = 0) {
    this.nation = nation;
    this.city = city;
    this.address = address;
    this.cap = cap;
  }
}

export default AddressWithDynamoAnnotations; 