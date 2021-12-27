import {Switch, Route, Redirect} from 'react-router-dom'
import Home from './components/Home'
import About from './components/About'
import StateWiseData from './components/StateWiseData'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <ProtectedRoute path="/about" component={About} />
    <ProtectedRoute path="/state/:stateCode" component={StateWiseData} />
    <Route path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
