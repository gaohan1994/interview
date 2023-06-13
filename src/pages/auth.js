import React, { createContext } from 'react';
import './page.less';
import {
  needOneOfRulePermissionHoc,
  useAllRulePermissionHoc,
} from '../component/auth';

const interfacePermissionResult = {
  permissions: ['GetBook', 'NewBook'],
};
export const PermissionContext = createContext(interfacePermissionResult);

function MyButton() {
  return <button>GetBook</button>;
}

export default function AuthPage() {
  /**
   * 经过校验的Button
   * @param PermissionButton
   */
  const PermissionButton = needOneOfRulePermissionHoc('GetBook')(MyButton);

  return (
    <div>
      <PermissionContext.Provider value={interfacePermissionResult}>
        <span className="authtitle">AuthPage</span>
        <div className="rembox">rembox</div>

        {/* <PermissionButton /> */}
        {PermissionButton}
      </PermissionContext.Provider>
    </div>
  );
}
