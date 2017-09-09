import React from 'react';
import map from 'lodash/map';
import omit from 'lodash/omit';
import isEqual from 'lodash/isEqual';
import _debug from 'debug';

import Typer from './typer';
import Tagger from './tagger';

const debug = _debug('mysam-frontend:components/learner');

class Learner extends React.Component {
  constructor (props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
  }

  get app () {
    return this.props.sam;
  }

  submitForm (ev) {
    if (ev) {
      ev.preventDefault();
    }

    const base = typeof this.learner.onSubmit === 'function'
        ? this.learner.onSubmit(this.form) : {};
    let action = Object.assign({}, this.state.action, base);

    if (isEqual(action, this.state.action) && action._id) {
      action = action._id;
    } else {
      action = omit(action, '_id');
    }

    const data = {
      text: this.state.classification.text, action
    };

    debug('Creating training', data);

    this.app.service('trainings').create(data).then(training => {
      debug('Sending classification from new training', training);
      this.app.processClassification(training.classification);
    });
  }

  render () {
    const { classification, action } = this.app;
    let text = 'There is nothing here for me to learn';

    if (!classification || !classification.action || !action.type) {
      return <h1>
        <Typer key={text}>{text}</Typer>
      </h1>;
    }

    const learner = this.learner = this.app.learners[action.type];
    const form = typeof learner.form === 'function' ? learner.form : function () {};

    const selectAction = ev => {
      this.app.action = {
        type: ev.target.value,
        text: action.text
      };
    };

    if (classification.confidence > 0.3) {
      text = 'Is this what you would like me to do?';
    } else {
      text = 'I am not sure what to do. Tell me?';
    }

    return <form id='learner' onSubmit={this.submitForm} ref={el => (this.form = el)}>
      <Tagger action={action} classification={classification} learner={learner} />
      <h1><Typer key={text}>{text}</Typer></h1>
      <select onChange={selectAction} value={action.type}>
        {map(this.app.learners, (learner, name) =>
          <option key={name} value={name}>
            {learner.description}
          </option>
        )}
      </select>
      {form(classification)}
    </form>;
  }
}

export default Learner;
