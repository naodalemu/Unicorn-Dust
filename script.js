// Function to toggle the pulltab's position
function togglePulltab() {
    const pulltab = document.querySelector('.pulltab');
    pulltab.classList.toggle('pulltab-visible');
}


// The code for making the long lines animate.

const elementsToObserve = document.querySelectorAll('.line');

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('line-full'); // Add a class or perform any action
            observer.unobserve(entry.target); // Stop observing once it's in view (optional)
        }
    });
});

elementsToObserve.forEach(element => {
    observer.observe(element);
});


// Animate on scroll library begins here

document.addEventListener('DOMContentLoaded', function () {
    AOS.init();


    // making each letter get wrapped by a span to manipulate them individually
    const p = document.querySelectorAll('.first-name');
    // p.forEach(element => {
    //     const text = element.innerText;
    //     let html = '';
    //     for (const letter of text) {
    //         if (letter != " ") {
    //             html += `<span>${letter}</span>`;
    //         } else {
    //             html += " ";
    //         }
    //     }
    //     element.innerHTML = html;
    // });

    // making each word get wrapped by a span and now this is what's being used becuase it was better
    p.forEach(element => {
        const text = element.innerText;
        let html = "";
        let currentWord = "";
        let i = 0;
        for (const letter of text) {
            if (text[(i+1)%(text.length+1)] == " " || i == text.length-1) {
                currentWord += letter;
                html += `<span>${currentWord}</span>`;
                currentWord = "";
            } else if (letter == " ") {
                html += " ";
            } else {
                currentWord += letter;
            }

            i += 1
        }
        element.innerHTML = html;
    })

});


// Prevents the page from scrolling down to middle when reloading, looks simple but it's still a workaround not a full solution
window.addEventListener('pagehide', function () {
    window.scrollTo(0, 0);
});

document.addEventListener('click', function (event) {
    const clickedElement = event.target;

    // Check if the clicked element has the class "the-cool-gif"
    if (clickedElement.classList.contains('the-cool-gif')) {
        // Hide the clicked GIF
        clickedElement.style.display = 'none';

        // Find the next sibling element with class "the-cool-gif-hidden"
        const nextVideo = clickedElement.nextElementSibling;

        // Check if such an element exists
        if (nextVideo && nextVideo.classList.contains('the-cool-gif-hidden')) {
            // Show the corresponding video by removing the "the-cool-gif-hidden" class
            nextVideo.classList.remove('the-cool-gif-hidden');

            // Play the Vimeo video using the Vimeo API
            const player = new Vimeo.Player(nextVideo.querySelector('iframe'));
            player.play();
        }
    }
});


// image replacing code for page loading speed optimisation
(() => {
    'use strict';

    // Function to change the background image to high quality
    const upgradeBackgroundImage = (element, basePath, highResFolder) => {
        const currentStyle = window.getComputedStyle(element).backgroundImage;
        // Extract the current filename from the style
        const filename = currentStyle.slice(currentStyle.lastIndexOf('/') + 1, -2);
        // Construct the path to the high-resolution image
        const highResSrc = `${basePath}${highResFolder}/${filename}`;

        const img = new Image();
        img.src = highResSrc;
        img.onload = () => {
            element.classList.add('high-res-bg');
            element.classList.add('loaded');
        };
    };

    // Target elements with specific class for async loading
    const elements = document.querySelectorAll('.asyncBackgroundImage');
    const basePath = 'images/'; // Base path to the images directory
    const highResFolder = 'high-res'; // Folder for high-resolution images

    elements.forEach(element => {
        upgradeBackgroundImage(element, basePath, highResFolder);
    });
})();


// when clicked let it load butter again
function reinitiateButter() {
    const windowWidth = window.innerWidth;
    if (windowWidth < 768) {
        butter.init({
            wrapperId: 'butter',
            wrapperDamper: 0.035,
            cancelOnTouch: true,
        });
    }
}


document.addEventListener("DOMContentLoaded", function() {
    const videos = document.querySelectorAll('video');

    videos.forEach(video => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    video.src = video.dataset.src;
                    video.load();
                    observer.disconnect();
                }
            });
        });
        observer.observe(video);
    });
});