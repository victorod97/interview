import profileCard from './profile-card.html'

/**
 * Custom web component for a Profile card, which will contain all your profile information
 * in once place, that can be configure and extended.
 */
class ProfileCard extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({mode: 'open'});
        // set the initial template
        this.shadowRoot.innerHTML = profileCard;
        // get the references of elements we are going to be using in the component
        this.showMoreLink = this.shadowRoot.querySelector('#show-more');
        this.profileTools = this.shadowRoot.querySelector('#profile-tools');
        this.profileHobbiesList = this.shadowRoot.querySelector('#profile-hobbies ul');
    }

    /**
     * Set the observed attributes, this will help us dinamically listen to the change of an attribute
     */
    static get observedAttributes() {
        return ['tools', 'hobbies', 'mode'];
    }

    /**
     * Get the actual mode of the profile card
     */
    get mode() {
        return this.getAttribute('mode');
    }

    /**
     * Set the mode of the profile card
     */
    set mode(val) {
        this.setAttribute('mode', val)
    }

    /**
     * Get the tools for the profile as an array
     */
    get tools() {
        const toolsStr = this.getAttribute('tools');

        return toolsStr.split(',');
    }
    
    /**
     * Set the tools for the profile
     */
    set tools(val) {
        this.setAttribute('tools', val)
    }

    /**
     * Get the hobbies for the profile as an array
     */
    get hobbies() {
        const hobbiesStr = this.getAttribute('hobbies');

        return hobbiesStr.split(',');
    }

    /**
     * Set the hobbies for the profile
     */
    set hobbies(val) {
        this.setAttribute('hobbies', val)
    }

    connectedCallback() {
        // bind the more button to show hidden data
        this.showMoreLink.addEventListener('click', this.showMore.bind(this));
        // once inserted in the dom get and set the tools an hobbies if exist
        this.addTools();
        this.addHobbies();
    }

    disconnectedCallback() {
        // remove any listener when deattach
        this.showMoreLink.removeEventListener('click', this.showMore.bind(this));
    }

    // react to attribute change
    attributeChangedCallback(attrName, oldVal, newVal) {
        switch (attrName) {
            case 'mode':
                this.changeMode(newVal);
                break;
            case 'tools':
                this.addTools();
                break;
            case 'hobbies':
                this.addHobbies();
                break;
            default:
                break;
        }   
    }

    /**
     * Change the mode base on what components should be visible and what not
     * @param {string} mode all or basic
     */
    changeMode(mode) {
        const moreContent = this.shadowRoot.querySelector('#more-content');
        const desc = this.shadowRoot.querySelector('#profile-desc');
        switch (mode) {
            case 'all':
                desc.removeAttribute('hidden');
                moreContent.removeAttribute('hidden');
                this.showMoreLink.innerText = '';
                break;
            case 'basic':
                desc.setAttribute('hidden', 'true');
                moreContent.setAttribute('hidden', 'true');
                this.showMoreLink.innerText = '';
                break;
            default:
                desc.removeAttribute('hidden');
                moreContent.setAttribute('hidden', 'true');
                this.showMoreLink.innerText = 'More...';      
                break;
        }
    }

    /**
     * Set the tools, iterate over the current tools and create the spans to be placed in the
     * profile tools section
     */
    addTools() {
        this.profileTools.innerHTML = '';

        this.tools.forEach((tool) => {
            const spanTool = document.createElement('span');

            spanTool.innerText = tool;
            this.profileTools.appendChild(spanTool);
        });
    }

    /**
     * Set the hobbies, iterate over the current hobbies and create the list elements to be placed in the
     * profile hobbies section
     */
    addHobbies() {
        this.profileHobbiesList.innerHTML = '';

        this.hobbies.forEach((hobbie) => {
            const liHobbie = document.createElement('li');

            liHobbie.innerText = hobbie;

            this.profileHobbiesList.appendChild(liHobbie);
        });
    }

    /**
     * Listener for show or hide the more content section.
     * Works as a toogle and it also updates the string state.
     */
    showMore() {
        const moreContent = this.shadowRoot.querySelector('#more-content');
        const hidden = moreContent.getAttribute('hidden');
        
        if (hidden === 'true') {
            this.showMoreLink.innerText = 'Less..';
            moreContent.removeAttribute('hidden');
        } else {
            this.showMoreLink.innerText = 'More...';      
            moreContent.setAttribute('hidden', 'true');
        }
    }
}


customElements.define('profile-card', ProfileCard);
