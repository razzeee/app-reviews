<script context="module" lang="ts">
	import yourJSON from '../../static/apps.json';
	export const prerender = true;

	export async function load({ page, fetch, session, context }) {
		return {
			props: yourJSON,
		};
	}
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<section>
	<button class="btn btn-primary">DaisyUI Button</button>
</section>

<style>
</style>
