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
  })
});
