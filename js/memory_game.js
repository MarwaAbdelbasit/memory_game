var startGame = document.querySelector('.control-buttons span'),
    playerName = document.querySelector('.info-container .name span'),
    splashScreen = document.querySelector('.control-buttons'),
    duration = 1000,
    gameMainBlock = document.querySelector('.memory-game-blocks'),
    /* 3ml array mn awlad el  gameMainBlock*/
    blocks = Array.from(gameMainBlock.children),
    /* 3ml array el 3naser bta3tha hya el indeces bta3t array of blocks */
    //orderRange = Array.fromArray(blocks.length).keys())
    /* or */
    orderRange = [...Array(blocks.length).keys()],
    timeOutScreen = document.querySelector('.time-out'),
    finishGame = 0,
    successScreen = document.querySelector('.success'),
    restart = document.getElementById('reload');
    restart1 = document.getElementById('reload1');

restart.addEventListener('click', function() {
  window.location.reload(true);
});

restart1.addEventListener('click', function() {
  window.location.reload(true);
});

document.getElementById('music').play();

//console.log(orderRange);
shuffle(orderRange);
//console.log(orderRange);

startGame.onclick = function() {
  let name = prompt("what is your name?");

  if((name == null) || (name == "")) {
    //playerName.appendChild(document.createTextNode("unknown"));
    playerName.innerHTML = "unknown";
  } else {
    //playerName.appendChild(document.createTextNode(name));
    playerName.innerHTML = name;
  }
  splashScreen.remove();

  //set time of the game
  var seconds =  prompt("How fast are you?, Enter time in seconds: "),
      countDiv = document.getElementById('countdown'),
      secondPass,
      countDown = setInterval(function() {
        secondPass();
      }, duration);

  //secondPass function
  function secondPass() {
    var minutes = Math.floor(seconds / 60),
        remSeconds = seconds % 60;

    if(seconds < 10) {
      remSeconds = "0" + remSeconds;
    }

    countDiv.innerHTML =  minutes + ":" + remSeconds;

    if (finishGame == 10) {
      clearInterval(countDown);
      successScreen.style.visibility = 'visible';
      document.getElementById('clap').play();
    }

    if (seconds > 0) {
      seconds = seconds - 1;
    }
    else {
       clearInterval(countDown);
       timeOutScreen.style.visibility = 'visible';
       document.getElementById('whistle').play();
    }
  }


}


//add order css property to game blocks
blocks.forEach((block, index) => {
  block.style.order = orderRange[index];

  block.addEventListener('click', function() {
    flipBlock(block);
  });

  //console.log(block.classList.item(orderRange[index]));

});

//flip block function
function flipBlock(selectedBlock) {

  //add is flipped class
  selectedBlock.classList.add('is-flipped');

  //collect all flipped cards
  let allFlippedBlocks = blocks.filter(flippedBLock => flippedBLock.classList.contains('is-flipped'));

  if(allFlippedBlocks.length === 2) {

    //stop clicking function
    stopCLick();

    //check matched blocks function
    checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);

  }
}

function stopCLick() {
  gameMainBlock.classList.add('no-click');

  setTimeout(() => (

    //remove class no-click after the duration
    gameMainBlock.classList.remove('no-click')

  ), duration);
}

//check matched blocks function
function checkMatchedBlocks(firstBlock, secondBlock) {

  //count number of tries
  let triesElement = document.querySelector('.tries span');

  if(firstBlock.dataset.technology === secondBlock.dataset.technology) {
    /* dataset.technology = data-technology attribute in html */

    firstBlock.classList.remove('is-flipped');
    secondBlock.classList.remove('is-flipped');

    firstBlock.classList.add('has-match');
    secondBlock.classList.add('has-match');

    finishGame++;

    document.getElementById('success').play();
console.log(finishGame);

  } else {
    triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;

    setTimeout(() => {
      firstBlock.classList.remove('is-flipped');
      secondBlock.classList.remove('is-flipped');
    }, duration);

    document.getElementById('fail').play();
  }
}


//shuffle function
function shuffle(array) {
  let current = array.length,
  temp,
  random;

  while(current > 0) { //m3naha en al array lesa feha 3nasser

    //get random number
    random = Math.floor(Math.random() * current);

    //decrease length by one
    current--;

    //(1) save current element in temp
    temp = array[current];

    //(2) current element = random element
    array[current] = array[random];

    //(3) random element = get element from temp
    array[random] = temp;
  }
}
