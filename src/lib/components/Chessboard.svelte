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
	let movesAnalised = 0;
	let bestMove: Move | string;

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

	function negaMax(game: Chess, alpha: number, beta: number, depth: number): number {
		if (depth === 0) {
			return evaluateBoard(game);
		}

		let bestscore = -Infinity;

		const moves = game.moves({ verbose: true });
		for (const possibleMove of moves) {
			movesAnalised++;
			// might be better way to avoid string move type
			if (typeof possibleMove === 'string') {
				throw new Error('possible is str');
			}

			// TODO - need to introduce right way alpha-prunnnig
			game.move(possibleMove);
			let score = -negaMax(game, -beta, -alpha, depth - 1);
			game.undo();

			if (score >= beta) {
				return score;
			}

			if (score > bestscore) {
				bestscore = score;
			}

			if (score > alpha) {
				alpha = score;
			}
		}

		return bestscore;
	}

	function calculateBestMove(game: Chess) {
		var possibleNextMoves = game.moves({ verbose: true });
		let boardValue = -Infinity;

		let bestscore = -Infinity;
		const alpha = -Infinity;
		const beta = Infinity;

		possibleNextMoves.forEach((possibleMove) => {
			movesAnalised++;
			game.move(possibleMove);
			boardValue = -negaMax(game, -alpha, beta, 1);
			game.undo();

			if (boardValue > bestscore) {
				bestscore = boardValue;
				bestMove = possibleMove;
			}
		});

		console.log(movesAnalised);
		movesAnalised = 0;

		return bestMove;
	}

	function inputHandler(event: any) {
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

						const nextMove = calculateBestMove(chessGame);
						setTimeout(() => {
							// move black
							chessGame.move(nextMove);
							// update board
							event.chessboard.setPosition(chessGame.fen(), true);
							// enable player to play again
							event.chessboard.enableMoveInput(inputHandler, COLOR.white);
						}, 100);
					});
				});

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
			/* need to check
			- check
			- checkmate
			- checkstale
			- more
		
			TODO: show which pieces were captured
			**/

			return;
		}

		return gameMove;
	}
</script>

<svelte:head />

<section>
	<div width="1000" bind:this={chessboardElm} />
</section>
