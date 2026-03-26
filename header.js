
// Age verification modal
const ageModal = document.getElementById("ageModal");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

window.addEventListener("load", () => {
  if (localStorage.getItem("ageConfirmed") != "true") {
    ageModal.style.display = "flex";
  } else {
    ageModal.style.display = "none";
  }
});

yesBtn.addEventListener("click", () => {
  localStorage.setItem("ageConfirmed", "true");
  ageModal.style.display = "none";
});

noBtn.addEventListener("click", () => {
  alert("Acceso denegado. Solo mayores de 18 años.");
  window.close();
  window.location.href = "https://www.google.pl";
});

// Hide the top warning when the page is scrolled
const header = document.querySelector("header");
if (header) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 10) {
      header.classList.add('scroll-active');
    } else {
      header.classList.remove('scroll-active');
    }
  });
}
