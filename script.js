/* =========================================================
   PORTFÓLIO JOTA
========================================================= */


/* =========================================================
   MENU MOBILE
========================================================= */

const mobileMenu = document.getElementById("mobileMenu");
const navigation = document.querySelector(".navigation");

if (mobileMenu && navigation) {

    mobileMenu.addEventListener("click", () => {

        navigation.classList.toggle("mobile-active");

        mobileMenu.classList.toggle("active");

    });


    document.querySelectorAll(".nav-link").forEach(link => {

        link.addEventListener("click", () => {

            navigation.classList.remove("mobile-active");

            mobileMenu.classList.remove("active");

        });

    });

}


/* =========================================================
   HEADER AO SCROLL
========================================================= */

const header = document.getElementById("header");

function updateHeader() {

    if (!header) return;

    if (window.scrollY > 40) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

}

window.addEventListener("scroll", updateHeader);

updateHeader();


/* =========================================================
   ACTIVE NAV
========================================================= */

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

function updateActiveNav() {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 180;

        const sectionBottom =
            sectionTop + section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionBottom
        ) {

            currentSection = section.getAttribute("id");

        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            `#${currentSection}`
        ) {

            link.classList.add("active");

        }

    });

}

window.addEventListener("scroll", updateActiveNav);


/* =========================================================
   REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(".reveal");

const revealObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("active");

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },

        {
            threshold: 0.12
        }

    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =========================================================
   SMOOTH SCROLL
========================================================= */

document
    .querySelectorAll('a[href^="#"]')
    .forEach(link => {

        link.addEventListener("click", event => {

            const targetId =
                link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            const headerHeight =
                header
                    ? header.offsetHeight
                    : 0;

            const position =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight;

            window.scrollTo({

                top: position,

                behavior: "smooth"

            });

        });

    });


/* =========================================================
   BACK TO TOP
========================================================= */

const backToTop =
    document.getElementById("backToTop");


function updateBackToTop() {

    if (!backToTop) return;

    if (window.scrollY > 600) {

        backToTop.classList.add("visible");

    } else {

        backToTop.classList.remove("visible");

    }

}


window.addEventListener(
    "scroll",
    updateBackToTop
);


if (backToTop) {

    backToTop.addEventListener(
        "click",
        () => {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }
    );

}


/* =========================================================
   CUSTOM CURSOR
========================================================= */

const cursor =
    document.querySelector(".cursor");

const cursorRing =
    document.querySelector(".cursor-ring");


if (
    cursor &&
    cursorRing &&
    window.matchMedia("(pointer: fine)").matches
) {

    let mouseX = 0;
    let mouseY = 0;

    let ringX = 0;
    let ringY = 0;


    document.addEventListener(
        "mousemove",
        event => {

            mouseX = event.clientX;
            mouseY = event.clientY;

            cursor.style.left =
                `${mouseX}px`;

            cursor.style.top =
                `${mouseY}px`;

        }
    );


    function animateCursor() {

        ringX +=
            (mouseX - ringX) * 0.13;

        ringY +=
            (mouseY - ringY) * 0.13;


        cursorRing.style.left =
            `${ringX}px`;

        cursorRing.style.top =
            `${ringY}px`;


        requestAnimationFrame(
            animateCursor
        );

    }


    animateCursor();


    const interactiveElements =
        document.querySelectorAll(
            "a, button, .skill-card, .project-card"
        );


    interactiveElements.forEach(
        element => {

            element.addEventListener(
                "mouseenter",
                () => {

                    cursorRing.style.width =
                        "48px";

                    cursorRing.style.height =
                        "48px";

                    cursorRing.style.borderColor =
                        "#3e91ff";

                }
            );


            element.addEventListener(
                "mouseleave",
                () => {

                    cursorRing.style.width =
                        "32px";

                    cursorRing.style.height =
                        "32px";

                    cursorRing.style.borderColor =
                        "rgba(53, 139, 255, 0.6)";

                }
            );

        }
    );

}


/* =========================================================
   PARTICLES
========================================================= */

const canvas =
    document.getElementById("particles");

if (canvas) {

    const ctx =
        canvas.getContext("2d");


    let particles = [];

    let width =
        window.innerWidth;

    let height =
        window.innerHeight;


    function resizeCanvas() {

        width =
            window.innerWidth;

        height =
            window.innerHeight;


        canvas.width = width;
        canvas.height = height;

    }


    resizeCanvas();

    window.addEventListener(
        "resize",
        resizeCanvas
    );


    class Particle {

        constructor() {

            this.x =
                Math.random() * width;

            this.y =
                Math.random() * height;

            this.size =
                Math.random() * 1.5 + 0.3;

            this.speedX =
                (Math.random() - 0.5) * 0.18;

            this.speedY =
                (Math.random() - 0.5) * 0.18;

            this.opacity =
                Math.random() * 0.5 + 0.1;

        }


        update() {

            this.x += this.speedX;
            this.y += this.speedY;


            if (this.x < 0)
                this.x = width;

            if (this.x > width)
                this.x = 0;

            if (this.y < 0)
                this.y = height;

            if (this.y > height)
                this.y = 0;

        }


        draw() {

            ctx.beginPath();

            ctx.arc(
                this.x,
                this.y,
                this.size,
                0,
                Math.PI * 2
            );

            ctx.fillStyle =
                `rgba(63, 137, 255, ${this.opacity})`;

            ctx.fill();

        }

    }


    function createParticles() {

        particles = [];

        const amount =
            window.innerWidth < 700
                ? 45
                : 90;


        for (
            let i = 0;
            i < amount;
            i++
        ) {

            particles.push(
                new Particle()
            );

        }

    }


    createParticles();


    function connectParticles() {

        for (
            let a = 0;
            a < particles.length;
            a++
        ) {

            for (
                let b = a + 1;
                b < particles.length;
                b++
            ) {

                const dx =
                    particles[a].x -
                    particles[b].x;

                const dy =
                    particles[a].y -
                    particles[b].y;

                const distance =
                    Math.sqrt(
                        dx * dx +
                        dy * dy
                    );


                if (distance < 110) {

                    const opacity =
                        0.07 *
                        (1 - distance / 110);


                    ctx.beginPath();

                    ctx.moveTo(
                        particles[a].x,
                        particles[a].y
                    );

                    ctx.lineTo(
                        particles[b].x,
                        particles[b].y
                    );

                    ctx.strokeStyle =
                        `rgba(43, 116, 230, ${opacity})`;

                    ctx.lineWidth = 0.5;

                    ctx.stroke();

                }

            }

        }

    }


    function animateParticles() {

        ctx.clearRect(
            0,
            0,
            width,
            height
        );


        particles.forEach(
            particle => {

                particle.update();

                particle.draw();

            }
        );


        connectParticles();


        requestAnimationFrame(
            animateParticles
        );

    }


    animateParticles();

}


/* =========================================================
   TILT DOS CARDS
========================================================= */

const cards =
    document.querySelectorAll(
        ".skill-card, .project-card"
    );


cards.forEach(card => {

    card.addEventListener(
        "mousemove",
        event => {

            if (window.innerWidth < 900)
                return;


            const rect =
                card.getBoundingClientRect();


            const x =
                event.clientX -
                rect.left;


            const y =
                event.clientY -
                rect.top;


            const centerX =
                rect.width / 2;


            const centerY =
                rect.height / 2;


            const rotateX =
                (y - centerY) /
                30;


            const rotateY =
                (centerX - x) /
                30;


            card.style.transform =
                `perspective(900px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-5px)`;

        }
    );


    card.addEventListener(
        "mouseleave",
        () => {

            card.style.transform = "";

        }
    );

});


/* =========================================================
   CODE WINDOW PARALLAX
========================================================= */

const heroVisual =
    document.querySelector(".hero-visual");


if (heroVisual) {

    heroVisual.addEventListener(
        "mousemove",
        event => {

            if (window.innerWidth < 1000)
                return;


            const rect =
                heroVisual.getBoundingClientRect();


            const x =
                (event.clientX - rect.left) /
                rect.width -
                0.5;


            const y =
                (event.clientY - rect.top) /
                rect.height -
                0.5;


            const windowCode =
                heroVisual.querySelector(
                    ".code-window"
                );


            if (windowCode) {

                windowCode.style.transform =
                    `perspective(1200px)
                     rotateY(${x * -7}deg)
                     rotateX(${y * 5}deg)`;

            }

        }
    );


    heroVisual.addEventListener(
        "mouseleave",
        () => {

            const windowCode =
                heroVisual.querySelector(
                    ".code-window"
                );


            if (windowCode) {

                windowCode.style.transform =
                    `perspective(1200px)
                     rotateY(-4deg)
                     rotateX(2deg)`;

            }

        }
    );

}


/* =========================================================
   THEME BUTTON
========================================================= */

const themeButton =
    document.getElementById(
        "themeButton"
    );


if (themeButton) {

    themeButton.addEventListener(
        "click",
        () => {

            document.body.classList.toggle(
                "light-mode"
            );


            if (
                document.body.classList.contains(
                    "light-mode"
                )
            ) {

                themeButton.textContent =
                    "☀";

            } else {

                themeButton.textContent =
                    "☾";

            }

        }
    );

}


/* =========================================================
   CONSOLE
========================================================= */

console.log(
    "%c<Jota/>",
    "color:#3185ff;font-size:28px;font-weight:bold;"
);

console.log(
    "%cPortfólio carregado com sucesso 🚀",
    "color:#8fa5c3;font-size:13px;"
);