import prettier from 'eslint-config-prettier'
import path from 'node:path'
import { includeIgnoreFile } from '@eslint/compat'
import js from '@eslint/js'
import sveltePlugin from 'eslint-plugin-svelte'
import globals from 'globals'
import ts from 'typescript-eslint'
import svelteConfig from './svelte.config.js'

const gitignorePath = path.resolve(import.meta.dirname, '.gitignore')

export default [
	includeIgnoreFile(gitignorePath),
	js.configs.recommended,
	...ts.configs.recommended,
	prettier,
	{
		plugins: {
			svelte: sveltePlugin,
		},
	},
	{
		files: ['**/*.svelte'],
		languageOptions: {
			parser: (await import('svelte-eslint-parser')).default,
			parserOptions: {
				parser: ts.parser,
				projectService: true,
				extraFileExtensions: ['.svelte'],
				svelteConfig,
			},
		},
		rules: {
			'no-inner-declarations': 'off',
			'no-self-assign': 'off',
			'svelte/comment-directive': 'error',
			'svelte/system': 'error',
			'svelte/no-at-debug-tags': 'warn',
			'svelte/no-at-html-tags': 'error',
			'svelte/no-dupe-else-if-blocks': 'error',
			'svelte/no-dupe-style-properties': 'error',
			'svelte/no-dynamic-slot-name': 'error',
			'svelte/no-not-function-handler': 'error',
			'svelte/no-object-in-text-mustaches': 'error',
			'svelte/no-shorthand-style-property-overrides': 'error',
			'svelte/no-unknown-style-directive-property': 'error',
			'svelte/no-unused-svelte-ignore': 'error',
			'svelte/valid-compile': 'error',
			'svelte/first-attribute-linebreak': 'off',
			'svelte/html-closing-bracket-new-line': 'off',
			'svelte/html-closing-bracket-spacing': 'off',
			'svelte/html-quotes': 'off',
			'svelte/html-self-closing': 'off',
			'svelte/indent': 'off',
			'svelte/max-attributes-per-line': 'off',
			'svelte/mustache-spacing': 'off',
			'svelte/no-spaces-around-equal-signs-in-attribute': 'off',
			'svelte/no-trailing-spaces': 'off',
			'svelte/shorthand-attribute': 'off',
			'svelte/shorthand-directive': 'off',
		},
	},
	{
		files: ['src/lib/components/rich-text/*.svelte'],
		rules: {
			'@typescript-eslint/no-explicit-any': 'off',
			'svelte/no-at-html-tags': 'off',
		},
	},
	{
		files: ['src/lib/providers/*.svelte'],
		rules: {
			'@typescript-eslint/no-explicit-any': 'off',
			'svelte/valid-compile': 'off',
		},
	},
	{
		languageOptions: { globals: { ...globals.browser, ...globals.node } },
		rules: {
			'no-undef': 'off',
		},
	},
	{
		files: ['**/*.ts', '**/*.js', '**/*.svelte'],
		languageOptions: {
			parserOptions: {
				warnOnUnsupportedTypeScriptVersion: false,
			},
		},
	},
]
