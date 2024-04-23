Page({

  data: {
    currCollectionId: "",
    currCollectionTitle: "",
    currCollectionPicCount:"",
    currCollectionUserName:"",
    collectionPicData: [],
    isLoading: false,
    page: 1,
    perPage: 16,
  },

  getUnsplashCollectionPics() {
    const unsplashAccessKey = "toEemLqn_LPFUNiS4kMCMRhFGyHhMWVOcG6fddAsE5k";
    wx.request({
      url:
        "https://api.unsplash.com/collections/" +
        this.data.currCollectionId +
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
          collectionPicData: this.data.collectionPicData.concat(res.data),
        });
        this.data.page++;
        this.data.isLoading = false;
        console.log(
          "getUnsplashCollectionPics----collectionPicData",
          this.data.collectionPicData
        );
      },
      fail: (err) => {
        console.error("getUnsplashCollectionPics", err);
      },
    });
  },

  toUnsplashPicDetail(e){
    let currPicId = e.currentTarget.dataset.pid
    wx.navigateTo({
      url: "/pages/unsplashpic/unsplashpic?currId=" + currPicId,
    });
  },

  onLoad(e) {
    wx.setNavigationBarTitle({
      title: 'Unsplash 影集'
    });
    this.data.currCollectionId = e.currCollectionId;
    this.data.currCollectionTitle = e.currCollectionTitle;
    this.data.currCollectionPicCount = e.currCollectionPicCount;
    this.data.currCollectionUserName = e.currCollectionUserName;

    this.setData({
      currCollectionId: this.data.currCollectionId,
      currCollectionTitle: this.data.currCollectionTitle,
      currCollectionPicCount: this.data.currCollectionPicCount,
      currCollectionUserName: this.data.currCollectionUserName
    })
    this.getUnsplashCollectionPics();
  },

  onReady() {},

  onShow() {},

  onHide() {},

  onUnload() {},

  onPullDownRefresh() {
    this.setData({
      collectionPicData: [],
      page: 1,
    });
    this.getUnsplashCollectionPics();
    setTimeout(() => {
      wx.stopPullDownRefresh({});
    }, 500)
  },

  onReachBottom() {
    this.data.isLoading = true;
    this.getUnsplashCollectionPics();
  },

  onShareAppMessage() {},
});
