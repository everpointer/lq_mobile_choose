
// Requires Ember-Data
// lqMobileChoose.Address = DS.Model.extend({});
lqMobileChoose.Address = Ember.Object.extend({
    provinces: [],
    current_province: 330000,
    current_city: 330200,
    current_area: 330203,
    cities: [],
    areas:[],
    init: function() {
        this.set('provinces', [
            // {code: 110000, name: "北京"},
            // {code: 120000, name: "天津"},
            // {code: 130000, name: "河北省"},
            // {code: 140000, name: "山西省"},
            // {code: 150000, name: "内蒙古自治区"},
            // {code: 210000, name: "辽宁省"},
            // {code: 220000, name: "吉林省"},
            // {code: 230000, name: "黑龙江省"},
            // {code: 310000, name: "上海"},
            // {code: 320000, name: "江苏省"},
            {code: 330000, name: "浙江省"}
            // {code: 340000, name: "安徽省"},
            // {code: 350000, name: "福建省"},
            // {code: 360000, name: "江西省"},
            // {code: 370000, name: "山东省"},
            // {code: 410000, name: "河南省"},
            // {code: 420000, name: "湖北省"},
            // {code: 430000, name: "湖南省"},
            // {code: 440000, name: "广东省"},
            // {code: 450000, name: "广西壮族自治区"},
            // {code: 460000, name: "海南省"},
            // {code: 500000, name: "重庆"},
            // {code: 510000, name: "四川省"},
            // {code: 520000, name: "贵州省"},
            // {code: 530000, name: "云南省"},
            // {code: 540000, name: "西藏自治区"},
            // {code: 610000, name: "陕西省"},
            // {code: 620000, name: "甘肃省"},
            // {code: 630000, name: "青海省"},
            // {code: 640000, name: "宁夏回族自治区"},
            // {code: 650000, name: "新疆维吾尔自治区"},
            // {code: 710000, name: "台湾省"},
            // {code: 810000, name: "香港特别行政区"},
            // {code: 820000, name: "澳门特别行政区"},
            // {code: 990000, name: "海外"}
        ]);
        this.set('cities', [
            // {code: 330100, name: "杭州市"},
            {code: 330200, name: "宁波市"}
            // {code: 330300, name: "温州市"},
            // {code: 330400, name: "嘉兴市"},
            // {code: 330500, name: "湖州市"},
            // {code: 330600, name: "绍兴市"},
            // {code: 330700, name: "金华市"},
            // {code: 330800, name: "衢州市"},
            // {code: 330900, name: "舟山市"},
            // {code: 331000, name: "台州市"},
            // {code: 331100, name: "丽水市"}
        ]);
        this.set('areas', [
            {code: 330203, name: "海曙区"},
            {code: 330204, name: "江东区"},
            {code: 330205, name: "江北区"},
            {code: 330206, name: "北仑区"},
            {code: 330211, name: "镇海区"},
            {code: 330212, name: "鄞州区"},
            {code: 330225, name: "象山县"},
            {code: 330226, name: "宁海县"},
            {code: 330281, name: "余姚市"},
            {code: 330282, name: "慈溪市"},
            {code: 330283, name: "奉化市"},
            {code: 330284, name: "其它区"}
        ]);
    },
    current_cities: function() {
        var current_province = this.get('current_province');
        return this.get('cities').filter(function(item){
            if (item.code >= current_province && item.code < current_province + 1000)
            {
                return true;
            }
        });
    }.property('current_province'),
    current_areas: function() {
        var current_city = this.get('current_area');
        return this.get('areas').filter(function(item){
            if (item.code >= current_city && item.code < current_city + 100)
            {
                return true;
            }
        });
    }.property('current_city'),
    current_district: function() {
        var current_district = "";
        var current_provinces = this.get('provinces');
        var current_cities = this.get('current_cities');
        var current_areas = this.get('current_areas');
        var current_province = this.get('current_province');
        var current_city = this.get('current_city');
        var current_area = this.get('current_area');
        for (var i=0; i < current_provinces.length; i++)
        {
            if (current_provinces[i].code === current_province)
            {
                current_district += current_provinces[i].name;
                break;
            }
        }
        for (i=0; i < current_cities.length; i++)
        {
            if (current_cities[i].code === current_city)
            {
                current_district += current_cities[i].name;
                break;
            }
        }
        for (i=0; i < current_areas.length; i++)
        {
            if (current_areas[i].code === current_area)
            {
                current_district += current_areas[i].name;
                break;
            }
        }
        return current_district;
    }.property('current_province','current_city','current_area')
});

lqMobileChoose.address = lqMobileChoose.Address.create();
