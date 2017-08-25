import _debug from 'debug';

const debug = _debug('mysam-frontend:recognizer');
const SpeechRecognition = window.SpeechRecognition ||
  window.webkitSpeechRecognition ||
  window.mozSpeechRecognition ||
  window.msSpeechRecognition ||
  window.oSpeechRecognition;

export class Recognizer {
  toggle() {
    this.state.listening.then(listening => {
      debug(`Toggling from listening`, listening);
      return listening ? this.stop() : this.start();
    });
  }

  start() {
    return new Promise((resolve, reject) => {
      const onError = event => reject(new Error(event.message));

      debug('Starting recognition');

      this.state.listening = false;
      this.recognition.start();

      this.once('transcript', transcript => {
        debug('Got final transcript', transcript);
        this.stop();
        this.removeListener('error', onError);
        resolve(transcript);
      });

      this.once('error', onError);
    });
  }

  stop() {
    return new Promise(resolve => {
      debug('Stopping recognition');
      this.recognition.stop();
      this.once('end', () => resolve());
    });
  }

  setup(app) {
    const speechRecognition = this.recognition = new SpeechRecognition();

    this.state = app.state;

    speechRecognition.onresult = event => this.emit('result', event);
    speechRecognition.onerror = event => this.emit('error', event);
    speechRecognition.onstart = () => this.emit('start');
    speechRecognition.onend = () => this.emit('end');

    this.on('error', error => debug('Recognition service error', error));
    this.on('start', () => this.state.listening = true);
    this.on('end', () => this.state.listening = false);
    this.on('transcript', transcript => this.state.transcript = transcript);
    this.on('result', event => {
      if(event.results.length > 0) {
        let transcripts = event.results[event.results.length - 1];

        if(transcripts.isFinal) {
          const { confidence, transcript } = transcripts[0];

          app.service('tokenize').create({ text: transcript }).then(tokenized => {
            debug('Got tokenization from service. Emitting final transcript', tokenized);
            this.emit('transcript', Object.assign({ confidence }, tokenized));
          }).catch(error => this.emit('error', error));
        }
      }
    });
  }
}

export default function() {
  this.use('/recognizer', new Recognizer());
}
