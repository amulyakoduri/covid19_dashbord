import {Switch, Route, Redirect} from 'react-router-dom'
import Home from './components/Home'
import About from './components/About'
import Vaccination from './components/Vaccination'
import StateWiseData from './components/StateWiseData'
import NotFound from './components/NotFound'
import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/about" component={About} />
    <Route exact path="/state/:stateCode" component={StateWiseData} />
    <Route exact path="/vaccination" component={Vaccination} />
    <Route path="/bad-path" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
