import './app.css';
import './profile-card'
import { buildProjects } from "./project";

export function AppInit() {
    window.addEventListener('DOMContentLoaded', () => {
        buildProjects();
        const buttonAll = document.querySelector('#ShowAll');
        const buttonBasic = document.querySelector('#ShowBasic');
        const buttonRestore = document.querySelector('#Restore');
        const profile = document.querySelector('profile-card');
    
        buttonAll.addEventListener('click', () => {
            profile.setAttribute('mode', 'all');
        });
    
        buttonBasic.addEventListener('click', () => {
            profile.setAttribute('mode', 'basic');
        });

        buttonRestore.addEventListener('click', () => {
            profile.removeAttribute('mode');
        });
    });

}
