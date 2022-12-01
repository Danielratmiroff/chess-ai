<script lang="ts">
	import { onMount } from 'svelte';
	import { COLOR, INPUT_EVENT_TYPE, Chessboard } from './cm-chessboard/Chessboard.js';
	import sprite from '$lib/images/chessboard-sprite-staunty.svg';
	// video: explain why it looked bad before this and why i needed to add css to the board
	import '$lib/styles/cm-chessboard.scss';
	import { Chess, type Move } from 'chess.js';
	import { evaluateBoard } from './evaluateBoard';
	import { checkStatus } from './boardStatus.js';

	let board: any;
	let chessboardElm: HTMLDivElement;
	const chess = new Chess();
	let movesAnalised = 0;
	let newScore = 0;
	let endMsg = '';
	let bestMove: Move | null = null;

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

	// function negaMax(
	// 	game: Chess,
	// 	alpha: number,
	// 	beta: number,
	// 	depth: number,
	// 	move: Move,
	// 	sum: number
	// ): { bestMove: unknown; bestScore: number } {
	// 	movesAnalised++;
	// 	let bestScore = Number.NEGATIVE_INFINITY;
	// 	let bestMove: unknown;

	// 	if (depth === 0) {
	// 		return { bestMove: move, bestScore: sum };
	// 	}

	// 	const moves = game.moves({ verbose: true }) as Move[];
	// 	// Sort moves randomly, so the same move isn't always picked on ties
	// 	moves.sort(() => 0.5 - Math.random());

	// 	for (const possibleMove of moves) {
	// 		game.move(possibleMove);
	// 		const newSum = evaluateBoard(game);
	// 		const { bestScore: score } = negaMax(game, -beta, -alpha, depth - 1, possibleMove, newSum);
	// 		game.undo();

	// 		if (score >= beta) {
	// 			return { bestMove, bestScore: score };
	// 		}

	// 		if (bestScore < score) {
	// 			bestScore = score;
	// 			bestMove = possibleMove;
	// 		}

	// 		if (alpha < score) {
	// 			alpha = score;
	// 			if (alpha >= beta) {
	// 				break;
	// 			}
	// 		}
	// 	}

	// 	return { bestMove, bestScore };
	// }

	// Alpha = best value for MAX
	// Beta = best value for MIN
	// Depth = depth of search
	// Player = current player
	// Return value = best move for current player
	function minimax(
		game: Chess,
		alpha: number,
		beta: number,
		depth: number,
		maximizingPlayer: boolean
	) {
		if (depth === 0) {
			return evaluateBoard(game);
		}

		const possibleMoves = game.moves({ verbose: true }) as Move[];

		// Sort moves randomly, so the same move isn't always picked on ties
		possibleMoves.sort(() => 0.5 - Math.random());

		var maxValue = Number.NEGATIVE_INFINITY;
		var minValue = Number.POSITIVE_INFINITY;

		for (let move of possibleMoves) {
			game.move(move);
			const childValue = minimax(game, alpha, beta, depth - 1, maximizingPlayer);
			game.undo();

			if (maximizingPlayer) {
				if (childValue > maxValue) {
					maxValue = childValue;
					bestMove = move;
				}

				if (childValue > alpha) {
					alpha = childValue;
				}
			} else {
				if (childValue < minValue) {
					minValue = childValue;
					bestMove = move;
				}
				if (childValue < beta) {
					beta = childValue;
				}
			}

			if (alpha >= beta) {
				break;
			}
		}

		return maximizingPlayer ? maxValue : minValue;
	}

	function calculateBestMove(): [Move, number] {
		movesAnalised = 0;
		let alpha = Number.NEGATIVE_INFINITY;
		let beta = Number.POSITIVE_INFINITY;
		const depth = 3;

		let move = chess.moves({ verbose: true })[0] as Move;
		const score = minimax(chess, alpha, beta, depth, true);
		console.log(score, bestMove);

		if (bestMove === null) {
			return [move, score];
		} else {
			return [bestMove, score];
		}
	}

	function inputHandler(event: any) {
		switch (event.type) {
			case INPUT_EVENT_TYPE.moveInputStarted:
				return true;
			case INPUT_EVENT_TYPE.validateMoveInput:
				const result = validateMoveInput(event);
				if (result === undefined || result === null) {
					event.chessboard.enableMoveInput(inputHandler, COLOR.white);
					return;
				}

				board.state.moveInputProcess.then(() => {
					// wait for the move input process has finished
					board.setPosition(chess.fen(), true).then(() => {
						const [move, score] = calculateBestMove();

						setTimeout(() => {
							// move black
							chess.move(move);
							// update board
							event.chessboard.setPosition(chess.fen(), true);
							newScore = score;
							//
							// checkStatus(chess, COLOR.black);
							// enable player to play again
							event.chessboard.enableMoveInput(inputHandler, COLOR.white);
						}, 100);
					});
				});

				newScore = evaluateBoard(chess);
				return result;
			case INPUT_EVENT_TYPE.moveInputCanceled:
				return true;
		}
	}

	function validateMoveInput(event: any) {
		// video: explain how the chess knows which move to move (it knows which piece is in which place)
		const move = { from: event.squareFrom, to: event.squareTo };
		const gameMove = chess.move(move);

		const { ended: blackLost, status: blackStatus } = checkStatus(chess, COLOR.black);
		if (blackLost) {
			endMsg = blackStatus;
			return;
		}

		const { ended: whiteLost, status: whiteStatus } = checkStatus(chess, COLOR.white);
		if (whiteLost) {
			endMsg = whiteStatus;
			return;
		}

		// TODO: show which pieces were captured
		return gameMove;
	}
</script>

<svelte:head />

<section>
	<div width="1000" bind:this={chessboardElm} />
	<div>
		<p>Black's Score: {newScore}</p>
		<p>Moves analised: {movesAnalised}</p>
	</div>
	{#if endMsg.length > 0}
		<h1>{endMsg}</h1>
	{/if}
</section>
