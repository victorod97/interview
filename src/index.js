import app from './app/app.html';
import { AppInit } from './app/app';
import './style.css';


(function () {
    const appRoot = document.body.querySelector('#app-root');
    appRoot.innerHTML = app;

    AppInit();
})();
  
