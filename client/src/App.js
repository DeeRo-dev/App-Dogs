import {BrowserRouter, Route, Switch} from 'react-router-dom' //, Route, Switch}
import './App.css';
import CreateDog from './components/CreateDog';
import Detail from './components/Detail';
import Home from './components/Home';

import LandingPage from './components/Landingpage';


function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
      <Route exact path= '/' component ={LandingPage}/>
      <Route exact path= '/home' component ={Home}/>
      <Route exact path= '/create' component ={CreateDog}/>
      <Route exact path= '/home/:id' component ={Detail}/>
      </Switch>
     
    </div>
    </BrowserRouter>
  );
}

export default App;
