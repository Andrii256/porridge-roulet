export const pickRandomItem = <T>(array: T[], previouslyPicked?: T): T => {
  const uniqValues = array.filter((item) => item !== previouslyPicked);

  if (!uniqValues.length) {
    return array?.[0];
  }

  return uniqValues[Math.floor(Math.random() * uniqValues.length)];
};
