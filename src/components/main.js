import React from 'react';
import { observer } from 'mobx-react';

import Toolbar from './toolbar';

export default observer(({ sam }) => {
  return <div className='full'>
    <Toolbar recognizer={sam.recognizer} sam={sam} />
    <div id='main' />
    <footer />
  </div>;
});
