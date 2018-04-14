# Cannon Shooter
Simple Cannon Shooter game built in [React VR][reactvr]

## Stage
Adding particles and sounds

- Update Wall's component state
- Add particles to Wall component
- Update Cannon's state on shot
- Add particles to Cannon component
- Add sound to Wall’s component
- Play sound when box is hit
- Add sound to Cannon’s component

## Requirements
- [Node.js][node.js]
- [Yarn][yarn]
- [React VR CLI][reactvr-cli]
- [Chrome][chrome] or other browser which supports WebVR (or at least the experimental flag) - [see more][browser-reference]

## Usage
- `yarn install` (or `npm install` if you use NPM)
- `yarn start` and go to http://localhost:8081/vr/

## Building a production release
- `yarn bundle` (see [docs](https://facebook.github.io/react-vr/docs/publishing.html))

## How to enable WebVR in Chrome Android
- go to `chrome://flags`
- search for "WebVR"
- click "Enabled"

[reactvr-cli]: https://facebook.github.io/react-vr/docs/getting-started.html#content
[reactvr]: https://facebook.github.io/react-vr/
[webvr]: https://developer.mozilla.org/en-US/docs/Web/API/WebVR_API
[node.js]: https://nodejs.org/en/
[yarn]: https://yarnpkg.com/en/
[chrome]: https://www.google.com/chrome/
[browser-reference]: https://webvr.info/developers/