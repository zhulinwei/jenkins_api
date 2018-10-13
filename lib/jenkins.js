const util = require('util');
const queryString = require('querystring');
const request = require('request-promise-native');

const SUCCESS_STATUS_CODE = 200;

function getQueueId(location) {
  return queueId = /\/queue\/item\/(\d+)/.exec(location)[1];
}

function formatBuildResult(result ={}) {
  const headers = result.headers || {};
  const queueId = getQueueId(headers.location || '');
  return { queueId };
}

class Jenkins {
  constructor(options) {
    this.token = options.token || '';
    this.baseUrl = options.url || '';
    this.username = options.username || '';
    this.password = options.password || '';
    if (!this.baseUrl) throw new Error('请设置jenkins请求地址');  
  }

  async _send(options) {
    try {
      const result = await request(options);
      return { status: result.statusCode || SUCCESS_STATUS_CODE, result: result || '' };
    } catch(error) {
      return { status: error.statusCode, error: error.message || '未知错误' };
    }
  }

  async createJob(jobName, jobConfig) {
    if (!jobName || !jobConfig) throw new Error('请设置需要构建的项目以及配置信息');
    const options = {
      method: 'POST',
      uri: `${this.baseUrl}/createItem/api/json?token=${this.token}&name=${jobName}`,
      headers: { 'Content-Type': 'application/xml' },
      body: jobConfig,
      auth: { user: this.username, pass: this.password },
    };
    return await this._send(options);
  }

  async removeJob(jobName) {
    if (!jobName) throw new Error('请设置需要移除的项目名称'); 
    const options = {
      method: 'POST',
      uri: `${this.baseUrl}/job/${jobName}/doDelete/api/json?token=${this.token}&name=${jobName}`,
      followAllRedirects: true,
      auth: { user: this.username, pass: this.password }
    };
    return { status: SUCCESS_STATUS_CODE };
  }

  async build(jobName) {
    if (!jobName) throw new Error('请设置需要构建的项目以及版本号');
    const options = {
      method: 'POST',
      uri: `${this.baseUrl}/job/${jobName}/build/api/json?token=${this.token}`,
      auth: { user: this.username, pass: this.password },
      resolveWithFullResponse: true
    };
    const response = await this._send(options);
    if (response.error) return response;
    const result = formatBuildResult(response.result);
    return { status: SUCCESS_STATUS_CODE, result };
  }  
  
  async buildWithParams(jobName, params) {
    if (!jobName) throw new Error('请设置需要构建的项目以及版本号');
    if (!util.isObject(params) || Object.keys(params).length < 1) throw new Error('请设置构建项目需要的参数'); 
    const query = Object.assign({token: this.token}, params);
    const options = {
      method: 'POST',
      uri: `${this.baseUrl}/job/${jobName}/buildWithParameters?${queryString.stringify(query)}`,
      auth: { user: this.username, pass: this.password },
      resolveWithFullResponse: true
    };
    const response = await this._send(options);
    if (response.error) return response;
    const result = formatBuildResult(response.result);
    return { status: SUCCESS_STATUS_CODE, result };
  }

  async buildByBlueOcean(jobName, params ={}) {
    if (!jobName) throw new Error('请设置需要构建的项目以及版本号');
    const parameters = Object.keys(params).map(key => { 
      return { name: key, value: params[key] }; 
    });
    const options = {
      method: 'POST',
      uri: `${this.baseUrl}/blue/rest/organizations/jenkins/pipelines/${jobName}/runs/`,
      json: { parameters },
      auth: { user: this.username, pass: this.password },
    };
    return await this._send(options);
  }

  async getQueueInfo(queueId) {
    if (!queueId) throw new Error('请设置需要查询的队列编号');
    const options = {
      uri: `${this.baseUrl}/queue/item/${queueId}/api/json`,
      followAllRedirects: true,
      auth: { user: this.username, pass: this.password }
    };
    const response = await this._send(options);
    if (response.error) return response;
    const result = JSON.parse(response.result);
    return { status: SUCCESS_STATUS_CODE, result };
  }

  async getBuildInfo(jobName, jobNumber) {
    if (!jobName || !jobNumber) throw new Error('请设置需要项目名称以及版本号');
    const options = {
      uri: `${this.baseUrl}/job/${jobName}/${jobNumber}/api/json`,
      followAllRedirects: true,
      auth: { user: this.username, pass: this.password }
    };

    const response = await this._send(options);
    if (response.error) return response;
    const result = JSON.parse(response.result);
    return { status: SUCCESS_STATUS_CODE, result };
  }

  async getBuildLog(jobName, jobNumber) {
    if (!jobName || !jobNumber) throw new Error('请设置需要项目名称以及版本号');
    const options = {
      uri: `${this.baseUrl}/job/${jobName}/${jobNumber}/consoleText/api/json`,
      auth: { user: this.username, pass: this.password }
    };
    return await this._send(options);
  }

  async getBuildHistory(jobName) {
    if (!jobName) throw new Error('请设置需要项目名称');
    const options = {
      uri: `${this.baseUrl}/job/${jobName}/api/json?tree=allBuilds[id,timestamp,result,duration]`,
      auth: { user: this.username, pass: this.password }
    };

    const response = await this._send(options);
    if (response.error) return response;
    const result = JSON.parse(response.result);
    return { status: SUCCESS_STATUS_CODE, result };
  }

  async stopBuild(jobName, jobNumber) {
    if (!jobName || !jobNumber) throw new Error('请设置需要构建的项目以及版本号');
    const options = {
      method: 'POST',
      uri: `${this.baseUrl}/job/${jobName}/${jobNumber}/stop?token=${this.token}`,
      followAllRedirects: true,
      auth: { user: this.username, pass: this.password }
    };
    await this._send(options);
    return { status: SUCCESS_STATUS_CODE };
  }
}

module.exports = Jenkins;
