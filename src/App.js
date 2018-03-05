import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ReactDOM from 'react-dom'
import { browserHistory , Redirect ,Switch } from 'react-router'
import {
  BrowserRouter as Router,
  Route,
  Link

} from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker'
import ReactDOM from 'react-dom'
import renderHTML from 'react-render-html'
import mqtt, { connect } from 'mqtt'
import {store} from './index'
import {createStore} from 'redux'
import {Provider}    from 'react-redux'
import {connect}     from 'react-redux'



//------------------modéle objet-----------------------------




class Sensor {
  
  constructor(nom,value,typu)
  {

  this._nom=nom;
  this._typu=typu;
  this._values=[];
  this._values[0]=value;
  this._value=value;
  this._moyenne=value;
  this._incr=1;

  }
  
  
  set value(value){
  this._value= '' +value;
  // si la valeur est un nombre on calcule la moyenne 
  if (!isNaN(Number(this._value))){
    this._moyenne +=value;
    this._incr++;
  }
  
  }

  ajouter(value) {
this._values[this._incr]=value;
this._incr++;


  }
   

  Historique(){
    var s ="<ul>";
    if(this._incr > 5){
      for (var i = this._values.length; i > this._values.length-5; i--) {
        if(this._values[i-1] === "ON" || this._values[i-1] === "OFF" ){
          s+="<li>"+this._values[i-1]+"</li>";
        }else{
          s+="<li>"+Math.round(this._values[i-1]*100)/100+"°"+"</li>";
        }
      }
    }else{
      for (var i = this._values.length; i > 0; i--) {
        if(this._values[i-1] === "ON" || this._values[i-1] === "OFF" ){
        s+="<li>"+this._values[i-1]+"</tr>";
        }else{
          s+="<li>"+Math.round(this._values[i-1]*100)/100+"°"+"</li>";
        }
      }
    }
    return s+"</ul>";
  }

  valeuractuelle(){ 
    if(this._values[this._values.length-1] === "ON" || this._values[this._values.length-1] === "OFF" ) {
    return  this._values[this._values.length-1];

    } else {
 return Math.round(this._values[this._values.length-1]*100)/100 ;
    }
  }
  
  
  imprime () {
  if (!isNaN(Number(this._value))) {
  return "|Name capteur =>>>> " +this._nom+ " | dernière valeur réçue =>>>>> "+this._value+"| type:=>>>>>>>"+this._typu;
  }
  else {
    return "|Name capteur=>>>> " +this._nom+ " | dernière valeur réçue =>>>>> "+this._value+"| type:=>>>>>>>"+this._typu;
  
  }
  
  
  }
  
  
  }












//''''''''''''''''''''''''mqtt''''''''''''''''''''''''''//



var  client=mqtt.connect('mqtt://127.0.0.1:8081');
var   lien = client.options.href ;
//souscrit var a tous les messages de serveur 
client.on('connect', function() { 
  client.subscribe('#');
 // alert('connexion au serveur mqtt terminé avec succès cliquer sur ok pour continuer.. ') ;
});


var arrayObjetsensor= [];

client.on('message', function(topic,message){
  var val=topic.search('/');
var nam=topic.substring(val+1); // on récupère le nom de capteur temperateurchabre ect...
// on récupére les messages souscris 
var j = JSON.parse(message);
var value= j.value;
var typ= j.type;

switch (typ) {

case 'TEMPERATURE': 

if (arrayObjetsensor[nam]=== undefined) {

arrayObjetsensor[nam] = new Sensor (nam,value,typ);
//on cerrée un nouveau objet sensor et on le mit dans une liste de méme nom de capteur 
store.dispatch(arrayObjetsensor[nam])
} else 
{
arrayObjetsensor[nam].ajouter(value);

}

//ReactDOM.render(<Board arrayObjetsensors={arrayObjetsensor[nam]} />, document.getElementById('root'));
break;

case 'ON_OFF':
if (arrayObjetsensor[nam]=== undefined) {
  
  arrayObjetsensor[nam] = new Sensor (nam,value,typ);

  //on cerrée un nouveau objet sensor et on le mit dans une liste de méme nom de capteur 
  store.dispatch(arrayObjetsensor[nam])
  } else 
  {
    arrayObjetsensor[nam].ajouter(value);



  }
  
 // ReactDOM.render(<Board arrayObjetsensors={arrayObjetsensor[nam]} />, document.getElementById('root'));
  break;
  
  case 'PERCENT':
  if (arrayObjetsensor[nam]=== undefined) {
    
    arrayObjetsensor[nam] = new Sensor (nam,value,typ);
    //on cerrée un nouveau objet sensor et on le mit dans une liste de méme nom de capteur 
    store.dispatch(arrayObjetsensor[nam])
    } else 
    {
      arrayObjetsensor[nam].ajouter(value);
    
    }
    
   // ReactDOM.render(<Board arrayObjetsensors={arrayObjetsensor[nam]} />, document.getElementById('root'));
    break;
    
default :

}

});

//--------------------------mqtt-----------------------------------------------------





class Ouvreferme extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     
      nom :props.sensor._nom ,
      tab :props.sensor
     
       


    };
    
  }


 
  

  render() {




    return (
    <div className="wrapper">
 
 <article className="article">

<center>


<h1> capteur : {this.state.nom}    </h1>
<p> Valeur actuelle : {this.state.tab.valeuractuelle()}  </p>  
<p>  Historique :
 {renderHTML(this.state.tab.Historique())} 
 </p>
<p id="va"> </p>
</center>
<ul id="messb"> 

</ul>
    
</article> 
</div>
    
   
    );
  }
}

class Temperaturesall11 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     
      nom :props.sensor._nom,
      tab :props.sensor

       


    };
    
  }


 
  

  render() {




    return (
    <div className="wrapper">
 
 <article className="article">

<center>


<h1> capteur : {this.state.nom}  </h1>
<label> Valeur actuelle ; {this.state.tab.valeuractuelle()}  </label>

<p> Historique:
 {renderHTML(this.state.tab.Historique())} 
 </p>

<p id="va"> </p>
</center>
<ul id="messb"> 

</ul>
    
</article> 
</div>
    
   
    );
  }
}




class TemperatureChambre extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     
      nom :props.sensor._nom,
      tab :props.sensor

       


    };
    
  }


 
  

  render() {




    return (
    <div className="wrapper">
 
 <article className="article">

<center>


<h1> capteur : {this.state.nom} </h1>
<label> Valeur actuelle  : {this.state.tab.valeuractuelle()} </label>

<p> Historique:
 {renderHTML(this.state.tab.Historique())} 
 </p>
<p id="va"> </p>
</center>
<ul id="messb"> 

</ul>
    
</article> 
</div>
    
   
    );
  }
}




class Attention extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     
      nom :props.sensor._nom,
      tab :props.sensor

       


    };
    
  }


 
  

  render() {




    return (
    <div className="wrapper">
 
 <article className="article">

<center>


<h1> capteur : {this.state.nom} </h1>
<label> Valeur actuelle: {this.state.tab.valeuractuelle()}  </label>

<p>Historique:
   {renderHTML(this.state.tab.Historique())} 
 </p>
<p id="va"> </p>
</center>
<ul id="messb"> 

</ul>
    
</article> 
</div>
    
   
    );
  }
}




class Board extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      arraysObjetsensors : props.arrayObjetsensors,
      tabyeux :[],
      tabattention: [],
      tabchambre: [],
      tabA111: [] ,
       value : ''     
     };
this.getdonner();

this.handleChange=this.handleChange.bind(this);
this.handleChange=this.handleSubmit.bind(this);
   
  } 

componentWillReceiveProps(nprops)
 
{
  
switch (nprops.arrayObjetsensors._nom) {
 
case "MesYeux" :   

this.setState ({

  tabyeux : nprops.arrayObjetsensors


});
break;

case  "MonAttention" :
this.setState ({
  
  tabattention: nprops.arrayObjetsensors
  
  
  });
  break;

case "temperatureSalleA111":
  this.setState ({
    
    tabA111 : nprops.arrayObjetsensors
    
    
    });
    break;

    case "temperatureChambre":
    this.setState ({
      
      tabchambre : nprops.arrayObjetsensors
      
      
      });
      break;


}


}

handleChange(event) {
  this.setState({value:"/"+ event.target.value});
}

handleSubmit(event) {  

  return 
  <Redirect  to="" />
  
}

 getdonner () {





  var  client=mqtt.connect('mqtt://127.0.0.1:8081');
  var   lien = client.options.href ;
  //souscrit var a tous les messages de serveur 
  client.on('connect', function() { 
    client.subscribe('#');
   // alert('connexion au serveur mqtt terminé avec succès cliquer sur ok pour continuer.. ') ;
  });
  
  
  var arrayObjetsensor= [];
  
  client.on('message', function(topic,message){
    var val=topic.search('/');
  var nam=topic.substring(val+1); // on récupère le nom de capteur temperateurchabre ect...
  // on récupére les messages souscris 
  var j = JSON.parse(message);
  var value= j.value;
  var typ= j.type;
  
  switch (typ) {
  
  case 'TEMPERATURE': 
  
  if (arrayObjetsensor[nam]=== undefined) {
  
  arrayObjetsensor[nam] = new Sensor (nam,value,typ);
  //on cerrée un nouveau objet sensor et on le mit dans une liste de méme nom de capteur 
  
  } else 
  {
  arrayObjetsensor[nam].ajouter(value);
  
  }
  
  ReactDOM.render(<Board arrayObjetsensors={arrayObjetsensor[nam]} />, document.getElementById('root'));
  break;
  
  case 'ON_OFF':
  if (arrayObjetsensor[nam]=== undefined) {
    
    arrayObjetsensor[nam] = new Sensor (nam,value,typ);
  
    //on cerrée un nouveau objet sensor et on le mit dans une liste de méme nom de capteur 
    
    } else 
    {
      arrayObjetsensor[nam].ajouter(value);
  
  
  
    }
    
    ReactDOM.render(<Board arrayObjetsensors={arrayObjetsensor[nam]} />, document.getElementById('root'));
    break;
    
    case 'PERCENT':
    if (arrayObjetsensor[nam]=== undefined) {
      
      arrayObjetsensor[nam] = new Sensor (nam,value,typ);
      //on cerrée un nouveau objet sensor et on le mit dans une liste de méme nom de capteur 
      
      } else 
      {
        arrayObjetsensor[nam].ajouter(value);
      
      }
      
      ReactDOM.render(<Board arrayObjetsensors={arrayObjetsensor[nam]} />, document.getElementById('root'));
      break;
      
  default :
  
  }
  
  });
  





 }






  
  render() {
    
    
    return (
      <Router>
   <body className="body">
 <header className="header"> 
 
<h1> URL du Brocker : </h1>
<form onSubmit={this.handleSubmit} action={this.state.value}>
        
          <input type="text" placeholder="/Ouvreferme" onChange={this.handleChange} />
          <input type="submit" value="Submit" />



</form> 

 </header>
   
 
 <div className="wrapper">


 <Route    path="/:Ouvreferme" component={() => <Ouvreferme sensor={this.state.tabyeux}/> }/>
 <Route   path="/:TemperatureChambre" component={() => < TemperatureChambre sensor={this.state.tabchambre}/> }/>
 <Route   path="/:Temperaturesall11" component={() => < Temperaturesall11 sensor={this.state.tabA111}/> }/>
 <Route   path="/:Attention" component={() => < Attention sensor={this.state.tabattention}/> }/>

 
   <nav className="nav" >
  
  
   
     
     <Link to="/:Ouvreferme"> 
    <button>  Porte du garage </button>
     </Link> 
   
     <Link to="/:TemperatureChambre">
     <button>TempChambre</button>
     </Link>
    
     <Link to="/:Temperaturesall11">
     <button>Temperature salla A111</button>
     </Link>
     <Link to="/:Attention">
     <button>Mon Attention</button>
     </Link>
     
   </nav>
  
  
  
 
 </div>


</body>
</Router>
    );
  }
}
export default Board 

/*  <Link to="/tem bureau">
     <button onClick={ ()=>{
    

var mess=document.getElementById("messb")
let lin;

lin=document.createElement("li")
lin.textContent=Math.round(vali[vali.length-1]);
mess.appendChild(lin)

     }} > temp Bureau </button>
   </Link>  */