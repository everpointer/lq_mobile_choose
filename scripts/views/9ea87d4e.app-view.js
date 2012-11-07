lqMobileChoose.AppView = Ember.ContainerView.extend({
  elementId: "app",
  tagName: "section",
  classNames: ['container'],
  childViews: ['stepbarView','outletView'],
  stepbarView: Ember.View.create({
    elementId: 'stepbar_view',
    classNames: ['stepbar'],
    controller: lqMobileChoose.stepsController,
    templateName: "stepbar"
  }),
  outletView: Ember.View.create({
    elementId: "stepcontent_view",
    classNames: ["stepcontent","row"],
    template: Ember.Handlebars.compile('{{outlet}}')
  })
});