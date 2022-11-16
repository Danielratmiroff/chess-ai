<script lang="ts">
	import { onMount } from 'svelte';
	import { INPUT_EVENT_TYPE, Chessboard } from './cm-chessboard/Chessboard.js';
	import sprite from '$lib/images/chessboard-sprite-staunty.svg';
	import { FEN } from './cm-chessboard/model/Position.js';
	import '$lib/styles/cm-chessboard.scss';

	let a: any;

	function inputHandler(event: any) {
		console.log(event);
		switch (event.type) {
			case INPUT_EVENT_TYPE.moveInputStarted:
				return true;
			case INPUT_EVENT_TYPE.validateMoveInput:
				return true;
			case INPUT_EVENT_TYPE.moveInputCanceled:
				return true;
		}
	}
	onMount(() => {
		if (a) {
			new Chessboard(a, {
				position: FEN.start,
				sprite: { url: sprite }
			}).enableMoveInput(inputHandler);
		}
	});
</script>

<svelte:head />

<section>
	<img src={sprite} alt="hey" />
	<div width="1000" bind:this={a}>hey</div>
</section>
