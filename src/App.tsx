import { Redirect, Switch, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import { AddClients } from './components/pages/Clients/AddClients';
import Home from './components/pages/Home';

function App() {
  return (
    <Layout>
      <Switch>
          <Route exact path='/'>
            <Redirect to='/home'/>
          </Route>
          <Route exact path='/home'>
            <Home />
          </Route>
          <Route exact path='/clients'>
            <AddClients />
          </Route>
      </Switch>
    </Layout>
  );
}

export default App;
