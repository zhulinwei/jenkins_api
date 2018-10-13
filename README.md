# l-jenkins
Use JavaScript to call Jenkins API

## Install
npm install l-jenkins

## Usage

#### Setup
```javascript
const Jenkins = require('l-jenkins');
const jenkins = new Jenkins({
  url: 'your_jenkins_url',
  token:  'your_jenkins_token',
  username: 'your_jenkins_username',
  password: 'your_jenkins_password' 
});
```
### jobs

#### create job

``` 
jenkins.createJob(your_job_name, 'xmlConfigString');
```

#### remove job

``` 
jenkins.removeJob(your_job_name);
```

### build

#### build by default jenkins service

``` 
jenkins.build(your_job_name);
```

#### build with params by default jenkins service

``` 
const options = { param1: 'value1', parameter2: 'value2'};
jenkins.buildWithParams(your_job_name, options);
```

#### build by blueocean service 

``` 
const options = { param1: 'value1', parameter2: 'value2'};
jenkins.buildByBlueOcean(your_job_name, options);
```

the different between blueocean service and default jenkins service is that using blueocean service can got build number immediately, and the default jenkins service can only got queueId,
if you use the default jenkins to build your job, you should use queueId to got build number, and then got the build info of your job;

### queue info

``` 
jenkins.getQueueInfo(queueId);
```
#### build info

``` 
jenkins.getBuildInfo(your_job_name, build_number);
```

#### build log

``` 
jenkins.getBuildLog(your_job_name, build_number);
```

#### build history

``` 
jenkins.getBuildHistory(your_job_name);
```

#### stop build 

``` 
jenkins.stopBuild(your_job_name, build_number);
```

