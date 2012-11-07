lqMobileChoose.ExchangeController = Ember.ObjectController.extend({
  // Implement your controller here.
  checkCoupon: function(coupon_id, last_four_mobile, callback)
  {
        var view = this.get('view');
        var url = lqMobileChoose.configs.apiRoot + "Coupon.php?rquest=mobile_coupon";
        var params = {coupon_id: coupon_id, last_four_mobile: last_four_mobile};

        $.get(url, params, function(data, textStatus, jqXHR) {
            //清除step的错误状态
            // data.has_error = false;
            // data.error_msg = "";
            // lqMobileChoose.stepsController.get('user_data').setProperties(data);
            // lqMobileChoose.router.transitionTo('mobile.exchange_confirm');
            // 自定义错误的处理
            if (data.status && data.status === "Failed")
            {
                callback({success:false, error_msg:data.msg});
            } else {
                lqMobileChoose.stepsController.get('user_data').setProperties(data);
                callback({success:true});
            }
        }, 'jsonp')
        .error(function(data) {
            callback({success:false, error_msg:"没有匹配的记录"});
        });
  }
});

