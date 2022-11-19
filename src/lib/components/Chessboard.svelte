<script lang="ts">
	import { onMount } from 'svelte';
	import { COLOR, INPUT_EVENT_TYPE, Chessboard } from './cm-chessboard/Chessboard.js';
	import sprite from '$lib/images/chessboard-sprite-staunty.svg';
	// video: explain why it looked bad before this and why i needed to add css to the board
	import '$lib/styles/cm-chessboard.scss';
	import { Chess, type Move } from 'chess.js';
	import { evaluateBoard } from './chessboard.js';
	// rename chessboard files to something that makes sense

	let board: any;
	let chessboardElm: HTMLDivElement;
	const chess = new Chess();
	let score = 0;

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

	function negaMax(move: Move, color: string, depth: number) {
		if (depth < 0) {
			return evaluateBoard(move, score, color);
		}

		let max = -Infinity;
		chess.moves({ verbose: true }).forEach((possibleMove) => {
			// might be better way to avoid string move type
			if (typeof possibleMove === 'string') {
				return;
			}
			let moveScore = -negaMax(possibleMove, color, depth - 1);
			if (moveScore > max) {
				max = score;
			}
		});
		return max;
	}

	function validateMoveInput(event: any) {
		// video: explain how the chess knows which move to move (it knows which piece is in which place)
		const move = { from: event.squareFrom, to: event.squareTo };
		const gameMove = chess.move(move);

		if (gameMove === null) {
			return;
		}
		// continue -- need to pass moves to the AI to execute them
		console.log(negaMax(gameMove, gameMove.color, 1));

		score = evaluateBoard(gameMove, score, gameMove.color);

		return gameMove;
	}

	function isMoveValid(move: Move) {
		return;
	}

	function inputHandler(event: any) {
		// console.log(event);
		switch (event.type) {
			case INPUT_EVENT_TYPE.moveInputStarted:
				return true;
			case INPUT_EVENT_TYPE.validateMoveInput:
				return validateMoveInput(event);
			case INPUT_EVENT_TYPE.moveInputCanceled:
				return true;
		}
	}
</script>

<svelte:head />

<section>
	<div width="1000" bind:this={chessboardElm} />
</section>
