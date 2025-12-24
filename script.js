document.addEventListener("DOMContentLoaded", () => {
  const slider = document.getElementById("slider");
  const pages = Array.from(document.querySelectorAll("#slider .page"));
  let slide = 0;
  const totalSlides = pages.length;
  let touchStartX = 0;
  let isAnimating = false;

  slider.style.width = `${totalSlides * 100}%`;

  const dots = document.createElement("div");
  dots.className = "dots";
  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement("button");
    dot.className = `dot${i === 0 ? " active" : ""}`;
    dot.setAttribute("aria-label", `Go to slide ${i + 1}`);
    dot.addEventListener("click", (e) => { e.stopPropagation(); goTo(i); });
    dots.appendChild(dot);
  }
  document.body.appendChild(dots);

  function update() {
    slider.style.transform = `translateX(${-slide * 100}%)`;
    const allDots = dots.querySelectorAll(".dot");
    allDots.forEach((d, idx) => d.classList.toggle("active", idx === slide));
    isAnimating = false;
  }
  function goTo(idx) { 
    if (isAnimating) return;
    isAnimating = true;
    slide = Math.max(0, Math.min(idx, totalSlides - 1));
    update(); 
  }
  function next() { goTo(slide + 1); }
  function prev() { goTo(slide - 1); }

  slider.addEventListener("click", next);
  slider.addEventListener("keydown", (e) => {
    if (e.key === " " || e.key === "Enter" || e.key === "ArrowRight") { e.preventDefault(); next(); }
    if (e.key === "ArrowLeft") { e.preventDefault(); prev(); }
  });

  slider.addEventListener("touchstart", (e) => { 
    if (!isAnimating) touchStartX = e.touches[0].clientX;
  }, false);
  
  slider.addEventListener("touchend", (e) => {
    if (isAnimating) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) next();
      else prev();
    }
  }, false);

  slider.focus();
  update();
});
