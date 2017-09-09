import React from 'react';
import ReactDOM from 'react-dom';

import MySamUi from './sam';
import Main from './components/main';
import plugins from './plugins';

module.exports = function (app, el) {
  const sam = new MySamUi(app);

  ReactDOM.render(<Main sam={sam} />, el);

  sam.configure(plugins());
  sam.runAction('learn');

  app.service('classify').on('created',
    classification => sam.processClassification(classification)
  );

  return sam;
};

// const classify = app.service('classify');

// classify.on('created', classification => app.processClassification(classification));

// app.service('recognizer').on('transcript', transcript => {
//   debug('Received transcript, creating new classification', transcript);
//   classify.create(transcript);
// });
