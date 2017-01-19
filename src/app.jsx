import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import fetchUtils from './util/fetchData';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      files: null,
    };

    this.fetchData = this.fetchData.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch('/api/files', {
      header: {
        accept: 'application/json',
      },
    })
    .then(fetchUtils.checkStatus)
    .then(fetchUtils.parseJSON)
    .then(jsonData => this.setState({
      files: jsonData,
    }));
  }

  handleClick() {
    this.fetchData();
  }

  render() {
    if (!this.state.files) {
      return (
        <p>
          Loading files list. Please wait...
        </p>
      );
    }

    const filesCount = this.state.files ? `(${this.state.files.length})` : null;

    return (
      <div className="container">
        <h2 className="header">Files list {filesCount}</h2>
        <ul className="list">
          {
            this.state.files.map(file => (
              <li key={file.id}>{file.name}</li>
            ))
          }
        </ul>
        <button className="button" onClick={this.handleClick}>Refresh</button>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app'),
);
