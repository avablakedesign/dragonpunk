export interface Order{
    id: number;
    hasBeenDelivered: boolean;
    name: string;
  }
export interface UserDetails{
    name: string;
    age: number;
    pastOrders: Order[];
    cart:any;
  }
  