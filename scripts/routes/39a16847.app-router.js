lqMobileChoose.Router = Ember.Router.extend({
  root: Ember.Route.extend({
    index: Ember.Route.extend({
      route: '/',
      redirectsTo: 'mobile.exchange'
      // Layout your routes here...
    }),
    // router for consumer mobile choose system
    mobile: Ember.Route.extend({
      route: '/mobile',
      index: Ember.Route.extend({
        route: '/',
        redirectsTo: 'exchange'
      }),
      // mobile number choose steps
      exchange: Ember.Route.extend({
        route: '/1-exchange',
        connectOutlets: function(router) {
          var context = lqMobileChoose.stepsController;
          context.set('current_step', 'exchange');
          router.get('applicationController').connectOutlet('exchange', context.get('user_data'));
        }
      }),
      exchange_confirm: Ember.Route.extend({
        route: '/2-exchange-confirm',
        connectOutlets: function(router) {
          var context = lqMobileChoose.stepsController;
          lqMobileChoose.store.findAll(lqMobileChoose.MobilePackages);
          if (context.get('current_step') !== "exchange" || lqMobileChoose.stepsController.get('user_data.product_id') === "")
          {
            lqMobileChoose.get('router').transitionTo('exchange');
          } else {
            context.set('current_step', 'exchange-confirm');
            router.get('applicationController').connectOutlet('exchangeConfirm', context.get('user_data'));
          }
        }
      }),
      mobile_choose: Ember.Route.extend({
        route: '/3-mobile-choose',
        connectOutlets: function(router) {
          var context = lqMobileChoose.stepsController;
          if (context.get('current_step') !== "exchange-confirm")
          {
            lqMobileChoose.get('router').transitionTo('exchange');
          } else {
            context.set('current_step', 'mobile-choose');
            // router.get('applicationController').connectOutlet('mobileChoose', context.get('user_data.mobile_choices'));
            router.get('applicationController').connectOutlet('mobileChoose');
          }
        }
      }),
      supply_address: Ember.Route.extend({
        route: '/4-supply-address',
        connectOutlets: function(router) {
          var context = lqMobileChoose.stepsController;
          if (context.get('current_step') !== "mobile-choose")
          {
            lqMobileChoose.get('router').transitionTo('exchange');
          } else {
            context.set('current_step', 'supply-address');
            router.get('applicationController').connectOutlet('supplyAddress', context.get('user_data'));
          }
        }
      }),
      exchange_finish: Ember.Route.extend({
        route: '/5-exchange-finish',
        connectOutlets: function(router) {
          var context = lqMobileChoose.stepsController;
          if (context.get('current_step') !== "supply-address")
          {
            lqMobileChoose.get('router').transitionTo('exchange');
          } else {
            context.set('current_step', 'exchange-finish');
            router.get('applicationController').connectOutlet('exchangeFinish');
          }
        }
      })
    }) // end of mobile,
  })
});

