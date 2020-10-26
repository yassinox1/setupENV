import React,{useContext,useEffect} from "react";
import { Route, Switch } from "react-router-dom";
 import Home from './Home'
import About from "./About";
import Layouts from '../components/layouts/Layouts'
import Authentication from "./auth/Authentication";
import ResetPassword from "./auth/ResetPassword";
import Dashboard from "./Dashboard/Dashboard"
import TrendingProducts from "./Product Center/TrendingProducts";
import SelectedProduct from "./Product Center/SelectedProduct";
import ProductValidation from "./Product Center/ProductValidation";
import ValidateProduct from "./Product Center/ValidateProduct";
import TopStore from "./Store Center/TopStore";
import Trackstore from "./Store Center/TrackStore"
import AnalyseStore from "./Store Center/AnalyseStore"
import PrivateRoute from '../components/routing/PrivateRoute'
import AuthContext from '../context/auth/AuthContext'
import TopBar from "../components/layouts/TopBar";
import FacebookAudience from "./tools/FacebookAudience";
import facebook from "./ads/facebook"
const Routes = () => {
  const authContext = useContext(AuthContext);
   
  
  useEffect(()=>{
    authContext.loadUser()
    //eslint-disable-next-line
  },[])
  return (
    <>

<Switch>
<Route exact path="/" component={Home} />
        <Route exact path="/register" component={Authentication} />
      <Route exact path="/login" component={Authentication} />
       <Route exact path ="/dashboard" component = {Dashboard}/>
       <Route exact path="/resetpassword" component={ResetPassword}/>
 
      <Layouts>
    
        <Route exact path="/About" component={About} />
        <Route exact path="/trending" component={TrendingProducts} />
        <Route exact path="/selected" component={SelectedProduct} />
        <Route exact path="/productValidation" component={ProductValidation} />
        <Route exact path="/validateProduct" component={ValidateProduct} />
        <Route exact path="/trackstore" component={Trackstore}/>
        <Route exact path="/topstore" component={TopStore} />
        <PrivateRoute exact path="/analysestore" component={AnalyseStore} />
        <Route exact path="/facebookaudience" component={FacebookAudience} />
        <Route exact path="/facebook" component={facebook}/>
      </Layouts>
      </Switch>
    </>
  );
};

export default Routes;
