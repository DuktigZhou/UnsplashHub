Page({
  data: {
    currUserAvatar: "",
    currUserName: "",
    isLoading: false,
    page: 1,
    userPicData: [],
  },

  getWallhavenUserPics() {
    wx.request({
      url:
        "https://wallhaven.cc/api/v1/search?q=@" +
        this.data.currUserName +
        "&page=" +
        this.data.page,
      method: "GET",
      success: (res) => {
        this.setData({
          userPicData: this.data.userPicData.concat(res.data.data),
        });
        this.data.page++;
        this.data.isLoading = false;
      },
      fail: (err) => {
        console.error("getWallhavenUserPics", err);
      },
    });
  },

  toWallhavenPicDetail(e) {
    wx.navigateTo({
      url: "/pages/wallhavenWalls/wallhavenWalls?currId=" + e.currentTarget.dataset.wid,
    });
  },

  onLoad(e) {
    this.setData({
      currUserName: e.currUserName,
      currUserAvatar: JSON.parse(e.currUserAvatar),
    });
    this.getWallhavenUserPics();
  },

  onReady() {},

  onShow() {},

  onHide() {},

  onUnload() {},

  onPullDownRefresh() {
    this.setData({
      userPicData: [],
      page: 1,
    });
    this.getWallhavenUserPics();
    setTimeout(() => {
      wx.stopPullDownRefresh({});
    }, 500);
  },

  onReachBottom() {
    this.data.isLoading = true;
    this.getWallhavenUserPics();
  },

  onShareAppMessage() {},
});
