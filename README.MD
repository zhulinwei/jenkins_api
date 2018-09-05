# jenkins-api

> Author: Level.Z
> CreateAt: 2018-09-04
> UpdateAt: 2018-09-05

## 说明
> 本地环境：http://localhost:8080
> 测试环境：http://jenkins.vipc.me
> 正适环境：https://jenkins.vipc.cn

### 构建项目
* 接口地址：`POST /job/:name/:number/stop/api/json?token=your_token`
* 补充说明：name为项目名称；token值在Jenkins账号管理中
* 成功返回：空值（状态码：200）

### 停止构建项目
* 接口地址：`POST /job/:name/:number/stop?token=your_token`
* 补充说明：name为项目名称；number为正在构建的版本编号
* 成功返回：String（状态码：200）

### 构建信息
* 接口地址：`GET /job/:name/:number/api/json`
* 补充说明：name为项目名称；number为构建的版本编号
* 成功返回：String（状态码：200）

```
{
  url : String,
  name : String,
  builds : Array,
  color : String,
  _class : String,
  actions : Array,
  description : String,
  displayName : String,
  fullName : String,
  buildable : Boolean,
  fullDisplayName : String,
  displayNameOrNull : String || null,
  nextBuildNumber : Number,
  property : Array,
  queueItem : String || Null,
  concurrentBuild : Boolean,
  inQueue : Boolean,
  keepDependencies : Boolean,
  lastUnstableBuild : String || Null,
  firstBuild : {
    url : String,
    number : Number,
    _class : String,
  },
  healthReport : [{
    description : String,
    iconClassName : String,
    iconUrl : String,
    score : Number
  }],
  lastBuild : {
    url : String,
    number : Number,
    _class : String,
  },
  lastCompletedBuild : {
    url : String,
    number : Number,
    _class : String,
  },
  lastFailedBuild : {
    url : String,
    number : Number,
    _class : String,
  },
  lastStableBuild : {
    url : String,
    number : Number,
    _class : String,
  },
  lastSuccessfulBuild : {
    url : String,
    number : Number,
    _class : String,
  },
  lastUnsuccessfulBuild : {
    url : String,
    number : Number,
    _class : String,
  },
}
```

### 最新的构建信息
* 接口地址：`GET /job/:name/lastBuild/api/json`
* 补充说明：name为项目名称
* 成功返回：String（状态码：200）

```
{
  url : String,
  name : String,
  builds : Array,
  color : String,
  _class : String,
  actions : Array,
  description : String,
  displayName : String,
  fullName : String,
  buildable : Boolean,
  fullDisplayName : String,
  displayNameOrNull : String || null,
  nextBuildNumber : Number,
  property : Array,
  queueItem : String || Null,
  concurrentBuild : Boolean,
  inQueue : Boolean,
  keepDependencies : Boolean,
  lastUnstableBuild : String || Null,
  firstBuild : {
    url : String,
    number : Number,
    _class : String,
  },
  healthReport : [{
    description : String,
    iconClassName : String,
    iconUrl : String,
    score : Number
  }],
  lastBuild : {
    url : String,
    number : Number,
    _class : String,
  },
  lastCompletedBuild : {
    url : String,
    number : Number,
    _class : String,
  },
  lastFailedBuild : {
    url : String,
    number : Number,
    _class : String,
  },
  lastStableBuild : {
    url : String,
    number : Number,
    _class : String,
  },
  lastSuccessfulBuild : {
    url : String,
    number : Number,
    _class : String,
  },
  lastUnsuccessfulBuild : {
    url : String,
    number : Number,
    _class : String,
  },
}
```

### 构建日志
* 接口地址：`GET /job/:name/:number/consoleText/api/json`
* 补充说明：name为项目名称；number为正在构建的版本编号
* 成功返回：String（状态码：200）

### 创建项目
* 接口地址：`POST /createItem/api/json?token=your_token&name=item_name`
* 补充说明：item_name为项目名称；
* 提交格式：`application/xml`
* 提交内容：config.xml（xml配置文件）
* 成功返回：空值（状态码：200）

### 删除项目
* 接口地址：`POST /job/:name/doDelete/api/json?token=your_token`
* 补充说明：name为项目名称；
* 成功返回：String（状态码：200）

### 项目列表
* 接口地址：`GET /api/json`
* 成功返回：String（状态码：200）
```
{
  jobs: [{
    url: String,
    name: String,
    _class: String,
  }] 
}
```

