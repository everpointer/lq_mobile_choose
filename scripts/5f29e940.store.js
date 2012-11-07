// Requires Ember-Data
lqMobileChoose.mobileAdapter =  DS.Adapter.create({
    find: function(store, type, id) {
        if (id === undefined)
        {
            this.findAll(store, type);
        }
        var url = lqMobileChoose.configs.apiRoot + type.dataApi;

        jQuery.get(url, {"id": id}, function(data) {
            // this.sideload(store, type, json, plural);
            store.load(type, id, data);
        }, 'jsonp');
    },
    findMany: function(store, type, ids) {
        // 更改findMany的默认行为, 如果传入的ids长度等于2，而且第个值为负1，则
        // fetch回来 >= id[1]的所有记录，然后更新到本地，主要用来更新
        var url = lqMobileChoose.configs.apiRoot + type.findManyApi;
        var dataRoot = type.dataRoot;
        url = url.fmt(ids.join(','));

        jQuery.get(url, function(json) {
            // this.sideload(store, type, json, plural);
            var idArrays = json['ids'];
            store.loadMany(type, idArrays, json[dataRoot]);
        }, 'jsonp');
    },
    findQuery: function(store, type, query, recordArray) {
        var url = lqMobileChoose.configs.apiRoot + type.findQueryApi;

        jQuery.get(url, query, function(json) {
            // this.sideload(store, type, json, plural);
            recordArray.load(json);
        }, 'jsonp');
    },
    findLoadQuery: function(store, type, query) {
        var url = lqMobileChoose.configs.apiRoot + type.findLoadQueryApi;

        jQuery.get(url, query, function(json) {
            // this.sideload(store, type, json, plural);
            store.loadMany(type, json);
        }, 'jsonp');
    },
    findAll: function(store, type)
    {
        var url = lqMobileChoose.configs.apiRoot + type.datasApi;

        jQuery.get(url, function(data) {
            // this.sideload(store, type, json, plural);
            store.loadMany(type, data);
        }, 'jsonp');
    },
    deleteRecord: function(store, type, record)
    {
        var url = lqMobileChoose.configs.apiRoot + type.deleteApi;
        var data = {};
        data = record.toJSON();

        jQuery.get(url, data, function(json) {
            store.didDeleteRecord(record);
        }, 'jsonp');
    },
    updateRecord: function(store, type, record) {
        var id = record.get('id');
        var url = lqMobileChoose.configs.apiRoot + type.updateApi;
        var dataRoot = type.dataRoot;

        var data = {};
        data = record.toJSON();
        jQuery.get(url, data, function(json) {
            store.didUpdateRecord(record, json[dataRoot]);
        }, 'jsonp');
    },
    createRecord: function(store, type, record) {
        var adapter = this;
        var url = lqMobileChoose.configs.apiRoot + type.createRecordApi;
        var data = record.toJSON();

        jQuery.get(url, data, function(json) {
            var dataRoot = type.dataRoot;

            store.didCreateRecord(record, json[dataRoot]);
        }, 'jsonp')
        .error(function() {
            record.set('isError', true);
        });
    },
    createRecords: function(store, type, records)
    {
        // 暂时先这么实现，日后可以实现更高效的版本.（默认只会调用adapter的createRecords，而不会调用createRecord，所以需自己实现。
        // 参考RESTAdapter的实现
        records.forEach(function(record) {
          this.createRecord(store, type, record);
        }, this);
    }
});

lqMobileChoose.store = DS.Store.create({
  revision: 4,
  // adapter: DS.RESTAdapter.create()
  adapter: lqMobileChoose.mobileAdapter
});