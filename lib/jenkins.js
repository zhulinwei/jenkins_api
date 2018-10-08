const util = require('util');
const queryString = require('querystring');
const request = require('request-promise-native');

class Jenkins {
  constructor(options) {
    this.token = options.token || '';
    this.baseUrl = options.url || '';
    this.username = options.username || '';
    this.password = options.password || '';
    if (!this.baseUrl) throw new Error('请设置jenkins请求地址');  
  }

  async create(jobName, jobConfig) {
    if (!jobName || !jobConfig) throw new Error('请设置需要构建的项目以及配置信息');
    const options = {
      uri: `${this.baseUrl}/createItem/api/json?token=${this.token}&name=${jobName}`,
      headers: { 'Content-Type': 'application/xml' },
      body: jobConfig,
      auth: { user: this.username, pass: this.password }
    };

    const result = await request.post(options).catch(err => err);
    if (result && util.isObject(result)) return { ok: 0, err: result };
    return { ok: 1 };
  }

  async remove(jobName) {
    if (!jobName) throw new Error('请设置需要移除的项目名称'); 
    const options = {
      uri: `${this.baseUrl}/job/${jobName}/doDelete/api/json?token=${this.token}&name=${jobName}`,
      followAllRedirects: true,
      auth: { user: this.username, pass: this.password }
    };
    const result = await request.post(options).catch(err => err);
    if (result && util.isObject(result)) return { ok: 0, err: result };
    return { ok: 1 };
  }

  async build(jobName) {
    if (!jobName) throw new Error('请设置需要构建的项目以及版本号');
    const options = {
      uri: `${this.baseUrl}/job/${jobName}/build/api/json?token=${this.token}`,
      auth: { user: this.username, pass: this.password }
    };
    const result = await request.post(options).catch(err => err);
    if (util.isString(result)) return { ok: 0, err: result };
    return { ok: 1 };
  }  

  async buildWithParams(jobName, params) {
    if (!jobName) throw new Error('请设置需要构建的项目以及版本号');
    if (!util.isObject(params) || Object.keys(params).length < 1) throw new Error('请设置构建项目需要的参数'); 
    const query = Object.assign({token: this.token}, params);
    const options = {
      uri: `${this.baseUrl}/job/${jobName}/build/api/json?${queryString.stringify(query)}`,
      auth: { user: this.username, pass: this.password }
    };
    const result = await request.post(options).catch(err => err);
    if (util.isString(result)) return { ok: 0, err: result };
    return { ok: 1 };
  }

  async getBuildInfo(jobName, jobNumber) {
    if (!jobName || !jobNumber) throw new Error('请设置需要项目名称以及版本号');
    const options = {
      uri: `${this.baseUrl}/job/${jobName}/${jobNumber}/api/json`,
      followAllRedirects: true,
      auth: { user: this.username, pass: this.password }
    };
    const result = await request.get(options).catch(err => err);
    if (result && util.isObject(result)) return { ok: 0, err: result };
    return { ok: 1 };
  }

  async getBuildLog(jobName, jobNumber) {
    if (!jobName || !jobNumber) throw new Error('请设置需要项目名称以及版本号');
    const options = {
      uri: `${this.baseUrl}/job/${jobName}/${jobNumber}/consoleText/api/json`,
    };
    const result = await request.get(options).catch(err => err);
    if (result && util.isObject(result)) return { ok: 0, err: result };
    return { ok: 1 };
  }

  async getBuildHistory(jobName) {
    if (!jobName) throw new Error('请设置需要项目名称');
    const options = {
      uri: `${this.baseUrl}/job/${jobName}/api/json?tree=allBuilds[id,timestamp,result,duration]`,
    };
    const result = await request.get(options).catch(err => err);
    if (result && util.isObject(result)) return { ok: 0, err: result };
    return { ok: 1 };
  }

  async stopBuild(jobName, jobNumber) {
    if (!jobName || !jobNumber) throw new Error('请设置需要构建的项目以及版本号');
    const options = {
      uri: `${this.baseUrl}/job/${jobName}/${jobNumber}/stop?token=${this.token}`,
      followAllRedirects: true,
      auth: { user: this.username, pass: this.password }
    };
    const result = await request.post(options).catch(err => err);
    if (result && util.isObject(result)) return { ok: 0, err: result };
    return { ok: 1 };
  }
}

module.exports = Jenkins;
