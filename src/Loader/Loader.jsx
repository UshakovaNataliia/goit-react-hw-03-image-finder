import React, { Component } from 'react';
import Loader from 'react-loader-spinner';

class LoaderS extends Component { 
  render () {
    return (
      <div className="loader">
        <Loader type="Rings" color="#3f51b5" height={120} width={120}/>
      </div>
    );
  }
};

export default LoaderS;