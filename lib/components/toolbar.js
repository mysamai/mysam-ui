import React from 'react';
import Component from './base';

class Toolbar extends Component {
  render() {
    const { listening, transcript } = this.state;
    const className = `icon-base ${listening ? 'animated pulse infinite icon-mysam-icon' : 'icon-microphone'}`;
    
    return <header>
      <div className="padded">
        <div className="pull-right">
          <small>{transcript.text}</small>

          <button onClick={() => this.props.recognizer.toggle()}
            className={className}>
          </button>
        </div>
      </div>
    </header>
  }
}

export default Toolbar;
