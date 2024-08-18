const counters = [
    { id: 'counter1', target: 250000 },
    { id: 'counter2', target: 800 },
    { id: 'counter3', target: 150 },
    { id: 'counter4', target: 15 }
];

let countersStarted = false;

function formatNumber(number) {
    if (number >= 1000) {
        return Math.floor(number / 1000) +  " k+";
    }
    return number;
}

function updateCounter(counter, current, target) {
    if (current < target) {
        if (target >= 1000) {
            current += Math.ceil(target - current);
            counter.textContent = formatNumber(current);
            return current;
        } else {
            current += Math.ceil((target - current) / 20);
            counter.textContent = formatNumber(current);
            return current;
        }        
    } else {
        counter.textContent = formatNumber(target);
        return target;
    }
}

function animateCounters() {
    let allCompleted = true;
    counters.forEach(counter => {
        const element = document.getElementById(counter.id);
        const current = parseInt(element.textContent.replace(/[^0-9]/g, ''));
        const newValue = updateCounter(element, current, counter.target);
        if (newValue < counter.target) {
            allCompleted = false;
        }
    });

    if (!allCompleted) {
        requestAnimationFrame(animateCounters);
    }
}

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function onScroll() {
    if (!countersStarted && isElementInViewport(document.querySelector('.counter-section'))) {
        countersStarted = true;
        animateCounters();
    }
}

window.addEventListener('scroll', onScroll);
onScroll();

document.querySelectorAll('.read-more').forEach(button => {
    button.addEventListener('click', function() {
        this.parentElement.classList.toggle('expanded');
        this.textContent = this.parentElement.classList.contains('expanded') ? 'Show less' : '...more';
    });
});

(function () {
    'use strict'
    const form = document.querySelector('#contactForm');
    form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        }
        form.classList.add('was-validated');
    }, false);
})();