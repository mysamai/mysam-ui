import React from 'react';
import Typer from '../components/typer';

export default function (sam) {
  sam.action('hi', function (el, classification) {
    const to = classification.extracted.to || 'you';
    const text = `Hi ${to}!`;

    return sam.render(<h1><Typer>{text}</Typer></h1>, el);
  });

  sam.learn('hi', {
    description: 'Say hi',
    tags: [ 'to' ]
  });
}
