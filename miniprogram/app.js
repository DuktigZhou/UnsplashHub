// app.js
App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error("请使用 2.2.3 或以上的基础库以使用云能力");
    } else {
      wx.cloud.init({
        env: "picon-test-01-5gv7o92s16219eb1",
        traceUser: true,
      });
    }

    this.globalData = {};
  },
});
