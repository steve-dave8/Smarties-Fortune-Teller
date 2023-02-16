var prevColour = "";
var isAnimating = false;
var smartiesBox = document.getElementById("smarties-box");
var smartie = document.querySelector(".smartie");
var smartiesFortune = document.getElementById("smarties-fortune");
var fortunes = {
    red: "yes",
    blue: "no",
    green: "try again later",
    orange: "always",
    purple: "never",
    pink: "you tell me",
    yellow: "maybe",
    brown: "outlook is positive"
};
var colours = Object.keys(fortunes);
var shuffle = function (array) {
    var _a;
    if (array.length < 2)
        return;
    var currentIndex = array.length;
    var randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        _a = [array[randomIndex], array[currentIndex]], array[currentIndex] = _a[0], array[randomIndex] = _a[1];
    }
};
/**
 * Shuffles an array a various number of times. If the maximum number of shuffles equals the minimum number of shuffles entered then
 * the array will be shuffled that exact number of times. Otherwise, the array will be shuffled a random number of times between
 * the maximum and minimum. The minimum defaults to 0.
 */
var variShuffle = function (array, maxShuffles, minShuffles) {
    if (minShuffles === void 0) { minShuffles = 0; }
    var error = "";
    if (maxShuffles < 2)
        error += "The maximum number of shuffles cannot be less than two. ";
    if (minShuffles < 0)
        error += "The minimum number of shuffles cannot be less than zero. ";
    if (maxShuffles < minShuffles)
        error += "The maximum number of shuffles cannot be less than the minimum number of shuffles. ";
    if (error) {
        error = "Error: unable to shuffle. " + error;
        console.log(error);
        return;
    }
    var shuffles;
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
var getSmartiesFortune = function () {
    if (isAnimating)
        return;
    isAnimating = true;
    smartie === null || smartie === void 0 ? void 0 : smartie.classList.remove("reveal", "bounce", "init-position");
    smartiesFortune === null || smartiesFortune === void 0 ? void 0 : smartiesFortune.classList.remove("reveal");
    if (prevColour) {
        smartie === null || smartie === void 0 ? void 0 : smartie.classList.remove("smartie--".concat(prevColour));
    }
    var delay = 500;
    var shakeDuration = 4000;
    var bounceDuration = 2250;
    smartiesBox === null || smartiesBox === void 0 ? void 0 : smartiesBox.classList.remove("pointer");
    setTimeout(function () {
        smartiesBox === null || smartiesBox === void 0 ? void 0 : smartiesBox.classList.add("shake");
    }, delay);
    setTimeout(function () {
        smartiesBox === null || smartiesBox === void 0 ? void 0 : smartiesBox.classList.remove("shake");
    }, delay + shakeDuration);
    var options = colours.slice();
    variShuffle(options, 5, 1);
    var index = Math.floor(Math.random() * options.length);
    var colour = options[index];
    var fortune = fortunes["".concat(colour)];
    prevColour = colour;
    setTimeout(function () {
        smartie === null || smartie === void 0 ? void 0 : smartie.classList.add("init-position", "smartie--".concat(colour), "reveal", "bounce");
    }, delay + 0.54 * shakeDuration); // point of last box shake at 54%
    setTimeout(function () {
        if (smartiesFortune)
            smartiesFortune.innerText = fortune.charAt(0).toUpperCase() + fortune.slice(1);
        smartiesFortune === null || smartiesFortune === void 0 ? void 0 : smartiesFortune.classList.add("reveal");
    }, delay + 0.54 * shakeDuration + bounceDuration);
    setTimeout(function () {
        smartiesBox === null || smartiesBox === void 0 ? void 0 : smartiesBox.classList.add("pointer");
        isAnimating = false;
    }, delay + 0.54 * shakeDuration + bounceDuration + 300); // 300ms transition delay
};
smartiesBox === null || smartiesBox === void 0 ? void 0 : smartiesBox.addEventListener("click", getSmartiesFortune);
