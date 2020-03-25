/*global chrome*/
/* src/content.js */
import React from 'react';
import ReactDOM from 'react-dom';
import Frame, { FrameContextConsumer }from 'react-frame-component';
import "./content.css";
import Tabletop from 'tabletop';


class Main extends React.Component {
    
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
            <Frame head={[<link type="text/css" rel="stylesheet" href={chrome.runtime.getURL("/static/css/content.css")} ></link>]}> 
               <FrameContextConsumer>
               {
               // Callback is invoked with iframe's window and document instances
                   ({document, window}) => {
                      // Render Children
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
                        )
                    }
                }
                </FrameContextConsumer>
            </Frame>
        )
    }
}

const app = document.createElement('div');
app.id = "my-extension-root";

document.body.appendChild(app);
ReactDOM.render(<Main />, app);

app.style.display = "none";

chrome.runtime.onMessage.addListener(
   function(request, sender, sendResponse) {
      if( request.message === "clicked_browser_action") {
        toggle();
      }
   }
);

function toggle(){
   if(app.style.display === "none"){
     app.style.display = "block";
   }else{
     app.style.display = "none";
   }
}