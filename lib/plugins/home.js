export default function() {
  this.action('home', function(el) {
    const content = document.getElementById('content');

    content.className += ' home';

    el.innerHTML = `<img src="assets/svg/loading-screen-logo.svg" class="logo" alt="MySam Logo">`;

    return function() {
      el.innerHTML = '';
      content.className = content.className.replace(' home', '');
    };
  });

  this.learn('home', { description: 'Go home' });
}
