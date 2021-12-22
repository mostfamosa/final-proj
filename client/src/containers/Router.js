import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import PileInfo from "../components/PileInfo";
import SensorsInfo from "../components/SensorsInfo";
import progressBarPage from "../components/progressBarPage";
import ReportPage from "../components/reportPage";
import Navbar from "../components/Navbar";
import Team from "../components/team";
import mySupport from "../components/support"
import notAvaiable from "../components/notAvaiable"
import reports from "../components/reports"

class Router extends React.Component{
    render(){
        return(

            <HashRouter basename='/'>
                <div>
                <Navbar/>
                    <Switch>
                        <Route path="/" component={Home} exact={true}/>
                        <Route path="/pileinfo" component={PileInfo} />
                        <Route path="/sensorsinfo" component={SensorsInfo}/>
                        <Route path="/progressBarPage" component={progressBarPage}/>
                        <Route path="/reportPage" component={ReportPage}/>
                        <Route path="/team" component={Team}/>
                        <Route path="/support" component={mySupport}/>
                        <Route path="/notAvaiable" component={notAvaiable}/>
                        <Route path="/reports" component={reports}/>



                    </Switch>
                </div>
            </HashRouter>

        );
    }
} 

export default Router;