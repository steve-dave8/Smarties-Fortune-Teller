let prevColour: string = "";
let isAnimating: boolean = false;

const smartiesBox: HTMLElement | null = document.getElementById("smarties-box");
const smartie: HTMLElement | null = document.querySelector(".smartie");
const smartiesFortune: HTMLElement | null = document.getElementById("smarties-fortune");

const fortunes = {
  red: "yes",
  blue: "no",
  green: "try again later",
  orange: "always",
  purple: "never",
  pink: "you tell me",
  yellow: "maybe",
  brown: "outlook is positive"
};

const colours: Array<string> = Object.keys(fortunes);

const shuffle = (array: Array<any>): void => {
  if (array.length < 2) return;
  let currentIndex: number = array.length;
  let randomIndex: number;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
};

/**
 * Shuffles an array a various number of times. If the maximum number of shuffles equals the minimum number of shuffles entered then 
 * the array will be shuffled that exact number of times. Otherwise, the array will be shuffled a random number of times between 
 * the maximum and minimum. The minimum defaults to 0.
 */
const variShuffle = (array: Array<any>, maxShuffles: number, minShuffles: number = 0): void => {
  let error: string = "";
  if (maxShuffles < 2) error += "The maximum number of shuffles cannot be less than two. ";
  if (minShuffles < 0) error += "The minimum number of shuffles cannot be less than zero. ";
  if (maxShuffles < minShuffles) error += "The maximum number of shuffles cannot be less than the minimum number of shuffles. ";

  if (error) {
    error = "Error: unable to shuffle. " + error;
    console.log(error);
    return;
  }

  let shuffles: number;
  if (maxShuffles === minShuffles) {
    shuffles = maxShuffles;
  } 
  else {
    shuffles = Math.round(Math.random() * (maxShuffles - minShuffles)) + minShuffles;
  }

  for (shuffles; shuffles > 0; shuffles--) {
    shuffle(array);
  }
};

const getSmartiesFortune = () => {
  if (isAnimating) return;

  isAnimating = true;

  smartie?.classList.remove("reveal", "bounce", "init-position");
  smartiesFortune?.classList.remove("reveal");
  if (prevColour) {
    smartie?.classList.remove(`smartie--${prevColour}`);
  }

  const delay: number = 500;
  const shakeDuration: number = 4000;
  const bounceDuration: number = 2250;

  smartiesBox?.classList.remove("pointer");
  setTimeout(() => {
    smartiesBox?.classList.add("shake");
  }, delay);
  setTimeout(() => {
    smartiesBox?.classList.remove("shake");
  }, delay + shakeDuration);

  let options = colours.slice();
  variShuffle(options, 5, 1);
  const index = Math.floor(Math.random() * options.length);
  const colour = options[index];
  const fortune: string = fortunes[`${colour}`];
  prevColour = colour;

  setTimeout(() => {
    smartie?.classList.add("init-position", `smartie--${colour}`, "reveal", "bounce");
  }, delay + 0.54*shakeDuration); // point of last box shake at 54%

  setTimeout(() => {
    if (smartiesFortune) smartiesFortune.innerText = fortune.charAt(0).toUpperCase() + fortune.slice(1);
    smartiesFortune?.classList.add("reveal");
  }, delay + 0.54*shakeDuration + bounceDuration);

  setTimeout(() => {
    smartiesBox?.classList.add("pointer");
    isAnimating = false;
  }, delay + 0.54*shakeDuration + bounceDuration + 300); // 300ms transition delay
};

smartiesBox?.addEventListener("click", getSmartiesFortune);