import React from "react";
import { Redirect } from "react-router-dom";
import { useIsLogin, usePermissionRouteSatisfied } from "./permission";

export const RouteGuard = ({ children, route }) => {
  const isLogin = useIsLogin();
  const hasPermission = usePermissionRouteSatisfied(route);

  if (!isLogin || !hasPermission) {
    return <Redirect to="/authcomponent" from={location.href} />;
  }

  return children;
};
