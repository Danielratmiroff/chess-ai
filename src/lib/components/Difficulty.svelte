<script lang="ts">
	export let depth: number;
</script>

<p class="difficulty">Difficulty</p>
<div class="flex-container">
	<button class:selected={depth === 1} on:click={() => (depth = 1)}>Noob</button>
	<button class:selected={depth === 3} on:click={() => (depth = 3)}>Confront it </button>
	<button class:selected={depth === 4} on:click={() => (depth = 4)}>Suffering</button>
</div>
<i>search depth: {depth}</i>

<style>
	.selected {
		background-color: cornflowerblue;
		color: white;
	}
	.difficulty {
		line-height: 1;
		margin: 2rem 0 0.7rem 0;
	}
	.flex-container {
		width: 100%;
		gap: 0.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	i {
		font-size: 0.8rem;
		margin: 0.5rem 0;
		color: grey;
	}
</style>
