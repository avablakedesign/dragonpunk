import type { Dispatch } from "react";
import type { UserDetails } from "./index";
import { createContext } from "react";
interface IUserContext{
    user: UserDetails | null;
    setUser: Dispatch<any>;
}
export const UserContext = createContext<IUserContext>({user:null, setUser:()=>{null}});
export const UserProvider = UserContext.Provider;