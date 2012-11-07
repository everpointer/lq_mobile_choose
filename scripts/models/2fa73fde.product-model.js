// Requires Ember-Data
lqMobileChoose.Product = DS.Model.extend({
    productName: DS.attr('string', {key: "title"}),
    productId: DS.attr('string', {key: "api_product_id"}),
    shop: DS.attr('string')
}).reopenClass({
    datasApi: 'Product.php?rquest=findAll',
    dataApi: 'Product.php?rquest=findQuery',
    updateApi: 'Product.php?rquest=updateRecord',
    dataRoot: "data"
});

