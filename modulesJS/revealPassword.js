const passwordField = document.getElementById("passwordField");
const revealButton = document.getElementById("revealButton");

const revealPassword = function () {
  if (passwordField.type === "password") {
    passwordField.type = "text";
    revealButton.src = "/images/invisible.png";
  } else {
    passwordField.type = "password";
    revealButton.src = "/images/ojo.png";
  }
};
