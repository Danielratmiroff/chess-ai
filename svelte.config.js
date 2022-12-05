import preprocess from 'svelte-preprocess';

import adapter from '@sveltejs/adapter-netlify';

export default {
	preprocess: preprocess(),
	kit: {
		adapter: adapter()
	}
};
