const fs = require('fs');
const Jenkins = require('../lib/jenkins');

const jenkins = new Jenkins({
  url: 'http://localhost:8082',
  token: '6526e1c7d1792488fcd2b531ce24f60e',
  username: 'admin',
  password: 'admin',
});

const jobName = `test_${Date.now()}`;
const config = fs.readFileSync('./config.xml', 'utf-8');

jenkins.createJob('asfasdfadsfsadf', config).then(data => {
  console.log(data);
});

jenkins.removeJob('asfasdfadsfsadf').then(data => {
  console.log(data);
});

jenkins.build('asfasdfadsfsadf').then(data => {
  console.log(data);
});

jenkins.buildWithParams('asfasdfadsfsadf', { name: "1234", name12: "1234" }).then(data => {
  console.log('in')
  console.log(data);
});


jenkins.buildByBlueOcean('asfasdfadsfsadf').then(data => {
  console.log(data);
});

jenkins.getQueueInfo('334').then(data => {
  console.log(data);
});

jenkins.getBuildInfo('asfasdfadsfsadf', '25').then(data => {
  console.log(data);
});

jenkins.getBuildLog('asfasdfadsfsadf', '25').then(data => {
  console.log(data);
});

jenkins.getBuildHistory('asfasdfadsfsadf').then(data => {
  console.log(data.result.allBuilds[0]);
});

jenkins.stopBuild('asfasdfadsfsadf', '25').then(data => {
  console.log(data);
});


