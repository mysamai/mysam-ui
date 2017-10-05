import _debug from 'debug';
import { EventEmitter } from 'events';
import { extendObservable } from 'mobx';

class DummyRecognition {
  start() {
    if(typeof this.onerror === 'function') {
      this.onerror(new Error('Speech recognition is not supported'));
    }
  }
}

const debug = _debug('mysam-frontend:recognizer');
const SpeechRecognition = window.SpeechRecognition ||
  window.webkitSpeechRecognition ||
  window.mozSpeechRecognition ||
  window.msSpeechRecognition ||
  window.oSpeechRecognition ||
  DummyRecognition;

export default class Recognizer extends EventEmitter {
  constructor ({ continuous = false, interimResults = false } = {}) {
    super();

    const recognition = this.recognition = new SpeechRecognition();

    extendObservable(this, {
      listening: false,
      transcript: ''
    });

    recognition.interimResults = continuous;
    recognition.continuous = continuous;

    recognition.onresult = event => this.emit('result', event);
    recognition.onerror = event => this.emit('error', event);
    recognition.onstart = () => this.emit('start');
    recognition.onend = () => this.emit('end');

    this.on('error', error =>
      debug('Recognition service error', error)
    );

    this.on('start', () => {
      this.listening = true;
    });

    this.on('end', () => {
      this.listening = false;
    });

    this.on('transcript', transcript => {
      this.transcript = transcript;
    });

    this.on('result', event => {
      if (event.results.length > 0) {
        let transcripts = event.results[event.results.length - 1];

        if (continuous || transcripts.isFinal) {
          const { confidence, transcript } = transcripts[0];

          this.emit('transcript', { confidence, text: transcript });
        }
      }
    });
  }

  set lang(language) {
    return (this.recognition.lang = language);
  }

  teardown () {
    return this.stop().then(() => this.removeAllListeners());
  }

  toggle () {
    return this.listening ? this.stop() : this.start();
  }

  start () {
    return new Promise((resolve, reject) => {
      const onError = event => reject(new Error(event.message));

      debug('Starting recognition');

      this.listening = false;
      this.recognition.start();

      this.once('transcript', transcript => {
        if (transcript.isFinal) {
          debug('Got final transcript', transcript);
          this.stop();
          this.removeListener('error', onError);
          resolve(transcript);
        }
      });

      this.once('error', onError);
    });
  }

  stop () {
    return new Promise(resolve => {
      if (!this.listening) {
        return resolve();
      }

      debug('Stopping recognition');
      this.recognition.stop();
      this.once('end', () => resolve());
    });
  }
}
