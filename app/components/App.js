var React = require('react');

/* Seperate React Router Library */
/* The name of the tag which sets up all the routing. */
var ReactRouter = require('react-router-dom');
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;

/* Created a navigation component */
var Nav = require('./Nav'); 

var Home = require('./Home');
var Popular = require('./Popular');
var Battle = require('./Battle');
var Results = require('./Results');

var Switch = ReactRouter.Switch;

class App extends React.Component {
  render() {
    return (
      // The name of the tag which sets up all the routing.
      <Router>
        <div className="container">
          <Nav />
          {/* Tnis sets error page if none of the routes set below are active */}
          <Switch>
            {/* Route works by matching the path to whats in the 
              address bar and then pushing the component onto the page.
              The use of the exact property is to prevent any additional
              components appearing based on the path  */}
            <Route exact path="/" component={Home} />
            <Route exact path="/battle" component={Battle} />
            <Route path="/battle/results" component={Results} />
            <Route path="/popular" component={Popular} />  
            
            {/*  The final route is the default content or component
              if none of the paths above are retrieved */}
            <Route render={function() {
              return <p>Not Found</p>
            }} />
          </Switch>
        </div>
      </Router>

    )
  }
}

module.exports = App; 