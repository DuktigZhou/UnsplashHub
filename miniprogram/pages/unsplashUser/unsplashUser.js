// pages/unsplashUser/unsplashUser.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    currUserId: "",
    currUserName: "",
    userProfile: {},
    isLoading: false,
    page: 1,
    perPage: 16,
    userPicData: [],
  },
  getUnsplashUserProfile() {
    const unsplashAccessKey = "toEemLqn_LPFUNiS4kMCMRhFGyHhMWVOcG6fddAsE5k";
    wx.request({
      url: "https://api.unsplash.com/users/" + this.data.currUserName,
      method: "GET",
      header: {
        Authorization: `Client-ID ${unsplashAccessKey}`,
      },
      success: (res) => {
        this.setData({
          userProfile: res.data,
        });
        console.log(this.data.userProfile);
      },
      fail: (err) => {
        console.error("getUnsplashUserProfile", err);
      },
    });
  },

  getUnsplashUserPics() {
    const unsplashAccessKey = "toEemLqn_LPFUNiS4kMCMRhFGyHhMWVOcG6fddAsE5k";
    wx.request({
      url:
        "https://api.unsplash.com/users/" +
        this.data.currUserName +
        "/photos" +
        "?page=" +
        this.data.page +
        "&per_page=" +
        this.data.perPage,
      method: "GET",
      header: {
        Authorization: `Client-ID ${unsplashAccessKey}`,
      },
      success: (res) => {
        this.setData({
          userPicData: this.data.userPicData.concat(res.data),
        });
        this.data.page++;
        this.data.isLoading = false;
      },
      fail: (err) => {
        console.error("getUnsplashUserPics", err);
      },
    });
  },

  toUnsplashPicDetail(e) {
    let currPicId = e.currentTarget.dataset.pid;
    wx.navigateTo({
      url: "/pages/unsplashpic/unsplashpic?currId=" + currPicId,
    });
  },

  onLoad(e) {
    this.data.currUserId = e.currUserId;
    this.data.currUserName = e.currUserName;
    this.getUnsplashUserProfile()
    this.getUnsplashUserPics()
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
    this.getUnsplashUserPics();
    setTimeout(() => {
      wx.stopPullDownRefresh({});
    }, 500)
  },

  onReachBottom() {
    this.data.isLoading = true;
    this.getUnsplashUserPics();
  },

  onShareAppMessage() {},
});
