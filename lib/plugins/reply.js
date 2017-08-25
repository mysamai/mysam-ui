import React from 'react';
import ReactDOM from 'react-dom';
import Typer from '../components/typer';

export default function() {
  this.action('reply', function(el, classification) {
    const { reply } = classification.action;

    ReactDOM.render(<h1><Typer>{reply}</Typer></h1>, el);

    return function() {
      ReactDOM.unmountComponentAtNode(el);
    }
  });

  this.learn('reply', {
    description: 'Reply with',
    form(classification = {}) {
      const action = classification.action || {};
      
      return <input type="text" className="reply" defaultValue={action.reply} />
    },
    onSubmit(form) {
      return {
        reply: form.querySelector('.reply').value
      };
    }
  });
}
