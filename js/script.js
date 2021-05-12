const statusDisplay = document.querySelector('.app-status');

let current_Player = 'X';
let game_State = ['', '', '', '', '', '', '', '', ''];
let game_isActive = true;

const current_PlayerTurn = () => `It's Player ${current_Player}'s turn &#8987; `;
const wining_Message = () => `Player ${current_Player} has won! &#128526; `;
const draw_Message = () => `Game ended in a draw! &#128528; `;

statusDisplay.innerHTML = current_PlayerTurn();

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function handleCellPlayed(clickedCell, clickedCellIndex) {
  game_State[clickedCellIndex] = current_Player;
  clickedCell.innerHTML = current_Player;
}

function handlePlayerChange() {
  current_Player = current_Player === 'X' ? 'O' : 'X';
  statusDisplay.innerHTML = current_PlayerTurn();
}

function handleResultValidation() {
  let roundWon = false;
  for (let i = 0; i <= winningConditions.length - 1; i++) {
    const winCondition = winningConditions[i];
    let a = game_State[winCondition[0]];
    let b = game_State[winCondition[1]];
    let c = game_State[winCondition[2]];
    if (a === '' || b === '' || c === '') {
      continue;
    }
    if (a === b && b === c) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusDisplay.innerHTML = wining_Message();
    game_isActive = false;
    return;
  }

  let roundDraw = !game_State.includes('');
  if (roundDraw) {
    statusDisplay.innerHTML = draw_Message();
    game_isActive = false;
    return;
  }

  handlePlayerChange();
}

function handleCellClick(clickedCellEvent) {
  const clickedCell = clickedCellEvent.target;
  const clickedCellIndex = parseInt(
    clickedCell.getAttribute('data-cell-index')
  );

  if (game_State[clickedCellIndex] !== '' || !game_isActive) {
    return;
  }

  handleCellPlayed(clickedCell, clickedCellIndex);
  handleResultValidation();
}

function handleRestartGame() {
  game_isActive = true;
  current_Player = 'X';
  game_State = ['', '', '', '', '', '', '', '', ''];
  statusDisplay.innerHTML = current_PlayerTurn();
  document.querySelectorAll('.cell').forEach(cell => (cell.innerHTML = ''));
}

document
  .querySelectorAll('.cell')
  .forEach(cell => cell.addEventListener('click', handleCellClick));
document
  .querySelector('.app-restart')
  .addEventListener('click', handleRestartGame);