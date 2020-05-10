import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./app/layout/App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "./app/store/configureStore";
import ScrollToTop from "./app/common/util/ScrollToTop";

/* 
HOT MODULE REPLACEMENT
-With the code below react does not refresh the page 
when changes are made in the project which it does 
automatically. This can make for a nicer development
experience 

*/
// import { loadEvents } from "./app/features/events/eventActions";

// 13.2 import the redux toastr component also import the css styles for the component
import ReduxToastr from "react-redux-toastr";
import "react-redux-toastr/lib/css/react-redux-toastr.min.css";
// Now we are going to install the type script files for react-redux-toastr
// it can be found on definetlytyped.org.
// or
//npm install --save @types/react-redux-toastr
// now we have to add redux-toastr component wrapping app

const store = configureStore();
// 12.25 our store can dispatch actions
// store.dispatch(loadEvents());
// 12.26 start of a page loading indicator. head to layout/loading component

const rootEl = document.getElementById("root");

let render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <ScrollToTop>
          <ReduxToastr
            position="bottom-right"
            transitionIn="fadeIn"
            transitionOut="fadeOut"
            // 13.3 To make use of the redux toaster in out app head to 
            // eventActions.js
          />
          <App />
        </ScrollToTop>
      </BrowserRouter>
    </Provider>,
    rootEl
  );
};

if (module.hot) {
  module.hot.accept("./app/layout/App.jsx", () => {
    setTimeout(render);
  });
}

// 15.26 we are going to wrap the render in a check for auth
store.firebaseAuthIsReady.then(() => {
  render();
})


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
