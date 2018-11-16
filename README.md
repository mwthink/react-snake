# react-snake
Snake in a React component

Purely a fun project. If you learn something from it, cool.

Do not consider this a course in "best practices" by any measure. The entire
game is rendered using DOM nodes and CSS rules. It will cripple your
computer if you set the grid size to be too large, because you shouldn't
use DOM nodes to render your games.

## Building
```sh
yarn install

# To run with webpack-dev-server
npm run dev

# To build static assets into ./build
npm run build
```
