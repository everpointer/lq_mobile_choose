lqMobileChoose.ExchangeConfirmView = Ember.View.extend({
  templateName: 'exchange_confirm',
  classNames: ['exchange_confirm'],
  confirmExchange: function() {
    var user_data = lqMobileChoose.stepsController.get('user_data');
    if (user_data.get('exchange_nums') > user_data.get('remain_nums'))
    {
        return false;
    } else {
        lqMobileChoose.router.transitionTo('mobile.mobile_choose');
    }
  },
  cancelExchange: function() {
    lqMobileChoose.router.transitionTo('mobile.exchange');
  }
});
