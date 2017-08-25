import React from 'react';
import map from 'lodash/map';
import assign from 'lodash/assign';
import cloneDeep from 'lodash/cloneDeep';
import omit from 'lodash/omit';
import isEqual from 'lodash/isEqual';
import _debug from 'debug';

import Component from './base';
import app from '../app';
import Typer from './typer';
import Tagger from './tagger';

const debug = _debug('mysam-frontend:components/learner');

class Learner extends Component {
  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
  }

  componentWillMount() {
    app.on('confirm', this.submitForm);
  }

  componentWillUnmount() {
    app.removeListener('confirm', this.submitForm);
  }

  submitForm(ev) {
    if(ev) {
      ev.preventDefault();
    }

    const base = typeof this.learner.onSubmit === 'function' ?
        this.learner.onSubmit(this.form) : {};
    let action = Object.assign({}, this.state.action, base);

    if(isEqual(action, this.state.action) && action._id) {
      action = action._id;
    } else {
      action = omit(action, '_id');
    }

    const data = {
      text: this.state.classification.text, action
    };

    debug('Creating training', data);

    app.service('trainings').create(data).then(training => {
      debug('Sending classification from new training', training);
      app.processClassification(training.classification);
    });
  }

  render() {
    const { classification, action } = this.state;

    let text = 'There is nothing here for me to learn';
    
    if(!classification.action || !action.type) {
      return <h1>
        <Typer key={text}>{text}</Typer>
      </h1>;
    }

    const learner = this.learner = app.learners[action.type];
    const form = typeof learner.form === 'function' ? learner.form : function() {};

    const selectAction = ev => {
      app.state.action = {
        type: ev.target.value,
        text: action.text
      };
    }

    if(classification.confidence > 0.3) {
      text = 'Is this what you would like me to do?';
    } else {
      text = 'I am not sure what to do. Tell me?';
    }

    return <form id="learner" onSubmit={this.submitForm} ref={el => this.form = el}>
      <Tagger action={action} classification={classification} learner={learner} />
      <h1><Typer key={text}>{text}</Typer></h1>
      <select onChange={selectAction} value={action.type}>
        {map(app.learners, (learner, name) => 
          <option key={name} value={name}>
            {learner.description}
          </option>
        )}
      </select>
      {form(classification)}
    </form>
  }
}

export default Learner;
