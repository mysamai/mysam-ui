import React from 'react';
// import Toolbar from './toolbar';

export default function({ app }) {
  // <Toolbar recognizer={app.service('recognizer')}
  //    listening={app.listening}
  //    transcript={app.transcript} />
  return <div className="full">
    <div id="main"></div>
    <footer />
  </div>;
}
