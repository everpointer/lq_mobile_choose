lqMobileChoose.SupplyAddressController = Ember.ObjectController.extend({
  // Implement your controller here.
  submitExpressInfo: function() {
    var user_data = lqMobileChoose.stepsController.get('user_data');

    // 提交快递信息之后插入到选择记录，同时标志手机使用状态
    var url = lqMobileChoose.configs.apiRoot + "MobileNumber.php?rquest=record";
    var params = {
        mobiles: user_data.get('choosedMobiles').toString(),
        coupon_id: user_data.get('coupon_id'),
        receiver_name: user_data.get('receiver_name'),
        receiver_mobile: user_data.get('receiver_mobile'),
        receiver_addr: user_data.get('receiver_complete_addr'),
        shop: user_data.get('shop'),
        product_id: user_data.get('product_id'),
        package_id: user_data.get('package_id'),
        remark: user_data.get('remark')
    };

    // 记录号码选择
    $.get(url, params, function(data) {
        // lqMobileChoose.stepsController.get('user_data').setProperties(data);
        lqMobileChoose.router.transitionTo('mobile.exchange_finish');
    }, 'jsonp')
    .error(function(xhr) {
        alert("操作失败,失败原因：您的券号消费次数不足，或者您所选号码已刚被他人选走！");
        window.location = lqMobileChoose.configs.webRoot;
    });
  }
});

