import React from 'react';
import { extendObservable } from 'mobx';
import Learner from './learner';

export class Store {
  constructor (sam) {
    const { classification, learners } = sam;
    const action = sam.currentAction;

    extendObservable(this, {
      sam,
      action,
      classification,
      learners,
      selectedTag: null,
      get learner () {
        return Object.assign({
          form () {},
          onSubmit () {
            return {};
          }
        }, this.learners[this.action.type]);
      }
    });
  }
}

export default function (sam) {
  sam.action('learn', function (el) {
    const store = new Store(sam);

    sam.previousClassification = null;

    return sam.render(<Learner store={store} />, el);
  });

  sam.learn('learn', {
    description: 'Show the learning screen'
  });
}
