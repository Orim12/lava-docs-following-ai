import { init, locale, dictionary } from 'svelte-i18n';

init({
	fallbackLocale: 'en',
	initialLocale: 'en'
});

export { locale, dictionary };
