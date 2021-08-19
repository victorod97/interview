import project from './project.html';
import { getProjects } from '../assets/projects.data';

/**
 * Build the projects for the portfolio, using a template and parsed into the dom
 */
export function buildProjects() {
    // use the recent adopted DOM Parsed
    const parser = new DOMParser();
    // this is where we are going to place the projects
    const mainContent = document.querySelector('#main-content');
    // the metadata for the project
    const projects = getProjects();

    projects.forEach((proj) => {
        // parse the element
        let domElement = parser.parseFromString(project, "text/html");
        // see the current project template 
        let projElement = domElement.querySelector('.project');
        // get the image
        let imageProject = projElement.querySelector('img');
        // and the description container
        let descProject = projElement.querySelector('.description-content');
        
        // updated the data acordingly
        imageProject.src = proj.image;
        descProject.innerHTML = proj.description;

        // append the new project into the content
        mainContent.appendChild(projElement);
    });

}