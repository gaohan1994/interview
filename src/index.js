import React, { Suspense } from "react";
import ReactDom from "react-dom";
import pic from "../hms.png";
import "./index.less";
import { Provider } from "react-redux";
import { reduxStore } from "./store";
import AppRouter from "./router";
import { PermissionProvider } from "./component/permission";

function App() {
  return (
    <Provider store={reduxStore}>
      <PermissionProvider>
        <AppRouter />
      </PermissionProvider>
      {/* <Suspense fallback={<div>loading</div>}>
        <Comp1 />
      </Suspense> */}
      {/* <img src={pic} /> */}
    </Provider>
  );
}

ReactDom.render(<App />, document.getElementById("root"));
