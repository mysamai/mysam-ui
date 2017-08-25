import _debug from 'debug';

const debug = _debug('mysam-frontend:sam');

export default {
  processClassification(classification) {
    if(classification) {
      const previous = this.get('previousClassification');
      const confidences = this.get('confidence');

      let type = classification.action.type;

      debug('Got classification', classification);

      // If the last classification didn't get retrained and
      // I am certain enough but not too sure, retrain with this action
      if(previous && previous.confidence > confidences.learn &&
          previous.confidence < confidences.certain) {
        const training = {
          text: previous.text,
          action: previous.action._id
        };
        debug('Creating new training from previous classification', training);
        this.service('trainings').create(training);
      }

      this.set('previousClassification', classification);

      // Update state
      this.state.classification = classification;
      this.state.action = classification.action;

      if(classification.confidence <= confidences.learn) {
        type = 'learn';
      }

      this.runAction(type, classification);
    }
  },

  runAction(type, classification) {
    const main = document.getElementById('main');

    if(typeof this._teardownAction === 'function') {
      debug('Calling plugin teardown function');
      this._teardownAction.call(this);
    }

    delete this._teardownAction;

    if(typeof this.actions[type] !== 'function') {
      throw new Error(`'${type}' is not a valid action!`);
    }

    this._teardownAction = this.actions[type].call(this, main, classification);
  },

  learn(type, learner) {
    if(!this.learners) {
      this.learners = {};
    }

    this.learners[type] = learner;
  },

  action(name, callback) {
    if(!this.actions) {
      this.actions = {};
    }

    debug('Registering new action', name);
    this.actions[name] = callback;
  }
};
