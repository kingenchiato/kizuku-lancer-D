(() => {
  const header = document.getElementById("header");
  const onScroll = () => {
    if (header) header.classList.toggle("is-on", window.scrollY > 8);
  };

  const marks = document.querySelectorAll(".fade");
  const reveal = (el) => el.classList.add("is-on");

  marks.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92) reveal(el);
  });

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            reveal(entry.target);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -4% 0px" }
    );
    marks.forEach((el) => {
      if (!el.classList.contains("is-on")) io.observe(el);
    });
  } else {
    marks.forEach(reveal);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const slides = document.querySelectorAll(".hero__slides img");
  const dots = document.querySelectorAll(".hero__dot");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (slides.length > 1) {
    let index = 0;
    const show = (n) => {
      index = n;
      slides.forEach((img, i) => img.classList.toggle("is-on", i === n));
      dots.forEach((dot, i) => {
        dot.classList.toggle("is-on", i === n);
        dot.setAttribute("aria-selected", i === n ? "true" : "false");
      });
    };
    dots.forEach((dot, i) => dot.addEventListener("click", () => show(i)));
    if (!reduce) {
      window.setInterval(() => show((index + 1) % slides.length), 5200);
    }
  }

  document.querySelectorAll(".vslot__play").forEach((btn) => {
    btn.addEventListener("click", () => {
      const video = document.createElement("video");
      video.controls = true;
      video.playsInline = true;
      video.preload = "metadata";
      video.poster = btn.dataset.poster || "";
      video.src = btn.dataset.src;
      btn.replaceWith(video);
      const play = video.play();
      if (play && typeof play.catch === "function") play.catch(() => {});
    });
  });
})();
