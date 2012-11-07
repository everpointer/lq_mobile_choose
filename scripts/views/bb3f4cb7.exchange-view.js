lqMobileChoose.ExchangeView = Ember.View.extend({
  // contorller: lqMobileChoose.ExchangeController.create()
  templateName: 'exchange',
  classNames: ['exchange'],
  coupon_error: false,
  mobile_error: false,
  error_msg: "",
  checkCoupon: function() {
    var view = this;
    var coupon_id = this.get('controller.content.coupon_id');
    var last_four_mobile = this.get('controller.content.last_four_mobile');

    if (coupon_id === undefined || coupon_id === "" ||
        last_four_mobile === undefined || last_four_mobile === "")
    {
        this.set('coupon_error', true);
        this.set('mobile_error', true);
        this.set('error_msg', "请完整输入框中内容");
        return false;
    }
    if (coupon_id.length !== 10 || !coupon_id.match(/^\d+$/) )
    {
        this.set('mobile_error', false);
        this.set('coupon_error', true);
        this.set('error_msg', "券号格式不正确");
        return false;
    }
    if (last_four_mobile.length !== 4 || !last_four_mobile.match(/^\d+$/))
    {
        this.set('coupon_error', false);
        this.set('mobile_error', true);
        this.set('error_msg', "请输入正确的手机尾号");
        return false;
    }
    // 清空错误状态
    this.set('coupon_error', false);
    this.set('mobile_error', false);
    this.set('error_msg', "");
    // 调用验证接口
    this.get('controller').checkCoupon(coupon_id, last_four_mobile,function(result) {
      if (result.success === true)
      {
        lqMobileChoose.router.transitionTo('mobile.exchange_confirm');
      } else {
        view.set('coupon_error', true);
        view.set('error_msg', result.error_msg);
      }
    });
  },
  couponClass: function() {
    if (this.get('coupon_error') === true)
    {
      return "error";
    } else {
      return "";
    }
  }.property('coupon_error'),
  mobileClass: function() {
    if (this.get('mobile_error') === true)
    {
      return "error";
    } else {
      return "";
    }
  }.property('mobile_error')
});
