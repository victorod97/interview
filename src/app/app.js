import './app.css';
import { buildProjects } from "./project";

export function AppInit() {
    window.addEventListener('DOMContentLoaded', () => {
        buildProjects();
    });
}
