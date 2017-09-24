import _debug from 'debug';
import React from 'react';
import ReactDOM from 'react-dom';
import mysam from 'mysam/lib/browser';

import MySamUi from './sam';
import Main from './components/main';
import plugins from './plugins';
import seeds from './seed-trainings';

const debug = _debug('mysam-ui');

module.exports = function (el, config = {}) {
  const app = mysam();
  const sam = new MySamUi(app);

  ReactDOM.render(<Main sam={sam} />, el);

  sam.configure(plugins());
  sam.runAction('home');

  const trainings = sam.service('trainings');

  trainings.find().then(page => {
    if (page.total === 0) {
      debug('Initializing seed traings', seeds);
      seeds.forEach(current => trainings.create(current));
    }
  });

  return sam;
};
