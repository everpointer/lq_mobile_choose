lqMobileChoose.SupplyAddressView = Ember.View.extend({
  templateName: 'supply_address',
  classNames: ['supply_address'],
  name_error: false,
  mobile_error: false,
  addr_error: false,
  error_msg: "",
  district: lqMobileChoose.Address.create(),
  submitExpressInfo: function() {
    var user_data = lqMobileChoose.stepsController.get('user_data');
    var receiver_name = user_data.get('receiver_name');
    var receiver_mobile = user_data.get('receiver_mobile');
    var receiver_addr = user_data.get('receiver_addr');

    if (!receiver_name || !receiver_mobile || !receiver_addr)
    {
        this.set('name_error', true);
        this.set('mobile_error', true);
        this.set('addr_error', true);
        this.set('error_msg', "请完整输入框中内容");
        return false;
    }
    this.set('name_error', false);
    this.set('mobile_error', false);
    this.set('addr_error', false);
    this.set('error_msg', "");
    // receiver_addr 等于 address的 province,city,area + receiver_addr
    user_data.set('receiver_complete_addr', this.get('district.current_district')+receiver_addr);
    if(window.confirm('次操作会验证2维码，验证后不可退款，确认提交吗？'))
    {
      this.get('controller').submitExpressInfo();
    }
  },
  nameClass: function() {
    if (this.get('name_error') === true)
    {
      return "error";
    } else {
      return "";
    }
  }.property('name_error'),
  mobileClass: function() {
    if (this.get('mobile_error') === true)
    {
      return "error";
    } else {
      return "";
    }
  }.property('mobile_error'),
  addrClass: function() {
    if (this.get('addr_error') === true)
    {
      return "error";
    } else {
      return "";
    }
  }.property('addr_error')
});
