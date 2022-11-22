<script lang="ts">
	import { onMount } from 'svelte';
	import { COLOR, INPUT_EVENT_TYPE, Chessboard } from './cm-chessboard/Chessboard.js';
	import sprite from '$lib/images/chessboard-sprite-staunty.svg';
	// video: explain why it looked bad before this and why i needed to add css to the board
	import '$lib/styles/cm-chessboard.scss';
	import { Chess, type Move } from 'chess.js';
	import { evaluateBoard } from './evaluateBoard';
	// rename chessboard files to something that makes sense

	let board: any;
	let chessboardElm: HTMLDivElement;
	const chessGame = new Chess();
	let score = 0;
	let bestMove: Move | undefined;

	onMount(() => {
		if (chessboardElm) {
			board = new Chessboard(chessboardElm, {
				position: chessGame.fen(),
				sprite: { url: sprite },
				draggable: true,
				orientation: COLOR.white,
				style: {
					cssClass: 'blue'
				}
			});

			board.enableMoveInput(inputHandler, COLOR.white);
		}
	});

	function negaMax(game: Chess, alpha: number, beta: number, depth: number) {
		if (depth === 0) {
			return evaluateBoard(game);
		}

		let bestScore = -Infinity;

		game.moves({ verbose: true }).forEach((possibleMove, i) => {
			// might be better way to avoid string move type
			if (typeof possibleMove === 'string') {
				throw new Error('possible is str');
			}

			// continue - need to introduce right way alpha-prunnnig

			game.move(possibleMove);
			bestScore = -negaMax(game, -beta, -alpha, depth - 1);
			game.undo();

			if (bestScore >= alpha) {
				alpha = bestScore;
			}

			if (bestScore >= beta) {
				return bestScore;
			}
		});

		return bestScore;
	}

	function calculateBestMove(game: Chess) {
		var possibleNextMoves = game.moves({ verbose: true });
		const bestValue = -Infinity;
		var bestMove = -Infinity;

		const alpha = -Infinity;
		const beta = Infinity;
		var bestMoveFound: string | Move;

		possibleNextMoves.forEach((possibleMove) => {
			game.move(possibleMove);
			var boardValue = -negaMax(game, -alpha, beta, 2);
			game.undo();

			console.log('----------', boardValue, bestValue);
			if (boardValue > bestMove) {
				console.log('======', boardValue, bestValue);
				bestMove = boardValue;
				bestMoveFound = possibleMove;
			}
		});

		return bestMoveFound!;
	}

	function inputHandler(event: any) {
		// console.log(event);
		switch (event.type) {
			case INPUT_EVENT_TYPE.moveInputStarted:
				return true;
			case INPUT_EVENT_TYPE.validateMoveInput:
				const result = validateMoveInput(event);
				if (result === undefined) {
					event.chessboard.enableMoveInput(inputHandler, COLOR.white);
					return;
				}

				board.state.moveInputProcess.then(() => {
					// wait for the move input process has finished
					board.setPosition(chessGame.fen(), true).then(() => {
						// update position, maybe castled and wait for animation has finished

						// console.log('eval in input func', evaluateBoard(chessGame));

						setTimeout(() => {
							const nextMove = calculateBestMove(chessGame);
							// move black
							chessGame.move(nextMove);
							// enable player to play again
							event.chessboard.enableMoveInput(inputHandler, COLOR.white);
							// update board
							event.chessboard.setPosition(chessGame.fen(), true);
						}, 500);
					});
				});

				// board.state.moveInputProcess.then(() => {
				// 	// wait for the move input process has finished
				// 	board.setPosition(chessGame.fen(), true).then(() => {
				// 		// update position, maybe castled and wait for animation has finished
				// 		const possibleMoves = chessGame.moves({ verbose: true });
				// 		if (possibleMoves.length > 0) {
				// 			const randomIndex = Math.floor(Math.random() * possibleMoves.length);
				// 			const randomMove = possibleMoves[randomIndex];

				// 			// continue - need to return the perfect possibleMove
				// 			if (typeof randomMove === 'string') {
				// 				return;
				// 			}

				// 			setTimeout(() => {
				// 				// move black
				// 				chessGame.move({ from: randomMove.from, to: randomMove.to });
				// 				// enable player to play again
				// 				event.chessboard.enableMoveInput(inputHandler, COLOR.white);
				// 				// update board
				// 				event.chessboard.setPosition(chessGame.fen(), true);
				// 			}, 500);
				// 		}
				// 	});
				// });

				return result;
			case INPUT_EVENT_TYPE.moveInputCanceled:
				return true;
			case INPUT_EVENT_TYPE.moveInputStarted:
				return;
		}
	}

	function validateMoveInput(event: any) {
		// video: explain how the chess knows which move to move (it knows which piece is in which place)
		const move = { from: event.squareFrom, to: event.squareTo };
		const gameMove = chessGame.move(move);

		if (gameMove === null) {
			if (chessGame.inCheck()) {
				console.log('game in check');
				return;
			}

			return;
		}

		// score = evaluateBoard(gameMove, score, gameMove.color);
		return gameMove;
	}
</script>

<svelte:head />

<section>
	<div width="1000" bind:this={chessboardElm} />
</section>
