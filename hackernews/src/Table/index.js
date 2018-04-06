import React, { Component } from 'react';
import Button from '../Button';
import './index.css';

const Table = ({list, searchTerm, onDismiss}) => {
    return(
<div className="table">
  {list.map(item =>
      <div key={item.objectID} className="table-row">
        <span style={{width:'40%'}}><a href={item.url} title={item.title}>{item.title}</a></span>
        <span style={{width:'30%'}}>{item.author}</span>
        <span style={{width:'10%'}}>{item.num_comments}</span>
        <span style={{width:'10%'}}>{item.points}</span>
        <span style={{width:'10%'}}>
          <Button onClick = {() => onDismiss(item.objectID)} className="button-inline">Dismiss</Button>
        </span>
      </div>
  )}
</div>
);
};

export default Table;