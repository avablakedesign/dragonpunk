export interface Order{
    id: number;
    hasBeenDelivered: boolean;
    name: string;
  }
export interface UserDetails{
    id?: string;
    first_name?: string;
    last_name?: string;
    address?: string;
    email?: string;
    password?: string;
    isAdmin?: boolean;
    cart?: any;
  }
  