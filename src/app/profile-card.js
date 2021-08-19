import profileCard from './profile-card.html'

class ProfileCard extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = profileCard;
        this.showMoreLink = this.shadowRoot.querySelector('#show-more');
        this.profileTools = this.shadowRoot.querySelector('#profile-tools');
        this.profileHobbiesList = this.shadowRoot.querySelector('#profile-hobbies ul');
    }
    static get observedAttributes() {
        return ['tools', 'hobbies', 'mode'];
    }

    get mode() {
        return this.getAttribute('mode');
    }

    set mode(val) {
        this.setAttribute('mode', val)
    }

    get tools() {
        const toolsStr = this.getAttribute('tools');

        return toolsStr.split(',');
    }

    set tools(val) {
        this.setAttribute('tools', val)
    }

    get hobbies() {
        const hobbiesStr = this.getAttribute('hobbies');

        return hobbiesStr.split(',');
    }

    set hobbies(val) {
        this.setAttribute('hobbies', val)
    }

    connectedCallback() {
        this.showMoreLink.addEventListener('click', this.showMore.bind(this));
        this.addTools();
        this.addHobbies();
    }

    disconnectedCallback() {
        this.showMoreLink.removeEventListener('click', this.showMore.bind(this));
    }

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

    addTools() {
        this.profileTools.innerHTML = '';

        this.tools.forEach((tool) => {
            const spanTool = document.createElement('span');

            spanTool.innerText = tool;
            this.profileTools.appendChild(spanTool);
        });
    }

    addHobbies() {
        this.profileHobbiesList.innerHTML = '';

        this.hobbies.forEach((hobbie) => {
            const liHobbie = document.createElement('li');

            liHobbie.innerText = hobbie;

            this.profileHobbiesList.appendChild(liHobbie);
        });
    }

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
