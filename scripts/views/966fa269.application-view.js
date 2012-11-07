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
      classNames: ['container'],
      childViews: ['stepbarView','outletView', 'hrView', 'footerView'],
      stepbarView: Ember.View.create({
        elementId: 'stepbar_view',
        classNames: ['stepbar'],
        controller: lqMobileChoose.stepsController,
        templateName: "stepbar"
      }),
      outletView: Ember.View.create({
        elementId: "stepcontent_view",
        classNames: ["stepcontent", "row"],
        template: Ember.Handlebars.compile('{{outlet}}')
      }),
      hrView: Ember.View.create({
        classNames: ["row", 'hr_view', 'span9'],
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
