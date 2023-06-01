import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useUserContext } from "../context/user_context";

const AdminRoute = ({ children, ...rest }) => {
  const { myUser } = useUserContext()
  return (
    <Route
      {...rest}
      render={() => {
        return myUser && myUser.role === "admin" ?  children : <Redirect to="/"></Redirect>;
      }}
    ></Route>
  );
};
export default AdminRoute;
