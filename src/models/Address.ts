interface Address {
  id: string;
  nation: string;
  city: string;
  address: string;
  cap: number;
}

const instanceOfAddress = (obj: any): boolean => 'id' in obj && typeof obj.id === 'string'
    && 'nation' in obj && typeof obj.nation === 'string'
    && 'city' in obj && typeof obj.city === 'string'
    && 'address' in obj && typeof obj.address === 'string'
    && 'cap' in obj && Number.isInteger(obj.cap);

export { Address, instanceOfAddress };
