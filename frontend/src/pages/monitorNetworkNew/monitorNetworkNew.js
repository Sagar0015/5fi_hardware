import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import './monitorNetworkNew.scss';

import $ from 'jquery';

import Select from 'react-select';
import {
    ResponsiveContainer,
    LineChart,
    Line,
    YAxis,
    XAxis,
    CartesianGrid,
    Tooltip,
    RadialBarChart,
    RadialBar
} from "recharts";

import {
    Grid, Box
} from "@material-ui/core";
import * as Icons from "@material-ui/icons";

import axios from 'axios';

import Widget from "../../components/Widget";
import { Typography } from "../../components/Wrappers";

// import alerticon from '../../images/home/alert.svg';
// import devicesIcon from '../../images/home/devices.svg';
// import cloudIcon from '../../images/home/cloud.svg';
// import serverIcon from '../../images/home/server.svg';
// import gnbIcons from '../../images/home/gnb.svg';

import networkIcon from '../../images/new_flow_images/icon_5GNetworks.svg';
import deviceIcon from '../../images/new_flow_images/icon_5Gdevice.svg';
import accessPointIcon from '../../images/new_flow_images/icon_5GAP.svg';
import greenTickIcon from '../../images/new_flow_images/green_tick.svg';

import loadingIcon from '../../images/home/loading.gif';


import apiService from '../../services/apiService.js';
import CustomButton from '../../components/common/Button/button';
import { UserStateContext } from '../../context/UserContext';
import classNames from 'classnames';

class MonitorNetwork extends Component {
    constructor(props) {
        super(props);

        this.state = {
            lineData: [
                { name: 'July 1', uv: 4000 },
                { name: 'July 2', uv: 3000 },
                { name: 'July 3', uv: 2000 },
                { name: 'July 4', uv: 1000 },
                { name: 'July 5', uv: 1890 }
            ],
            elementDetails: false,
            elementDetailsCoordinates: {},
            networkInfo: {},
            networkSummary: {},
            elmentDetailsData: [],
            callUnderProgress: false,
            networkSummaryCallUnderProgress: false,
            firstCallDone: false,
            netWorkSummaryFirstCallDone: false,
            devices_info: [
                { fieldName: "Successful Connects", value: "87%", description: "Success", isWarning: false },
                { fieldName: "Throughput", value: "8.1 Gbps", description: "Maximum Achievable Throughput 10 Gbps", isWarning: true },
                { fieldName: "Latency", value: "13 ms", description: "Minimum Achievable Latency 1 ms", isWarning: true },
                { fieldName: "Packet Loss", value: "13%", description: "On Total Transmitted Packets of all APs Per Sec", isWarning: true },
                // { fieldName: "Mobility", value: "100%", description: "Handovers Successful", isWarning: false },
                // { fieldName: "Network Coverage", value: "90%", description: "Of Maximum Target Coverage", isWarning: false }
            ],
            monitorDeviceSelectOptions: [
                { value: 'today', label: 'Today' },
                { value: 'yesterday', label: 'Yesterday' },
                { value: 'lastWeek', label: 'Last 7days' }
            ],
            networkList: [],
            selectedNetwork: null,
            devices_history: [
                { fieldName: "5G Network", icon: networkIcon, description: "SMF is Unhealthy", site: "Irvine, CA,", switch: "9a9bea", port: "3000", id: "CN-12", isWarning: false, date: "5/19/2022, 5.14.08 PM", isToday: true },
                { fieldName: "5G AP", icon: accessPointIcon, description: "AP2025 is disconnected with CN", site: "Peru, LA,", switch: "10ab612", port: "9001", id: "AP-1025", isWarning: false, date: "5/18/2022, 6.11.03 PM", isYesterday: true },
                { fieldName: "RESOLVED ACTION", icon: greenTickIcon, description: "Battery replaced", site: "Irvine, CA,", switch: "", port: "", id: "Device23", isWarning: false, date: "5/18/2022, 6.14.05 PM", isYesterday: true },
                { fieldName: "RESOLVED ACTION", icon: greenTickIcon, description: "AMF Redeployed", site: "Sweden, EU,", switch: "", port: "", id: "CN12", isWarning: false, date: "5/14/2022, 3.14.08 PM", isLastWeek: true },
                { fieldName: "5G Network", icon: networkIcon, description: "AMF is Unhealthy", site: "Sweden, EU,", switch: "9a9bea", port: "3000", id: "CN-12", isWarning: false, date: "5/14/2022, 3.14.08 PM", isLastWeek: true },
                { fieldName: "RESOLVED ACTION", icon: greenTickIcon, description: "UPF1 Redeployed", site: "India, AP", switch: "", port: "", id: "CN25", isWarning: false, date: "5/12/2022, 9.17.06 PM", isLastWeek: true }
            ],

            value: "Today"
        }

        this.monitorHomeToken = null;
        this.timeout = null;

    }

    componentDidMount = () => {
        this.getMonitorHomeData();
        this.getMonitorHomeSummary();
        this.timeout = setInterval(this.intiateCall, 5000);
        this.timeoutSummary = setInterval(this.intiateCallSummary, 10000);

        this.getNetWorkList();
    }

    intiateCall = () => {
        if (!this.state.callUnderProgress) {
            this.getMonitorHomeData();
        }
    }

    intiateCallSummary = () => {
        if (!this.state.networkSummaryCallUnderProgress) {
            this.getMonitorHomeSummary();
        }
    }

    componentWillUnmount() {
        if (this.monitorHomeToken)
            this.monitorHomeToken.cancel();
        if (this.monitorHomeSummaryToken)
            this.monitorHomeSummaryToken.cancel();
        clearInterval(this.timeout);
        clearInterval(this.timeoutSummary);
    }

    getNetWorkList = () => {

        var thisView = this;
        if (this.networkListToken)
            this.networkListToken.cancel();
        this.networkListToken = axios.CancelToken.source();

        this.setState({ callUnderProgress: true });
        axios.all([apiService.getNetWorkList(this.networkListToken.token)])
            .then(function (res) {
                if (res[0]) {

                    let networkList = (res[0]["data"] && res[0]["data"]["network_list"]) ? res[0]["data"]["network_list"] : [];
                    networkList = networkList.map((eachNetwork) => {
                        return { ...eachNetwork, value: eachNetwork.ID, label: eachNetwork.name }
                    })

                    thisView.setState({ networkList: networkList, selectedNetwork: networkList[0] });

                }
            }).catch(function (res) {
                console.log(res);
                console.log('An error occurred monitor service');

            });

    }

    handleNetworkChange = (changeValue) => {
        this.setState({ selectedNetwork: changeValue });
    }

    getMonitorHomeData = () => {

        var thisView = this;
        if (this.monitorHomeToken)
            this.monitorHomeToken.cancel();
        this.monitorHomeToken = axios.CancelToken.source();

        this.setState({ callUnderProgress: true });
        axios.all([apiService.getMonitorHomeStats(this.monitorHomeToken.token)])
            .then(function (res) {
                if (res[0]) {
                    thisView.setState({ networkInfo: res[0]["data"] });
                    thisView.setState({ callUnderProgress: false });
                    thisView.setState({ firstCallDone: true });
                }
            }).catch(function (res) {
                console.log(res);
                console.log('An error occurred monitor service');
                thisView.setState({ callUnderProgress: false });

            });

    }

    getMonitorHomeSummary = () => {

        var thisView = this;
        if (this.monitorHomeSummaryToken)
            this.monitorHomeSummaryToken.cancel();
        this.monitorHomeSummaryToken = axios.CancelToken.source();

        this.setState({ networkSummaryCallUnderProgress: true });
        axios.all([apiService.getMonitorHomeSummary(this.monitorHomeSummaryToken.token)])
            .then(function (res) {
                if (res[0]) {
                    thisView.setState({ networkSummary: res[0]["data"] });
                    thisView.setState({ networkSummaryCallUnderProgress: false });
                    thisView.setState({ netWorkSummaryFirstCallDone: true });
                }
            }).catch(function (res) {
                console.log(res);
                console.log('An error occurred monitor service');
                thisView.setState({ networkSummaryCallUnderProgress: false });

            });

    }

    render() {
        const { isAuthenticated } = this.props.auth;
        const { networkInfo, firstCallDone, devices_info, monitorDeviceSelectOptions,
            netWorkSummaryFirstCallDone, networkSummary, networkList, selectedNetwork, lineData } = this.state;

        return (
            <div className="five-g-monitor">
                <Grid container spacing={4}>
                    <Grid item lg={3} md={3} sm={6} xs={12} className="fgd-form individual-grid-five-g">
                        <Widget
                            title="Network Summary"
                            upperTitle
                            bodyclassName={''}
                            className="network-summary-title"
                            disableWidgetMenu={true}
                        >
                            {
                                <RadialBarChart
                                    width={300}
                                    height={250}
                                    innerRadius="10%"
                                    outerRadius="80%"
                                    data={[
                                        {
                                            "name": "d",
                                            "uv": 100,
                                            "fill": "#ffff"
                                        }, {
                                            "name": "utilization",
                                            "uv": (networkSummary && networkSummary.percentage) ? networkSummary.percentage : 0,
                                            "fill": "#0731E2"
                                        }
                                    ]}
                                    startAngle={180}
                                    endAngle={0}
                                >
                                    <RadialBar minAngle={15} background clockWise={true} dataKey='uv' />
                                </RadialBarChart>
                            }

                            <div className="fgm-util-each fgmue-first">
                                <span className="fgm-util-each-title">Number of cells available</span>
                                <span className="fgm-util-each-value">{(networkSummary && networkSummary.count_available_cells) ? networkSummary.count_available_cells : '-'}</span>
                            </div>

                            <div className="fgm-util-each">
                                <span className="fgm-util-each-title"> Number of cells active</span>
                                <span className="fgm-util-each-value">{(networkSummary && networkSummary.count_active_cells) ? networkSummary.count_active_cells : '-'}</span>
                            </div>

                            <div className="fgm-util-each">
                                <span className="fgm-util-each-title">Percentage utilization</span>
                                <span className="fgm-util-each-value">{(networkSummary && networkSummary.percentage_utilization) ? networkSummary.percentage_utilization : '-'}</span>
                            </div>
                            {
                                !netWorkSummaryFirstCallDone &&
                                <div className="each-widget-loading">
                                    <img src={loadingIcon} />
                                </div>
                            }
                        </Widget>
                    </Grid>
                    <Grid item lg={5} md={5} sm={6} xs={12} className="fgd-form individual-grid-five-g">
                        <div className="monitor-left-bar-first-section">
                            <Widget
                                title=""
                                upperTitle
                                bodyclassName={''}
                                className={''}
                                disableWidgetMenu={true}
                            >

                                <Grid
                                    container
                                    direction="row"
                                    justify="space-between"
                                    alignItems="center"
                                >

                                    <Grid item md={3} xs={12} className="text-center">
                                        <Typography color="text" colorBrightness="secondary" className="grid-item-title">
                                            RAN Spectrum Utilization
                                        </Typography>
                                    </Grid>
                                    <Grid item md={3} xs={12}>
                                        <div className="c100 p33 center">
                                            <span>33%</span>
                                            <div className="slice">
                                                <div className="bar">
                                                </div>
                                                <div className="fill">
                                                </div>
                                            </div>
                                        </div>
                                    </Grid>
                                    <Grid item md={3} xs={12}>
                                        <div className="c100 p63 center">
                                            <span>63%</span>
                                            <div className="slice">
                                                <div className="bar">
                                                </div>
                                                <div className="fill">
                                                </div>
                                            </div>
                                        </div>
                                    </Grid>
                                    <Grid item md={3} xs={12} className="text-center">
                                        <Typography color="text" colorBrightness="secondary" className="grid-item-title">
                                            Core Network Utilization
                                        </Typography>
                                    </Grid>

                                </Grid>
                                {
                                    !firstCallDone &&
                                    <div className="each-widget-loading">
                                        <img src={loadingIcon} />
                                    </div>
                                }
                            </Widget>
                        </div>

                        <Box pt={8}>
                            <div className="monitor-left-bar-second-section">
                                <Grid
                                    container
                                    direction="row"
                                    // justify="space-between"
                                    alignItems="center"
                                >

                                    <Grid item lg={4} md={6} xs={12}>
                                        <div className="mlb-first-col">
                                            <Box pl={2} pr={2}>
                                                <div className="mnl-connected-source network-section">
                                                    <span className="mnl-connected-source-network-title">5G Networks</span>
                                                    <span><img src={networkIcon} alt="networkIcon" className="mnl-connected-source-image" /></span>
                                                </div>
                                                <div className="mnl-connected-source-options">
                                                    <span className="option-title">CNs</span>
                                                    <span className="option-value">{(networkInfo && networkInfo.cn_count) ? networkInfo.cn_count : '-'}</span>
                                                </div>
                                                {
                                                    (networkInfo && networkInfo.cn_stats && Object.keys(networkInfo.cn_stats).length > 0) &&
                                                    Object.keys(networkInfo.cn_stats).map((key, index) => {
                                                        return (
                                                            <div className="mnl-connected-source-options" key={index}>
                                                                <span className="option-title">{key}</span>
                                                                <span className="option-value">{networkInfo.cn_stats[key]}</span>
                                                            </div>
                                                        )
                                                    })
                                                }

                                            </Box>
                                        </div>
                                    </Grid>

                                    <Grid item lg={4} md={6} xs={12}>
                                        <div className="mlb-second-col">
                                            <Box pl={2} pr={2}>
                                                <div className="mnl-connected-source access-points-section">
                                                    <span className="mnl-connected-source-access-points-title">5G Access Points</span>
                                                    <span><img src={accessPointIcon} alt="accessPointIcon" className="mnl-connected-source-image" /></span>
                                                </div>
                                                <div className="mnl-connected-source-options">
                                                    <span className="option-title">APs</span>
                                                    <span className="option-value">{(networkInfo && networkInfo.ran_count) ? networkInfo.ran_count : '-'}</span>
                                                </div>
                                                {
                                                    (networkInfo && networkInfo.ran_stats && Object.keys(networkInfo.ran_stats).length > 0) &&
                                                    Object.keys(networkInfo.ran_stats).map((key, index) => {
                                                        return (
                                                            <div className="mnl-connected-source-options" key={index}>
                                                                <span className="option-title">{key}</span>
                                                                <span className="option-value">{networkInfo.ran_stats[key]}</span>
                                                            </div>
                                                        )
                                                    })
                                                }


                                            </Box>
                                            <Box width={'90%'} margin={'0 auto'} pt={1} textAlign={'center'}>
                                                <div className="mds-add-ap">
                                                    <NavLink to={isAuthenticated ? "/quick-ap" : '/login'}>
                                                        <CustomButton className="button" fullWidth buttonText={'Add Access point'} /> </NavLink>
                                                </div>
                                            </Box>
                                        </div>
                                    </Grid>

                                    <Grid item lg={4} md={6} xs={12}>
                                        <div className="mlb-third-col">
                                            <Box pl={2} pr={2}>
                                                <div className="mnl-connected-source devices-section">
                                                    <span className="mnl-connected-source-devices-title">5G Devices</span>
                                                    <span><img src={deviceIcon} alt="deviceIcon" className="mnl-connected-source-image" /></span>
                                                </div>
                                                <div className="mnl-connected-source-options">
                                                    <span className="option-title">Devices</span>
                                                    <span className="option-value">{(networkInfo && networkInfo.ran_details && networkInfo.ran_details.no_ues) ? networkInfo.ran_details.no_ues : '-'}</span>
                                                </div>
                                                {/* <div className="mnl-connected-source-options">
                                                    <span className="option-title">Sensors</span>
                                                    <span className="option-value">3000</span>
                                                </div>
                                                <div className="mnl-connected-source-options">
                                                    <span className="option-title">Actuators</span>
                                                    <span className="option-value">1800</span>
                                                </div> */}
                                                <div className="mnl-connected-source-options">
                                                    <span className="option-title">Others</span>
                                                    <span className="option-value">{(networkInfo && networkInfo.ran_details && networkInfo.ran_details.no_ues) ? networkInfo.ran_details.no_ues : '-'}</span>
                                                </div>
                                            </Box>
                                        </div>
                                    </Grid>

                                </Grid>
                            </div>
                            {
                                !firstCallDone &&
                                <div className="each-widget-loading">
                                    <img src={loadingIcon} />
                                </div>
                            }

                        </Box>

                    </Grid>

                    <Grid item lg={4} md={4} sm={6} xs={12} className="fgm-inner-grid individual-grid-five-g">
                        <Widget
                            title=""
                            upperTitle
                            bodyClass={'widget-deploy-content'}
                            className={'deploye-widget'}
                            style={{}}
                            disableWidgetMenu={true}
                        >
                            <Grid item xs={12} style={{ width: "100%" }}>
                                <Box className='test' style={{ width: "100%" }}>
                                    <div className="mds-left-section">
                                        <Select
                                            defaultValue={selectedNetwork}
                                            value={selectedNetwork}
                                            options={networkList}
                                            onChange={this.handleNetworkChange}
                                            onInputChange={this.handleNetworkChange} />
                                    </div>
                                </Box>
                            </Grid>
                            <Grid item xs={12} style={{ flexDirection: "column", display: "flex", justifyContent: "flex-end", width: "100%", alignItems: "flex-end" }}>
                                <Box>
                                    <div className="mds-deply-network">
                                        <NavLink to="/deploy"><span>Deploy Network</span></NavLink>
                                    </div>
                                </Box>
                            </Grid>

                        </Widget>
                    </Grid>

                    <Grid item lg={7} md={6} sm={6} xs={12} className="fgd-form individual-grid-five-g">
                        <div className="monitor-devices-custom-table">
                            {
                                devices_info && devices_info.length > 0 &&
                                <ul className="devices-list-ul">
                                    {
                                        devices_info.map((device_list, index) => {

                                            return (
                                                <Grid
                                                    container
                                                    xs={12}
                                                    direction="row"
                                                    justifyContent="center"
                                                    alignItems="center"
                                                    className="devices-list-li"
                                                    key={index}
                                                >

                                                    <Grid item lg={3} md={12} xs={12}>
                                                        <div className="devices-list-first-column">
                                                            {device_list.fieldName}
                                                        </div>
                                                    </Grid>
                                                    <Grid item lg={3} md={12} xs={12} className="devices-list-second-column">
                                                        <span className={"each-device-success-values " + (device_list.isWarning ? "warning-values" : "")}>{(networkInfo && networkInfo.stats && networkInfo.stats[device_list.fieldName]) ? networkInfo.stats[device_list.fieldName] : ""}</span>
                                                        <br />
                                                        <span className="each-device-description"> {device_list.description}</span>

                                                    </Grid>
                                                    <Grid item lg={6} md={12} xs={12}>
                                                        {
                                                            (networkInfo && networkInfo.stats_data && networkInfo.stats_data[device_list.fieldName]) &&
                                                            <ResponsiveContainer width="100%" height={100}>
                                                                <LineChart
                                                                    width={500}
                                                                    height={200}
                                                                    data={(networkInfo && networkInfo.stats_data && networkInfo.stats_data[device_list.fieldName]) ? networkInfo.stats_data[device_list.fieldName] : []}
                                                                    margin={{
                                                                        top: 10,
                                                                        right: 30,
                                                                        left: 0,
                                                                        bottom: 0,
                                                                    }}
                                                                >
                                                                    <CartesianGrid strokeDasharray="3 3" />
                                                                    <XAxis dataKey="name" type="category" hide={true} />
                                                                    <YAxis dataKey="y" hide={true} />
                                                                    <Tooltip />
                                                                    <Line type="monotone" dataKey="y" stroke="#8884d8" fill="#8884d8" />
                                                                </LineChart>
                                                            </ResponsiveContainer>
                                                        }
                                                    </Grid>
                                                </Grid>
                                            )
                                        })
                                    }
                                </ul>

                            }
                        </div>

                        {
                            !firstCallDone &&
                            <div className="each-widget-loading">
                                <img src={loadingIcon} />
                            </div>
                        }
                    </Grid>


                    <Grid item lg={5} md={6} xs={12} className="fgd-form individual-grid-five-g">
                        <div className="mls-bar-second-section">
                            <div className="mls-bar-header">Top network elements needing attention</div>
                        </div>

                        <div className="mls-bar-right-history-block">

                            <Grid
                                container
                                direction="row"
                            >

                                <Grid item lg={5} md={5} xs={12}>

                                    <div className="today-history-section">
                                        <Grid
                                            container
                                            direction="row"
                                            alignItems="center"
                                        >
                                            <Grid item lg={7} md={6} xs={12}>
                                                <Box>
                                                    <div className="mds-left-section">
                                                        <Select defaultValue={{ label: "Today", value: 0 }} options={monitorDeviceSelectOptions} />
                                                    </div>
                                                </Box>

                                            </Grid>
                                            <Grid item lg={5} md={6} xs={12}>
                                                <Box>
                                                    <div className="mds-rigt-section"></div>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                        <div className="each-device-history">

                                            <span className="mnl-history-source-date" >5/14/2022, 3.14.08 PM</span>
                                            <div className="mnl-history-source">
                                                <span className="mnl-history-source-title">5G Network</span>
                                                <span><img src={networkIcon} alt="accessPointIcon" className="mnl-connected-source-image" /></span>
                                            </div>

                                            <div className="mnl-history-source-description">
                                                SMF is Unhealthy
                                            </div>

                                            <div className="mnl-history-source-options">
                                                <span className="option-title">Site:</span>
                                                <span className="option-value">Irvine, CA</span>
                                            </div>
                                            <div className="mnl-history-source-options">
                                                <span className="option-title">Switch:</span>
                                                <span className="option-value">9a9bea</span>
                                            </div>
                                            <div className="mnl-history-source-options">
                                                <span className="option-title">Port:</span>
                                                <span className="option-value">3000</span>
                                            </div>
                                            <div className="mnl-history-source-options">
                                                <span className="option-title">ID:</span>
                                                <span className="option-value">CN-12</span>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="yesterday-history-section">
                                        <Grid
                                            container
                                            direction="row"
                                            alignItems="center"
                                        >
                                            <Grid item lg={7} md={6} xs={12}>
                                                <Box>
                                                    <div className="mds-left-section">
                                                        <Select defaultValue={{ label: "Yesterday", value: 0 }} options={monitorDeviceSelectOptions} />
                                                    </div>
                                                </Box>

                                            </Grid>
                                            <Grid item lg={5} md={6} xs={12}>
                                                <Box>
                                                    <div className="mds-rigt-section"></div>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                        <div className="each-device-history">
                                            <span className="mnl-history-source-date" >5/18/2022, 6.11.03 PM</span>
                                            <div className="mnl-history-source">
                                                <span className="mnl-history-source-title">5G AP</span>
                                                <span><img src={accessPointIcon} alt="accessPointIcon" className="mnl-connected-source-image" /></span>
                                            </div>

                                            <div className="mnl-history-source-description">
                                                AP2025 is disconnected with CN
                                            </div>

                                            <div className="mnl-history-source-options">
                                                <span className="option-title">Site:</span>
                                                <span className="option-value">Peru, LA</span>
                                            </div>
                                            <div className="mnl-history-source-options">
                                                <span className="option-title">Switch:</span>
                                                <span className="option-value">10ab612</span>
                                            </div>
                                            <div className="mnl-history-source-options">
                                                <span className="option-title">Port:</span>
                                                <span className="option-value">9001</span>
                                            </div>
                                            <div className="mnl-history-source-options">
                                                <span className="option-title">ID:</span>
                                                <span className="option-value">AP-1025</span>
                                            </div>
                                        </div>

                                        <div className="each-resolved-device-history">
                                            <span className="mnl-history-source-date">5/18/2022, 6.14.05 PM</span>
                                            <div className="mnl-history-source">
                                                <span><img src={greenTickIcon} alt="accessPointIcon" className="mnl-resolved-device-image" /></span>
                                                <span className="mnl-resolved-device-title">RESOLVED ACTION</span>
                                            </div>


                                            <div className="mnl-history-source-options">
                                                <span className="option-title">ID:</span>
                                                <span className="option-value">Device23</span>
                                            </div>

                                            <div className="mnl-history-source-description">
                                                Battery replaced
                                            </div>

                                            <div className="mnl-history-source-options">
                                                <span className="option-title">Site:</span>
                                                <span className="option-value">Irvine, CA,</span>
                                            </div>
                                        </div>

                                    </div>
                                </Grid>
                                <Grid item lg={1} md={1} xs={12}>

                                </Grid>
                                <Grid item lg={5} md={5} xs={12}>

                                    <div className="last-week-history-section">
                                        <Grid
                                            container
                                            direction="row"
                                            alignItems="center"
                                        >
                                            <Grid item lg={7} md={6} xs={12}>
                                                <Box>
                                                    <div className="mds-left-section">
                                                        <Select defaultValue={{ label: "Last 7days", value: 0 }} options={monitorDeviceSelectOptions} />
                                                    </div>
                                                </Box>

                                            </Grid>
                                            <Grid item lg={5} md={6} xs={12}>
                                                <Box>
                                                    <div className="mds-rigt-section"></div>
                                                </Box>
                                            </Grid>
                                        </Grid>

                                        <div className="each-success-resolved-device-history">
                                            <span className="mnl-history-source-date">5/14/2022, 3.14.08 PM</span>
                                            <div className="mnl-history-source">
                                                <span><img src={greenTickIcon} alt="accessPointIcon" className="mnl-resolved-device-image" /></span>
                                                <span className="mnl-resolved-device-title">RESOLVED ACTION</span>
                                            </div>


                                            <div className="mnl-history-source-options">
                                                <span className="option-title">ID:</span>
                                                <span className="option-value">CN12</span>
                                            </div>

                                            <div className="mnl-history-source-description">
                                                AMF Redeployed
                                            </div>

                                            <div className="mnl-history-source-options">
                                                <span className="option-title">Site:</span>
                                                <span className="option-value"> Sweden, EU</span>
                                            </div>
                                        </div>

                                        <div className="each-device-history">
                                            <span className="mnl-history-source-date" >5/14/2022, 3.14.08 PM</span>
                                            <div className="mnl-history-source">
                                                <span className="mnl-history-source-title">5G Network</span>
                                                <span><img src={networkIcon} alt="accessPointIcon" className="mnl-connected-source-image" /></span>
                                            </div>

                                            <div className="mnl-history-source-description">
                                                AMF is Unhealthy
                                            </div>

                                            <div className="mnl-history-source-options">
                                                <span className="option-title">Site:</span>
                                                <span className="option-value">Sweden, EU</span>
                                            </div>
                                            <div className="mnl-history-source-options">
                                                <span className="option-title">Switch:</span>
                                                <span className="option-value">9a9bea</span>
                                            </div>
                                            <div className="mnl-history-source-options">
                                                <span className="option-title">Port:</span>
                                                <span className="option-value">3000</span>
                                            </div>
                                            <div className="mnl-history-source-options">
                                                <span className="option-title">ID:</span>
                                                <span className="option-value">CN-12</span>
                                            </div>

                                        </div>

                                        <div className="each-success-resolved-device-history">
                                            <span className="mnl-history-source-date">5/14/2022, 3.14.08 PM</span>
                                            <div className="mnl-history-source">
                                                <span><img src={greenTickIcon} alt="accessPointIcon" className="mnl-resolved-device-image" /></span>
                                                <span className="mnl-resolved-device-title">RESOLVED ACTION</span>
                                            </div>


                                            <div className="mnl-history-source-options">
                                                <span className="option-title">ID:</span>
                                                <span className="option-value">CN25</span>
                                            </div>

                                            <div className="mnl-history-source-description">
                                                UPF1 Redeployed
                                            </div>

                                            <div className="mnl-history-source-options">
                                                <span className="option-title">Site:</span>
                                                <span className="option-value">India, AP</span>
                                            </div>
                                        </div>

                                    </div>
                                </Grid>
                            </Grid>

                        </div>

                        {
                            !firstCallDone &&
                            <div className="each-widget-loading">
                                <img src={loadingIcon} />
                            </div>
                        }

                    </Grid >

                </Grid >

            </div >
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    siteCoordinator: state.siteCoordinator
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(MonitorNetwork);