//Objects
function createPlayer(name, symbol) {
	let occupied = [];
	const getMoves = () => {
		return occupied;
	};
	const updateMove = (index) => {
		occupied.push(index);
	};
	const resetPlayer = () => {
		occupied = [];
	};
	return { name, symbol, getMoves, updateMove, resetPlayer };
}

const gameBoard = (function () {
	let board = Array(9).fill("");
	const getBoard = () => {
		return board;
	};
	const resetBoard = () => {
		board.fill("");
	};
	const updateBoard = (index, symbol) => {
		board[index] = symbol;
	};
	const checkSquare = (index) => {
		return board[index] === "";
	};
	return { getBoard, resetBoard, updateBoard, checkSquare };
})();

const displayController = (function () {
	const board = document.getElementById("gameboard");
	const result = document.getElementById("result");
	const reset = document.getElementById("reset");
	const squares = document.querySelectorAll(".square");
	const p1 = createPlayer("p1", "X");
	const p2 = createPlayer("p2", "O");
	const winningCombos = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];
	let turn = 1;

	const initGame = () => {
		board.addEventListener("click", makeMove);
		reset.addEventListener("click", resetAll);
	};

	const currentPlayer = () => {
		if (turn % 2 === 1) {
			return p1;
		} else {
			return p2;
		}
	};

	const resetAll = () => {
		turn = 1;
		result.textContent = "";
		squares.forEach((square) => {
			square.textContent = "";
			if (square.classList.contains("highlight")) {
				square.classList.remove("highlight");
			}
		});
		p1.resetPlayer();
		p2.resetPlayer();
		gameBoard.resetBoard();
		board.addEventListener("click", makeMove);
	};

	const endGame = () => {
		board.removeEventListener("click", makeMove);
	};

	const showWin = (player) => {
		result.textContent = player.name + " wins!";
	};

	const showTie = () => {
		result.textContent = "It's a tie!";
	};

	const checkWin = (player) => {
		const moveSet = player.getMoves();
		const crossOut = winningCombos.filter((arr) =>
			arr.every((el) => moveSet.includes(el))
		);
		if (crossOut.length > 0) {
			highlight(crossOut.flat());
			endGame();
			showWin(player);
			return;
		} else {
			if (turn === 10) {
				endGame();
				showTie();
			}
			return;
		}
	};

	const highlight = (arr) => {
		for (let position of arr) {
			const colorSquare = document.getElementById(position);
			colorSquare.classList.add("highlight");
		}
	};

	const makeMove = (event) => {
		if (!event.target.classList.contains("square")) return;
		const index = event.target.id;
		const square = document.getElementById(index);
		const player = currentPlayer();
		if (gameBoard.checkSquare(index)) {
			turn += 1;
			player.updateMove(Number(index));
			gameBoard.updateBoard(index, player.symbol);
			square.textContent = player.symbol;
			checkWin(player);
		}
	};
	return { initGame };
})();

displayController.initGame();
