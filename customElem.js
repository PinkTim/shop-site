class CustomMenu extends HTMLElement {
    constructor() {
        super();

        // Create a shadow root
        this.attachShadow({ mode: 'open' });

        // Create a button and append it to the shadow root
        const button = document.getElementById('click');
        
        const icon = button.querySelector('.fa')

        // Create a div for the menu content and append it to the shadow root
        const menu = document.createElement('div');
        menu.innerHTML = `
        <div  class="" style="padding: 24px; background-color: #1d1c24;">
            <span class=" pl-12 font-medium ">Instagram: timapushkarenko</span>
        </div>`
            
        menu.style.display = 'none'; // Hide the menu initially
        menu.style.color = 'white';
        this.shadowRoot.appendChild(menu);

        // Add event listener to the button for toggling the menu content
        let isMenuVisible = false;
        button.addEventListener('click', () => {
            isMenuVisible = !isMenuVisible;
            if (isMenuVisible) {
                menu.style.display = 'block';
                icon.className = 'fa fa-chevron-down';
            } else {
                menu.style.display = 'none';
                icon.className = 'fa fa-chevron-right';
            }
        });
    }
}

customElements.define('custom-menu', CustomMenu);