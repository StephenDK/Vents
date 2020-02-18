import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/layout/App.jsx';
import * as serviceWorker from './serviceWorker';


/* 
HOT MODULE REPLACEMENT
-With the code below react does not refresh the page 
when changes are made in the project which it does 
automatically. This can make for a nicer development
experience 


*/
const rootEl = document.getElementById('root');

let render = () => {
    ReactDOM.render(<App />, rootEl);
}

if (module.hot) {
    module.hot.accept('./app/layout/App.jsx', () => {
        setTimeout(render);
    })
}

render();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
