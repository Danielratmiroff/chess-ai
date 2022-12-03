<script lang="ts">
	import Chessboard from '$lib/components/Chessboard.svelte';

	let lang: string | undefined;

	$: if (typeof window !== 'undefined') {
		lang = window.navigator.language;
	}
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<Chessboard {lang} />
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}
</style>
