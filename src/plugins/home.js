import React from 'react';

export default function (sam) {
  sam.action('home', function (el) {
    return sam.render(<img style={{ width: '50%' }}
      src='//unpkg.com/mysam-ui/assets/svg/mysam-logo.svg'
      className='logo' alt='MySam Logo' />, el);
  });

  sam.learn('home', { description: 'Go home' });
}
