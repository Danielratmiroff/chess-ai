<script lang="ts">
	export let lang: string | undefined;
</script>

<svelte:head />

<section class="lang-section">
	<span>AI Language:</span>
	<select bind:value={lang}>
		<option on:change={() => (lang = 'en-US')} value="en-US">English</option>
		<option on:change={() => (lang = 'de-DE')} default value="de-DE">German</option>
		<option on:change={() => (lang = 'es-ES')} value="es-ES">Spanish</option>
	</select>
</section>

<style>
	span {
		font-size: 0.8rem;
	}
	.lang-section {
		margin: 1rem 0;
	}
</style>
