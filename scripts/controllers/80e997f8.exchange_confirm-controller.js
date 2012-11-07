lqMobileChoose.ExchangeConfirmController = Ember.ObjectController.extend({
  // Implement your controller here.
  choosePackage: function(event) {
    var mobilePackage = event.context;
    var content = this.get('content');
    content.get('packages').forEach(function(item) {
        if (item.get('isSelected') === true)
        {
            item.set('isSelected', false);
        }
    });
    mobilePackage.set('isSelected', true);
    content.set('package_id', mobilePackage.get('id'));
  }
});

