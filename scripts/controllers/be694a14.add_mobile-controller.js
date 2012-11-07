lqMobileChoose.AddMobileController = Ember.ObjectController.extend({
  // Implement your controller here.
  content: Ember.Object.create({
    shop: "",
    productId: "",
    mobile: "",
    packageId: ""
  }),
  productClass: "",
  inputMobileClass: "",
  errorMsg: "",
  mobileProducts: function() {
    // var products = lqMobileChoose.store.recordCache.filter(function(record)
    var content = this.get('content');
    var products = lqMobileChoose.store.filter(lqMobileChoose.Product, function(record)
    {
        if (record.get('shop') === content.get('shop'))
        {
            return true;
        }
    });
    return products;
  }.property('content.shop'),
  packages: function() {
    var controller = this;

    if (!controller.get('content.productId'))
    {
        return null;
    }
    var packages = lqMobileChoose.store.filter(lqMobileChoose.MobilePackages, function(item)
    {
        //过滤条件
        var record = item.get('record');
        if (record.get('productId') !== controller.get('content.productId'))
        {
            return false;
        } else {
            return true;
        }
    });
    return packages;
  }.property('content.productId'),
  addedMobiles: [],
  choosedMobiles: [],
  inputMobile: "",
  checkMobile: function(checkMobile) {
    if (!checkMobile || !checkMobile.match(/^1[0-9]{10}$/))
    {
      return false;
    }
    var addedMobiles = this.get('addedMobiles');
    var checkResult = true;
    for (var i=0; i < addedMobiles.length; i++)
    {
      var mobile = addedMobiles[i].get('mobile');
      if (checkMobile === mobile)
      {
        checkResult = false;
        break;
      }
    }
    return checkResult;
  },
  addMobile: function() {
    var shop = this.get('content.shop');
    var productId = this.get('content.productId');
    var packageId = this.get('content.packageId');
    var inputMobile = this.get('inputMobile');
    if (!productId)
    {
      this.set('productClass', 'error');
      return;
    } else {
      this.set('productClass', '');
    }
    if (this.checkMobile(inputMobile))
    {
      this.set('inputMobileClass', '');
      this.get('addedMobiles').pushObject(Ember.Object.create({
          shop: shop,
          productId: productId,
          packageId: packageId,
          mobile: inputMobile
      }));
      this.set('inputMobile', '');
    } else {
      this.set('inputMobileClass', 'error');
      this.set('inputMobile', '');
    }
  },
  deleteMobile: function() {
    var choosedMobiles = this.get('choosedMobiles');
    var newAddedMobiles = this.get('addedMobiles').filter(function(mobile) {
      var needDelete = true;
      choosedMobiles.forEach(function(choosedMobile) {
        // 匹配后，就删除记录
        if (mobile.get('mobile') === choosedMobile.get('mobile'))
        {
          needDelete = false;
        }
      });
      return needDelete;
    });
    this.set('addedMobiles', newAddedMobiles);
  },
  saveMobiles: function() {
      // var content = this.get('content');
      var controller = this;
      var addedMobiles = this.get('addedMobiles');
      if (addedMobiles.length === 0)
      {
        return false;
      }
      if (!window.confirm('此次操作将添加' + addedMobiles.length + '个号码,确认提交吗?'))
      {
        return false;
      }
      // clear error
      this.set('latestAddMobileResult', '');
      // var addedRecords = [];
      var latestCreatedRecords = [];
      addedMobiles.forEach(function(item) {
        var newRecord = {
          shop: item.get('shop'),
          productId: item.get('productId'),
          mobile: item.get('mobile'),
          packageId: item.get('packageId')
        };
        // store没有createRecords的方法,只能循环调用createRecord了
        latestCreatedRecords.pushObject(lqMobileChoose.store.createRecord(lqMobileChoose.MobileNumber, newRecord));
      });
      // var modelRecord = lqMobileChoose.store.createRecords(lqMobileChoose.MobileNumber, addedRecords);
      // 不提交就不会调用adapter的ajax方法,也可以稍后提交,对于一些本地非及时的操作
      // 只有在commit的时候才会调用adapter，不知道这个时候，createRecords有没有被调用
      lqMobileChoose.store.commit();
      // todo: 难道每一次提交，都要设定一个监视器吗，有没有通用一点的，悲剧。
      function callback(sender, key, value, context, rev) {
        if (sender.get(key) === true)
        {
          controller.set('latestAddMobileResult', controller.get('latestAddMobileResult') + " " + sender.get('mobile'));
        }
        sender.removeObserver('isError', callback);
      }
      if (latestCreatedRecords)
      {
        latestCreatedRecords.forEach(function(item) {  item.addObserver('isError', callback); } );
      }
      this.set('addedMobiles', []);
  },
  latestAddMobileResult: "",
  latestAddResultChanged: function() {
    // saveMobiles -> latestAddResult -> latestAddResultChanged
    var latestAddMobileResult = this.get('latestAddMobileResult');
    if (latestAddMobileResult === "")
    {
      return;
    }
    // window.alert(latestAddMobileResult);
    // this.set('latestAddMobileResult', '');
  }.observes('latestAddMobileResult'),
  rawBatchMobiles: "",
  parseRawBatchMobiles: function() {
    var controller = this;
    var rawBatchMobiles = $.trim(this.get('rawBatchMobiles').toString());
    var shop = this.get('content.shop');
    var productId = this.get('content.productId');
    var packageId = this.get('content.packageId');

    // 下述pattern解析出来的结果,除了最后一条，一般都会多出来1位，需要去掉，暂时没有其他解决方案
    var pattern = /1[0-9]{10}($|[^0-9])/g;
    if (rawBatchMobiles === "")
    {
      return 0;
    }
    var parsedMobiles = rawBatchMobiles.match(pattern);
    var newMobiles = [];
    parsedMobiles.forEach(function(item) {
      var mobile;
      if (item.length === 12)
      {
        mobile = item.substr(0, 11);
      } else if (item.length !== 11)
      {
        return;
      } else {
        mobile = item;
      }
      // 检查mobile是否已在本地存在
      for (var i=0; i < newMobiles.length; i++)
      {
        if( mobile === newMobiles[i].mobile)
        {
          return;
        }
      }
      // 检查mobile是否已经被插入
      if (controller.checkMobile(mobile))
      {
        newMobiles.pushObject(Ember.Object.create({
            shop: shop,
            productId: productId,
            mobile: mobile,
            packageId: packageId
        }));
      }
    });
    // 更新addedMobiles列表
    this.set('addedMobiles', this.get('addedMobiles').concat(newMobiles));
    this.set('rawBatchMobiles', '');
    // 返回成功解析出来的号码数量
    return newMobiles.length;
  },
  addedMobilesChanged: function() {
    var addedMobiles = this.get('addedMobiles');
    if (addedMobiles.length === 0)
    {
      return;
    }
    if (!this.get('content.productId'))
    {
      this.set('productClass', 'error');
      // this.set('errorMsg', '');
    } else {
      this.set('productClass', '');
      // this.set('errorMsg', '');
    }
  }.observes('addedMobiles@each')
});

