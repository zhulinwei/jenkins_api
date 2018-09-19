# jenkins_api
Use JavaScript to call Jenkins API

## Usage

#### Setup

```
const Jenkins = require('./lib/jenkins');
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
  jenkins.create(your_job_name, 'xmlConfigString');
```

### builds

#### build
``` 
  jenkins.build(your_job_name);
```

#### build with params
``` 
  const options = { param1: 'value1', parameter2: 'value2'};
  jenkins.buildWithParams(your_job_name, options);
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

#### remove jobs
``` 
  jenkins.remove(your_job_name);
```

