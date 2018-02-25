import React from 'react';
import { observer } from 'mobx-react';

import map from 'lodash/map';
import omit from 'lodash/omit';
import merge from 'lodash/merge';
import _debug from 'debug';

import Typer from '../../components/typer';
import Tagger from './tagger';

const debug = _debug('mysam-frontend:components/learner');
// Hack for now
const toObject = obj => JSON.parse(JSON.stringify(obj));

class Learner extends React.Component {
  get store () {
    return this.props.store;
  }

  submitForm = ev => {
    if (ev) {
      ev.preventDefault();
    }

    const base = this.store.learner.onSubmit(this.form);
    const action = omit(merge({}, this.store.action, base), '_id');

    const data = toObject({
      text: this.store.classification.text,
      type: 'custom',
      action
    });

    this.store.sam.service('trainings').create(data).then(training => {
      debug('Sending classification from new training', training);
      this.store.sam.processClassification(training.classification);
    });
  }

  selectAction = ev => {
    const { learners, action } = this.store;
    const { value: type } = ev.target;
    const tags = {};

    (learners[type].tags || []).forEach(tag => {
      tags[tag] = null;
    });

    Object.assign(action, { type, tags });
  }

  render () {
    const { action, learner, classification, learners } = this.store;
    const text = classification.confidence > 0.3
      ? 'Is this what you would like me to do?'
      : 'I am not sure what to do. Tell me?';

    return <form id='learner' onSubmit={this.submitForm} ref={el => (this.form = el)}>
      <h1><Typer key={text}>{text}</Typer></h1>
      <Tagger tokens={classification.tokens} action={action} learner={learner} />
      <select onChange={this.selectAction} value={action.type}>
        {map(learners, (learner, name) =>
          <option key={name} value={name}>
            {learner.description}
          </option>
        )}
      </select>
      {learner.form(classification)}
      <p><button className='icon-base icon-checkmark' type='submit' /></p>
    </form>;
  }
}

export default observer(Learner);
