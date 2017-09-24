import reply from './reply';
import learn from './learn';
import hi from './hi';
import home from './home';
import help from './help';
import input from './input';
import language from './language';

export default function () {
  return function (app) {
    app.configure(reply)
      .configure(learn)
      .configure(hi)
      .configure(home)
      .configure(help)
      .configure(input)
      .configure(language);
  };
}
