lqMobileChoose.ManagePackageView = Ember.View.extend({
  templateName: 'manage_package',
  classNames: ['manage_package'],
  didInsertElement: function() {
    var view = this;
    this.get('controller').set('shop', lqMobileChoose.partner.get('shop'));
    $(".admin_navbar ul.nav>li").removeClass('active');
    $(".admin_navbar .managePackageBar").addClass('active');
  }
});
