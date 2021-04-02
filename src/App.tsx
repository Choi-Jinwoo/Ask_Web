import { HomePage } from 'pages/home.page';
import { Route, Switch } from 'react-router';

import 'styles/base.scss';

function App() {
  return (
    <Switch>
      <Route path='/' exact component={HomePage} />
    </Switch>
  );
}

export default App;
