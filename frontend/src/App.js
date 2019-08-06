import React, { Component } from 'react';
import Items from './Items'
import Input from './Input'
import './App.css';

class App extends Component {
  state = {
    "code": "Julia",
    listOfData: ["a", "b", "c"],
    "newValue": ""
  }


  changeItem = (e) => {
    this.setState({ newValue: e.target.value })
  }
  saveItem = () => {
    console.log(this.state.newValue)
    let updatedDatas = [...this.state.listOfData]
    console.log(updatedDatas)
    updatedDatas.push(this.state.newValue)
    console.log(updatedDatas)
    this.setState({ listOfData: updatedDatas })
  }


  render() {

    return (
      <div>
        <h1>The List App</h1>
        <h2>Your code : {this.state.code}</h2>
        {this.state.listOfData.map((item, index) => {
          return (
            <Items key={index} data={item} />
          )

        })}
        <Input save={this.saveItem} change={this.changeItem} />
      </div>

    );
  }
}

export default App;
