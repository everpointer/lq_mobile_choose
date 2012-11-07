lqMobileChoose.ManagePackageController = Ember.ObjectController.extend({
   // Implement your controller here.
   shop: "",
   choosedProductId: "",
   choosedPackages: null, // 当前选中的套餐
   inputPackage: "",  // 输入框绑定的套餐名
   productClass: "",
   didPackageChange: false,
   init: function() {
   },
   mobileProducts: function() {
    // var products = lqMobileChoose.store.recordCache.filter(function(record)
    var controller = this;
    var products = lqMobileChoose.store.filter(lqMobileChoose.Product, function(record)
    {
        if (record.get('shop') === controller.get('shop'))
        {
            return true;
        }
    });
    return products;
  }.property('shop'),
  packages: function() {
    var controller = this;

    if (!controller.get('choosedProductId'))
    {
        return null;
    }
    var packages = lqMobileChoose.store.filter(lqMobileChoose.MobilePackages, function(item)
    {
        //过滤条件
        var record = item.get('record');
        if (record.get('productId') !== controller.get('choosedProductId'))
        {
            return false;
        } else {
            return true;
        }
    });
    return packages;
  }.property('choosedProductId'),
  checkPackage: function(newPackage) {
    var packages = this.get('packages');
    for (var i=0; i <  packages.get('length'); i++)
    {
        if (packages.objectAt(i).get('packageName') === newPackage)
        {
            return false;
        }
    }
    return true;
  },
  addPackage: function() {
    // var transaction = this.get('transaction');
    var productId = this.get('choosedProductId');
    var inputPackage = this.get('inputPackage');
    if (!productId)
    {
      this.set('productClass', 'error');
      return;
    } else {
      this.set('productClass', '');
    }
    if (inputPackage && this.checkPackage(inputPackage))
    {
      var newPackage = {"productId": productId, "packageName": inputPackage};
      var newRecord = lqMobileChoose.store.createRecord(lqMobileChoose.MobilePackages, newPackage);
      this.set('didPackageChange', true);
      // var newRecord = transaction.createRecord(lqMobileChoose.MobilePackages, newPackage);
      // transaction.add(newRecord);
    }
    // clear action
    this.set('inputPackage', "");
  },
  savePackages: function() {
    var outer_this = this;
    lqMobileChoose.store.commit();
    this.set('didPackageChange', false);  // 还原套餐数据原始状态

    // todo：实现commit的成功判断，目前都是默认成功的
    // lqMobileChoose.store.adapter.createRecords(lqMobileChoose.store, lqMobileChoose.MobilePackages, this.get('packages'));
    // var callback = function(sender, key, value, context, rev) {
    //     // debugger;
    //     if (sender.get('isError') === true)
    //     {
    //         alert("保存失败！");
    //     }
    //   sender.removeObserver('isError', callback);
    // };
    // this.get('packages').forEach(function(item) {
    //     item.addObserver('isError', callback);
    // });
  },
  choosedPackageChanged: function() {
    var choosedPackage = this.get('choosedPackages')[0];
    if (choosedPackage !== null)
    {
        this.set('inputPackage', choosedPackage.get('packageName'));
    }
  }.observes("choosedPackages"),
  editPackage: function() {
    var choosedPackage = this.get('choosedPackages')[0];
    var inputPackage = this.get('inputPackage');

    if (choosedPackage.get('packageName') !== inputPackage)
    {
        choosedPackage.set('packageName', inputPackage);
        this.set('didPackageChange', true);
    }
    this.set('inputPackage', '');
  },
  obser: function() {
    var packages = this.get('packages');
  }.observes('packages')
});

