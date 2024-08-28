import React, { createContext, useContext, useEffect, useState } from 'react'

const context = createContext(null);
export const AuthProvider = ({children}) => {
const [isSecure, setSecure] = useState(false);

useEffect(()=>{
  const userData = localStorage.getItem('user');
  if (userData) {
    const { data, timestamp } = JSON.parse(userData);
    const currentTime = new Date().getTime();
    
    if (currentTime - timestamp < 3600000) {
      setSecure(true);
    } else {
      localStorage.removeItem('user');
    }
  }
},[]);

    const login = (data)=>{
      const timestamp = new Date().getTime();
      localStorage.setItem('user', JSON.stringify({data, timestamp}));
      localStorage.removeItem('reg');
      setSecure(true);
    }
   const register = (data)=>{
        localStorage.setItem('reg', JSON.stringify(data));
        setSecure(true);
   }
    const logOut = ()=>{
          localStorage.removeItem('user');
          setSecure(false);
    }

    return(
        <context.Provider value={{isSecure, login, logOut}}>
          { children }
        </context.Provider>
    )
}

export const useAuth = ()=> useContext(context);

