const fs = require('fs');
const sinon = require('sinon');
const assert = require('assert');
const Jenkins = require('../lib/jenkins');
const request = require('request-promise-native');

const jenkins = new Jenkins({
  url: 'url',
  token: 'token',
  username: 'username',
  password: 'password',
});

describe('create a jenkins job', () => {
  it('it should create a jenkins job', async () => {
    const jobName = 'test';
    const jobConfig = fs.readFileSync('./lib/config.xml', 'utf-8');

    const stub = sinon.stub(request, 'post').callsFake(function() {
      return Promise.resolve();
    });
    const result = await jenkins.create(jobName, jobConfig);  
    assert.equal(result.ok, 1);
    stub.restore();
  });

  it('it should build a job', async () => {
    const jobName = 'test';
    const stub = sinon.stub(request, 'post').callsFake(function() {
      return Promise.resolve();
    });
    const result = await jenkins.build(jobName);
    assert.equal(result.ok, 1);
    stub.restore();
  });
   
  it('it should build a job with parameters', async () => {
    const jobName = 'test';
    const stub = sinon.stub(request, 'post').callsFake(function() {
      return Promise.resolve();
    });
    const result = await jenkins.buildWithParams(jobName, { param1: 'value1', parameter2: 'value2'});
    assert.equal(result.ok, 1);
    stub.restore();
  });

  it('it should return the info of job', async () => {
    const jobName = 'test';
    const jobNumber = 1;
    const stub = sinon.stub(request, 'get').callsFake(function() {
      return Promise.resolve('');
    });
    const result = await jenkins.getBuildInfo(jobName, jobNumber);
    assert.equal(result.ok, 1);
    stub.restore();
  });

  it('it should return the log of job', async () => {
    const jobName = 'test';
    const jobNumber = 1;
    const stub = sinon.stub(request, 'get').callsFake(function() {
      return Promise.resolve('');
    });
    const result = await jenkins.getBuildLog(jobName, jobNumber);
    assert.equal(result.ok, 1);
    stub.restore();
  });

  it('it should the history of build', async () => {
    const jobName = 'test';
    const stub = sinon.stub(request, 'get').callsFake(function() {
      return Promise.resolve('');
    });
    const result = await jenkins.getBuildHistory(jobName);
    assert.equal(result.ok, 1);
    stub.restore();
  });


  it('it should stop build the job', async () => {
    const jobName = 'test';
    const jobNumber = 1;
    const stub = sinon.stub(request, 'post').callsFake(function() {
      return Promise.resolve('');
    });
    const result = await jenkins.stopBuild(jobName, jobNumber);
    assert.equal(result.ok, 1);
    stub.restore();
  });

  it('it should remove a jenkins job', async () => {
    const jobName = 'test';
    const stub = sinon.stub(request, 'post').callsFake(function() {
      return Promise.resolve('');
    });
    const result = await jenkins.remove(jobName);  
    assert.equal(result.ok, 1);
    stub.restore();
  });
 
});
