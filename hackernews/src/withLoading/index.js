import React, { Component } from 'react';
import Loading from '../Loading';

const withLoading = (Component) => (props) =>
	props.isLoading
	? <Loading />
	: <Component {...props} />
;

export default withLoading;