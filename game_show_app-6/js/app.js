const overlay = document.getElementById("overlay");
const qwerty = document.getElementById("qwerty");
const ul = document.querySelector("#phrase ul");
const startButton = document.querySelector(".btn__reset");
const h2 = document.querySelector(".title");

let missed = 0;

const phrases = [
  "The best things in life are free",
  "Walk on the wild side",
  "Eat and be merry",
  "Go out and find your success",
  "Welcome to the land of milk and honey",
  "Drive fast and leave a sexy corpse",
];

// return a random phrase from an array
const getRandomPhraseAsArray = (arr) => {
  const randomPhrase = arr[Math.floor(Math.random() * arr.length)];
  const characters = randomPhrase.split("");
  return characters;
};

const phraseArray = getRandomPhraseAsArray(phrases);

// adds the letters of a string to the display
const addPhraseToDisplay = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    const li = document.createElement("li");
    li.textContent = arr[i];
    ul.appendChild(li);

    if (li.textContent !== " ") {
      li.classList.add("letter");
    } else {
      li.classList.add("space");
    }
  }
};

addPhraseToDisplay(phraseArray);

// check if a letter is in the phrase
const checkLetter = (button) => {
  const li = document.querySelectorAll(".letter");
  let match = null;
  for (let i = 0; i < li.length; i++) {
    if (button === li[i].textContent.toLowerCase()) {
      li[i].classList.add("show");
      match = li[i];
    }
  }
  return match;
};

// check if the game has been won or lost
const checkWin = () => {
  const letter = document.querySelectorAll(".letter");
  const show = document.querySelectorAll(".show");
  // const buttons = document.querySelectorAll('button');
  // const img = document.querySelectorAll(".tries img");

  if (letter.length === show.length) {
    overlay.classList.add("win");
    h2.textContent = "won";
    overlay.style.display = "flex";
    startButton.textContent = "Play Again";
    overlay.classList.remove('lose');
    resetButton();
  }

  if (missed > 4) {
    overlay.classList.add("lose");
    h2.textContent = "lost";
    overlay.style.display = "flex";
    startButton.textContent = "Try Again";
    overlay.classList.remove('won');
    resetButton();
  }
};

// listen for the start game button to be pressed
startButton.addEventListener("click", () => {
  if (startButton) {
    overlay.style.display = "none";
  }
});

// listen for the onscreen keyboard to be clicked
qwerty.addEventListener("click", (e) => {
  const mainButton = e.target;
  const button = mainButton.textContent;

  let letterFound = "";

  if (mainButton.tagName === "BUTTON") {
    if (mainButton.className !== "chosen") {
      mainButton.classList.add("chosen");
      mainButton.disabled = true;
      letterFound = checkLetter(button);
      checkWin();

      if (!letterFound) {
        const img = document.querySelectorAll(".tries img")[0];
        img.src = "images/lostHeart.png";
        missed++;
        checkWin();
      }

      if (missed === 2) {
        const img = document.querySelectorAll(".tries img")[1];
        img.src = "images/lostHeart.png";
      } else if (missed === 3) {
        const img = document.querySelectorAll(".tries img")[2];
        img.src = "images/lostHeart.png";
      } else if (missed === 4) {
        const img = document.querySelectorAll(".tries img")[3];
        img.src = "images/lostHeart.png";
      } else if (missed === 5) {
        const img = document.querySelectorAll(".tries img")[4];
        img.src = "images/lostHeart.png";
      }
    }
  }
});

// resetting the game
function resetButton() {
  const buttons = document.querySelectorAll("button");
  const img = document.querySelectorAll(".tries img");

  ul.innerHTML = "";

  const phraseArray = getRandomPhraseAsArray(phrases);
  addPhraseToDisplay(phraseArray);

  for (let i = 0; i < buttons.length; i++) {
    buttons[i].disabled = false;
    buttons[i].classList.remove("chosen");
  }

  for (let i = 0; i < img.length; i++) {
    img[i].src = "images/liveHeart.png";
  }

  missed = 0;
}
