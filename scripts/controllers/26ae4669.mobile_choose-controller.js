lqMobileChoose.MobileChooseController = Ember.ObjectController.extend({
  // Implement your controller here.
  content: [],
  choosedNums: 0, // 当前选中的号码数量
  page_size: 12,
  current_page: 0,
  previousClass: function() {
    // 第一页则禁用上一页按钮
    if (this.get('current_page') === 0)
    {
        return "previous disabled";
    } else {
        return "preivous";
    }
  }.property('current_page'),
  nextClass: function() {
    // 第一页则禁用上一页按钮
    if (this.get('current_page') > 0)
    {
        return "next disabled";
    } else {
        return "next";
    }
  }.property('current_page'),
  currentMobiles: function() {
    var mobileChoices = lqMobileChoose.stepsController.get('user_data.mobile_choices');
    var current_page = this.get('current_page');
    var page_size = this.get('page_size');
    var beginIndex = page_size*current_page;
    if (!mobileChoices || mobileChoices.length < beginIndex)
    {
        return [];
    }
    // 根据分页获得部分显示的号码
    // slice 的两个参数都是索引，第2个参数并不是长度
    return mobileChoices.slice(beginIndex, (beginIndex+page_size)>mobileChoices.length?mobileChoices.length:(beginIndex+page_size));
  }.property('current_page'),
  init: function() {
    // get total randomized mobile numbers
    // 第一次初始化所有的本地数据
    var recordArray = DS.RecordArray.create({ type: lqMobileChoose.MobileNumber, content: Ember.A([]), store: lqMobileChoose.store });
    // lqMobileChoose.store.findQuery(lqMobileChoose.store, lqMobileChoose.MobileNumber, {isUsed: 0});
    // findQuery 模拟findAll的加载操作，才能覆盖store的数据
    lqMobileChoose.store.findQuery(lqMobileChoose.MobileNumber, {isUsed: 0}, recordArray);
    lqMobileChoose.store.registerRecordArray(recordArray, lqMobileChoose.MobileNumber);
    lqMobileChoose.store.typeMapFor(lqMobileChoose.MobileNumber).findAllCache = recordArray;
    // lqMobileChoose.store.loadMany(lqMobileChoose.MobileNumber, recordArray.toJSON());
    // 然后在本地数据中查找指定的类别的号码资源
    // this.set('content', lqMobileChoose.store.filter(lqMobileChoose.MobileNumber, query));
    // debugger;
    // this.set('content', lqMobileChoose.store.findAll(lqMobileChoose.MobileNumber));
    var outer_this = this;
    // lqMobileChoose.stepsController.get('user_data').addObserver('shop', function(sender, key, value, rev) {
    //     // var user_data = this;
    //     debugger;
    //     if (value === undefined || value === "" || value === rev)
    //     {
    //         return;
    //     }
    //     outer_this.set('content', lqMobileChoose.store.filter(lqMobileChoose.MobileNumber, function(item)
    //         {
    //             var record = item.record;
    //             if (record.get('shop') === value &&
    //                 record.get('productId') === sender.get('product_id') &&
    //                 record.get('isUsed') === 0)
    //             {
    //                 return true;
    //             }
    //         })
    //     );
    // });
  }
});




