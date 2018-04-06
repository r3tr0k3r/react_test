import React, { Component } from 'react';
import Button from '../Button';
import Table from '../Table';
import Search from '../Search';
import ButtonWithLoading from '../ButtonWithLoading';
import './index.css';

const DEFAULT_QUERY = 'redux';
const PATH_BASE     = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH   = '/search';
const PARAM_SEARCH  = 'query=';
const PARAM_PAGE    = 'page=';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      result: null,
      searchTerm: DEFAULT_QUERY,
      isLoading: false
    };

    this.onDismiss           = this.onDismiss.bind(this);
    this.onSearchChange      = this.onSearchChange.bind(this);
    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.onSearchSubmit      = this.onSearchSubmit.bind(this);
    this.searchTerm         = this.searchTerm.bind(this);

  }

  componentDidMount() {
    const { searchTerm } = this.state;
    this.searchTerm(searchTerm);
  }

  searchTerm(term, page = 0) {
      this.setState({isLoading: true});
      fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${term}&${PARAM_PAGE}${page}`)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(error => error)
  }

  onDismiss(id) {
    const updatedList = this.state.list.filter(item => item.objectID !== id);
    this.setState({list: updatedList});
  }

  onSearchSubmit(event) {
      const { searchTerm } = this.state;
      this.searchTerm(searchTerm);
      event.preventDefault();
  }

  setSearchTopStories(result) {
    const {hits, page} = result;
    const oldHits = page !== 0 ? this.state.result.hits : [];

    const updatedHits = [
        ...oldHits,
        ...hits
    ];

    this.setState({
        result : {hits : updatedHits, page},
        isLoading: false
    });
  }

  onSearchChange(event) {
    this.setState({
      searchTerm: event.target.value
    });
  }

  render() {
    const {result, searchTerm, isLoading} = this.state;
    const page = (result && result.page) || 0;

    return (
      <div className="page">
        <div className="interactions">
          <Search searchTerm={searchTerm} onSearchChange={this.onSearchChange} onSearchSubmit={this.onSearchSubmit}>Search</Search>
        </div>
        {result && <Table list={result.hits} searchTerm={searchTerm} onDismiss={this.onDismiss} />}
        <div className="interactions">
            <ButtonWithLoading isLoading={isLoading} onClick={() => this.searchTerm(searchTerm, page + 1)}>More</ButtonWithLoading>
        </div>
      </div>
    );
  }
}

export default App;
