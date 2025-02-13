export interface Address {
    country: string;
    city: string;
    street?: string;
    zip?: number;
  }
  
  export interface Unit {
    quantity: number;
    unitName?: string;
    unitPrice?: number;
  }
  
  export interface Company {
    // id?: number;
    companyName: string;
    address: Address[];
    units: Unit[];
    total?: number; 
  }

  
  export default  Company;
  