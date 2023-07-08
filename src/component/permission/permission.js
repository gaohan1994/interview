import React, { useContext } from "react";
import { PermissionContext } from "./context";

export function useIsLogin() {
  const context = useContext(PermissionContext);
  return !!context.token;
}

export function usePermissionRouteSatisfied(route) {
  const context = useContext(PermissionContext);
  if (!context.routes) return false;
  return context.routes.includes(route);
}

/**
 * 最少满足一种权限
 *
 * @author Harper.Gao
 * @param {*} [roles=[]]
 */
export function useOnePermissionSatisfied(permissionRoles = []) {
  const context = useContext(PermissionContext);

  let roles = context.roles ?? [];
  for (let index = 0; index < roles.length; index++) {
    if (permissionRoles.includes(roles[index])) {
      return true;
    }
  }

  return false;
}

export const onePermissionSatisfiedComponentWrapper =
  (permissionRoles = []) =>
  ComponentConstructor =>
    useOnePermissionSatisfied(permissionRoles)
      ? (...props) => <ComponentConstructor {...props} />
      : () => null;

/**
 * 满足全部权限
 * @param {*} roles
 */
export function useFullPermissionSatisfied(permissionRoles = []) {
  const context = useContext(PermissionContext);

  let roles = context.roles ?? [];
  for (let index = 0; index < roles.length; index++) {
    if (!permissionRoles.includes(roles[index])) {
      return false;
    }
  }

  return true;
}

export function fullPermissionSatisfiedComponentWrapper(permissionRoles = []) {
  return function wrapperedComponent(ComponentConstructor, BackComponent) {
    return useFullPermissionSatisfied(permissionRoles) ? (
      <ComponentConstructor />
    ) : BackComponent !== null ? (
      <BackComponent />
    ) : null;
  };
}
