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

const SUCCESS_STATUS_CODE = 200;

describe('jenkins test', () => {
  it('it should create a jenkins job', async () => {
    const jobName = 'test';
    const jobConfig = fs.readFileSync('./example/config.xml', 'utf-8');

    const stub = sinon.stub(jenkins, '_send').callsFake(function() {
      return Promise.resolve({ status: 200, result: '' });
    });
    const result = await jenkins.createJob(jobName, jobConfig);  
    assert.equal(result.status, SUCCESS_STATUS_CODE);
    stub.restore();
  });

  it('it should remove a jenkins job', async () => {
    const jobName = 'test';
    const stub = sinon.stub(jenkins, '_send').callsFake(function() {
      return Promise.resolve({ status: 200, result: '' });
    });
    const result = await jenkins.removeJob(jobName);  
    assert.equal(result.status, SUCCESS_STATUS_CODE);
    stub.restore();
  });
 
  it('it should build a job', async () => {
    const jobName = 'test';
    const stub = sinon.stub(jenkins, '_send').callsFake(function() {
      return Promise.resolve({ status: 200, result: { headers: { location: 'http://localhost/queue/item/01' } } });
    });
    const result = await jenkins.build(jobName);
    assert.equal(result.status, SUCCESS_STATUS_CODE);
    stub.restore();
  });
  
  it('it should build a job with parameters', async () => {
    const jobName = 'test';
    const parameters = { key: 'test', value: 'test'};
    const stub = sinon.stub(jenkins, '_send').callsFake(function() {
      return Promise.resolve({ status: 200, result: { headers: { location: 'http://localhost/queue/item/01' } } });
    });
    const result = await jenkins.buildWithParams(jobName, parameters);
    assert.equal(result.status, SUCCESS_STATUS_CODE);
    stub.restore();
  });
  
  it('it should build a job by blueocean', async () => {
    const jobName = 'test';
    const stub = sinon.stub(jenkins, '_send').callsFake(function() {
      return Promise.resolve({ status: 200, result: { id: 1, queueId: 1 } });
    });
    const result = await jenkins.buildByBlueOcean(jobName, { param1: 'value1', parameter2: 'value2'});
    assert.equal(result.status, SUCCESS_STATUS_CODE);
    stub.restore();
  });

  it('it should return the info of queue by queueId', async () => {
    const queueId = 1;
    const stub = sinon.stub(jenkins, '_send').callsFake(function() {
      return Promise.resolve({ status: 200, result: JSON.stringify({id: 1, executable: { number: 1 } })});
    });
    const result = await jenkins.getQueueInfo(queueId);
    assert.equal(result.status, SUCCESS_STATUS_CODE);
    stub.restore();
  });

  it('it should return the info of job', async () => {
    const jobName = 'test';
    const jobNumber = 1;
    const stub = sinon.stub(jenkins, '_send').callsFake(function() {
      return Promise.resolve({ status: 200, result: JSON.stringify({ building: false, result: 'SUCCESS' }) });
    });
    const result = await jenkins.getBuildInfo(jobName, jobNumber);
    assert.equal(result.status, SUCCESS_STATUS_CODE);
    stub.restore();
  });

  it('it should return the log of job', async () => {
    const jobName = 'test';
    const jobNumber = 1;
    const stub = sinon.stub(jenkins, '_send').callsFake(function() {
      return Promise.resolve({ status: 200, result: 'the log of job' });
    });
    const result = await jenkins.getBuildLog(jobName, jobNumber);
    assert.equal(result.status, SUCCESS_STATUS_CODE);
    stub.restore();
  });

  it('it should the history of build', async () => {
    const jobName = 'test';
    const stub = sinon.stub(jenkins, '_send').callsFake(function() {
      return Promise.resolve({ status: 200, result: JSON.stringify({ allBuilds: [{ id: 1, result: 'SUCCESS' }] }) });
    });
    const result = await jenkins.getBuildHistory(jobName);
    assert.equal(result.status, SUCCESS_STATUS_CODE);
    stub.restore();
  });

  it('it should stop build the job', async () => {
    const jobName = 'test';
    const jobNumber = 1;
    const stub = sinon.stub(jenkins, '_send').callsFake(function() {
      return Promise.resolve({ status: 200 });
    });
    const result = await jenkins.stopBuild(jobName, jobNumber);
    assert.equal(result.status, SUCCESS_STATUS_CODE);
    stub.restore();
  });

  });
