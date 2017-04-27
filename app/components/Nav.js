var React = require('react');

/* Only using NavLink instead of Link and NavLink uses the same Link code 
but with additional features */
var NavLink = require('react-router-dom').NavLink;

/* NavLink uses activeClass Name for when the path contains the top
value */
/* As the home to value '/' will be included in the majourity of links 'exact'
is used to tell React to display as active if there the to value is exactly thesame */
function Nav() {
  return (
    <ul className="nav">
      <li>
        <NavLink exact activeClassName="active" to="/">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName="active" to="/battle">
          Battle
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName="active" to="/popular">
          Popular
        </NavLink>
      </li>
    </ul>
  )
}

/* Use module.exports to make it available in the App.js */
module.exports = Nav;