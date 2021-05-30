import { Address } from 'src/models/Address';
import { DynamoDB } from 'aws-sdk';
import { DataMapper, UpdateOptions } from '@aws/dynamodb-data-mapper';
import { AddressWithDynamoAnnotations, annotate, deannotate } from 'src/repository/AddressDynamoDB';
import { equals } from '@aws/dynamodb-expressions';
import AddressRepository from './AddressRepository';

class AddressDynamoRepository implements AddressRepository {
  readonly mapper: DataMapper;

  constructor(dbConnection: DynamoDB) {
    this.mapper = new DataMapper({ client: dbConnection });
  }

  async addNewAddress(userId: string, addr: Address): Promise<Address> {
    return deannotate(await this.mapper.put(annotate(addr, userId)));
  }

  async getAddress(userId: string, addrId: string): Promise<Address> {
    try {
      const address = await this.mapper.get(
        Object.assign(
          new AddressWithDynamoAnnotations(),
          { id: addrId, username: userId },
        ),
      );
      return deannotate(address);
    } catch (err) {
      if (err.name && err.name === 'ItemNotFoundException') return undefined;
      throw err;
    }
  }

  async updateAddress(userId: string, addr: Address): Promise<Address> {
    const options: UpdateOptions = {
      condition: {
        ...equals(addr.id),
        subject: 'id',
      },
      onMissing: 'remove',
    };
    try {
      return deannotate(await this.mapper.update(annotate(addr, userId), options));
    } catch (err) {
      if ('code' in err && err.name === 'ConditionalCheckFailedException') return undefined;
      throw err;
    }
  }

  async deleteAddress(userId: string, addrId: string): Promise<Address> {
    return this.mapper.delete(
      Object.assign(
        new AddressWithDynamoAnnotations(),
        { id: addrId, username: userId },
      ),
    );
  }

  async* getAddresses(userId: string): AsyncIterable<Address> {
    const asyncIterator = this.mapper.query(AddressWithDynamoAnnotations, { username: userId });
    for await (const address of asyncIterator) {
      yield deannotate(address);
    }
  }
}

export default AddressDynamoRepository;
