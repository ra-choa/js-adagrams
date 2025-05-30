// import { of } from "core-js/core/array";

export const drawLetters = () => {
  const letterPool = 
    {A:9, B:2, C:2, D:4, E:12, F:2, G:3, 
    H:2, I:9, J:1, K:1, L:4, M:2, N:6, O:8, P:2, 
    Q:1, R:6, S:4, T:6, U:4, V:2, W:2, X:1, Y:2, Z:1
  };

  // *** visual aid ONLY: this will update with function below if letterPool changes:
  // cumulativeWeights = {A:9, B:11, C:13, D:17, E:29, F:31, G:34,
  //   H:36, I:45, J:46, K:47, L:51, M:53, N:59, O:67, P:69,
  //   Q:70, R:76, S:80, T:86, U:90, V:92, W:94, X:95, Y:97, Z:98}

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
      
      // remove a count from the letter pool letter
      letterPoolCopy[letter] = letterPoolCopy[letter] - 1;
      // if (letter count ==0)
      // delete letterPoolCopy[letter] as whole
      if (letterPoolCopy[letter] === 0) {
        delete letterPool[letter];
      }
      
        break;
      }
    }
  }
  return selectedLetters
};

export const usesAvailableLetters = (input, lettersInHand) => {
  // Implement this method for wave 2
};

export const scoreWord = (word) => {
  // Implement this method for wave 3
};

export const highestScoreFrom = (words) => {
  // Implement this method for wave 4
};
