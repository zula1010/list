import React, { Component } from 'react';
import Items from './Items'
import Input from './Input'
import axios from './axios'
import './App.css';

class App extends Component {
  state = {
    "code": "",
    listOfData: [],
    "newValue": ""
  }
  componentDidMount() {
    axios.get('/Julia').then(res => {
      console.log("amjilttai")
      this.setState({ code: "Julia", listOfData: res.data })
    }).catch(err => console.log("alda"))
  }


  changeItem = (e) => {
    this.setState({ newValue: e.target.value })
  }
  saveItem = () => {
    let updatedDatas = [...this.state.listOfData]
    updatedDatas.push(this.state.newValue)
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
