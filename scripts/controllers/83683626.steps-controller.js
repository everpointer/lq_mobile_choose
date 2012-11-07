lqMobileChoose.UserData = Ember.Object.extend({
  shop: "",
  product_id: "",
  package_id: "",
  mobile_choices: function() {
    // shop值标志着选号的变化与否
    var outer_this = this;
    var current_shop = this.get('shop');
    if (current_shop === undefined || current_shop === "")
    {
      return null;
    }
    // var choices = lqMobileChoose.store.filter(lqMobileChoose.MobileNumber, function(item)
    var choices = lqMobileChoose.store.recordCache.filter(function(record)
      {
          if (record.get('shop') === current_shop &&
              record.get('productId') === outer_this.get('product_id') &&
              record.get('isUsed') === 0 &&
              (!record.get('package_id') ||
               record.get('package_id') === outer_this.get('package_id')))
          {
              return true;
          }
      });
    return choices;
  }.property('shop'),
  packages: function() {
    var productId = this.get('product_id');
    if (!productId)
    {
      return [];
    }

    var packages = lqMobileChoose.store.filter(lqMobileChoose.MobilePackages, function(record)
    {
        //过滤条件
        if (record.get('product_id') !== productId)
        {
            return false;
        } else {
            return true;
        }
    });

    // 初始化packages,默认选中第1个套餐
    // 不管是在didInsertElement中实现，还是在store.filter中实现都有问题(特别是filter,里面的record不完全，只能get)
    // 最终只能通过observer来实现了, 无法通过监视isLoaded，只能通过content.length来判断是否加载了
    var callback = function() {
      if (packages.get('content.length') > 0)
      {
        packages.objectAt(0).set('isSelected', true);
        packages.removeObserver('content.length', callback);
      }
    };
    // observe content没效果，content.length才可以
    packages.addObserver('content.length', callback);

    return packages;
  }.property('product_id')
});

lqMobileChoose.StepsController = Ember.ArrayProxy.extend({
  // Implement your controller here.
  content: [],
  // todo: 应该给user_data一个固定的结构，方便查询
  user_data: lqMobileChoose.UserData.create(),
  // exchange_choices: 
  // reaminNumsChanged: function() {
  //   this.set('exchange_choices',[]);
  //   for (var i=1; i <= parseInt(this.get('user_data.remain_nums'), 10); i++)
  //   {
  //     // this.get('exchange_choices').push(Ember.Object.create({id: i}));
  //     this.set('exchange_choices',[Ember.Object.create({id: i})]);
  //   }
  // }.observes("user_data.remain_nums"),
  exchange_choices: function() {
    var choices = [];
    for (var i=1; i <= parseInt(this.get('user_data.remain_nums'), 10); i++)
    {
      choices.push(Ember.Object.create({id: i}));
    }
    return choices;
  }.property("user_data.remain_nums"),
  stepFurther: function() {
    var view_this = this;
    this.get('content').forEach(function(item) {
      if (view_this.get('current_step') === item.id)
      {
        item.set('isActive', true);
      } else {
        item.set('isActive', false);
      }
    });
  }.observes('current_step'),
  init: function() {
    this.set('content', [
        Ember.Object.create({ id:'exchange', order:1, title:'团购券兑换', isActive: true}),
        Ember.Object.create({ id:'exchange-confirm', order:2, title:'团购券兑换确认', isActive: false}),
        Ember.Object.create({ id:'mobile-choose', order:3, title:'号码选择', isActive: false}),
        Ember.Object.create({ id:'supply-address', order:4, title:'提供收货地址', isActive: false}),
        Ember.Object.create({ id:'exchange-finish', order:5, title:'兑换成功等待收货', isActive: false})
    ]);
  }
});

lqMobileChoose.stepsController = lqMobileChoose.StepsController.create();
