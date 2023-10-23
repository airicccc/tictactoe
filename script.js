//Objects
function createPlayer(name) {
	const firstMove = true;
	const symbol = "X";

	return { name, firstMove, symbol };
}

const gameBoard = (function () {
	const board = Array(9).fill("");
	const updateBoard = (index, symbol) => {
		board[index] = symbol;
	};
	return { updateBoard };
})();

const displayController = (function () {
	const gameOver = false;
	return { gameOver };
})();

gameBoard.updateBoard();
