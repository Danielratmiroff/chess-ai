<script lang="ts">
	export let lang: string | undefined;
</script>

<svelte:head />

<section class="lang-section">
	<span>AI Language:</span>
	<select bind:value={lang}>
		<option on:change={() => (lang = 'en')} default value="en">English</option>
		<option on:change={() => (lang = 'de')} value="de">German</option>
		<option on:change={() => (lang = 'es')} value="es">Spanish</option>
	</select>
</section>

<style>
	select,
	option,
	span {
		font-size: 0.8rem;
	}
	.lang-section {
		margin: 1rem 0;
	}
</style>
