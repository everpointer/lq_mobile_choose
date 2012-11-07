lqMobileChoose.ApplicationController = Ember.ObjectController.extend({
  // Implement your controller here.
  init: function() {
    // 整个admin app的初始化操作
    // 初始化model
    lqMobileChoose.store.findAll(lqMobileChoose.Product);
    lqMobileChoose.store.findAll(lqMobileChoose.MobileChooseRecord);
    lqMobileChoose.store.findAll(lqMobileChoose.MobileNumber);
    lqMobileChoose.store.findAll(lqMobileChoose.MobilePackages);
  }
});
