import React from 'react';
import Typer from '../components/typer';

export default function (sam) {
  sam.action('reply', function (el, classification) {
    const { reply } = classification.action;

    return sam.render(<h1><Typer>{reply}</Typer></h1>, el);
  });

  sam.learn('reply', {
    description: 'Make a reply',
    form (classification = {}) {
      const { action = {} } = classification;

      return <input type='text' className='reply' defaultValue={action.reply} />;
    },
    onSubmit (form) {
      return {
        reply: form.querySelector('.reply').value
      };
    }
  });
}
