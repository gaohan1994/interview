import React, { useContext } from 'react';
import { PermissionContext } from '../pages/auth';
/**
 * @Author: centerm.gaohan
 * @Date: 2021-10-10 13:25:03
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2021-10-11 13:56:20
 *
 * 权限控制的核心并不是前端真正的去控制权限，而是如何将用户权限反馈到页面元素的显示隐藏上
 * 共2个粒度，功能权限、路由权限
 *
 * 1、第一版
 *
 * <Auth permitted={["auth1", "auth2"]} >
 *  <Button/>
 * </Auth>
 *
 * 但是如果新增了一个规则，就需要全部手动更改
 *
 * 2、第二版
 *
 */

/**
 * 如果某个规则通过则返回true
 */
function hasOneOfRulePermission(checkPermissions) {
  return (userPermissions) => {
    for (let i = 0; i < checkPermissions.length; i++) {
      if (
        userPermissions.some(
          (currentPermission) => currentPermission === checkPermissions[i]
        )
      ) {
        return true;
      }
    }

    return false;
  };
}

/**
 * 全部通过则返回true
 */
function allRulePermission(checkPermissions) {
  return (userPermissions) => {
    for (let i = 0; i < checkPermissions.length; i++) {
      if (userPermissions.indexOf(checkPermissions[i]) < 0) {
        return false;
      }
    }

    return true;
  };
}

/**
 * 部分满足就渲染组件
 *
 * @param {*} permissionKeys
 */
export function needOneOfRulePermissionHoc(...permissionKeys) {
  const { permissions } = useContext(PermissionContext);

  return (Comp) => {
    return hasOneOfRulePermission(permissionKeys)(permissions) ? (
      <Comp />
    ) : null;
  };
}

/**
 * 全部满足才渲染组件
 *
 * @param {*} permissionKeys
 * @return {*}
 */
export function needAllRulePermissionHoc(...permissionKeys) {
  const { permissions } = useContext(PermissionContext);

  return (Comp) => {
    return allRulePermission(permissionKeys)(permissions) && <Comp />;
  };
}

export function hasOneOfPermissionsRouteHoc(...permissionkeys) {
  const { permissions } = useContext(PermissionContext);
  return hasOneOfRulePermission(permissionkeys)(permissions);
}

export function hasAllOfPermissionsRouteHoc(...permissionKeys) {
  const { permissions } = useContext(PermissionContext);
  return allRulePermission(permissionKeys)(permissions);
}

export function filterPermissionRoutes(routes, permissions) {}

Promise.prototype.all3 = function (promises) {
  let result = [];
  let index = 0;

  return new Promise((resolveAll, rejectAll) => {
    for (let i = 0; i < promises.length; i++) {
      Promise.resolve(promises)
        .then((currentResult) => {
          result[i] = currentResult;
          index++;

          if (index === promises.length) {
            resolveAll(result);
          }
        })
        .catch((error) => {
          rejectAll(error);
        });
    }
  });
};
