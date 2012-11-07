// lqMobileChoose.MobileCellView = Ember.View.extend({
//     tagName: "div",
//     classNames: ["span3","outer_mobile_cell"],
//     mouseEnter: function(event) {
//       this.$(".tip_cell").text("fuck");
//     },
//     mouseLeave: function(event) {
//       this.$(".tip_cell").text("");
//     }
// });
lqMobileChoose.MobileChooseView = Ember.View.extend({
  templateName: 'mobile_choose',
  classNames: 'mobile_choose',
  didInsertElement: function() {
    this.get('controller').set('current_page', 0);
  },
  choose: function(event) {

    var view_this = this;
    var mobile = event.context;

    if (mobile.get('isChoosed') === true) // toggle 使用
    {
        mobile.set('isChoosed', false);
        this.set('controller.choosedNums', this.get('controller.choosedNums') -1 );
        return;
    }
    // var metchedMobile = lqMobileChoose.store.find(lqMobileChoose.MobileNumber, mobile.get('id'));
    // 每次点击都从服务器获得最新的数据数据状态, 如果只是store.find是不会调接口的
    lqMobileChoose.store.adapter.find(lqMobileChoose.store, lqMobileChoose.MobileNumber, mobile.get('id'));
    // recordIsLoaded
    function callback() {
        var user_data = lqMobileChoose.stepsController.get('user_data');
        var exchange_nums = user_data.get('exchange_nums');
        var choosedNums = view_this.get('controller.choosedNums');
        if (this.get('isUsed') === 1)
        {
            this.removeObserver('isUsed', callback);
            return;
        }
        if (this.get('isChoosed') === true) // toggle 使用
        {
            this.set('isChoosed', false);
            view_this.set('controller.choosedNums', choosedNums-1);
        }
        else if (choosedNums < exchange_nums) // 未使用
        {
            this.set('isChoosed', true);
            view_this.set('controller.choosedNums', choosedNums+1);
        }
        else if (choosedNums >= exchange_nums)
        {
            window.alert('您只能选择'+exchange_nums+"个号码!");
        }

        this.removeObserver('isUsed', callback);
    }
    mobile.addObserver('isUsed', callback);
  },
  submitMobiles: function(event) {
    var choosedRecords = [];
    var user_data = lqMobileChoose.stepsController.get('user_data');
    user_data.set('choosedMobiles', []);
    lqMobileChoose.stepsController.get('user_data.mobile_choices').forEach(function(record) {
        if (record.get('isChoosed') === true)
        {
            choosedRecords.push(record);
            user_data.get('choosedMobiles').push(record.get('mobile'));
        }
    });
    if (choosedRecords.length !== user_data.get('exchange_nums'))
    {
        window.alert('您兑换了'+user_data.get('exchange_nums')+'份产品,需要选择' + user_data.get('exchange_nums') + "个号码。");
        return false;
    }
    // lqMobileChoose.store.adapter.updateRecords(lqMobileChoose.store, lqMobileChoose.MobileNumber, choosedRecords);
    // lqMobileChoose.store.commit();
    lqMobileChoose.router.transitionTo('mobile.supply_address');
  },
  nextMobiles: function(event) {
    event.preventDefault();
    var current_page = this.get('controller.current_page');
    if (current_page > 0)
    {
        return false;
    }
    this.set('controller.current_page', current_page + 1);
  },
  previousMobiles: function(event) {
    event.preventDefault();
    var current_page = this.get('controller.current_page');
    if (current_page < 1)
    {
        return false;
    }
    this.set('controller.current_page', current_page - 1);
  }
});
