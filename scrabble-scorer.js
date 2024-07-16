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
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
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

let newPointStructure;

let simpleScorer = function (word) {
  //let letters = ['A', 'B' ,'C' ,'D' ,'E', 'F', 'G' ,'H' ,'I' ,'J' ,'K' ,'L' ,'M' ,'N' ,'O' ,'P' ,'Q' ,'R' ,'S' ,'T' ,'U' ,'V','W','X','Y','Z'];
  //let num =  ['1', '2', '3', '4', '5', '6' , '7', '8', '9', '0'];
  word = word.toUpperCase();
  return word.length;;
};

let vowelBonusScorer = function (word) {
  //let vowels = ['A', 'E', 'I', 'O', 'U'];
  const vowelBonusPointStructure = {
    1: ['B' ,'C' ,'D', 'F', 'G' ,'H','J' ,'K' ,'L' ,'M' ,'N' ,'P' ,'Q' ,'R' ,'S' ,'T','V','W','X','Y','Z'],
    3: ['A', 'E', 'I', 'O', 'U'],
  };
  word = word.toUpperCase();
  let letterPoints = "";

  for (let i = 0; i < word.length; i++) {
	  for (const pointValue in vowelBonusPointStructure) {
 
      if (vowelBonusPointStructure[pointValue].includes(word[i])) {
       letterPoints += `Points for '${word[i]}': ${pointValue}\n`
      }
  
     }
  }

}

let scrabbleScorer;


const scoringAlgorithms = [
  {
    name: "Scrabble",
    description: "The traditional scoring algorithm.",
    scorerFunction: oldScrabbleScorer
  },
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

];

function scorerPrompt() {
  let prompt = `
    0 for simple scorer
    1 for vowel scorer
    2 for scrabble scorer
  `;
  console.log(prompt);
  let scorer = input.question("Choose a scorer function to use: ")  
  return scoringAlgorithms[scorer];
  
}

function transform() {};

function runProgram() {
   let word = initialPrompt();
   let algo = scorerPrompt();
   console.log(`Score for '${word}': ${algo}` );
   console.log(algo.scorerFunction(word));
   
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
