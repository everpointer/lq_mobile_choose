
// Requires Ember-Data
lqMobileChoose.MobilePackages = DS.Model.extend({
    id: DS.attr('number'),
    productId: DS.attr('string', {key: "product_id"}),
    packageName: DS.attr('string', {key: "package_name"}),
    isError: false,
    isCreated: false,
    didCreate: function() {
        this.set('isCreated', true);
    },
    isSelected: false
}).reopenClass({
    // url: 'http://localhost:8888/laiqu/mobile_number.json'
    datasApi: 'MobilePackages.php?rquest=findAll',
    dataApi: 'MobileNumber.php?rquest=mobile',
    findQueryApi: 'MobileNumber.php?rquest=findQuery',
    findLoadQueryApi: 'MobileNumber.php?rquest=findQuery',
    updateApi: 'MobilePackages.php?rquest=update',
    deleteApi: 'MobileNumber.php?rquest=delete',
    createRecordApi: 'MobilePackages.php?rquest=createRecord',
    dataRoot: "data"
});

