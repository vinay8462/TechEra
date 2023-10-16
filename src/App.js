import {Switch, Route, Redirect} from 'react-router-dom'

import Home from './components/Home'
import './App.css'
import CourseDetails from './components/CourseDetails'
import NotFound from './components/NotFound'

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/courses/:id" component={CourseDetails} />
    <Route exact path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
