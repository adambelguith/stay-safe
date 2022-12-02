import React, { Component } from 'react';
import Dialog from './Dialog';

class Test extends Component {
  state = {
    isOpen: false
  }
  render() {
    return (
      <div className="App">
        <button onClick={(e) => this.setState({ isOpen: true })}>Open Dialog</button>

        <Dialog isOpen={this.state.isOpen} onClose={(e) => this.setState({ isOpen: false })}/>
          
      </div>
    );
  }
}

export default Test;
