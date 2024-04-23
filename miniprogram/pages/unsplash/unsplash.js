// Unsplash Demo API限制为每小时50次请求

Page({
  /**
   * 页面的初始数据
   */
  data: {
    unsplashRawData: [],
    isLoading: false,
    page: 1,
    perPage: 16,
  },
  toTopic() {
    wx.navigateTo({
      url: "../../pages/unsplashTopic/unsplashTopic",
    });
  },
  getUnsplashPic() {
    const unsplashAccessKey = "toEemLqn_LPFUNiS4kMCMRhFGyHhMWVOcG6fddAsE5k";
    wx.request({
      url:
        "https://api.unsplash.com/photos?page=" +
        this.data.page +
        "&per_page=" +
        this.data.perPage,
      method: "GET",
      header: {
        Authorization: `Client-ID ${unsplashAccessKey}`,
      },
      success: (res) => {
        this.setData({
          unsplashRawData: this.data.unsplashRawData.concat(res.data),
        });
        this.data.page++;
        this.data.isLoading = false;
        console.log(
          "getUnsplashPic----unsplashRawData",
          this.data.unsplashRawData
        );
      },
      fail: (err) => {
        console.error("getUnsplashPicFailed", err);
      },
    });
  },
  toUnsplashPicDetail(e) {
    let currPicDetail = this.data.unsplashRawData[e.currentTarget.dataset.pidx];
    wx.navigateTo({
      url: "/pages/unsplashpic/unsplashpic?currId=" + currPicDetail.id,
    });
  },
  onLoad(options) {
    wx.setNavigationBarTitle({
      title: "",
    });
    this.getUnsplashPic();
  },
  onReady() {},
  onShow() {},
  onPullDownRefresh() {
    this.setData({
      unsplashRawData: [],
      page: 1,
    });
    this.getUnsplashPic();
    setTimeout(() => {
      wx.stopPullDownRefresh({});
    }, 500)
  },
  onReachBottom() {
    this.data.isLoading = true;
    this.getUnsplashPic();
  },
});
