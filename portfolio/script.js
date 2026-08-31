function openResume() {
  document.getElementById("resumeImg").src = "image/resume.png";
  document.getElementById("resumeOverlay").classList.add("open");
}

function closeResume() {
  document.getElementById("resumeOverlay").classList.remove("open");
}

function sendEmail() {
  let parms = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    message: document.getElementById("message").value,
    subject: document.getElementById("subject").value,
  };

  emailjs
    .send("service_8llfpfh", "template_9i9623e", parms)
    .then(alert("Message sent successfully!"));
}

(function () {
  "use strict";

  // ===== THEME TOGGLE =====

  const html = document.documentElement;
  const toggle = document.querySelector(".theme-toggle");
  const saved = localStorage.getItem("theme");
  if (saved) {
    html.setAttribute("data-theme", saved);
    toggle.innerHTML =
      saved === "dark"
        ? '<img class="light" src="image/contra.png">'
        : '<img class="night" src="image/contra.png">';
  }

  toggle.addEventListener("click", () => {
    const cur = html.getAttribute("data-theme");
    const next = cur === "dark" ? "light" : "dark";
    html.setAttribute("data-theme", next);
    toggle.innerHTML =
      next === "dark"
        ? '<img class="light" src="image/contra.png">'
        : '<img class="night" src="image/contra.png">';
    localStorage.setItem("theme", next);
  });

  // ===== HAMBURGER =====
  const hamburger = document.querySelector(".nav-hamburger");
  const navLinks = document.querySelector(".nav-links");

  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });

  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => navLinks.classList.remove("open"));
  });

  // ===== PROGRESS BAR =====
  const bar = document.getElementById("progress-bar");

  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = pct + "%";
  });

  // ===== ACTIVE NAV LINK =====
  const sections = document.querySelectorAll("section[id], header[id]");
  const navAnchors = document.querySelectorAll(".nav-link");

  function updateActiveLink() {
    let current = "";
    const scrollY = window.scrollY + 120;

    sections.forEach((s) => {
      if (s.offsetTop <= scrollY && s.offsetTop + s.offsetHeight > scrollY) {
        current = s.getAttribute("id");
      }
    });

    navAnchors.forEach((a) => {
      a.classList.toggle("active", a.getAttribute("href") === "#" + current);
    });
  }

  window.addEventListener("scroll", updateActiveLink);
  window.addEventListener("load", updateActiveLink);

  // ===== NAVBAR SCROLL SHADOW =====
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 40);
  });

  // ===== SCROLL TO TOP =====
  const scrollBtn = document.getElementById("scroll-top");

  window.addEventListener("scroll", () => {
    scrollBtn.classList.toggle("visible", window.scrollY > 500);
  });

  scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // ===== TYPEWRITER =====
  const el = document.getElementById("typewriter");
  if (el) {
    const phrases = [
      "Desktop applications.",
      "Responsive Websites.",
      "Prototypes.",
      "UI/UX Designs.",
    ];
    let idx = 0,
      charIdx = 0,
      isDeleting = false;
    const speed = 70;

    function typeStep() {
      const full = phrases[idx];
      if (isDeleting) {
        el.textContent = full.substring(0, charIdx--);
        if (charIdx < 0) {
          isDeleting = false;
          idx = (idx + 1) % phrases.length;
          setTimeout(typeStep, 400);
          return;
        }
        setTimeout(typeStep, 30);
      } else {
        el.textContent = full.substring(0, ++charIdx);
        if (charIdx === full.length) {
          isDeleting = true;
          setTimeout(typeStep, 2000);
          return;
        }
        setTimeout(typeStep, speed);
      }
    }

    typeStep();
  }

  // ===== SCROLL ANIMATIONS =====
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );

  document.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));
})();

document.getElementById("toggleBtn").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});
