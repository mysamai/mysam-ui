import reply from './reply';
// import learn from './learn';
import hi from './hi';
import home from './home';

export default function() {
  return function() {
    const app = this;

    app.configure(reply)
      // .configure(learn)
      .configure(hi)
      .configure(home);
  };
}
