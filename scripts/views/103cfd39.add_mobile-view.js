lqMobileChoose.AddMobileView = Ember.View.extend({
  templateName: 'add_mobile',
  classNames: ['add_mobile'],
  // controller: lqMobileChoose.AddMobileController,
  latestRecord: null,
  addMobile: function() {
    var content = this.get('controller.content');
    var shop = content.get('shop');
    var productId = content.get('productId');
    var mobile = content.get('mobile');
    if (!productId || !mobile || !shop || this.get('error_msg') !== "")
    {
        window.alert('您填写的内容有误,请修正后再提交');
        return false;
    }
    this.clearError();
    record = this.get('controller').addMobile();
    this.set('latestRecord', record);
  },
  recordChanged: function() {
    var latestRecord = this.get('latestRecord');
    if (!latestRecord)
    {
        return;
    }
    if (latestRecord.get('isCreated') === true) {
        this.addFormAlert(".form_info", "alert-success", "录入成功");
    } else if (latestRecord.get('isError') === true)
    {
        this.addFormAlert(".form_info", "alert-error", "录入失败");
    }
  }.observes('latestRecord.isCreated', 'latestRecord.isError'),
  addFormAlert: function(selector, classNames, text) {
    this.$(selector).addClass(classNames).html('<div class="alert '+classNames+'"><button type="button" class="close" data-dismiss="alert">×</button><p>'+text+'</p></div>');
  },
  clearError: function() {
    this.set('error_msg', "");
    this.set('mobileClass', "");
    this.set('productClass', "");
  },
  error_msg: "",
  mobileClass: "",
  productClass: "",
  didInsertElement: function() {
    var view = this;
    // init shop
    this.get('controller').set('content.shop', lqMobileChoose.partner.get('shop'));
    // set active class, 写一个绑定class实现的导航条很麻烦，还是直接dom简单
    $(".admin_navbar ul.nav>li").removeClass('active');
    $(".admin_navbar .addMobileBar").addClass('active');
    // 把不希望一开始初始化就监视的监视器在这里实现
    // 不过放在这里不太优雅，希望以后有更好的方案
    // event binding
    // textField 默认无法支持action, 所以暂时自己绑定
    this.$("#input_mobile").keydown(function(event) {
        if (event.keyCode === 13) // enter key
        {
          view.get('controller').addMobile();
          return false;
        }
    });
    this.get('controller.content').addObserver('mobile',function() {
      var mobile = view.get('controller.content.mobile');
      if (mobile === "")
      {
          view.set('mobileClass', 'error');
          view.set('error_msg', "请输入手机号码");
      } else if (!mobile.match(/^1[0-9]{10}$/)) {
          view.set('mobileClass', 'error');
          view.set('error_msg', "手机号码格式错误");
      } else {
          view.set('mobileClass', '');
          view.set('error_msg', '');
      }
    });
    this.get('controller.content').addObserver('productId',function() {
      var productId = view.get('controller.content.productId');
      if (!productId)
      {
          view.set('productClass', 'error');
          view.set('error_msg', "请选择一个产品");
      } else {
        view.set('productClass', '');
        view.set('error_msg', '');
      }
    });
  },
  uploadMobiles: function() {
    // 弹出操作对话框, 直接在html写有问题，无法稳定状态
    var controller = this.get('controller');
    var productId = controller.get('content.productId');
    if (!productId)
    {
      controller.set('productClass', 'error');
      return;
    } else {
      controller.set('productClass', '');
    }
    this.$("#mobileModal").modal();
  },
  parseBatchMobiles: function() {
    this.get('controller').parseRawBatchMobiles();
    // modal只能hide,不能close, modal一开始也是隐藏的
    this.$('#mobileModal').modal('hide');
  }
});
