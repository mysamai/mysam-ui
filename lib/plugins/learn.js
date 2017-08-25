import React from 'react';
import ReactDOM from 'react-dom';

import Learner from '../components/learner';

export default function() {
  const app = this;
  
  app.action('learn', function(el) {
    const { classification, action } = this.state;

    app.set('previousClassification', null);

    ReactDOM.render(<Learner classification={classification} action={action} />, el);

    return function() {
      ReactDOM.unmountComponentAtNode(el);
    }
  });
}
