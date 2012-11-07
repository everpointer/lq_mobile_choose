lqMobileChoose.ExchangeFinishView = Ember.View.extend({
  templateName: 'exchange_finish',
  classNames: ['exchange_finish'],
  chooseOn: function(event) {
    // 清空 lqMobileChoose.stepsController
    // 本地清空ember的数据真的很难，即便设为null,再一次create，数据又恢复了
    // lqMobileChoose.stepsController = lqMobileChoose.StepsController.create();
    // lqMobileChoose.stepsController.user_data = lqMobileChoose.UserData.create();
    // lqMobileChoose.get('router').transitionTo('mobile.exchange');
    window.location.reload();
  },
  gotoShop: function(event) {
    window.location = "http://lqwlshfw.tmall.com";
  }
});
