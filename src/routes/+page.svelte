<script lang="ts">
	import Chessboard from '$lib/components/Chessboard.svelte';
	import { SupportedLang } from '$lib/types';

	let lang: SupportedLang = SupportedLang.EN;

	$: if (typeof window !== 'undefined') {
		const browserLang = window.navigator.language.split('-')[0];
		if (browserLang in SupportedLang) {
			lang = browserLang as SupportedLang;
		}
	}
</script>

<svelte:head>
	<title>Chess AI</title>
	<meta name="description" content="Chess AI that kicks ass" />
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
