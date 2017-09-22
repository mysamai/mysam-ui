import React from 'react';
import { observer } from 'mobx-react';

export default observer(({ recognizer, sam }) => {
  const { listening, transcript } = recognizer;
  const className = `icon-base ${listening ? 'animated pulse infinite icon-mysam-icon' : 'icon-microphone'}`;

  return <header>
    <div className='padded'>
      <div className='pull-right'>
        <small>{transcript.text}</small>

        <button onClick={() => recognizer.toggle()}
          className={className} />
        <button className='round-button' onClick={() => sam.runAction('input')}>
          <i className='fa fa-keyboard-o' aria-hidden='true' />
        </button>
      </div>
    </div>
  </header>;
});
