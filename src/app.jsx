import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';

import fetchUtils from './util/fetchData';

const socket = io('http://localhost:8081');

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      files: null,
      filename: '',
    };

    this.fetchData = this.fetchData.bind(this);
    this.handleClickRefresh = this.handleClickRefresh.bind(this);
    this.handleClickCreate = this.handleClickCreate.bind(this);
    this.handleTyping = this.handleTyping.bind(this);
  }

  componentDidMount() {
    // this.fetchData();
    socket.emit('fetchFiles');

    socket.on('files', (data) => {
      this.setState({
        files: data.files,
      });
    });

    socket.on('error', (message) => {
      console.log(message);
    });
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

  handleClickRefresh() {
    this.fetchData();
  }

  handleClickCreate(e) {
    e.preventDefault();
    socket.emit('createFile', this.state.filename);
    this.setState({
      filename: '',
    });
  }

  handleTyping(e) {
    const filename = e.target.value;
    this.setState({
      filename,
    });
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
        <div className="section">
          <h3 className="header">Files list {filesCount}</h3>
          <ul className="list">
            {
              this.state.files.map(file => (
                <li key={file.id}>{file.name}</li>
              ))
            }
          </ul>
          <button className="button" onClick={this.handleClickRefresh}>Refresh</button>
        </div>
        <div className="section">
          <h3 className="header">Add a new file</h3>
          <form onSubmit={this.handleClickCreate}>
            <input
              className="text-input"
              type="text"
              value={this.state.filename}
              onChange={this.handleTyping}
            />
            <submit onClick={this.handleClickCreate} className="button">CreateFile</submit>
          </form>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app'),
);
