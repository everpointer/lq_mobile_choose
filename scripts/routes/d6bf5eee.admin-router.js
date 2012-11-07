lqMobileChoose.auth = function(callback) {
  var sessionId = lqMobileChoose.partner.get('sessionId');
  if (sessionId)
  {
    var authUrl = lqMobileChoose.configs.apiRoot + lqMobileChoose.partner.get('authApi');
    jQuery.get(authUrl, {session_id: sessionId}, function(json) {
        callback();
    }, 'jsonp').
    error(function() {
      lqMobileChoose.get('router').transitionTo('login');
    });
  } else {
      lqMobileChoose.get('router').transitionTo('login');
  }
};

lqMobileChoose.Router = Ember.Router.extend({
  root: Ember.Route.extend({
      addMobile: Ember.Route.transitionTo('add_mobile'),
      managePackage: Ember.Route.transitionTo('manage_package'),
      manageOrder: Ember.Route.transitionTo('manage_order'),
      searchMobile: Ember.Route.transitionTo('search_mobile'),
      logOut: Ember.Route.transitionTo('logout'),
      index: Ember.Route.extend({
        route: '/',
        redirectsTo: 'login'
      }),
      login: Ember.Route.extend({
        route: '/login',
        connectOutlets: function(router) {
          // 先创建admin, 在创建app
          router.get('applicationController').connectOutlet('adminLogin');
        }
      }),
      add_mobile: Ember.Route.extend({
        route: '/add-mobile',
        connectOutlets: function(router) {
          // 先创建admin, 在创建app
          lqMobileChoose.auth( function() {
            router.get('applicationController').connectOutlet('addMobile');
          });
        }
      }),
      manage_package: Ember.Route.extend({
        route: '/manage-package',
        connectOutlets:function(router) {
          lqMobileChoose.auth( function() {
            router.get('applicationController').connectOutlet('managePackage');
          });
        },
        exit: function(router){
            router.get('managePackageController').set('choosedProductId', "");
        }
      }),
      manage_order: Ember.Route.extend({
        route: '/manage-order',
        connectOutlets: function(router) {
          // 先创建admin, 在创建app
          lqMobileChoose.auth( function() {
            router.get('applicationController').connectOutlet('manageOrder');
          });
        }
      }),
      search_mobile: Ember.Route.extend({
        route: '/search-mobiler',
        connectOutlets: function(router) {
          // 先创建admin, 在创建app
          lqMobileChoose.auth( function() {
            router.get('applicationController').connectOutlet('searchMobile');
          });
        }
     }),
      logout: Ember.Route.extend({
        connectOutlets: function(router)  {
          lqMobileChoose.partner.set('sessionId', '');
          lqMobileChoose.partner.set('shop', '');
          lqMobileChoose.partner.set('username', '');
          lqMobileChoose.get('router').transitionTo('login');
        }
      })
  })
});

