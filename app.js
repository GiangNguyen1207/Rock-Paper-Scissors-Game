/**  
Orientation - JS assignment 2
Solution by: [Giang Nguyen]
*/

let points, winners, isGamePlaying

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
  if(playerChoice === computerChoice) {
    result.textContent = "It is a tie!"
    winners.push('Tie')
    return;
  }

  if(playerChoice === 'rock') {
    if(computerChoice === 'scissors') {
      result.textContent = 'Player is a winner!'
      points['player']++
      updateScore()
      winners.push('player')
      return;
    } else {
      result.textContent = "Computer is a winner!"
      points['computer']++
      updateScore()
      winners.push('computer')
      return;
    }
  }

  if(playerChoice === 'paper') {
    if(computerChoice === 'rock') {
      result.textContent = "Player is a winner!"
      points['player']++
      updateScore()
      winners.push('Player')
      return;
    } else {
      result.textContent = "Computer is a winner!"
      points['computer']++
      updateScore()
      winners.push('computer')
      return;
    }
  }

  if(playerChoice === 'scissors') {
    if(computerChoice === 'paper') {
      result.textContent = "Player is a winner!"
      points['player']++
      updateScore()
      winners.push('player')
      return;
    } else {
      result.textContent = "Computer is a winner!"
      points['computer']++
      updateScore()
      winners.push('computer')
      return;
    }
  }
}

function updateScore () {
  const playerScore = document.querySelector(".player p")
  const computerScore = document.querySelector(".computer p")
  playerScore.textContent = points['player']
  computerScore.textContent =  points['computer']
}

function checkWinner () {
  const players = document.querySelectorAll('.players h2')
  const groups = document.querySelectorAll('.players div')

  const isCont = winners.map((winner, index, arr) => 
    winner !== 'Tie' &&
    winner === arr[index-1] &&
    winner === arr[index-2]
  )

  const index = isCont.indexOf(true)

  Object.entries(points).forEach(entry => {
    const [key, value] = entry
    if(value === 10) {
      result.textContent = `END GAME!!! ${key.toUpperCase()} IS THE FINAL WINNER`
      for(const player of players) {
        player.textContent.toLowerCase() === key ? player.textContent = 'WINNER' : null
      }
      for(const group of groups) {
        group.classList.value === key ? group.classList.add('winner') : null
      }
      isGamePlaying = false
    }
    return
  })

  if(index > 0) {
    result.textContent = `END GAME!!! ${winners[index].toUpperCase()} IS THE FINAL WINNER`
    for(const player of players) {
      player.textContent.toLowerCase() === winners[index] ? player.textContent = 'WINNER' : null
    }
    for(const group of groups) {
      group.classList.value === winners[index] ? group.classList.add('winner') : null
    }
    isGamePlaying = false
    return;
  }
}

function init() {
  points = {'player': 0, 'computer': 0}
  winners = [],
  isGamePlaying = true
  document.querySelector(".player-hand").style.display = "none"
  document.querySelector(".computer-hand").style.display = "none"
  document.querySelector(".player h2").textContent = "Player"
  document.querySelector(".computer h2").textContent = "Computer"
  document.querySelector(".player").classList.remove("winner")
  document.querySelector(".computer").classList.remove("winner")
  document.querySelector(".player p").textContent = 0
  document.querySelector(".computer p").textContent = 0
  document.querySelector(".title").textContent = 'Choose an option'
}