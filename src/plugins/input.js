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
      <input type='text' />
      <button style={{ marginLeft: '10px' }} className='icon-base icon-checkmark' type='submit' />
    </form>;
  }
}

export default function (sam) {
  sam.action('input', function (el, classification) {
    return sam.render(<InputForm classify={sam.classify.bind(sam)} />, el);
  });
}
