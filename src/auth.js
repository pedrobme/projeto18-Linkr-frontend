import React, {createContext, useState} from "react";
const LoginContext = createContext();

function AuthProvider({children}){
    const [token, setToken] = useState("");
    return(
        <LoginContext.Provider value={{token, setToken}}>
            {children}
        </LoginContext.Provider>
    )
}
export {LoginContext, AuthProvider}