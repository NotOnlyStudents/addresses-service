import { Address } from './Address';

interface Addresses {
  ownerId: string
  locations: Map<string, Address>;
}

export default Addresses;
