<script lang="ts">
	import Chessboard from '$lib/components/Chessboard.svelte';
	import { SupportedLang } from '$lib/components/playAudio';

	let lang: SupportedLang = SupportedLang.ES;

	// TODO: disabled dynamic lang for now
	// $: if (typeof window !== 'undefined') {
	// 	lang = window.navigator.language;
	// }
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
