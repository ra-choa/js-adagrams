export const drawLetters = () => {
  const letterPool = 
    {A:9, B:2, C:2, D:4, E:12, F:2, G:3, 
    H:2, I:9, J:1, K:1, L:4, M:2, N:6, O:8, P:2, 
    Q:1, R:6, S:4, T:6, U:4, V:2, W:2, X:1, Y:2, Z:1
  };

  const computeCumulativeWeights = (letterPool) => {
    const cumulativeWeights = {};
    let totalWeight = 0;

    for (const [letter, weight] of Object.entries(letterPool)) {
      totalWeight += weight;
      cumulativeWeights[letter] = totalWeight;
    }

    return {cumulativeWeights, totalWeight};
  };

  const letterPoolCopy = {...letterPool};
  const selectedLetters = [];
  
  while (selectedLetters.length < 10) {
  const {cumulativeWeights, totalWeight} = computeCumulativeWeights(letterPoolCopy);
  const randomValue = Math.floor(Math.random() * totalWeight + 1);
    
  for (const [letter, weight] of Object.entries(cumulativeWeights)) {
    if (randomValue <= weight) {
      selectedLetters.push(letter);
      
      letterPoolCopy[letter] = letterPoolCopy[letter] - 1;
      if (letterPoolCopy[letter] === 0) {
        delete letterPoolCopy[letter];
      }

        break;
      }
    }
  }
  return selectedLetters
};

export const usesAvailableLetters = (input, lettersInHand) => {
  input = input.toUpperCase();
  const letterBankCount = {}

  for (const letter of lettersInHand) {
    if (!(letter in letterBankCount)) {
      letterBankCount[letter] = 1;
    } else {
      letterBankCount[letter] += 1;
    }
  }

  for(const char of input) {
    if (letterBankCount[char] > 0) {
      letterBankCount[char] = letterBankCount[char] - 1;
    } else {
      return false;
    }
  }
  return true; 
};

export const scoreWord = (word) => {
  let totalScore = 0;
  if (word.length === 0) return totalScore;

  word = word.toUpperCase();
  const scoreChart = {
    A:1, E:1, I:1, O:1, U:1, L:1, N:1, R:1, S:1, T:1,
    D:2, G:2,
    B:3, C:3, M:3, P:3,
    F:4, H:4, V:4, W:4, Y:4,
    K:5,
    J:8, X:8,
    Q:10, Z:10
  };

  if (word.length >= 7) {
    totalScore += 8;
  }

  for (const char of word) {
    const letterPoints = scoreChart[char];
    totalScore += letterPoints;
  }
  return totalScore;
};

export const highestScoreFrom = (words) => {
  let topScore = 0;
  let tiedWords = [];

  for (let word of words) {
    const score = scoreWord(word);

    if (score > topScore) {
      topScore = score;
      tiedWords = [word];
    } else if (score === topScore) {
      tiedWords.push(word);
      }
    }

  let topWord = tiedWords[0];

    for (let word of tiedWords) {
      if (word.length === 10) {
        return {word, score: topScore};
      } else if (word.length < topWord.length) {
        topWord = word;
      }
    }
    return {'word': topWord, 'score': topScore};
  };
