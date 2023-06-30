import React, { Suspense } from "react";
import { HashRouter, Route } from "react-router-dom";
import Home from "./pages/home";
import CartPage from "./pages/cart";

import AuthPage from "./pages/auth";
import { ReduxPage } from "./pages/reduxpage";
import SetTime from "./pages/settime";
import TestPage from "./pages/testpage";
import StragePage from "./pages/design/strategies";
import CartDirectionPage from "./pages/design/direction";
import UploadPage from "./pages/design/context";
import ProxyPage from "./pages/design/proxy";
import EventPage from "./pages/design/event";
import PromisePage from "./pages/promise";
import { DragPage } from "./pages/drag";

const Test = React.lazy(() => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(import("./pages/test"));
    }, 100);
  });
});

const routes = [
  {
    path: "/home",
    component: AuthPage,
    visible: permissions => {
      return false;
    },
  },
];

export default function AppRouter() {
  return (
    <HashRouter>
      {/* <Route path="/" component={SetTime} /> */}
      {/* <ReduxPage /> */}
      {/* <TestPage /> */}
      {/* <StragePage /> */}
      {/* <CartDirectionPage /> */}
      {/* <UploadPage /> */}
      {/* <ProxyPage /> */}
      {/* <EventPage /> */}
      {/* <PromisePage /> */}
      <Route path="/cart" component={CartPage} />
      <Route path="/drag" component={DragPage} />

      <Suspense fallback={<div>loading</div>}>
        <Route path="/test" component={Test} />
      </Suspense>
    </HashRouter>
  );
}
