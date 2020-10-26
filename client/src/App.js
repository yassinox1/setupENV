import React, { Component } from 'react';
import './App.css';
import {Route,Switch} from 'react-router-dom';



import IndexLayout from './components/layout/IndexLayout'
 

import routes from './routes'
 
 
function withLayout(WrappedComponent){
  // ...and returns another component...
  
  return class extends Component{
    render(){
      return <IndexLayout>
          <WrappedComponent></WrappedComponent>
      </IndexLayout>
    }
  }

}


class App extends Component{



  render(){

    return (
  
        <div className="App">

            <Switch>
              {routes.map((route) => (
              <Route path ={route.path} component={withLayout(route.component) } key={route.idx}/>
      
              ))}
            </Switch>
                
        </div>
  
    
    )
}
  }
 
export default App;
