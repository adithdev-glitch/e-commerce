import { createContext, useState } from 'react';
const UserDataContext = createContext();

export const UserDataProvider = ({ children }) => {
    
    const [user , setUser] = useState(false);
    const [admin, setAdmin] = useState(false);
    
    return (
            <UserDataContext.Provider value={{user, setUser, admin, setAdmin}}>
                {children}
            </UserDataContext.Provider>
    );
}

export default UserDataContext;