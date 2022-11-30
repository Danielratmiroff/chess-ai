<script lang="ts">
	import { onMount } from 'svelte';
	import { COLOR, INPUT_EVENT_TYPE, Chessboard } from './cm-chessboard/Chessboard.js';
	import sprite from '$lib/images/chessboard-sprite-staunty.svg';
	// video: explain why it looked bad before this and why i needed to add css to the board
	import '$lib/styles/cm-chessboard.scss';
	import { Chess, type Move } from 'chess.js';
	import { evaluateBoard } from './evaluateBoard';

	let board: any;
	let chessboardElm: HTMLDivElement;
	const chess = new Chess();
	let movesAnalised = 0;

	onMount(() => {
		if (chessboardElm) {
			board = new Chessboard(chessboardElm, {
				position: chess.fen(),
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

	function negaMax(alpha: number, beta: number, depth: number): any {
		movesAnalised++;
		let bestScore = Number.NEGATIVE_INFINITY;
		let bestMove: unknown;

		if (depth === 0) {
			return { bestMove, bestScore: evaluateBoard(chess) };
		}

		const moves = chess.moves({ verbose: true });

		// Sort moves randomly, so the same move isn't always picked on ties
		moves.sort(() => 0.5 - Math.random());

		for (const possibleMove of moves) {
			// might be better way to avoid string move type
			if (typeof possibleMove === 'string') {
				throw new Error('possible is str');
			}

			chess.move(possibleMove);
			const { bestScore: score } = negaMax(-beta, -alpha, depth - 1);
			chess.undo();

			if (score >= beta) {
				return { bestMove, bestScore: score };
			}

			if (score > bestScore) {
				bestScore = score;
				bestMove = possibleMove;
			}

			if (score > alpha) {
				alpha = score;
			}
		}
		return { bestMove, bestScore };
	}

	function calculateBestMove() {
		let alpha = Number.NEGATIVE_INFINITY;
		let beta = Number.POSITIVE_INFINITY;
		const depth = 3;

		const result = negaMax(-beta, -alpha, depth);

		console.table(result);
		console.log('moves', movesAnalised);
		movesAnalised = 0;

		return result.bestMove;
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
					board.setPosition(chess.fen(), true).then(() => {
						// update position, maybe castled and wait for animation has finished

						const nextMove = calculateBestMove();
						setTimeout(() => {
							// move black
							chess.move(nextMove);
							// update board
							event.chessboard.setPosition(chess.fen(), true);
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
		const gameMove = chess.move(move);

		if (gameMove === null) {
			if (chess.inCheck()) {
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
