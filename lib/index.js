import React from 'react';
import ReactDOM from 'react-dom';
import { extendObservable } from 'mobx';

import sam from './sam';
import Main from './components/main';
import plugins from './plugins';

module.exports = function(app, el) {
  extendObservable(app, {
    listening: false,
    transcript: '',
    action: {},
    classification: {}
  });

  Object.assign(app, sam);

  ReactDOM.render(<Main app={app} />, el);

  app.configure(plugins());
  app.runAction('home');

  return app;
};


// export const config = {
//   confidence: {
//     unsure: 0.3,
//     learn: 0.5,
//     certain: 0.9
//   }
// };

// export default function() {
//   return function() {
//     const app = this;

//     each(config, (value, key) => app.set(key, value));
//   };
// }

// const classify = app.service('classify');

// classify.on('created', classification => app.processClassification(classification));

// app.service('recognizer').on('transcript', transcript => {
//   debug('Received transcript, creating new classification', transcript);
//   classify.create(transcript);
// });
