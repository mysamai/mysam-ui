import React from 'react';

class InputForm extends React.Component {
  submit (ev) {
    const { value = '' } = ev.target.querySelector('input');

    if (value.trim() !== '') {
      this.props.classify(value);
    }

    ev.preventDefault();
  }

  render () {
    return <form className='animated fadeIn' onSubmit={this.submit.bind(this)}>
      {this.props.classification.error && <h1>Oh no! I can't hear you but we can still chat</h1>}
      <input type='text' placeholder='Type here and confirm with enter or by clicking the button' />
      <button style={{ marginLeft: '10px' }} className='icon-base icon-checkmark' type='submit' />
    </form>;
  }
}

export default function (sam) {
  sam.action('input', function (el, classification = {}) {
    return sam.render(<InputForm classification={classification} classify={sam.classify.bind(sam)} />, el);
  });
}
