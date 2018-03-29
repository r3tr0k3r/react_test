import React, { Component } from 'react';
import './App.css';

const DEFAULT_QUERY = 'redux';
const PATH_BASE     = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH   = '/search';
const PARAM_SEARCH  = 'query=';

const isSearched = searchTerm => item => item.title.toLowerCase().includes(searchTerm.toLowerCase());

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      result: null,
      searchTerm: DEFAULT_QUERY
    };

    this.onDismiss        = this.onDismiss.bind(this);
    this.onSearchChange   = this.onSearchChange.bind(this);
    this.setSearchTopStories = this.setSearchTopStories.bind(this);

  }

  componentDidMount() {
    const { searchTerm } = this.state;

    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
    .then(response => response.json())
    .then(result => this.setSearchTopStories(result))
    .catch(error => error)
  }

  onDismiss(id) {
    const updatedList = this.state.list.filter(item => item.objectID !== id);
    this.setState({list: updatedList});
  }

  setSearchTopStories(result) {
    this.setState({ result });
  }

  onSearchChange(event) {
    this.setState({
      searchTerm: event.target.value
    });
  }

  render() {
    const {result, searchTerm} = this.state;

    if (!result) {
      return null;
    }

    return (
      <div className="page">
        <div className="interactions">
          <Search searchTerm={searchTerm} onSearchChange={this.onSearchChange}>Search</Search>
        </div>
        <Table list={result.hits} searchTerm={searchTerm} onDismiss={this.onDismiss} />
      </div>
    );
  }
}

const Search = ({searchTerm, onSearchChange, children}) =>
<form>
  {children} <input type="text" onChange={onSearchChange} value={searchTerm} />
</form>
;

const Table = ({list, searchTerm, onDismiss}) =>
  <div className="table">
    {list.filter(isSearched(searchTerm)).map(item =>
        <div key={item.objectID} className="table-row">
          <span style={{width:'40%'}}><a href="{item.url}" title={item.title}>{item.title}</a></span>
          <span style={{width:'30%'}}>{item.author}</span>
          <span style={{width:'10%'}}>{item.num_comments}</span>
          <span style={{width:'10%'}}>{item.points}</span>
          <span style={{width:'10%'}}>
            <Button onClick = {() => onDismiss(item.objectID)} className="button-inline">Dismiss</Button>
          </span>
        </div>
    )}
  </div>
;

const Button = ({onClick, className = '', children}) =>
  <button onClick={onClick} className={className} type="button">{children}</button>
;

export default App;
