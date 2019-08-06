import React, { Component } from 'react';
import Items from './Items'
import './App.css';

class App extends Component {
  state = {
    "code": "Julia",
    listOfData: ["a", "b", "c"]
  }
  render() {
    let datas = null;
    for (let i = 0; i < this.state.listOfData.length; i++) {
      datas += <Items data={this.state.listOfData[i]} />
    }

    return (
      <div>
        <h1>The List App</h1>
        <h2>Your code : {this.state.code}</h2>
        {datas}
      </div>

    );
  }
}

export default App;
