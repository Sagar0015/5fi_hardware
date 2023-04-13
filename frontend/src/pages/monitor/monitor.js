import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import './monitor.scss';

// import MonitorNetwork from '../monitorNetwork';
import MonitorNetworkElement from '../monitorNetworkElement';
// monitorNetworkNew
import MonitorNetworkNew from '../monitorNetworkNew';

class Monitor extends Component {

    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        return (
            <div className="five-g-monitor">
                {/* <div className="fgd-top-head">
                    <span>Monitor Network</span>
                </div> */}
                <Switch>
                    <Route path={this.props.match.path + "/:id"} render={(props) => {
                        return <MonitorNetworkElement {...props} />
                    }} />
                    <Route path={this.props.match.path} render={(props) => { return <MonitorNetworkNew {...props} /> }} />
                    <Redirect to={this.props.match.path} />
                </Switch>
            </div>
        )
    }
}

export default Monitor;