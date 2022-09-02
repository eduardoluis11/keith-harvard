/* DEBUG message */
console.log("The static folder is being detected.")

/* JS to show the cookie consent banner, and hide it if the user accepts the web app's cookies (source:
https://github.com/Godsont/Cookie-Consent-Banner/blob/master/main.js .) */
const cookieContainer = document.querySelector(".cookie-container");
const cookieButton = document.querySelector(".cookie-btn");

cookieButton.addEventListener("click", () => {
  cookieContainer.classList.remove("active");
  localStorage.setItem("cookieBannerDisplayed", "true");
});

setTimeout(() => {
  if (!localStorage.getItem("cookieBannerDisplayed")) {
    cookieContainer.classList.add("active");
  }
}, 2000);