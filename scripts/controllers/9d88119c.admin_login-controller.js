lqMobileChoose.AdminLoginController = Ember.ObjectController.extend({
  // Implement your controller here.
  username: "",
  password: "",
  error: Ember.Object.create({
    "username": "",
    "password": ""
  }),
  errorClass: Ember.Object.create({
    username: "",
    password: ""
  }),
  errorChanged: function() {
    if (this.get('error.username') !== "")
    {
        this.set('errorClass.username', "error");
    } else {
        this.set('errorClass.username', "");
    }
    if (this.get('error.password') !== "")
    {
        this.set('errorClass.password', "error");
    } else {
        this.set('errorClass.password', "");
    }
  }.observes('error.username', 'error.password'),
  login: function() {
    var controller = this;
    var username = this.get('username');
    var password = this.get('password');

    if (username === "" || password === "")
    {
        if (username === "" && password !== "")
        {
            this.set('error.username', "请输入用户名");
            this.set('error.password', '');
        } else if (password === "" && username !== "") {
            this.set('error.password', "请输入密码");
            this.set('error.username', "");
        } else {
            this.set('error.username', "请输入用户名");
            this.set('error.password', "请输入密码");
        }
        return false;
    }
    this.set('error.username', "");
    this.set('error.password', "");

    // real login operation
    var loginUrl = lqMobileChoose.configs.apiRoot + lqMobileChoose.partner.loginApi;
    var data = {
        'username': username,
        'password': password
    };
    var dataRoot = lqMobileChoose.partner.dataRoot;
    jQuery.get(loginUrl, data, function(json) {
        var result = json[dataRoot];

        lqMobileChoose.partner.set('id', result.id);
        lqMobileChoose.partner.set('username', result.username);
        lqMobileChoose.partner.set('shop', result.title);
        lqMobileChoose.partner.set('sessionId', result.session_id);
        // 跳转
        // 清空controller里的内容
        controller.set('username', '');
        controller.set('password', '');
        lqMobileChoose.get('router').transitionTo('add_mobile');
    }, 'jsonp')
    .error(function() {
        window.alert('登陆失败');
    });
  }
});

