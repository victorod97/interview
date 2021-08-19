import { buildProjects } from "./project";

import './app.css';
// this is our custom component
import './profile-card'

/**
 * Main entry point that initialize the application, and build the projects
 */
export function AppInit() {
    // initialize the application and listen to the content being loaded
    window.addEventListener('DOMContentLoaded', () => {
        // define the projects available in the portfolio
        buildProjects();

        // NOTE: these components and listeners are only for demonstration purposes for the demo 
        // const buttonAll = document.querySelector('#ShowAll');
        // const buttonBasic = document.querySelector('#ShowBasic');
        // const buttonRestore = document.querySelector('#Restore');
        // const profile = document.querySelector('profile-card');
    
        // buttonAll.addEventListener('click', () => {
        //     profile.setAttribute('mode', 'all');
        // });
    
        // buttonBasic.addEventListener('click', () => {
        //     profile.setAttribute('mode', 'basic');
        // });

        // buttonRestore.addEventListener('click', () => {
        //     profile.removeAttribute('mode');
        // });
    });

}
