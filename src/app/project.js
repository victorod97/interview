import project from './project.html';
import { getProjects } from '../assets/projects.data';

export function buildProjects() {
    const parser = new DOMParser();
    const mainContent = document.querySelector('#main-content');
    const projects = getProjects();

    projects.forEach((proj) => {
        let domElement = parser.parseFromString(project, "text/html");
        let projElement = domElement.querySelector('.project');
        let imageProject = projElement.querySelector('img');
        let descProject = projElement.querySelector('.description-content');
        
        imageProject.src = proj.image;
        descProject.innerHTML = proj.description;

        mainContent.appendChild(projElement);
    });

}