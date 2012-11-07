lqMobileChoose.ManageOrderView = Ember.View.extend({
  templateName: 'manage_order',
  classNames: ['manage_order'],
  didInsertElement: function() {
    // set active class, 写一个绑定class实现的导航条很麻烦，还是直接dom简单
    this.get('controller').set('shop', lqMobileChoose.partner.get('shop'));
    $(".admin_navbar ul.nav>li").removeClass('active');
    $(".admin_navbar .manageOrderBar").addClass('active');
  }
});
