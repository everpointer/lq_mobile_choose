// Requires Ember-Data
lqMobileChoose.partner = Ember.Object.create({
    id: "",
    username: "",
    shop: "宁波联通3G号码",
    sessionId: ""
}).reopen({
    loginApi: 'Partner.php?rquest=login',
    authApi: 'Partner.php?rquest=auth',
    dataApi: 'Product.php?rquest=findQuery',
    updateApi: 'Product.php?rquest=updateRecord',
    dataRoot: "data"
});
