# Event Tracker
## @cuppilekkia/event-tracker - JS Event Tracking

### [Code coverage](./coverage/lcov-report/index.html)

Collect and send data to an API endpoint, uses the SendBeacon method if available in the browser, otherwise classic POST request.

This package is built using webpack 4.


## Getting started

### Download 

Via npm

```bash
$ npm install @cuppilekkia/event-tracker --save
```


### Usage

#### ES6 modules

```javascript
import { Tracker } from '@cuppilekkia/event-tracker';
```

#### CommonJS

```javascript
const Tracker = require('@cuppilekkia/event-tracker');
```

### Initialization

```javascript
window.trackerClient = new Tracker({
  api: '[API PATH i.e. "/data" ]',
  host: '[API HOST i.e. "https://mydatacollector.com"]',
});
```

#### File include [WIP]

Link `tracker.js` in your HTML :

```html
<script src="tracker.js"></script>
<script>
  var trackerClient = new tracker.Tracker({ 
    api: '[API PATH i.e. "/data" ]', 
    host: '[API HOST i.e. "https://mydatacollector.com"]' 
  });
</script>
```

### Send data
Send any kind of object as payload, containing all the data you want to send.

```javascript
var payload = {
  key1: value,
  key2: {...},
  ...
}
trackerClient.push(payload);
```

## DEVELOPMENT
[add here development notes]
this package uses `semantic release` so please follow the sintax like:

| Commit message                                                                                                                                                                                   | Release type               |
|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------|
| `fix(pencil): stop graphite breaking when too much pressure applied`                                                                                                                             | Patch Release              |
| `feat(pencil): add 'graphiteWidth' option`                                                                                                                                                       | ~~Minor~~ Feature Release  |
| `perf(pencil): remove graphiteWidth option`<br><br>`BREAKING CHANGE: The graphiteWidth option has been removed.`<br>`The default graphite width of 10mm is always used for performance reasons.` | ~~Major~~ Breaking Release |

## TODO
- build a demo page with additionally a test node server
- find a way to test cookie creation
- fix coverage building and job to move into public
