import { HomePage } from 'pages/home.page';
import { LecturePage } from 'pages/lecture.page';
import { Route, Switch } from 'react-router';

import 'styles/base.scss';

function App() {
  return (
    <Switch>
      <Route path='/' exact component={HomePage} />
      <Route path='/lecture' exact component={LecturePage} />
    </Switch>
  );
}

export default App;
