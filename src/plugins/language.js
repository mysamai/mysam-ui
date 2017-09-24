import React from 'react';
import Typer from '../components/typer';
import _debug from 'debug';

const debug = _debug('mysam-frontend:components/learner');

// Taken https://stackoverflow.com/questions/14257598/what-are-language-codes-in-chromes-implementation-of-the-html5-speech-recogniti
// No guarantee that they all will work for sure (esp. on different platforms)
const languages = [
  [ 'Afrikaans', 'af' ],
  [ 'Basque', 'eu' ],
  [ 'Bulgarian', 'bg' ],
  [ 'Catalan', 'ca' ],
  [ 'Arabic (Egypt)', 'ar-EG' ],
  [ 'Arabic (Kuwait)', 'ar-KW' ],
  [ 'Arabic (Qatar)', 'ar-QA' ],
  [ 'Arabic (UAE)', 'ar-AE' ],
  [ 'Czech', 'cs' ],
  [ 'Dutch', 'nl-NL' ],
  [ 'English (Australia)', 'en-AU' ],
  [ 'English (India)', 'en-IN' ],
  [ 'English (New Zealand)', 'en-NZ' ],
  [ 'English (South Africa)', 'en-ZA' ],
  [ 'English(UK)', 'en-GB' ],
  [ 'English(US)', 'en-US' ],
  [ 'Finnish', 'fi' ],
  [ 'French', 'fr-FR' ],
  [ 'Galician', 'gl' ],
  [ 'German', 'de-DE' ],
  [ 'Hebrew', 'he' ],
  [ 'Hungarian', 'hu' ],
  [ 'Icelandic', 'is' ],
  [ 'Italian', 'it-IT' ],
  [ 'Indonesian', 'id' ],
  [ 'Japanese', 'ja' ],
  [ 'Korean', 'ko' ],
  [ 'Latin', 'la' ],
  [ 'Mandarin Chinese', 'zh-CN' ],
  [ 'Traditional Taiwan', 'zh-TW' ],
  [ 'Simplified Hong Kong', 'zh-HK' ],
  [ 'Yue Chinese (Traditional Hong Kong)', 'zh-yue' ],
  [ 'Malaysian', 'ms-MY' ],
  [ 'Norwegian', 'no-NO' ],
  [ 'Polish', 'pl' ],
  [ 'Portuguese', 'pt-PT' ],
  [ 'Romanian', 'ro-RO' ],
  [ 'Russian', 'ru' ],
  [ 'Serbian', 'sr-SP' ],
  [ 'Slovak', 'sk' ],
  [ 'Spanish (Argentina)', 'es-AR' ],
  [ 'Spanish(Bolivia)', 'es-BO' ],
  [ 'Spanish(Dominican Republic)', 'es-DO' ],
  [ 'Spanish(Ecuador)', 'es-EC' ],
  [ 'Spanish(El Salvador)', 'es-SV' ],
  [ 'Spanish(Guatemala)', 'es-GT' ],
  [ 'Spanish(Honduras)', 'es-HN' ],
  [ 'Spanish(Mexico)', 'es-MX' ],
  [ 'Spanish(Nicaragua)', 'es-NI' ],
  [ 'Spanish(Panama)', 'es-PA' ],
  [ 'Spanish(Paraguay)', 'es-PY' ],
  [ 'Spanish(Peru)', 'es-PE' ],
  [ 'Spanish(Puerto Rico)', 'es-PR' ],
  [ 'Spanish(Spain)', 'es-ES' ],
  [ 'Spanish(US)', 'es-US' ],
  [ 'Spanish(Uruguay)', 'es-UY' ],
  [ 'Spanish(Venezuela)', 'es-VE' ],
  [ 'Swedish', 'sv-SE' ],
  [ 'Turkish', 'tr' ],
  [ 'Zulu', 'zu' ]
];

export default function (sam) {
  sam.action('language', function (el, classification) {
    const { reply } = classification.action;

    debug('Setting recognizer language to', classification.action.lang);

    sam.recognizer.lang = classification.action.lang;

    if(reply) {
      return sam.render(<h1><Typer>{reply}</Typer></h1>, el);
    }
  });

  sam.learn('language', {
    description: 'Change the language',
    form (classification = {}) {
      const action = classification.action || {};

      return <div>
        <select className='language' defaultValue={action.lang || navigator.language}>
          {languages.map(([ name, code ]) =>
            <option value={code} key={code}>{name}</option>
          )}
        </select>
        <input type='text' className='reply' placeholder='Also reply with' defaultValue={action.reply} />
      </div>;
    },
    onSubmit (form) {
      return {
        lang: form.querySelector('.language').value,
        reply: form.querySelector('.reply').value
      };
    }
  });
}
