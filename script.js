document.addEventListener("DOMContentLoaded", () => {
  const slider = document.getElementById("slider");
  const pages = Array.from(document.querySelectorAll("#slider .page"));
  let slide = 0;
  const totalSlides = pages.length;

  slider.style.width = `${totalSlides * 100}vw`;

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
    slider.style.transform = `translateX(-${slide * 100}vw)`;
    const allDots = dots.querySelectorAll(".dot");
    allDots.forEach((d, idx) => d.classList.toggle("active", idx === slide));
  }
  function goTo(idx) { slide = (idx + totalSlides) % totalSlides; update(); }
  function next() { goTo(slide + 1); }
  function prev() { goTo(slide - 1); }

  slider.addEventListener("click", next);
  slider.addEventListener("keydown", (e) => {
    if (e.key === " " || e.key === "Enter" || e.key === "ArrowRight") { e.preventDefault(); next(); }
    if (e.key === "ArrowLeft") { e.preventDefault(); prev(); }
  });

  slider.focus();
  update();
});
