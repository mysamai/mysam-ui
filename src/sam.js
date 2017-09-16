import _debug from 'debug';
import { extendObservable } from 'mobx';
import ReactDOM from 'react-dom';
import Recognizer from './recognizer';

const debug = _debug('mysam-frontend:sam');
const defaultConfig = {
  confidence: {
    unsure: 0.3,
    learn: 0.5,
    certain: 0.9
  }
};

module.exports = class MySamUi {
  constructor (app, config = defaultConfig) {
    extendObservable(this, {
      recognizer: new Recognizer(),
      currentAction: null,
      classification: null,
      previousClassification: null
    });

    this.configuration = config;
    this.app = app;
    this.actions = {};
    this.learners = {};

    this.service('classify').on('created',
      classification => this.processClassification(classification)
    );

    this.recognizer.on('transcript', transcript =>
      this.service('classify').create(transcript)
    );
  }

  get element() {
    return document.getElementById('main');
  }

  service (...args) {
    return this.app.service(...args);
  }

  configure (fn) {
    fn.call(this, this);

    return this;
  }

  learn (type, learner) {
    this.learners[type] = learner;
  }

  action (name, callback) {
    debug('Registering new action', name);

    this.actions[name] = callback;
  }

  classify (text) {
    return this.service('classify').create({ text });
  }

  render (content, el) {
    ReactDOM.render(content, el);

    return function () {
      ReactDOM.unmountComponentAtNode(el);
    };
  }

  processClassification (classification) {
    if (classification) {
      const previous = this.previousClassification;
      const { confidence } = this.configuration;

      let type = classification.action.type;

      debug('Got classification', classification);

      // If the last classification didn't get retrained and
      // I am certain enough but not too sure, retrain with this action
      if (previous && previous.confidence > confidence.learn &&
          previous.confidence < confidence.certain) {
        const training = {
          text: previous.text,
          action: previous.action._id
        };
        debug('Creating new training from previous classification', training);
        this.service('trainings').create(training);
      }

      this.previousClassification = classification;

      // Update state
      this.classification = classification;
      this.currentAction = classification.action;

      if (classification.confidence <= confidence.learn) {
        type = 'learn';
      }

      this.runAction(type, classification);
    }
  }

  runAction (type, classification) {
    if (typeof this._teardownAction === 'function') {
      debug('Calling plugin teardown function');
      this._teardownAction();
    }

    delete this._teardownAction;

    const fn = this.actions[type];

    if (typeof fn !== 'function') {
      throw new Error(`'${type}' is not a valid action!`);
    }

    this._teardownAction = fn.call(this, this.element, classification);
  }
};
