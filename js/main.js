const cards = [
  {
    name: 'animal-1',
    img: 'images/fries.png',
  },
  {
    name: 'animal-2',
    img: 'images/cheeseburger.png',
  },
  {
    name: 'animal-3',
    img: 'images/ice-cream.png',
  },
  {
    name: 'animal-4',
    img: 'images/pizza.png',
  },
  {
    name: 'animal-5',
    img: 'images/milkshake.png',
  },
  {
    name: 'animal-6',
    img: 'images/hotdog.png',
  },
  {
    name: 'animal-7',
    img: 'images/fries.png',
  },
  {
    name: 'animal-8',
    img: 'images/cheeseburger.png',
  },
  {
    name: 'animal-9',
    img: 'images/ice-cream.png',
  },
  {
    name: 'animal-10',
    img: 'images/pizza.png',
  },
  {
    name: 'animal-1',
    img: 'images/fries.png',
  },
  {
    name: 'animal-2',
    img: 'images/cheeseburger.png',
  },
  {
    name: 'animal-3',
    img: 'images/ice-cream.png',
  },
  {
    name: 'animal-4',
    img: 'images/pizza.png',
  },
  {
    name: 'animal-5',
    img: 'images/milkshake.png',
  },
  {
    name: 'animal-6',
    img: 'images/hotdog.png',
  },
  {
    name: 'animal-7',
    img: 'images/fries.png',
  },
  {
    name: 'animal-8',
    img: 'images/cheeseburger.png',
  },
  {
    name: 'animal-9',
    img: 'images/ice-cream.png',
  },
  {
    name: 'animal-10',
    img: 'images/pizza.png',
  },
];

let choices = [];
let idChoice = [];
let wrongChoices = 0;
let correctChoices = 0;

const shuffledCards = cards.sort(() => Math.random() - 0.5);

const board = document.getElementById('board-game');

shuffledCards.forEach((card, index) => {
  const img = document.createElement('img');
  img.src = card.img;
  img.setAttribute('data-card', card.name);
  img.setAttribute('data-id', index);
  img.addEventListener('click', function () {
    flip(this);
  });
  board.appendChild(img);
});

flip = (data) => {
  if (!data.classList.contains('flip')) {
    if (choices.length === 0) {
      choices[0] = data.getAttribute('data-card');
      idChoice[0] = +data.getAttribute('data-id');
      data.classList.add('flip');
    } else {
      if (idChoice[0] !== +data.getAttribute('data-id')) {
        data.classList.add('flip');
        choices[1] = data.getAttribute('data-card');
        idChoice[1] = +data.getAttribute('data-id');
        checkCards(data);
      } else {
        console.log('click same card');
      }
    }
    console.log(data.getAttribute('data-card'));
  }
};

// flip = (data) => {
//   if (!data.classList.contains('flip')) {
//     if (choices.length === 0) {
//       choices[0] = data.getAttribute('data-card');
//       idChoice[0] = +data.getAttribute('data-id');
//       data.classList.add('flip');
//     } else {
//       if (idChoice[0] !== +data.getAttribute('data-id')) {
//         data.classList.add('flip');
//         choices[1] = data.getAttribute('data-card');
//         idChoice[1] = +data.getAttribute('data-id');
//         checkCards(data);
//       } else {
//         console.log('click same card');
//       }
//     }
//     console.log(data.getAttribute('data-card'));
//   }
// };

checkCards = () => {
  if (choices[0] === choices[1]) {
    console.log('match');
    correctChoices += +1;
  } else {
    console.log('no match');
    wrongChoices += +1;
    idChoice.forEach((choice) => {
      const elementsWithDataCardValue = document.querySelector(
        `[data-id="${choice}"]`
      );
      elementsWithDataCardValue.classList.remove('flip');
    });
  }
  choices = [];
  idChoice = [];
};
