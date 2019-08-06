import React, { Component } from 'react';
import Items from './Items'
import Input from './Input'
import axios from 'axios'
import './App.css';

class App extends Component {
  state = {
    "code": "",
    listOfData: [],
    "newValue": ""
  }
  componentDidMount() {
    axios.get('http://localhost:3030/?code=Julia').then(response => {
      console.log(response.data)
      this.setState({ code: response.data.code, listOfData: response.data.data })
    }).catch(err => console.log(err))

    // fetch('http://localhost:3030/?code=Julia')
    //   .then(result => { return result.json() })
    //   .then(data => {
    //     console.log("amjilttai")
    //     console.log(data)
    //     this.setState({ code: data.code, listOfData: data.data })
    //   }).catch(err => console.log("alda"))
  }


  changeItem = (e) => {
    this.setState({ newValue: e.target.value })
  }
  saveItem = () => {
    let data = { "code": this.state.code, "addValue": this.state.newValue }
    // let updatedDatas = [...this.state.listOfData]
    // updatedDatas.push(this.state.newValue)
    // this.setState({ listOfData: updatedDatas })
    axios.post('http://localhost:3030/', data).then(response => {
      console.log(response.data)
      this.setState({ code: response.data.code, listOfData: response.data.data })
    })
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
