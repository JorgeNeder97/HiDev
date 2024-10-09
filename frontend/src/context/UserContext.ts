import { createContext, useContext } from 'react';

export const UserContext = createContext(null);

export const useUserAuth = () => {
    const context = useContext(UserContext);
    if(!context) throw new Error("useUserAuth must be used within an UserProvider");
    return context;
}