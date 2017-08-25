import React from 'react';
import ReactDOM from 'react-dom';

import Typer from '../components/typer';

export default function() {
  this.action('hi', function(el, classification) {
    const to = classification.extracted.to;
    const text = `Hi ${to}!`;

    ReactDOM.render(<h1><Typer>{text}</Typer></h1>, el);

    return function() {
      ReactDOM.unmountComponentAtNode(el);
    }
  });

  this.learn('hi', {
    description: 'Say hi',
    tags: [ 'to' ]
  });
}
