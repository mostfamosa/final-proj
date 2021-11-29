import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import PileInfo from "../components/PileInfo";
import SensorsInfo from "../components/SensorsInfo";
import progressBarPage from "../components/progressBarPage";
import ReportPage from "../components/reportPage";

class Router extends React.Component{
    render(){
        return(

            <HashRouter basename='/'>
                <div>
                    <Switch>
                        <Route path="/" component={Home} exact={true}/>
                        <Route path="/pileinfo" component={PileInfo} />
                        <Route path="/sensorsinfo" component={SensorsInfo}/>
                        <Route path="/progressBarPage" component={progressBarPage}/>
                        <Route path="/reportPage" component={ReportPage}/>
                    </Switch>
                </div>
            </HashRouter>

        );
    }
} 

export default Router;