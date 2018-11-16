import * as React from 'react';
import { render } from 'react-dom';
import Game from './Game';

const appTarget = document.createElement('div');
document.body.appendChild(appTarget);

// Inject normalize.css
const normalizeCss = document.createElement('link');
normalizeCss.rel = 'stylesheet';
normalizeCss.href = 'https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css';
normalizeCss.crossOrigin = 'anonymous';
normalizeCss.integrity = 'sha256-l85OmPOjvil/SOvVt3HnSSjzF1TUMyT9eV0c2BzEGzU=';
document.head.appendChild(normalizeCss)

render(
  <Game/>
  ,appTarget
)
