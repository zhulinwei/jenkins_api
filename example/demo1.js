const Jenkins = require('../lib/jenkins');

const jenkins = new Jenkins({
  url: 'http://localhost:8082',
  token: '6526e1c7d1792488fcd2b531ce24f60e',
  username: 'admin',
  password: 'admin',
});

// 无参构建
jenkins.build('cms_server').then(data => {
  console.log(data);
});

// 有参构建
jenkins.buildWithParams('build', {
  imageName: 'vipc-test',
  tag: '2.3',
  svn: 'svn://115.28.157.15/test1/trunk'
}).then(data => {
  console.log(data);
});

