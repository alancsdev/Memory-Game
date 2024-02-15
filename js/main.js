const cards = [
  {
    name: 'animal-1',
    img: './images/Coelho_Card.svg',
    audio: './audio/Rabbit.mp3',
  },
  {
    name: 'animal-2',
    img: 'images/Coruja_Card.svg',
    audio: './audio/Owl.mp3',
  },
  {
    name: 'animal-3',
    img: 'images/Gato_Card.svg',
    audio: './audio/Cat.mp3',
  },
  {
    name: 'animal-4',
    img: 'images/Leao_Card.svg',
    audio: './audio/Lion.mp3',
  },
  {
    name: 'animal-5',
    img: 'images/Lobo_Card.svg',
    audio: './audio/Wolf.mp3',
  },
  {
    name: 'animal-6',
    img: 'images/Mamaco_Card.svg',
    audio: './audio/Monkey.mp3',
  },
  {
    name: 'animal-7',
    img: 'images/Raposa_Card.svg',
    audio: './audio/Fox.mp3',
  },
  {
    name: 'animal-8',
    img: 'images/Rato_Card.svg',
    audio: './audio/Rat.mp3',
  },
  {
    name: 'animal-9',
    img: 'images/Tucano_Card.svg',
    audio: './audio/Toucan.mp3',
  },
  {
    name: 'animal-10',
    img: 'images/Capivara_Card.svg',
    audio: './audio/Capybara.mp3',
  },
  {
    name: 'animal-1',
    img: './images/Coelho_Card.svg',
    audio: './audio/Rabbit.mp3',
  },
  {
    name: 'animal-2',
    img: 'images/Coruja_Card.svg',
    audio: './audio/Owl.mp3',
  },
  {
    name: 'animal-3',
    img: 'images/Gato_Card.svg',
    audio: './audio/Cat.mp3',
  },
  {
    name: 'animal-4',
    img: 'images/Leao_Card.svg',
    audio: './audio/Lion.mp3',
  },
  {
    name: 'animal-5',
    img: 'images/Lobo_Card.svg',
    audio: './audio/Wolf.mp3',
  },
  {
    name: 'animal-6',
    img: 'images/Mamaco_Card.svg',
    audio: './audio/Monkey.mp3',
  },
  {
    name: 'animal-7',
    img: 'images/Raposa_Card.svg',
    audio: './audio/Fox.mp3',
  },
  {
    name: 'animal-8',
    img: 'images/Rato_Card.svg',
    audio: './audio/Rat.mp3',
  },
  {
    name: 'animal-9',
    img: 'images/Tucano_Card.svg',
    audio: './audio/Toucan.mp3',
  },
  {
    name: 'animal-10',
    img: 'images/Capivara_Card.svg',
    audio: './audio/Capybara.mp3',
  },
];

let choices = [];
let idChoice = [];
let audioChoice;
let wrongChoices = 0;
let correctChoices = 0;
let play = true;
//Reverse time 180 seconds
const seconds = 180;
const fronts = document.querySelectorAll('.card-front');
const backs = document.querySelectorAll('.card-back img');
const cardEl = document.querySelectorAll('.card');
const scoreEl = document.querySelector('.score span');
const failsEl = document.querySelector('.fails');
const resultEl = document.querySelector('.result');
const resetEl = document.querySelector('button');

startGame = () => {
  //Shuffle the cards
  const shuffledCards = cards.sort(() => Math.random() - 0.5);

  //Iterate the element to create the cards
  fronts.forEach((front, index) => {
    const img = document.createElement('img');
    img.src = shuffledCards[index].img;
    //Creating custom attributes to compare when flip
    cardEl[index].setAttribute('data-card', shuffledCards[index].name);
    cardEl[index].setAttribute('data-id', index);
    cardEl[index].setAttribute('data-audio', shuffledCards[index].audio);
    cardEl[index].addEventListener('click', function () {
      flip(this);
    });
    front.appendChild(img);
  });
};

startGame();

flip = (data) => {
  if (play) {
    const cardInner = data.querySelector('.card-inner');
    if (!cardInner.classList.contains('flip')) {
      if (choices.length === 0) {
        choices[0] = data.getAttribute('data-card');
        idChoice[0] = +data.getAttribute('data-id');
        audioChoice = data.getAttribute('data-audio');
        cardInner.classList.add('flip');
      } else {
        if (idChoice[0] !== +data.getAttribute('data-id')) {
          cardInner.classList.add('flip');
          choices[1] = data.getAttribute('data-card');
          idChoice[1] = +data.getAttribute('data-id');
          checkCards();
        }
      }
    }
  }
};

// Function to check if the cards match
checkCards = () => {
  play = false;
  if (choices[0] === choices[1]) {
    playAudio(audioChoice);
    correctChoices += 1;
    play = true;
    if (correctChoices === 1) {
      resultEl.textContent = 'You won!!';
      pauseTimer();
      play = false;
    }
  } else {
    wrongChoices += 1;
    setTimeout(() => {
      play = true;
      idChoice.forEach((choice) => {
        const elementsWithDataCardValue = document.querySelector(
          `[data-id="${choice}"]`
        );
        const cardInner =
          elementsWithDataCardValue.querySelector('.card-inner');
        cardInner.classList.remove('flip');
        if (play === true && wrongChoices > 2) {
          gameOver();
        }
      });
    }, 1000);
  }

  scoreEl.textContent = correctChoices;
  failsEl.textContent = wrongChoices;
  choices = [];
};

gameOver = () => {
  play = false;
  resultEl.textContent = 'You lost!!';
  pauseTimer();
};

let intervalId;

function startTimer() {
  // If there is an interval, cancel before start a new one
  if (intervalId) {
    clearInterval(intervalId);
  }

  let secondsLeft = seconds;

  intervalId = setInterval(() => {
    secondsLeft--;

    // Update the element
    document.getElementById('timer').textContent = formatTime(secondsLeft);

    // Check if time is over
    if (secondsLeft === 0) {
      // Cancel the interval
      clearInterval(intervalId);
      gameOver();
    }
  }, 1000);
}

startTimer();

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(
    remainingSeconds
  ).padStart(2, '0')}`;
}

function pauseTimer() {
  clearInterval(intervalId);
}

//Function to reset the game
resetEl.addEventListener('click', () => {
  choices = [];
  idChoice = [];
  const elements = document.querySelectorAll('.card-inner');
  const imgTag = document.querySelectorAll('.card-front img');
  //Removing classes and the element to recreate in new positions again
  elements.forEach((el) =>
    el.classList.contains('flip') ? el.classList.remove('flip') : null
  );
  imgTag.forEach((tag) => tag.remove());
  play = true;
  wrongChoices = 0;
  correctChoices = 0;
  scoreEl.textContent = correctChoices;
  failsEl.textContent = wrongChoices;
  resultEl.textContent = '';
  secondsLeft = seconds;
  setTimeout(() => {
    startGame();
    startTimer();
  }, 1000);
});

// Play audio
function playAudio(audio) {
  const audioUrl = audio;
  if (audioUrl) {
    const audio = new Audio(audioUrl);
    audio.play();
  }
}
