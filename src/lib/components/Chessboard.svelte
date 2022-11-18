<script lang="ts">
	import { onMount } from 'svelte';
	import { COLOR, INPUT_EVENT_TYPE, Chessboard } from './cm-chessboard/Chessboard.js';
	import sprite from '$lib/images/chessboard-sprite-staunty.svg';
	import { FEN } from './cm-chessboard/model/Position.js';
	// video: explain why it looked bad before this and why i needed to add css to the board
	import '$lib/styles/cm-chessboard.scss';
	import { Chess, type Move } from 'chess.js';
	import { MOVE_FLAGS, PIECES, PST_OPPONENT, PST_SELF, WEIGHTS } from '$lib/data/constants';

	let board: any;
	let chessboardElm: any;
	const chess = new Chess();

	onMount(() => {
		if (chessboardElm) {
			board = new Chessboard(chessboardElm, {
				position: chess.fen(),
				sprite: { url: sprite },
				orientation: COLOR.white,
				style: {
					cssClass: 'blue'
				}
			});

			board.enableMoveInput(inputHandler, COLOR.white);
		}
	});

	function inputHandler(event: any) {
		// console.log(event);
		switch (event.type) {
			case INPUT_EVENT_TYPE.moveInputStarted:
				return true;
			case INPUT_EVENT_TYPE.validateMoveInput:
				return isMoveValid(event);
			case INPUT_EVENT_TYPE.moveInputCanceled:
				return true;
		}
	}

	function evaluateBoard(move: Move, prevScore: any, color: any) {
		// todo: prob remove 'a'charcode thingy bc I don't understand it
		let newScore = prevScore;
		const from = [8 - parseInt(move.from.charAt(1)), move.from.charCodeAt(0) - 'a'.charCodeAt(0)];
		const to = [8 - parseInt(move.to.charAt(1)), move.to.charCodeAt(0) - 'a'.charCodeAt(0)];

		if (move.captured !== undefined) {
			// Opponent piece was captured
			if (move.color === color) {
				newScore += WEIGHTS[move.captured] + PST_OPPONENT[move.color][move.captured][to[0]][to[1]];
			}
			// Our piece was captured
			else {
				newScore -= WEIGHTS[move.captured] + PST_SELF[move.color][move.captured][to[0]][to[1]];
			}
		}

		if (move.flags.includes(MOVE_FLAGS.PROMOTION)) {
			// NOTE: promote to queen for simplicity
			move.promotion = PIECES.QUEEN;

			// Our piece was promoted
			if (move.color === color) {
				newScore -= WEIGHTS[move.piece] + PST_SELF[move.color][move.piece][from[0]][from[1]];
				newScore += WEIGHTS[move.promotion] + PST_SELF[move.color][move.promotion][to[0]][to[1]];
			}
			// Opponent piece was promoted
			else {
				newScore += WEIGHTS[move.piece] + PST_SELF[move.color][move.piece][from[0]][from[1]];
				newScore -= WEIGHTS[move.promotion] + PST_SELF[move.color][move.promotion][to[0]][to[1]];
			}
		}

		if (move.color !== color) {
			newScore += PST_SELF[move.color][move.piece][from[0]][from[1]];
			newScore -= PST_SELF[move.color][move.piece][to[0]][to[1]];
		} else {
			newScore -= PST_SELF[move.color][move.piece][from[0]][from[1]];
			newScore += PST_SELF[move.color][move.piece][to[0]][to[1]];
		}

		return newScore;
	}

	function isMoveValid(event: any) {
		// video: explain how the chess knows which move to move (it knows which piece is in which place)
		const move = chess.move({ from: event.squareFrom, to: event.squareTo });
		if (!move) {
			return;
		}
		console.log(move.flags);
		// continue -- need to trigger a evaluateBoard on move
		evaluateBoard(move, 100, 'w');
		return move;
	}
</script>

<svelte:head />

<section>
	<div width="1000" bind:this={chessboardElm} />
</section>
