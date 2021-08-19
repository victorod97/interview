// import all the dependencies that are going to be global for the application
import app from './app/app.html';
import './style.css';
import '@mdi/font/css/materialdesignicons.css'
// import the main entry point to build the application
import { AppInit } from './app/app';

(function () {
    // set the initial application view html
    document.body.querySelector('#app-root').innerHTML = app;

    // and call the init
    AppInit();
})();
  
