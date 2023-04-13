import qs from 'qs';
import axios from 'axios';
import { getAppConfig } from '../store';

var apiServices = {

    getMonitorHomeData: function (token) {

        const config = getAppConfig();

        return axios({
            cancelToken: token,
            cancelPreviousRequest: true,
            method: 'post',
            url: 'http://45.112.28.125:3002' + "/api/monitor/home",
            data: qs.stringify({
                source: config.source
            })
        }).then(function (response) {

            return response.data;

        }).catch(function (res) {
            console.log(res);
            console.log('An error occurred in get solr query service');
        });
    },

    getElementDetails: function (token, containerId) {

        const config = getAppConfig();

        return axios({
            cancelToken: token,
            cancelPreviousRequest: true,
            method: 'post',
            url: 'http://45.112.28.125:3002' + "/api/monitor/element",
            data: qs.stringify({
                source: config.source,
                containerId: containerId
            })
        }).then(function (response) {

            return response.data;

        }).catch(function (res) {
            console.log(res);
            console.log('An error occurred in get solr query service');
        });
    },

    addSubscriber: function (token, data) {

        const config = getAppConfig();

        return axios({
            cancelToken: token,
            cancelPreviousRequest: true,
            method: 'post',
            url: 'http://45.112.28.125:3002' + "/api/manage/addsubscriber",
            data: qs.stringify({
                source: config.source,
                ...data
            })
        }).then(function (response) {

            return response.data;

        }).catch(function (res) {
            console.log(res);
            console.log('An error occurred in get solr query service');
        });
    },

    getSubscribers: function (token) {

        const config = getAppConfig();

        return axios({
            cancelToken: token,
            cancelPreviousRequest: true,
            method: 'post',
            url: 'http://45.112.28.125:3002' + "/api/manage/subscribers",
            data: qs.stringify({
                source: config.source
            })
        }).then(function (response) {

            return response.data;

        }).catch(function (res) {
            console.log(res);
            console.log('An error occurred in get solr query service');
        });
    },

    deleteSubscriber: function (token, ueId) {

        const config = getAppConfig();

        return axios({
            cancelToken: token,
            cancelPreviousRequest: true,
            method: 'post',
            url: 'http://45.112.28.125:3002' + "/api/manage/delete_subscriber",
            data: qs.stringify({
                source: config.source,
                ueId
            })
        }).then(function (response) {

            return response.data;

        }).catch(function (res) {
            console.log(res);
            console.log('An error occurred in get solr query service');
        });
    },

    modifySubscriber: function (token, data) {

        const config = getAppConfig();

        return axios({
            cancelToken: token,
            cancelPreviousRequest: true,
            method: 'post',
            url: 'http://45.112.28.125:3002' + "/api/manage/modify_subscriber",
            data: qs.stringify({
                source: config.source,
                ...data
            })
        }).then(function (response) {

            return response.data;

        }).catch(function (res) {
            console.log(res);
            console.log('An error occurred in get solr query service');
        });
    },

    getAccessPoints: function (token) {

        const config = getAppConfig();

        return axios({
            cancelToken: token,
            cancelPreviousRequest: true,
            method: 'post',
            url: 'http://45.112.28.125:3002' + "/api/manage/access_points",
            data: qs.stringify({
                source: config.source
            })
        }).then(function (response) {

            return response.data;

        }).catch(function (res) {
            console.log(res);
            console.log('An error occurred in get solr query service');
        });
    },

    getUEList: function (token, containerId) {

        const config = getAppConfig();

        return axios({
            cancelToken: token,
            cancelPreviousRequest: true,
            method: 'post',
            url: 'http://45.112.28.125:3002' + "/api/monitor/uelist",
            data: qs.stringify({
                source: config.source,
                containerId
            })
        }).then(function (response) {

            return response.data;

        }).catch(function (res) {
            console.log(res);
            console.log('An error occurred in get solr query service');
        });
    },

    prepareHandOver: function (token, data) {

        const config = getAppConfig();

        return axios({
            cancelToken: token,
            cancelPreviousRequest: true,
            method: 'post',
            url: 'http://45.112.28.125:3002' + "/api/monitor/prepare_handover",
            data: qs.stringify({
                source: config.source,
                ...data
            })
        }).then(function (response) {

            return response.data;

        }).catch(function (res) {
            console.log(res);
            console.log('An error occurred in get solr query service');
        });
    },

    getPathSwitchList: function (token) {

        const config = getAppConfig();

        return axios({
            cancelToken: token,
            cancelPreviousRequest: true,
            method: 'post',
            url: 'http://45.112.28.125:3002' + "/api/monitor/path_switch_list",
            data: qs.stringify({
                source: config.source
            })
        }).then(function (response) {

            return response.data;

        }).catch(function (res) {
            console.log(res);
            console.log('An error occurred in get solr query service');
        });
    },

    submitPathSwitch: function (token, data) {

        const config = getAppConfig();

        return axios({
            cancelToken: token,
            cancelPreviousRequest: true,
            method: 'post',
            url: 'http://45.112.28.125:3002' + "/api/monitor/submit_path_switch",
            data: qs.stringify({
                source: config.source,
                ...data
            })
        }).then(function (response) {

            return response.data;

        }).catch(function (res) {
            console.log(res);
            console.log('An error occurred in get solr query service');
        });
    },

    buildADemo: function (token) {

        const config = getAppConfig();

        return axios({
            cancelToken: token,
            cancelPreviousRequest: true,
            method: 'post',
            url: 'http://45.112.28.125:3002' + "/api/manage/build_a_demo",
            data: qs.stringify({
                source: config.source
            })
        }).then(function (response) {

            return response.data;

        }).catch(function (res) {
            console.log(res);
            console.log('An error occurred in get solr query service');
        });
    },

    suggestedActionUE: function (token) {

        const config = getAppConfig();

        return axios({
            cancelToken: token,
            cancelPreviousRequest: true,
            method: 'post',
            url: 'http://45.112.28.125:3002' + "/api/manage/suggested_actions_core",
            data: qs.stringify({
                source: config.source
            })
        }).then(function (response) {

            return response.data;

        }).catch(function (res) {
            console.log(res);
            console.log('An error occurred in get solr query service');
        });
    },

    suggestedActionUESubmit: function (token) {

        const config = getAppConfig();

        return axios({
            cancelToken: token,
            cancelPreviousRequest: true,
            method: 'post',
            url: 'http://45.112.28.125:3002' + "/api/manage/execute_sug_action",
            data: qs.stringify({
                source: config.source
            })
        }).then(function (response) {

            return response.data;

        }).catch(function (res) {
            console.log(res);
            console.log('An error occurred in get solr query service');
        });
    },

    getCoresList: function (token) {

        const config = getAppConfig();

        return axios({
            cancelToken: token,
            cancelPreviousRequest: true,
            method: 'post',
            url: 'http://45.112.28.125:3002' + "/api/deploy/cn_list",
            data: qs.stringify({
                source: config.source
            })
        }).then(function (response) {

            return response.data;

        }).catch(function (res) {
            console.log(res);
            console.log('An error occurred in get solr query service');
        });
    },

    getAccessPointsList: function (token) {

        const config = getAppConfig();

        return axios({
            cancelToken: token,
            cancelPreviousRequest: true,
            method: 'post',
            url: 'http://45.112.28.125:3002' + "/api/deploy/ran_list",
            data: qs.stringify({
                source: config.source
            })
        }).then(function (response) {

            return response.data;

        }).catch(function (res) {
            console.log(res);
            console.log('An error occurred in get solr query service');
        });
    },

    deployNetwork: function (token, data) {

        const config = getAppConfig();

        return axios({
            cancelToken: token,
            cancelPreviousRequest: true,
            method: 'post',
            url: 'http://45.112.28.125:3002' + "/api/deploy/deploy_network",
            data: qs.stringify({
                ...data
            })
        }).then(function (response) {

            return response.data;

        }).catch(function (res) {
            console.log(res);
            console.log('An error occurred in get solr query service');
        });
    },

    getMonitorHomeStats: function (token) {

        const config = getAppConfig();

        return axios({
            cancelToken: token,
            cancelPreviousRequest: true,
            method: 'post',
            url: 'http://45.112.28.125:3002' + "/api/monitor/get_network_stats",
            data: qs.stringify({

            })
        }).then(function (response) {

            return response.data;

        }).catch(function (res) {
            console.log(res);
            console.log('An error occurred in get solr query service');
        });
    },

    getMonitorHomeSummary: function (token) {

        const config = getAppConfig();

        return axios({
            cancelToken: token,
            cancelPreviousRequest: true,
            method: 'post',
            url: 'http://45.112.28.125:3002' + "/api/monitor/get_network_summary",
            data: qs.stringify({

            })
        }).then(function (response) {

            return response.data;

        }).catch(function (res) {
            console.log(res);
            console.log('An error occurred in get solr query service');
        });
    },

    getNetWorkList: function (token) {

        const config = getAppConfig();

        return axios({
            cancelToken: token,
            cancelPreviousRequest: true,
            method: 'post',
            url: 'http://45.112.28.125:3002' + "/api/monitor/get_network_list",
            data: qs.stringify({

            })
        }).then(function (response) {

            return response.data;

        }).catch(function (res) {
            console.log(res);
            console.log('An error occurred in get solr query service');
        });
    },

    getDeployStats: function (token) {

        const config = getAppConfig();

        return axios({
            cancelToken: token,
            cancelPreviousRequest: true,
            method: 'post',
            url: 'http://45.112.28.125:3002' + "/api/manage/get_app_stats",
            data: qs.stringify({

            })
        }).then(function (response) {

            return response.data;

        }).catch(function (res) {
            console.log(res);
            console.log('An error occurred in get solr query service');
        });
    },

    getEndPoints: function (token) {

        const config = getAppConfig();

        return axios({
            cancelToken: token,
            cancelPreviousRequest: true,
            method: 'post',
            url: 'http://45.112.28.125:3002' + "/api/manage/ue_details",
            data: qs.stringify({

            })
        }).then(function (response) {

            return response.data;

        }).catch(function (res) {
            console.log(res);
            console.log('An error occurred in get solr query service');
        });
    },

    getInspectList: function (token) {

        const config = getAppConfig();

        return axios({
            cancelToken: token,
            cancelPreviousRequest: true,
            method: 'post',
            url: 'http://45.112.28.125:3002' + "/api/monitor/inspect_list",
            data: qs.stringify({

            })
        }).then(function (response) {

            return response.data;

        }).catch(function (res) {
            console.log(res);
            console.log('An error occurred in get solr query service');
        });
    },

    getLogsData: function (id, dataType) {

        const config = getAppConfig();

        let url = "get_logs";
        if (dataType === "packets") {
            url = "get_packets";
        } else if (dataType === "consoles") {
            url = "get_console";
        } else if (dataType === "terminals") {
            url = "get_terminals";
        }

        console.log(id);
        return axios({
            // cancelToken: token,
            cancelPreviousRequest: false,
            method: 'post',
            url: 'http://45.112.28.125:3002' + "/api/monitor/" + url,
            data: qs.stringify({
                id
            })
        }).then(function (response) {

            return response.data;

        }).catch(function (res) {
            console.log(res);
            console.log('An error occurred in get solr query service');
        });
    },

    getApplicationUEList: function (id, dataType) {

        const config = getAppConfig();

        console.log(id);
        return axios({
            // cancelToken: token,
            cancelPreviousRequest: false,
            method: 'post',
            url: 'http://45.112.28.125:3002' + "/api/manage/app_ue_list",
            data: qs.stringify({
                id
            })
        }).then(function (response) {

            return response.data;

        }).catch(function (res) {
            console.log(res);
            console.log('An error occurred in get solr query service');
        });
    },
    demoLogin: function (username, password) {

        const config = getAppConfig();

        return axios({
            method: 'post',
            url: 'http://45.112.28.125:3002' + "/api/auth/login",
            data: qs.stringify({
                username: username, password: password
            })
        }).then(function (response) {

            return response.data;

        }).catch(function (res) {
            console.log(res);
            console.log('An error occurred in get solr query service');
        });
    },
    validateAP: function () {

        const config = getAppConfig();

        return axios({
            method: 'get',
            url: 'http://45.112.28.125:3002' + "/api/monitor/validate_ap",
            data: qs.stringify({
                source: config.source,
            })
        }).then(function (response) {

            return response.data;

        }).catch(function (res) {
            console.log(res);
            console.log('An error occurred in get solr query service');
        });
    },
    getRanParameters: function () {

        const config = getAppConfig();

        return axios({
            method: 'get',
            url: 'http://45.112.28.125:3002' + "/api/monitor/get_ran_parameter",
            data: qs.stringify({
                source: config.source,
            })
        }).then(function (response) {

            return response.data;

        }).catch(function (res) {
            console.log(res);
            console.log('An error occurred in get solr query service');
        });
    },
    deployAP: function (params) {

        const config = getAppConfig();
        console.log(Number(params.AMF_IP))
        return axios({
            method: 'post',
            url: 'http://45.112.28.125:3002' + "/api/monitor/ran_deployment",
            data: qs.stringify({
                source: config.source,
                Band: params.Band,
                AMF_IP: params.AMF_IP,
                MCC: params.MCC,
                MNC: params.MNC,
                TAC: params.TAC,
                SST: params.SST,
                SD: params.SD,
                Gain: params.Gain,
            })
        }).then(function (response) {

            return response.data;

        }).catch(function (res) {
            console.log(res);
            console.log('An error occurred in get solr query service');
        });
    },
    tuning: function () {

        const config = getAppConfig();

        return axios({
            method: 'get',
            url: 'http://45.112.28.125:3002' + "/api/monitor/tuning",
            data: qs.stringify({
                source: config.source,
            })
        }).then(function (response) {

            return response.data;

        }).catch(function (res) {
            console.log(res);
            console.log('An error occurred in get solr query service');
        });
    },

}

export default apiServices;