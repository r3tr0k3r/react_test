import React, { Component } from 'react';

const Search = ({searchTerm, onSearchChange, onSearchSubmit, children}) =>
<form onSubmit={onSearchSubmit}>
  <input type="text" onChange={onSearchChange} value={searchTerm} />
  <button type="submit">{children}</button>
</form>
;

export default Search;