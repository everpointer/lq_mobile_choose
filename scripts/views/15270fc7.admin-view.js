lqMobileChoose.AdminView = Ember.ContainerView.extend({
    elementId: "admin",
    tagName: "div",
    classNames: ['container-fluid', "admin"],
    childViews: ['contentView'],
    contentView: Ember.ContainerView.extend({
        tagName: "div",
        childViews: ['navbarView','outletView'],
        navbarView: Ember.View.create({
            elementId: 'admin_navbar_view',
            classNames: ['admin_navbar', 'span2'],
            templateName: "admin_navbar",
            addMobile: function(event) {
                event.preventDefault();
                lqMobileChoose.get('router').transitionTo('admin.add_mobile');
            },
            manageOrder: function(event) {
                lqMobileChoose.get('router').transitionTo('admin.manage_order');
            },
            searchMobile: function(event) {
                lqMobileChoose.get('router').transitionTo('admin.search_mobile');
            }
        }),
        outletView: Ember.View.create({
          classNames: ['span8'],
          template: Ember.Handlebars.compile('{{outlet}}')
        })
    })
});
