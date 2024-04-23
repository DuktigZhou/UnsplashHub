// Wallhaven API Under Maintenance

Page({
  data: {
    wallhavenRawData: [],
    isLoading: false,
    page: 1,
  },

  getWallhavenWalls() {
    wx.request({
      url: "https://wallhaven.cc/api/v1/search?latest&page=" + this.data.page,
      method: "GET",
      header: {},
      success: (res) => {
        console.log(res.data);
        this.setData({
          wallhavenRawData: this.data.wallhavenRawData.concat(res.data.data),
        });
        this.data.page++;
        this.data.isLoading = false;
        console.log(
          "getWallhavenWalls----wallhavenRawData",
          this.data.wallhavenRawData
        );
      },
      fail: (err) => {
        console.error("getWallhavenWallsFailed", err);
      },
    });
  },
  toWallhavenWallDetail(e) {
    wx.navigateTo({
      url: "/pages/wallhavenWalls/wallhavenWalls?currId=" + e.currentTarget.dataset.wid,
    });
  },
  onLoad() {
    wx.setNavigationBarTitle({
      title: "",
    });
    this.getWallhavenWalls();
  },
  onReady() {},
  onShow() {},
  onPullDownRefresh() {
    this.setData({
      wallhavenRawData: [],
      page: 1,
    });
    this.getWallhavenWalls();
    setTimeout(() => {
      wx.stopPullDownRefresh({});
    }, 500);
  },
  onReachBottom() {
    this.data.isLoading = true;
    this.getWallhavenWalls();
  },
});
