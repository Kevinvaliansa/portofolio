document.addEventListener("DOMContentLoaded", function () {

    // ── Navbar scroll effect ──────────────────────────────
    const navbar = document.getElementById("navbar");
    window.addEventListener("scroll", () => {
        navbar.classList.toggle("scrolled", window.scrollY > 30);
    });

    // ── Active nav link on scroll ─────────────────────────
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link");
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(l => l.classList.remove("active"));
                const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
                if (active) active.classList.add("active");
            }
        });
    }, { threshold: 0.4 });
    sections.forEach(s => observer.observe(s));

    // ── Smooth scroll ─────────────────────────────────────
    document.querySelectorAll("a[href^='#']").forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) target.scrollIntoView({ behavior: "smooth" });
        });
    });

    // ── Reveal on scroll ─────────────────────────────────
    const revealEls = document.querySelectorAll(".reveal");
    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });
    revealEls.forEach(el => revealObserver.observe(el));

    // ── Modal ────────────────────────────────────────────
    const modal = document.getElementById("modal");
    const modalImg = document.getElementById("modalImg");
    const modalClose = document.getElementById("modalClose");

    function openModal(src, alt) {
        modalImg.src = src;
        modalImg.alt = alt || "";
        modal.classList.add("open");
        document.body.style.overflow = "hidden";
    }
    function closeModal() {
        modal.classList.remove("open");
        document.body.style.overflow = "";
        setTimeout(() => { modalImg.src = ""; }, 350);
    }

    // Profile pic click
    const profilePic = document.getElementById("profileImg");
    if (profilePic) {
        profilePic.addEventListener("click", () => openModal(profilePic.src, "Kevin Valiansa"));
    }

    // Certificate images & overlays
    document.querySelectorAll(".card-img-wrap").forEach(wrap => {
        wrap.addEventListener("click", function () {
            const img = this.querySelector("img");
            if (img) openModal(img.src, img.alt);
        });
    });

    // Close events
    modalClose.addEventListener("click", closeModal);
    modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });
    document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });

});
