import React, { useContext, useState } from "react";
import jwt_decode from "jwt-decode";
import { setAuthToken } from "../setJwtToken";

const UserContext = React.createContext(); 
export const UserProvider = ({ children }) => {
  const [myUser, setMyUser] = useState(null);

  const token = localStorage.getItem("token");
  if (token && !myUser) {
    try {
      const decoded = jwt_decode(token);
      setMyUser(decoded);
      setAuthToken(token);
    } catch(err) {
      console.log(err)
      localStorage.removeItem("token")
      setMyUser(null);
    }
  }


  return (
    <UserContext.Provider value={{ myUser , setMyUser }}>
      {children}
    </UserContext.Provider>
  ); 
};
// make sure use
export const useUserContext = () => {
  return useContext(UserContext);
};
