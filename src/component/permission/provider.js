import React, { useEffect, useReducer } from "react";
import { permissionReducer } from "./reducer";
import { PermissionContext, PermissionDispatchContext } from "./context";

const initializePermissionContext = localStorage.getItem("permissioncontext") ?? {};

export const PermissionProvider = ({ children }) => {
  const [context, dispatch] = useReducer(permissionReducer, initializePermissionContext);

  useEffect(() => {
    // should add event listener to listen logout?
  }, []);

  return (
    <PermissionContext.Provider value={context}>
      <PermissionDispatchContext.Provider value={dispatch}>
        {children}
      </PermissionDispatchContext.Provider>
    </PermissionContext.Provider>
  );
};
