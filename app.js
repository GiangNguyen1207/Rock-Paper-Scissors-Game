/**  
Orientation - JS assignment 2
Solution by: [Giang Nguyen]
*/

let playerPoints, computerPoints, winner, isGamePlaying

const result = document.querySelector(".title")

init()

const playBtn = document.querySelector(".play-button")
playBtn.addEventListener("click", () => {

  const intro = document.querySelector(".intro")
  const game = document.querySelector(".game")

  intro.classList.add("hide")
  game.classList.remove("hide")
  game.classList.add("display")
})

const restart = document.querySelector(".restart")
restart.addEventListener("click", init)

const options = document.querySelectorAll(".options button")
for (const option of options) {
  option.addEventListener("click", () => {
    if(isGamePlaying) {
      const computerOptions = ["rock", "paper", "scissors"]
  
      // 1. Random Computer's Choice
      const number = Math.floor(Math.random() * 3)
  
      // 2. Display images
      const playerImage = document.querySelector(".player-hand")
      const computerImage = document.querySelector(".computer-hand")
  
      document.querySelector(".player-hand").style.display = "block"
      document.querySelector(".computer-hand").style.display = "block"
  
      playerImage.src = `./images/${option.textContent}.png`
      computerImage.src = `./images/${computerOptions[number]}.png`
  
      // 3. Compare results
      compareResults(option.textContent, computerOptions[number])
  
      // 4. Check the winner
      checkWinner()
    }
  });
}

function compareResults (playerChoice, computerChoice) {
  if(playerChoice === "rock" && computerChoice === "scissors") {
    result.textContent = "Player is a winner!"
    playerPoints++
    updateScore()
    winner.push('Player')
  } else if (playerChoice === "rock" && computerChoice === "paper") {
    result.textContent = "Computer is a winner!"
    computerPoints++
    updateScore()
    winner.push('Computer')
  } else if (playerChoice === "paper" && computerChoice === "rock") {
    result.textContent = "Player is a winner!"
    playerPoints++
    updateScore()
    winner.push('Player')
  } else if (playerChoice === "paper" && computerChoice === "scissors") {
    result.textContent = "Computer is a winner!"
    computerPoints++
    updateScore()
    winner.push('Computer')
  } else if (playerChoice === "scissors" && computerChoice === "paper") {
    result.textContent = "Player is a winner!"
    playerPoints++
    updateScore()
    winner.push('Player')
  } else if(playerChoice === "scissors" && computerChoice === "rock") {
    result.textContent = "Computer is a winner!"
    computerPoints++
    updateScore()
    winner.push('Computer')
  } else {
    result.textContent = "It is a tie!"
    winner.push('Tie')
  }
}

function updateScore () {
  const playerScore = document.querySelector(".player p")
  const computerScore = document.querySelector(".computer p")
  playerScore.textContent = playerPoints
  computerScore.textContent = computerPoints
}

function checkWinner () {
  const playerWinner = document.querySelector(".player h2")
  const computerWinner = document.querySelector(".computer h2")
  const pWinner = document.querySelector(".player")
  const cWinner = document.querySelector(".computer")

  const isPlayerCont = winner.some((win, index, arr) => 
    win === 'Player' && 
    arr[index - 1] === win &&
    arr[index - 2] === win
  )

  const isComputerCont = winner.some((win, index, arr) => 
    win === 'Computer' && 
    arr[index - 1] === win &&
    arr[index - 2] === win
  )

  if(playerPoints === 10 || isPlayerCont) {
    result.textContent = "END GAME!!! PLAYER IS THE FINAL WINNER"
    playerWinner.textContent = "WINNER"
    pWinner.classList.add("winner")
    isGamePlaying = false
    return; 
  } 
  if(computerPoints === 10 || isComputerCont) {
    result.textContent = "END GAME!!! COMPUTER IS THE FINAL WINNER"
    gamePlaying = false
    computerWinner.textContent = "WINNER"
    cWinner.classList.add("winner")
    isGamePlaying = false
    return;
  }
}

function init() {
  playerPoints = 0;
  computerPoints = 0;
  winner = [],
  isGamePlaying = true
  document.querySelector(".player-hand").style.display = "none"
  document.querySelector(".computer-hand").style.display = "none"
  document.querySelector(".player h2").textContent = "Player"
  document.querySelector(".computer h2").textContent = "Computer"
  document.querySelector(".player").classList.remove("winner")
  document.querySelector(".computer").classList.remove("winner")
  document.querySelector(".player p").textContent = 0
  document.querySelector(".computer p").textContent = 0
}