<script lang="ts">
	import { onMount } from 'svelte';
	import { COLOR, INPUT_EVENT_TYPE, Chessboard } from './cm-chessboard/Chessboard.js';
	import sprite from '$lib/images/chessboard-sprite-staunty.svg';
	import { FEN } from './cm-chessboard/model/Position.js';
	// video: explain why it looked bad before this and why i needed to add css to the board
	import '$lib/styles/cm-chessboard.scss';
	import { Chess } from 'chess.js';

	let board: any;
	let chessboardElm: any;
	const chess = new Chess();

	onMount(() => {
		if (chessboardElm) {
			board = new Chessboard(chessboardElm, {
				position: chess.fen(),
				sprite: { url: sprite },
				orientation: COLOR.white
			});

			board.enableMoveInput(inputHandler, COLOR.white);
		}
	});

	// continue: validation of move input

	function inputHandler(event: any) {
		console.log(event);
		switch (event.type) {
			case INPUT_EVENT_TYPE.moveInputStarted:
				return true;
			case INPUT_EVENT_TYPE.validateMoveInput:
				if (isMoveValid(event)) {
					updatePosition(event);
				}
				return true;
			case INPUT_EVENT_TYPE.moveInputCanceled:
				return true;
		}
	}

	function updatePosition(event: any) {
		event.chessboard.disableMoveInput();

		board.chessboard.state.moveInputProcess.then(() => {
			board.chessboard.setPosition(chess.fen(), true).then(() => {
				const possibleMoves = chess.moves({ verbose: true });

				if (possibleMoves.length > 0) {
					// refactor - use secure random thing
					const randomIndex = Math.floor(Math.random() * possibleMoves.length);
					const randomMove = possibleMoves[randomIndex];

					setTimeout(() => {
						chess.move({ from: randomMove.from, to: randomMove.to });
						event.chessboard.enableMoveInput(inputHandler, COLOR.white);
						event.chessboard.setPosition(chess.fen(), true);
					}, 500);
				}
			});
		});
	}

	function isMoveValid(event: any) {
		// video: explain how the chess knows which move to move (it knows which piece is in which place)
		return chess.move({ from: event.squareFrom, to: event.squareTo });
	}
</script>

<svelte:head />

<section>
	<div width="1000" bind:this={chessboardElm} />
</section>
