import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Tabletop from 'tabletop';


class App extends Component {
  constructor() {
    super()
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    Tabletop.init({
      key: '1VRMo3hpjEGaAh_Ro7lhsvQ22dyyV9QK-oKZQ_1m821A',
      callback: googleData => {
        this.setState({
          data: googleData
        })
      },
      simpleSheet: true
    })
  }

  render() {
    
    const today = new Date();
    const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
   
    const { data } = this.state
    return (
      <div class="frame">
  <span class="list">
      <p class="head title">Vicky's List <br/><span class="subtitle">{date}</span></p>
      
      <table>
        {
            data.map(obj => {
              return (
                <tr>
                <td></td>
                <td for="item-3" class="text">{obj.sn}  {obj.name}</td>
                <td class="amount">{obj.price} <span class="cringe">{obj.avail}</span></td>
                </tr>
              )
            })
          }
    </table>
   <a href="" class="button button-purple" onclick="window.location.reload(true);">
    Click to <strong>Referesh</strong>
  </a><br/><br/>
  <p class="prop">made with ❤ by David Ayo for Vicky Agoha</p>
  </span>
  </div>
    );
  }
}

export default App;