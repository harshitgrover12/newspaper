import React,{Component} from 'react';
import './App.css';
import axios from 'axios';
import { Markup } from 'interweave';
class App extends Component{

state={
  itemids:[],
  text:[],
  title:[],
  score:[]

}
 FindScore=(score)=>{
  if(score>=100)
  {
  return 60;
  }
  else
  {
  return 30;
  }
}
 
 componentDidMount(){
   
   axios.get('https://hacker-news.firebaseio.com/v0/askstories.json?print=prett')
  .then(({data})=>{
    
  this.setState({
    itemids:data  });
   
  }).then(()=>{
this.state.itemids.map((data)=>{
    
     fetch('https://hacker-news.firebaseio.com/v0/item/'+data+'.json').then(response=>response.json()).then(({score,text,title})=>{
      let tex=[...this.state.text,text];
      if(title.substring(0,6)==="Ask HN")
      {
        title=title.substring(7,title.length);
      }
      let titl=[...this.state.title,title];
      let sco=[...this.state.score,score];
      this.setState({
        text:tex,
        title:titl,
        score:sco
      })
      
    }).then(()=>console.log(this.state.score))
  })
  })
  


}




  render(){
   let m_names = ['January', 'February', 'March', 
               'April', 'May', 'June', 'July', 
               'August', 'September', 'October', 'November', 'December'];
let d_week=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    return(
      <div>
<div class="head">
    <div class="headerobjectswrapper">
        <div class="weatherforcastbox"><span style={{'font-style': 'italic'}}>Weatherforcast for the next 24 hours: Plenty of Sunshine</span><br></br><span>Wind: 7km/h SSE; Ther: 21°C; Hum: 82%</span></div>
        <header>DAILY WORKER</header>
    </div>

    <div class="subhead">New York- {d_week[(new Date()).getDay()]} {m_names[(new Date()).getMonth()]} {(new Date()).getDate()}, {(new Date()).getFullYear()} - One Page  </div>
</div>


<div class="content">
    <div class="collumns">
        <div class="collumn">
        
          <div class="cols"style={{}}>
          {this.state.text.map((data,index)=><div style={{'border-right': '1px solid #2f2f2f','border-top': '1px solid #2f2f2f','border-bottom': '1px solid #2f2f2f','border-left': '1px solid #2f2f2f'}}>
         
            <div class="head"><span class={"headline hl".concat((index%11).toString())} style={{'font-size':this.FindScore(this.state.score[index])+'px'}}>{this.state.title[index]}</span>
            <div class={"style".concat(((index)%2).toString())}><Markup class="done" style={{'font-size':'16px'}} content={this.state.text[index]}/></div>
            </div>
            </div>
            
          )}
          </div>
         
          
          
          
      </div>
    </div>
  </div>
</div>


      

    )
  }
}

export default App;
