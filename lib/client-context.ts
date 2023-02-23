import type { Dispatch } from "react";
import type { UserDetails } from "@/types";
import { createContext } from "react";
//This creates a shared client side state for the entire application. 
//This is different from graphQl context, because this only applies to the client and not the server. 
interface IUserContext{
    user: UserDetails | null;
    setUser: Dispatch<any>;
}
export const UserContext = createContext<IUserContext>({user:null, setUser:()=>{null}});
export const UserProvider = UserContext.Provider;