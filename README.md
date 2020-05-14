[npm]: https://img.shields.io/npm/v/interserver-svelte.svg?style=flat-square
[npm-url]: https://npmjs.com/package/interserver-svelte

# Interserver Svelte

[![npm package][npm]][npm-url]
![npm bundle size](https://img.shields.io/bundlephobia/min/interserver-svelte?style=flat-square)
![NPM](https://img.shields.io/npm/l/interserver-svelte?style=flat-square)
![GitHub last commit](https://img.shields.io/github/last-commit/mefechoel/interserver-svelte?style=flat-square)

> IntersectionObserver simplified

Checkout the main [`interserver`](https://www.npmjs.com/package/interserver) package.

## Features

- Tiny (~1kb minified)
- TypeScript ready

## Installation

With `yarn`:

```bash
yarn add interserver-svelte
```

With `npm`:

```bash
npm install --save interserver-svelte
```

## Usage

The `createInterserver` function takes the same options as the `interserver` function (`top`, `right`, `bottom`, `left` and `once`).

```html
<script>
  import createInterserver from 'interserver-svelte';

  let container;

  const intersecting = createInterserver(() => container);

  $: if ($intersecting) {
    console.log("Now you see me!");
  } else {
    console.log("Oh, the darkness...");
  }
</script>

<div bind:this={container}>
  ...
</div>
```

## Example

You can build a `LazyImage` component, that only requests an image, when it is approaching the viewport:

```html
<!-- LazyImage.svelte -->
<script>
  import createInterserver from 'interserver-svelte';

  export let alt = '';
  export let src = '';
  export let srscet = null;

  let container;

  const intersecting = createInterserver(() => container, {
    once: true,
    top: 50,
    right: 50,
    bottom: 50,
    left: 50,
  });

  $: src = $intersecting ? src : null;
  $: srcset = $intersecting ? srcset : null;
</script>

<img {...$$props} {src} {srcset} {alt} bind:this={container} />
```

## License

MIT
