# @twicpics/react

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]

> [TwicPics](https://www.twicpics.com) integration with React.

## Setup

1.  Add `@twicpics/react` dependency to your project

```bash
yarn add @twicpics/react
# or npm install @twicpics/react
```

2.  Setup

```js
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { TwicPics } from "@twicpics/react";

TwicPics({
  domain: "https://demo.twic.pics",
  anticipation: 0.5,
  maxDPR: 2,
  step: 100,
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
```

## Options

### `domain` (required)

This is your very own [TwicPics domain](https://www.twicpics.com/documentation/subdomain/). 

### `anticipation`

*   Default value: `0.2` (any value that is not a number will be ignored)

TwicPics will lazy-load images by default. To avoid too abrupt a transition with elements appearing into view and then images very obviously loading afterwards, TwicPics will "anticipate" lazy loading by a factor of the actual viewport. This behavior is controlled by this setting.

### `maxDPR`

*   Default value: `2` (any value that is not a number will be ignored)

TwicPics will take the Device Pixel Ratio of the current device into consideration when determining the sizes of images to load. By default, it will not take a DPR greater than 2 into consideration. If the DPR of the device is higher than 2, TwicPics will assume it to be 2. So you can lower it to 1 or be more permissive (for instance by setting it to 3 or 4).

### `step`

*   Default value: `10` (any value that is not a number will be ignored)

To avoid requesting too may variants of the same image, TwicPics will round the width of images to the closest multiple of step. The height will then be computed in order to respect the original aspect ratio.

## Usage

### `TwicImg` component

```html
<TwicImg 
  src="<image-path>"
  width="<integer>"
  height="<integer>"
  placeholder="<none|preview|meancolor|maincolor>"
  mode="<contain|cover>"
  position="<css position>"
  ratio="<ratio>"
  step="<integer>"
  focus="<auto|coordinates>"
  transition="<boolean>"
/>
```

| Name | Description | Type | Default | Required |
|------|-------------|------|---------|----------|
| `src` | Absolute or relative path to an image. | `String` | | `true` |
| `width` | See `ratio`. | `Integer` | | `false` |
| `height` | See `ratio`. | `Integer` | | `false` |
| `ratio` | Unitless `width/height` value pair. You can either use `ratio` or `width` and `height` to set the aspect-ratio of the area your image will be in. If both are used, `ratio` win. A squared area will be created by default. | `String` | `1/1` | `false` |
| `placeholder` | Can be `preview`, `meancolor`, `maincolor` or `none`. | `String` | `preview` | `false` |
| `mode` | Can be `contain` or `cover` and determines if the image fills the area and is cropped accordingly (`cover`) or if the image will sit inside the area with no cropping (`contain`). | `String` | `cover` | `false` |
| `position` | Only useful in `contain` mode. Locates the image inside the area. Syntax is the same as for CSS position properties like [background-position](https://developer.mozilla.org/en-US/docs/Web/CSS/background-position) or [object-position](https://developer.mozilla.org/en-US/docs/Web/CSS/object-position). Useful values are `top`, `bottom`, `left`, `right`, `left top`, `left bottom` and so on. | `String` | `center` | `false` | 
| `step` | See [TwicPics documentation](https://www.twicpics.com/documentation/script-attributes-image/#data-twic-src-step) for details. | `Integer` | `10` | `false` |
| `focus` | Only useful in `cover` mode. Can be `auto` or coordinates - see [TwicPics documentation](https://www.twicpics.com/documentation/script-attributes-image/#data-twic-src-focus) for details. | `String` | `10` | `false` |
| `transition` | Whether or not to load images with a fade in effect. | `Boolean` | `true` | `false` |
| `transitionDuration` | Duration of the transition effect. | `String` | `400ms` | `false` |
| `transitionTimingFunction` | CSS timing function applied to the transition effect. | `String` | `ease` | `false` |
| `transitionDelay` | Transition delay of the transition effect. | `String` | `0ms` | `false` |
| `alt` | `alt` attribute content | `String` | Image name without extention | `false` |

### Example

```js
import TwicImg from "@twicpics/react";
import "@twicpics/react/build/twicpics.css";

function App() {
  return (
    <main>
      <TwicImg
        src="/my-image.jpg"
        ratio="16/9"
        step="100"
        focus="auto"
        placeholder="preview"
      />
    </main>
  );
}

export default App;
```

## Demo

[![Edit TwicPics React](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/twicpics-react-miyzz?fontsize=14&hidenavigation=1&theme=dark)

## License

[MIT License](./LICENSE)

Copyright (c) TwicPics

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/@twicpics/react/latest.svg
[npm-version-href]: https://npmjs.com/package/@twicpics/react

[npm-downloads-src]: https://img.shields.io/npm/dt/@twicpics/react.svg
[npm-downloads-href]: https://npmjs.com/package/@twicpics/react

[license-src]: https://img.shields.io/npm/l/@twicpics/react.svg
[license-href]: https://npmjs.com/package/@twicpics/react
