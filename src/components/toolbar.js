import React from 'react';
import { observer } from 'mobx-react';

export default observer(({ recognizer, sam }) => {
  const { listening, transcript } = recognizer;
  const className = `icon-base ${listening ? 'animated pulse infinite icon-mysam-icon' : 'icon-microphone'}`;
  const startRecognition = () => recognizer.toggle()
    .catch(error => sam.runAction('input', { error }));

  return <header>
    <div className='padded'>
      {sam.currentAction
        ? <div className='pull-left'>
          <button className='round-button small' onClick={() => sam.runAction('learn')}>
            <i className='fa fa-undo' aria-hidden='true' />
          </button>
        </div>
        : null}
      <div className='pull-right'>
        <small>{transcript.text}</small>

        <button onClick={startRecognition}
          className={className} />
        <button className='round-button small' onClick={() => sam.runAction('input')}>
          <i className='fa fa-keyboard-o' aria-hidden='true' />
        </button>
      </div>
    </div>
  </header>;
});
