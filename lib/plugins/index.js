import reply from './reply';
import learn from './learn';
import hi from './hi';
import home from './home';

export default function () {
  return function (app) {
    app.configure(reply)
      .configure(learn)
      .configure(hi)
      .configure(home);
  };
}
