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
      method: "POST",
      uri: `${this.baseUrl}/createItem/api/json?token=${this.token}&name=${jobName}`,
      headers: { 'Content-Type': 'application/xml' },
      body: jobConfig,
      auth: { user: this.username, pass: this.password }
    };
    const result = await request(options).catch(err => err);
    if (!result) return { ok: 1 };
    else return { ok: 0, err: result };
  }

  async build(jobName, jobNumber) {
    if (!jobName || !jobNumber) throw new Error('请设置需要构建的项目以及版本号');
    const options = {
      method: "POST",
      uri: `${this.baseUrl}/job/${jobName}/build/api/json?token=${this.token}`      
    };
    const result = await request(options).catch(err => err);
    if (!result) return { ok: 1 };
    else return { ok: 0, err: result };
  }  
}

module.exports = Jenkins;
