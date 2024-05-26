const arrows = document.getElementById('arrows'); 
const menu = document.querySelector('.menu'); 
const logo = document.querySelector('.logo'); 
const overlay = document.getElementById('overlay');

const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.navbar .menu-list .links');
const headings = document.querySelectorAll('.heading-container');

const isMobileView = () => window.matchMedia("(max-width: 715px)").matches;

// Toggle navigation menu
arrows.addEventListener('click', function () { 
    const openMenu = this.querySelector('.open-menu'); 
    const closeMenu = this.querySelector('.close-menu'); 

	if (openMenu.style.display === "none") { 
		openMenu.style.display = "inline-block"
		closeMenu.style.display = "none"
        menu.classList.remove('open');
        logo.style.display = "none"
        overlay.style.display = 'none';
	} 
	else { 
		closeMenu.style.display = "inline-block"
		openMenu.style.display = "none"
        menu.classList.add('open');
        logo.style.display = "inline-block"
        overlay.style.display = 'block';
	} 
});

// Underline current section in navbar/ nav menu
document.addEventListener('DOMContentLoaded', () => {
    function changeLinkState() {
        let currentActiveIndex = -1; 
        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight; 
            if (window.scrollY >= sectionTop - window.innerHeight * 0.5 && window.scrollY < sectionBottom) {
                currentActiveIndex = index;
                console.log(currentActiveIndex);
            }
        });

        if (currentActiveIndex >= 1) {
            navLinks.forEach((link, index) => {
                link.classList.toggle('active-link', index === currentActiveIndex - 1);
            });
        } else {
            navLinks.forEach(link => {
                link.classList.remove('active-link');
            });
        }
    }

    window.addEventListener('scroll', changeLinkState);
    changeLinkState(); 
});

// Toggle sticky section headings
document.addEventListener('DOMContentLoaded', () => {
    function toggleStickyHeading() {
        let currentActiveIndex = -1; 
        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop) {
                currentActiveIndex = index;
            }
        });

        if (currentActiveIndex >= 1) {
            headings.forEach((heading, index) => {
                heading.classList.toggle('sticky-heading', index === currentActiveIndex - 1);
            });
        }
    };

    window.addEventListener('scroll', toggleStickyHeading);
    toggleStickyHeading();
});

// Prevent default behaviour of port card to open repo link 
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.github-link').forEach(icon => {
        icon.addEventListener('click', (event) => {
            event.preventDefault(); 
            const url = event.currentTarget.getAttribute('data-url');
            window.open(url, '_blank'); 
        });
    });
});

// Scroll to form 
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.hire-me-btn').addEventListener('click', () => {
        document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
    });
});

// Close nav menu
document.addEventListener('DOMContentLoaded', () => {
    function closeMenu() {
        const openMenu = document.querySelector('.open-menu');
        const closeMenu = document.querySelector('.close-menu');
        
        openMenu.style.display = "inline-block";
        closeMenu.style.display = "none";
        menu.classList.remove('open');
        if (isMobileView()) {
            logo.style.display = "none";
        }
        overlay.style.display = 'none';
    }

    // On menu link click
    document.querySelectorAll('.menu-list-items .links').forEach(link => {
        link.addEventListener('click', () => {
            closeMenu();
        });
    });

    // On logo click
    document.querySelector('.logo a').addEventListener('click', () => {
        closeMenu();
    });

    // On background click
    overlay.addEventListener('click', () => {
        closeMenu();
    });
});

// Remove focus in mobile
document.addEventListener('click', function(event) {
    const selectors = ['.common-btn', '.social-link'];

    const clickedElementIsInteractive = selectors.some(selector => event.target.matches(selector));

    if (!clickedElementIsInteractive) {
        selectors.forEach(selector => {
            document.querySelectorAll(selector).forEach(element => {
                element.blur();
            });
        });
    }
});