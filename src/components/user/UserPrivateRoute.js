import React from "react";
import { Navigate } from "react-router-dom";
import {useSelector} from 'react-redux'

function UserPrivateRoute({ children }) {

  const user = useSelector( (state) => state.user.user );
  return user ? <>{children}</> : <Navigate to="/user-login" />;
}

export default UserPrivateRoute;