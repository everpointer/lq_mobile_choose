lqMobileChoose.SearchMobileController = Ember.ArrayController.extend({
  // Implement your controller here.
  shop: "",
  content: [],
  filter_mobile_type: 0,
  filter_product_id: "",
  filter_mobile: "",
  page_size: 10,
  page_index: 1,
  pageIndexChange: 1,
  showStatus: function() {
    var totalRecords = this.get('content.length');
    if (totalRecords <= 0)
    {
      return 0;
    }
    var start = (this.get('page_index') - 1) * this.get('page_size') + 1;
    var end = this.get('page_index')*this.get('page_size');
    var realEnd = end > totalRecords? totalRecords: end;
    return start + "-" + realEnd;
  }.property('page_index', 'page_size', 'content'),
  shopChanged: function() {
    // var products = lqMobileChoose.store.recordCache.filter(function(record)
    // var content = this.get('content');
    // console.log("in");
    // this.set('shop', lqMobileChoose.partner.get('shop'));
    if (lqMobileChoose.partner.get('shop'))
    {
      this.set('shop', lqMobileChoose.partner.get('shop'));
      this.filterMobileNumber();
    }
  }.observes('shop'),
  filterMobileNumber: function() {
    var searchMobile = this;
    var mobiles = lqMobileChoose.store.filter(lqMobileChoose.MobileNumber, function(record)
    {
        if (record.get('shop') === searchMobile.get('shop'))
        {
            return true;
        }
    });
    this.set('content', mobiles);
    function callback() {
      // searchMobile.set('content', this);
      searchMobile.notifyPropertyChange('content');
      mobiles.removeObserver('@each', callback);
    }
    mobiles.addObserver('@each', callback);
  },
  mobileTypes: [
    {typeName: "所有号码", typeValue: 0},
    {typeName: "未使用号码", typeValue: 1},
    {typeName: "已使用号码", typeValue: 2}
  ],
  mobileProducts: function() {
    // var products = lqMobileChoose.store.recordCache.filter(function(record)
    var searchMobile = this;
    var products = lqMobileChoose.store.filter(lqMobileChoose.Product, function(record)
    {
        if (record.get('shop') === searchMobile.get('shop'))
        {
            return true;
        }
    });
    return products;
  }.property('shop'),
  filterChanged: function() {
    var shop = this.get('shop');
    var filter_mobile_type = this.get('filter_mobile_type');
    var filter_product_id = this.get('filter_product_id');
    var filter_mobile = this.get('filter_mobile');
    var orders = lqMobileChoose.store.filter(lqMobileChoose.MobileNumber, function(record)
    {
        //过滤条件
        if (record.get('shop') !== shop)
        {
            return false;
        }
        if (filter_mobile_type === 1 && record.get('is_used') == 1)
        {
            return false;
        }
        if (filter_mobile_type === 2 && record.get('is_used') == 0)
        {
            return false;
        }
        // wierd: record.get('order_id') 可以获得，record.get('orderId')，按道理应该是后者才行的
        if (filter_product_id && record.get('product_id') !== filter_product_id)
        {
            return false;
        }
        if (filter_mobile && record.get('mobile') !== filter_mobile)
        {
          return false;
        }
        return true;
    });
    this.set('content', orders);
  }.observes('shop', 'filter_mobile_type','filter_product_id','filter_mobile'),
  pageContent: function() {
    var content = this.get('content');
    var page_size = this.get('page_size');
    var page_index = this.get('page_index');
    var totalPages = this.get('totalPages');

    if (!page_index || page_index <= 0 || page_index >totalPages)
    {
      page_index = 1;
      this.set('page_index', 1);
    }
    var beginIndex = (page_index - 1)*page_size;
    var endIndex = beginIndex + page_size;
    return content.slice(beginIndex, endIndex);
  }.property('content', 'page_size', 'page_index'),
  totalPages: function() {
    if (!this.get('content.length'))
    {
       return 1;
    }
    return Math.ceil(this.get('content.length')/this.get('page_size'));
  }.property('content', 'page_size'),
  pageIndexChanged: function() {
    var pageIndexChange = this.get('pageIndexChange');
    var totalPages = this.get('totalPages');
    var page_index = this.get('page_index');
    if (!pageIndexChange || pageIndexChange <= 0 || pageIndexChange >totalPages || pageIndexChange === page_index)
    {
        return false;
    }
    this.set('page_index', pageIndexChange);
  }.observes('pageIndexChange'),
  prevPage: function() {
    var page_index = this.get('pageIndexChange');
    if (page_index <= 1)
    {
      return false;
    }
    this.set('pageIndexChange', page_index - 1);
  },
  nextPage: function() {
    var page_index = this.get('pageIndexChange');
    var totalPages = this.get('totalPages');
    if (page_index+1 > totalPages)
    {
      return false;
    }
    this.set('pageIndexChange', page_index + 1);
  },
  prevPageClass: function() {
    if (this.get('page_index') <= 1)
    {
      return "disabled";
    } else {
      return "";
    }
  }.property('page_index'),
  nextPageClass: function() {
    if (this.get('page_index') + 1 > this.get('totalPages'))
    {
      return "disabled";
    } else {
      return "";
    }
  }.property('page_index'),
  // table operattion，p.s. 在view中实现好还是在controller中实现好？
  updateExpressOrder: function(event) {
    var record = event.context;
    record.set('insertingExpressOrder', true);
  },
  saveExpressOrder: function(event) {
    var record = event.context;
    // 没想出什么好的更新快递单号的方案，只能先设置dom，进行dom操作来完成
    var expressOrder = $("." + record.get('mobile') + " .expressOrder").val();
    record.set('expressOrder', expressOrder);
    // lqMobileChoose.store.adapter.updateRecords(lqMobileChoose.store, lqMobileChoose.MobileNumber, choosedRecords);
    // lqMobileChoose.store.updateRecord(lqMobileChoose.MobileChooseRecord, record);
    // lqMobileChoose.store.adapter.updateRecord(lqMobileChoose.store, lqMobileChoose.MobileChooseRecord,record);
    // commit提交才会调用adapter的接口,修改record的时候，就已经update本地了。可以直接commit
    // 不过commit范围更广，可以在用户确认之后，再提交整个记录。
    // todo: 最好加上回滚
    lqMobileChoose.store.commit();
  },
  removeMobile: function(event) {
    // 删除订单
    var record = event.context;
    if (window.confirm("确定要删除这条记录吗?"))
    {
      lqMobileChoose.store.deleteRecord(record);
      // record.deleteRecord();
      lqMobileChoose.store.commit();
      this.notifyPropertyChange('content');
    }
  },
  markMobileUnused: function(event) {
    var record = event.context;
    record.set('isUsed', 0);
    lqMobileChoose.store.commit();
  },
  markMobileUsed: function(event) {
    var record = event.context;
    record.set('isUsed', 1);
    lqMobileChoose.store.commit();
  },
  refreshOrder: function(event) {
    lqMobileChoose.store.typeMapFor(lqMobileChoose.MobileNumber).findAllCache = null;
    var recordArray = lqMobileChoose.store.findAll(lqMobileChoose.MobileNumber);

    // 由于不知道如何监视 findAll的状态，暂时只能通过setTimeOut来做了. 反正在findAll结果没返回之前
    // 进行filter是没效果的
    window.setTimeout(function() {
      this.filterMobileNumber();
      // this.set('page_index', 1);
    }.bind(this), 500);
  }


});



