// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = 0;
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			//letterPoints += `Points for '${word[i]}': ${pointValue}\n`
      letterPoints += Number(pointValue);
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   //console.log("Let's play some scrabble! Enter a word:");
   let word = input.question("Let's play some scrabble! Enter a word: ");
   return word;
};


let newPointStructure = transform(oldPointStructure);


let simpleScorer = function (word) {
  word = word.toUpperCase();
  return word.length;;
};

let vowelBonusScorer = function (word) {
  const vowelBonusPointStructure = {
    A: 3,
    E: 3,
    I: 3,
    O: 3,
    U: 3
  };
  word = word.toUpperCase();
  let letterPoints = 0;
  for (let i = 0; i < word.length; i++) {
    if (vowelBonusPointStructure.hasOwnProperty(word[i])) {
      letterPoints = letterPoints + vowelBonusPointStructure[word[i]]
    } else {
      letterPoints = letterPoints + 1;
    }
  }
  return letterPoints;
}

let scrabbleScorer = function(word) {
  word = word.toLowerCase();
  let letterPoints = 0;
  for (let i = 0; i < word.length; i++) {
    if (newPointStructure.hasOwnProperty(word[i])) {
      letterPoints = letterPoints + Number(newPointStructure[word[i]]);
    }
  }
  return letterPoints;
};


const scoringAlgorithms = [
  {
    name: "Simple Score",
    description: "Each letter is worth 1 point.",
    scorerFunction: simpleScorer
  },
  {
    name: "Bonus Vowels",
    description: "Vowels are 3 pts, consonants are 1 pt.",
    scorerFunction: vowelBonusScorer
  },
  {
    name: "Scrabble",
    description: "The traditional scoring algorithm.",
    scorerFunction: scrabbleScorer
  }
];

function scorerPrompt() {
  let prompt = `
    0 - Simple: One point per character
    1 - Vowel Bonus: Vowels are worth 3 points
    2 - Scrabble: Uses scrabble point system
  `;
  console.log(prompt);
  let scorer = input.question("Enter 0, 1, or 2: 0: ")  
  return scoringAlgorithms[scorer];
  
}

function transform(oldPointStructure) {
  let temp = {};
  for (const pointValue in oldPointStructure) {
    oldPointStructure[pointValue].forEach(letter => {
      temp[letter.toLowerCase()] = Number(pointValue);
    });
  }
  return temp;
};

function runProgram() {
  let word = initialPrompt();
  let algo = scorerPrompt();
  let score = algo.scorerFunction(word);
  console.log(`Score for '${word}': ${score}`);
   
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
