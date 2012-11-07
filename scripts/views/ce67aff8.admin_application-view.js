lqMobileChoose.ApplicationView = Ember.ContainerView.extend({
    childViews: ['headerView', 'mainView'],
    headerView: Ember.View.create({
      elementId: "header",
      tagName: "header",
      templateName: "header"
    }),
    mainView: Ember.ContainerView.create({
      elementId: "main",
      tagName: "section",
      classNames: ['main','container'],
      childViews: ['navbarView','outletView', 'hrView', 'footerView'],
      navbarView: Ember.View.create({
        elementId: 'admin_navbar_view',
        classNames: ['admin_navbar', 'span2'],
        templateName: "admin_navbar"
      }),
      outletView: Ember.View.create({
        classNames: ['span12', 'appOutlet'],
        template: Ember.Handlebars.compile('{{outlet}}')
      }),
      hrView: Ember.View.create({
        classNames: ["row", 'hr_view', 'span10'],
        template: function() {
          return "<hr>";
        }
      }),
      footerView: Ember.View.create({
        elementId: "footer",
        tagName: "footer"
        // templateName: "footer"
      })
    })
});
