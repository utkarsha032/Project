// script.js

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Highlight active section in nav
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav ul li a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Back to top button
const topButton = document.createElement('button');
topButton.innerText = '↑';
topButton.id = 'back-to-top';
document.body.appendChild(topButton);

topButton.style.position = 'fixed';
topButton.style.bottom = '20px';
topButton.style.right = '20px';
topButton.style.padding = '10px 15px';
topButton.style.backgroundColor = '#ff6347';
topButton.style.color = '#fff';
topButton.style.border = 'none';
topButton.style.borderRadius = '50%';
topButton.style.cursor = 'pointer';
topButton.style.display = 'none'; // Hide initially

window.onscroll = function() {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        topButton.style.display = 'block'; // Show button after scrolling
    } else {
        topButton.style.display = 'none'; // Hide button when at the top
    }
};

topButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});


// Handle form submission for the contact form
document.getElementById('contactForm').addEventListener('submit', async function (e) {
    e.preventDefault(); // Prevent the page from reloading on form submission

    // Get the form data
    const formData = new FormData(this);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    // Send data to backend
    const response = await fetch('http://localhost:3000/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) // Convert form data to JSON
    });

    const result = await response.text();
    alert(result); // Display response from the server
});

