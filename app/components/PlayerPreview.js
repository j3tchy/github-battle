var React = require('react');
var PropTypes = require('prop-types');

/*
  Stateless component has been created as it will strictly 
  be taking in data and not changing any states within itseld.
*/
function PlayerPreview(props) {
  /* Props will be brought in such as avatar and username */
  return (
    <div>
      <div className="column">
        <img 
          className="avatar"
          src={props.avatar}
          alt={'Avatar for ' + props.username}
        />
        <h2 className="username">@{props.username}</h2>
      </div>
      {/* Works the same as 'yield'. Makes it possible to display all the markup
      within the opening and closing tabs */}
      {props.children}
    </div>
  )
}

/*
  PropTypes is set as props are used in the component. PropTypes are used 
  so only a particular type of dat acan be accepted by the property
*/
PlayerPreview.propTypes = {
  avatar: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
}

module.exports = PlayerPreview;