lqMobileChoose.SearchMobileView = Ember.View.extend({
  templateName: 'search_mobile',
  classNames: ['search_mobile'],
  didInsertElement: function() {
    // set active class, 写一个绑定class实现的导航条很麻烦，还是直接dom简单
    this.get('controller').set('shop', lqMobileChoose.partner.get('shop'));
    $(".admin_navbar ul.nav>li").removeClass('active');
    $(".admin_navbar .searchMobileBar").addClass('active');
  }
});
