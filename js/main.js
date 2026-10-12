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
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (slides.length > 1 && !reduce) {
    let index = 0;
    window.setInterval(() => {
      slides[index].classList.remove("is-on");
      index = (index + 1) % slides.length;
      slides[index].classList.add("is-on");
    }, 5200);
  }
})();
