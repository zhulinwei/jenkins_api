const fs = require('fs');
const assert = require('assert');
const Jenkins = require('../src/jenkins');

const jenkins = new Jenkins({
  username: 'admin',
  password: '123456',
  url: 'http://localhost:3452',
  token: '5679eef1c0322ff982525d6d82ad10d3'
});

describe('create a jenkins job', () => {
  it('it should create a jenkins job', async () => {
    const jobName = 'test';
    const jobConfig = fs.readFileSync('./src/config.xml', 'utf-8');
    const result = await jenkins.create(jobName, jobConfig);  
    assert.equal(result.ok, 1);
  });

  it('it should build a job', async () => {
    const jobName = 'test';
    const result = await jenkins.build(jobName);
    assert.equal(result.ok, 1);
  });

  it('it should return the info of job', async () => {
    const jobName = 'test';
    const jobNumber = 1;
    const result = await jenkins.getBuildInfo(jobName, jobNumber);
    assert.equal(result.ok, 1);
  });

  it('it should return the log of job', async () => {
    const jobName = 'test';
    const jobNumber = 1;
    const result = await jenkins.getBuildLog(jobName, jobNumber);
    assert.equal(result.ok, 1);
  });

  it('it should the history of build', async () => {
    const jobName = 'test';
    const result = await jenkins.getBuildHistory(jobName);
    assert.equal(result.ok, 1);
  });


  it('it should stop build the job', async () => {
    const jobName = 'test';
    const jobNumber = 1;
    const result = await jenkins.stopBuild(jobName, jobNumber);
    assert.equal(result.ok, 1);
  });
  
});

describe('remove a jenkins job', () => {
  it('it should remove a jenkins job', async () => {
    const jobName = 'test';
    const result = await jenkins.remove(jobName);  
    assert.equal(result.ok, 1);
  });
});
