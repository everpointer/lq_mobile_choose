
// Requires Ember-Data
lqMobileChoose.MobileNumber = DS.Model.extend({
    id: DS.attr('number'),
    shop: DS.attr('string'),
    productId: DS.attr('string', {key: "product_id"}),
    productName: DS.attr('string', {key: "title"}),
    mobile: DS.attr('string'),
    isUsed: DS.attr('number', {key: "is_used"}),
    addDate: DS.attr('string', {key: 'add_date'}),
    packageId: DS.attr('number', {key: 'package_id'}),
    mobilePackage: DS.belongsTo('lqMobileChoose.MobilePackages', {key: 'package_id'}),
    isError: false,
    isCreated: false,
    didCreate: function() {
        this.set('isCreated', true);
    }
}).reopenClass({
    isChoosed: false,
    // url: 'http://localhost:8888/laiqu/mobile_number.json'
    datasApi: 'MobileNumber.php?rquest=mobiles',
    dataApi: 'MobileNumber.php?rquest=mobile',
    findQueryApi: 'MobileNumber.php?rquest=findQuery',
    findLoadQueryApi: 'MobileNumber.php?rquest=findQuery',
    updateApi: 'MobileNumber.php?rquest=update',
    deleteApi: 'MobileNumber.php?rquest=delete',
    createRecordApi: 'MobileNumber.php?rquest=createNumber',
    dataRoot: "data"
});

