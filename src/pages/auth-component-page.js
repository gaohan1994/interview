import React, { useContext } from "react";
import { onePermissionSatisfiedComponentWrapper } from "../component/permission";
import { PermissionDispatchContext } from "../component/permission/context";

const DeleteButton = ({ color }) => <div style={{ color }}>Delete Button</div>;

const LoginButton = () => {
  const dispatch = useContext(PermissionDispatchContext);
  return (
    <div
      onClick={() =>
        dispatch({
          type: "Login",
          result: {
            name: "Harper.Gao",
            token: "token",
            routes: ["/protected"],
            roles: ["DeleteButton"],
          },
        })
      }
    >
      Login
    </div>
  );
};

const LogoutButton = () => {
  const dispatch = useContext(PermissionDispatchContext);
  return <div onClick={() => dispatch({ type: "Logout" })}>Logout</div>;
};

export const AuthComponentPage = () => {
  const ACDeleteButton = onePermissionSatisfiedComponentWrapper(["DeleteButton"])(DeleteButton);
  return (
    <div>
      <LoginButton />
      <LogoutButton />
      <DeleteButton color="orange" />
      <ACDeleteButton color="yellow" />
    </div>
  );
};

export const ProtectedPage = () => <div>ProtectedPage</div>;
