<script lang="ts">
	import { onMount } from 'svelte';
	import { COLOR, INPUT_EVENT_TYPE, Chessboard } from './cm-chessboard/Chessboard.js';
	import sprite from '$lib/assets/images/chessboard-sprite-staunty.svg';
	// video: explain why it looked bad before this and why i needed to add css to the board
	// video: Minimax with Alpha Beta Pruning John Levine
	import '$lib/styles/cm-chessboard.scss';
	import { Chess, type Move } from 'chess.js';
	import { evaluateBoard } from './evaluateBoard';
	import { checkStatus } from './boardStatus.js';
	import { playAudioOnMove, SupportedLang } from './playAudio.js';
	import LangRatioButtons from './LangRatioButtons.svelte';
	import Difficulty from './Difficulty.svelte';

	export let lang: SupportedLang = SupportedLang.EN;
	let board: any;
	let chessboardElm: HTMLDivElement;
	const chess = new Chess();
	let movesAnalised = 0;
	let newScore = 0;
	let statusMsg = '';
	let depth = 3;

	onMount(() => {
		if (chessboardElm) {
			board = new Chessboard(chessboardElm, {
				position: chess.fen(),
				sprite: { url: sprite },
				responsive: true,
				orientation: COLOR.white,
				style: {
					cssClass: 'blue'
				}
			});

			board.enableMoveInput(inputHandler, COLOR.white);
		}
	});

	/**
	 Alpha = best value for MAX
	 Beta = best value for MIN
	 Depth = depth of search
	 maximizingPlayer = AI 
	**/
	type AlphaBetaReturn = [bestScore: number, bestMove: Move | null];

	type AlphaBeta = {
		game: Chess;
		alpha: number;
		beta: number;
		depth: number;
		maximizingPlayer: boolean;
	};

	function minimax({ game, alpha, beta, depth, maximizingPlayer }: AlphaBeta): AlphaBetaReturn {
		movesAnalised++;
		let bestMove: Move | null = null;

		if (depth === 0) {
			return [evaluateBoard(game), null];
		}

		const possibleMoves = game.moves({ verbose: true }) as Move[];

		// Sort randomly to avoid same moves being chosen every time
		possibleMoves.sort(() => 0.5 - Math.random());

		let maxValue = Number.NEGATIVE_INFINITY;
		let minValue = Number.POSITIVE_INFINITY;

		for (const move of possibleMoves) {
			game.move(move);
			const [childValue, _] = minimax({
				game,
				alpha,
				beta,
				depth: depth - 1,
				maximizingPlayer: !maximizingPlayer
			});
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

		return maximizingPlayer ? [maxValue, bestMove] : [minValue, bestMove];
	}

	function calculateBestMove(depthLvl: number): [Move, number] {
		movesAnalised = 0;
		let alpha = Number.NEGATIVE_INFINITY;
		let beta = Number.POSITIVE_INFINITY;

		let move = chess.moves({ verbose: true })[0] as Move;
		const [bestScore, bestMove] = minimax({
			game: chess,
			alpha,
			beta,
			depth: depthLvl,
			maximizingPlayer: true
		});

		return bestMove === null ? [move, bestScore] : [bestMove, bestScore];
	}

	function inputHandler(event: any) {
		switch (event.type) {
			case INPUT_EVENT_TYPE.moveInputStarted:
				return true;
			case INPUT_EVENT_TYPE.moveInputCanceled:
				return false;
			case INPUT_EVENT_TYPE.validateMoveInput:
				const playerMove = validateMoveInput(event);
				if (playerMove === undefined || playerMove === null) {
					return;
				}

				playAudioOnMove({ lang, chess, move: playerMove, isPlayer: true });

				board.state.moveInputProcess.then(() => {
					// wait for the move input process has finished
					board.setPosition(chess.fen(), true).then(() => {
						const { ended, status } = checkStatus(chess, COLOR.black);
						statusMsg = status;
						if (ended) {
							board.disableMoveInput();
							return;
						}

						const [bestMove, _] = calculateBestMove(depth);

						setTimeout(async () => {
							// move black
							chess.move(bestMove);

							// update board
							board.setPosition(chess.fen(), true);
							newScore = evaluateBoard(chess);
							playAudioOnMove({ lang, chess, move: bestMove, isPlayer: false });

							const { ended, status } = checkStatus(chess, COLOR.black);
							statusMsg = status;
							if (ended) {
								board.disableMoveInput();
								return;
							}

							// enable player to play again
							board.enableMoveInput(inputHandler, COLOR.white);
						}, 500);
					});
				});

				newScore = evaluateBoard(chess);
				return playerMove;
		}
	}

	function validateMoveInput(event: any) {
		// video: explain how the chess knows which move to move (it knows which piece is in which place)
		// TODO: show which pieces were captured
		return chess.move({ from: event.squareFrom, to: event.squareTo });
	}
</script>

<svelte:head />

<section>
	<div class="score">
		<h3>AI score: {newScore}</h3>
		<span>Moves analised: {movesAnalised}</span>
	</div>
	<div width="1000" bind:this={chessboardElm} />
	<div>
		{#if statusMsg.length > 0}
			<h2 style="color: red">{statusMsg}</h2>
		{/if}
	</div>
	<button class="restart" on:click={() => location.reload()}>Restart</button>

	<Difficulty bind:depth />
	<LangRatioButtons bind:lang />
</section>

<style>
	h3 {
		margin: 0;
	}
	.score {
		margin-bottom: 1.5rem;
		display: flex;
		flex-direction: column;
		text-align: center;
		gap: 0.7rem;
	}
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.restart {
		background-color: #277c28;
		border: none;
		color: white;
		padding: 0.7rem 1rem;
		text-align: center;
		text-decoration: none;
		border-radius: 4px;
		margin-top: 2rem;
		cursor: pointer;
	}
	span {
		font-size: 0.9rem;
	}
</style>
