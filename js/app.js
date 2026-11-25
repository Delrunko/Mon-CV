(function () {
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    const navigationLinks = document.querySelectorAll(".navbar a");

    navigationLinks.forEach(function (link) {
        if (link.getAttribute("href") === currentPage) {
            link.setAttribute("aria-current", "page");
        }
    });

    const progress = document.querySelector(".scroll-progress");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!window.gsap) {
        return;
    }

    const gsap = window.gsap;
    if (window.ScrollTrigger) {
        gsap.registerPlugin(window.ScrollTrigger);
        gsap.to(progress, {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
                trigger: document.documentElement,
                start: "top top",
                end: "bottom bottom",
                scrub: 0.25
            }
        });
    }

    if (reducedMotion) {
        return;
    }

    const heroContent = document.querySelector(".home .content");
    const heroImage = document.querySelector(".home .image");
    if (heroContent) {
        gsap.fromTo(
            heroContent.children,
            { opacity: 0, y: 24 },
            { opacity: 1, y: 0, duration: 0.85, stagger: 0.11, ease: "power3.out", delay: 0.15 }
        );
    }
    if (heroImage) {
        gsap.fromTo(heroImage, { opacity: 0, y: 28, scale: 0.97 }, {
            opacity: 1, y: 0, scale: 1, duration: 1.1, ease: "power3.out", delay: 0.35
        });
    }

    const revealTargets = document.querySelectorAll(
        ".heading, .about .info-container, .about .count-container .box, .skills .box, .education .box, .portfolio .box, .blogs .box, .contact .info-container, .contact form"
    );
    revealTargets.forEach(function (element) {
        element.classList.add("reveal");
    });

    if (window.ScrollTrigger) {
        gsap.utils.toArray(".reveal").forEach(function (element) {
            gsap.fromTo(element, { opacity: 0, y: 28 }, {
                opacity: 1,
                y: 0,
                duration: 0.7,
                ease: "power2.out",
                scrollTrigger: { trigger: element, start: "top 88%", once: true }
            });
        });
    } else {
        gsap.to(".reveal", { opacity: 1, y: 0, duration: 0.7, stagger: 0.08 });
    }

    const glow = document.querySelector(".cursor-glow");
    if (glow && window.matchMedia("(pointer: fine)").matches) {
        const moveX = gsap.quickTo(glow, "x", { duration: 0.65, ease: "power3" });
        const moveY = gsap.quickTo(glow, "y", { duration: 0.65, ease: "power3" });
        window.addEventListener("pointermove", function (event) {
            moveX(event.clientX);
            moveY(event.clientY);
        }, { passive: true });
    }
}());
