import React from 'react';
import Typer from '../components/typer';

export default function (sam) {
  sam.action('help', function (el, classification) {
    return sam.render(<div>
      <h1><Typer>Here is what I can do:</Typer></h1>
      <ul>
        {Object.keys(sam.learners).map(name =>
          <li>{sam.learners[name].description}</li>
        )}
      </ul>
    </div>, el);
  });

  sam.learn('help', {
    description: 'Show the help'
  });
}
