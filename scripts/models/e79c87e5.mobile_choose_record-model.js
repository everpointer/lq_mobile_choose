
// Requires Ember-Data
lqMobileChoose.MobileChooseRecord = DS.Model.extend({
    id: DS.attr('string'),
    shop: DS.attr('string'),
    productId: DS.attr('string', {key: "product_id"}),
    productName: DS.attr('string', {key: "title"}),
    orderId: DS.attr('string', {key: "order_id"}),
    mobile: DS.attr('string'),
    receiverName: DS.attr('string', {key: "receiver_name"}),
    receiverAddr: DS.attr('string', {key: "receiver_addr"}),
    receiverMobile: DS.attr('string', {key: "receiver_mobile"}),
    addDate: DS.attr('string', {key: 'add_date'}),
    expressOrder: DS.attr('string', {key: "express_order"}),
    packageId: DS.attr('number', {key: "package_id"}),
    mobilePackage: DS.belongsTo('lqMobileChoose.MobilePackages', {key: "package_id"}),
    remark: DS.attr('string')
}).reopenClass({
    isChoosed: false,
    // url: 'http://localhost:8888/laiqu/mobile_number.json'
    datasApi: 'MobileChooseRecord.php?rquest=findAll',
    dataApi: 'MobileNumber.php?rquest=mobile',
    findManyApi: 'MobileChooseRecord.php?rquest=findMany&ids=%@',
    updateApi: 'MobileChooseRecord.php?rquest=update',
    deleteApi: 'MobileChooseRecord.php?rquest=delete',
    createRecordApi: 'MobileNumber.php?rquest=createNumber',
    dataRoot: "data"
});
