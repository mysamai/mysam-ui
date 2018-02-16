import React from 'react';
import Typer from '../components/typer';

export default function (sam) {
  sam.action('help', function (el, classification) {
    const { reply } = classification.action;

    return sam.render(<div>
      <h1><Typer>{reply || 'Here is what I can do:'}</Typer></h1>
      <ul>
        {Object.keys(sam.learners).map(name =>
          <li key={`learner-${name}`}>{sam.learners[name].description}</li>
        )}
      </ul>
    </div>, el);
  });

  sam.learn('help', {
    description: 'Show the help',
    form (classification = {}) {
      const { action = {} } = classification;

      return <input type='text' className='reply'
        placeholder='Show the help and this text'
        defaultValue={action.reply} />;
    },
    onSubmit (form) {
      return {
        reply: form.querySelector('.reply').value
      };
    }
  });
}
