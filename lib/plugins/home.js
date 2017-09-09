import React from 'react';

export default function (sam) {
  sam.action('home', function (el) {
    const content = document.getElementById('content');

    content.className += ' home';

    const teardown = sam.render(<img
      src='assets/svg/loading-screen-logo.svg'
      className='logo' alt='MySam Logo' />, el);

    return function () {
      content.className = content.className.replace(' home', '');
      teardown();
    };
  });

  sam.learn('home', { description: 'Go home' });
}
