import React from 'react';
import { observer } from 'mobx-react';

export default observer(({ recognizer }) => {
  const { listening, transcript } = recognizer;
  const className = `icon-base ${listening ? 'animated pulse infinite icon-mysam-icon' : 'icon-microphone'}`;

  return <header>
    <div className='padded'>
      <div className='pull-right'>
        <small>{transcript.text}</small>

        <button onClick={() => recognizer.toggle()}
          className={className} />
      </div>
    </div>
  </header>;
});
