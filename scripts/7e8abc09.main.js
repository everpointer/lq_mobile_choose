

window.lqMobileChoose = lqMobileChoose = Ember.Application.create({
    VERSION: '1.0',
    rootElement: '#mainapp',
    ready: function() {
      return this.initialize();
    }
});

lqMobileChoose.configs = {
    apiRoot: "http://localhost:8888/laiqu/api/v1/",
    // apiRoot: "http://e.laicheap.com/api/v1/",
    webRoot: "http://localhost:3501"
};