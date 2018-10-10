const Jenkins = require('../lib/jenkins');

const jenkins = new Jenkins({
  url: 'http://localhost:8082',
  token: '6526e1c7d1792488fcd2b531ce24f60e',
  username: 'admin',
  password: 'admin',
});

jenkins.getQueueInfo(148).then(data => {
  console.log(data);
})
