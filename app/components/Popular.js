var React = require('react');
var PropTypes = require('prop-types');
var api = require('../utils/api');

var Loading = require('./Loading');

/* Pure function as it only deals with props / state and returning the UI */
/* Create a list using the Javascript map function.
Map creates an array which we loop though and return the UI
with the 'props' inside */

/* Onclick gets the item value via the bind function. First parameter
is the context of the 'this' keyword and the second is the start of the
argument */

function SelectLanguage(props) {
  var languages = ["All","JavaScript","Ruby","Java","CSS","Python"];

  return (
    <ul className="languages">
      {languages.map(function(lang){
        return (
          <li
            style={lang === props.selectedLanguage ? { color: '#d0021b'} : null}
            onClick={props.onSelect.bind(null, lang)}
            key={lang}>
            {lang}
          </li>
        )
      })}
    </ul>
  )
}

SelectLanguage.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
}

/* Pure function as it only deals with props / state and returning the UI */
function RepoGrid(props) {
  return (
    <ul className="popular-list">
      {props.repos.map(function(repo, index){
        return (
          <li key={repo.name} className="popular-item">
            <div className="popular-rank">
              #{index + 1}
            </div>
            <ul className="space-list-items">
              <li>
                <img
                  className="avatar"
                  src={repo.owner.avatar_url}
                  alt={'Avatar for ' + repo.owner.login}
                />
              </li>
              <li><a href={repo.html_url}>{repo.name}</a></li>
              <li>@{repo.owner.login}</li>
              <li>{repo.stargazers_count} stars</li>
            </ul>
          </li>
        )
      })}
    </ul>
  )
}

/* Use PropTypes when using a pure function to setup up
componentand the parentheses using prop */
RepoGrid.propTypes = {
  repos: PropTypes.array.isRequired
}

/* Popular is seen as the control centre for the component.
Does the heavy lifting and then passes the data to the component */
class Popular extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      selectedLanguage: 'All',
      repos: null
    }

    this.updateLanguage = this.updateLanguage.bind(this);
  }

  /* When the component first appears on the page, run the updateLanguage
  'action' */
  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage);
  }

/* Gets the language which is originally set to null */
  updateLanguage(lang){
    this.setState(function() {
      return {
        selectedLanguage: lang,
        repos: null
      }
    })

    api.fetchPopularRepos(lang)
      .then(function(repos){
        this.setState(function(){
          return {
            repos: repos
          }
        })
      }.bind(this))
  }

  render() {
    return (
      <div>
        <SelectLanguage
          selectedLanguage={this.state.selectedLanguage}
          onSelect={this.updateLanguage}
        />
        {!this.state.repos
          ? <Loading />
          : <RepoGrid repos={this.state.repos} />
        }
      </div>
    )
  }
}

module.exports = Popular;
