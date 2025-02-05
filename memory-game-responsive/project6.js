document.addEventListener("DOMContentLoaded", () => {
  const gameContainer = document.querySelector(".game-container");
  const gameGrid = document.querySelector(".grid");
  const startButton = document.getElementById("start-button");
  const moveCounter = document.getElementById("move-counter");
  const timer = document.getElementById("timer");
  const restartButton = document.getElementById("restart-button");
  const fruitBorderContainer = document.createElement("div");

  fruitBorderContainer.classList.add("fruit-border");
  document.body.appendChild(fruitBorderContainer);

  const fruitOptions = ["🍎", "🍌", "🍇", "🍓", "🍒", "🍍", "🥝", "🍉"];
  const fruitSize = 40;
  const cards = [...fruitOptions, ...fruitOptions];
  let flippedCards = [];
  let matchedPairs = 0;
  let moves = 0;
  let gameTimer = null;
  let secondsElapsed = 0;

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function createFruit(x, y) {
    const fruitItem = document.createElement("div");
    fruitItem.classList.add("fruit-item");
    fruitItem.textContent = fruitOptions[Math.floor(Math.random() * fruitOptions.length)];
    fruitItem.style.position = "absolute";
    fruitItem.style.left = `${x}px`;
    fruitItem.style.top = `${y}px`;
    fruitItem.style.animation = `wiggleDance 3s infinite`;
    fruitBorderContainer.appendChild(fruitItem);
  }

  function generateFruitBorder() {
    fruitBorderContainer.innerHTML = "";
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const borderPadding = fruitSize * 1.5;

    for (let x = borderPadding; x < screenWidth - borderPadding; x += fruitSize) {
      createFruit(x, borderPadding - fruitSize);
      createFruit(x, screenHeight - borderPadding);
    }

    for (let y = borderPadding; y < screenHeight - borderPadding; y += fruitSize) {
      createFruit(borderPadding - fruitSize, y);
      createFruit(screenWidth - borderPadding, y);
    }
  }

  function adjustGameWindow() {
    gameContainer.style.width = `min(80vw, 500px)`;
    gameContainer.style.height = `min(85vh, 500px)`;
    gameContainer.style.position = "absolute";
gameContainer.style.top = "50%";
gameContainer.style.left = "50%";
gameContainer.style.transform = "translate(-50%, -50%)";
    gameContainer.style.left = "50%";
    gameContainer.style.transform = "translate(-50%, -50%)";
  }

  function initializeGame() {
    flippedCards = [];
    matchedPairs = 0;
    moves = 0;
    secondsElapsed = 0;
    moveCounter.textContent = moves;
    timer.textContent = "0:00";
    clearInterval(gameTimer);
    gameGrid.style.display = "grid";
gameGrid.style.width = "90%";
gameGrid.style.height = "85%";
gameGrid.style.gridTemplateColumns = "repeat(4, minmax(35px, 1fr))";
gameGrid.style.gap = "5px";
gameGrid.innerHTML = "";
    shuffle(cards).forEach(card => {
      const cardElement = document.createElement("div");
      cardElement.classList.add("card");
      cardElement.style.width = "50px";
      cardElement.style.height = "50px";
      cardElement.dataset.symbol = card;
      cardElement.innerHTML = `
        <div class="card-inner">
          <div class="card-front"></div>
          <div class="card-back">${card}</div>
        </div>
      `;
      cardElement.addEventListener("click", flipCard);
      gameGrid.appendChild(cardElement);
    });
    startTimer();
  }

  function flipCard() {
    if (flippedCards.length === 2) return;
    this.classList.add("flip");
    flippedCards.push(this);
    if (flippedCards.length === 2) {
      moves++;
      moveCounter.textContent = moves;
      checkForMatch();
    }
  }

  function checkForMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.symbol === card2.dataset.symbol) {
      card1.classList.add("match");
      card2.classList.add("match");
      matchedPairs++;
      flippedCards = [];
      if (matchedPairs === cards.length / 2) {
        clearInterval(gameTimer);
        alert(`🎉 You won in ${moves} moves!`);
      }
    } else {
      setTimeout(() => {
        card1.classList.remove("flip");
        card2.classList.remove("flip");
        flippedCards = [];
      }, 1000);
    }
  }

  function startTimer() {
    clearInterval(gameTimer);
    secondsElapsed = 0;
    gameTimer = setInterval(() => {
      secondsElapsed++;
      const minutes = Math.floor(secondsElapsed / 60);
      const seconds = secondsElapsed % 60;
      timer.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;
    }, 1000);
  }

  startButton.addEventListener("click", () => {
    gameContainer.style.display = "flex";
gameContainer.style.overflow = "hidden";
    gameContainer.style.flexDirection = "column";
    gameContainer.style.justifyContent = "center";
    gameContainer.style.alignItems = "center";
    initializeGame();
    adjustGameWindow();
    generateFruitBorder();
  });

  restartButton.addEventListener("click", initializeGame);
  window.addEventListener("resize", () => {
    adjustGameWindow();
    generateFruitBorder();
  });

  adjustGameWindow();
  generateFruitBorder();
});
