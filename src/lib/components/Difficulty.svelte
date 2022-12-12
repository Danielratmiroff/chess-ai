<script lang="ts">
	export let depth: number;
</script>

<div class="flex-container">
	<p class="difficulty">Difficulty:</p>
	<button class:selected={depth === 1} on:click={() => (depth = 1)}>Noob</button>
	<button class:selected={depth === 3} on:click={() => (depth = 3)}>Smartass</button>
	<button class:selected={depth === 4} on:click={() => (depth = 4)}>Suffering</button>
</div>
<i>search depth: {depth}</i>

<style>
	.difficulty {
		margin: 0;
	}
	.selected {
		background-color: cornflowerblue;
		color: white;
	}
	.flex-container {
		width: 100%;
		gap: 0.8rem;
		display: flex;
		margin: 2rem 0 0 0;
		align-items: center;
		justify-content: center;
	}
	i {
		font-size: 0.8rem;
		margin: 0.5rem 0;
		color: grey;
	}
</style>
