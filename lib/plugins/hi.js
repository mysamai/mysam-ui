import React from 'react';
import Typer from '../components/typer';

export default function (sam) {
  sam.action('hi', function (el, classification) {
    const to = classification.extracted.to;
    const text = `Hi ${to}!`;

    return sam.render(el, <h1><Typer>{text}</Typer></h1>);
  });

  sam.learn('hi', {
    description: 'Say hi',
    tags: [ 'to' ]
  });
}
