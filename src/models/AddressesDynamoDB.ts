import AddressWithDynamoAnnotations from "./AddressDynamoDB"
import Address from "./Address";
import Addresses from "./Addresses";

import { attribute, autoGeneratedHashKey, table } from "@aws/dynamodb-data-mapper-annotations";
import { embed } from "@aws/dynamodb-data-mapper";

@table(process.env.ADDRESS_TABLE_NAME)
class AddressesWithDynamoAnnotations implements Addresses {
    @autoGeneratedHashKey()
    ownerId: string;
    @attribute({ memberType: embed(AddressWithDynamoAnnotations) })
    locations: Map<string, Address>;
}

export default AddressesWithDynamoAnnotations;