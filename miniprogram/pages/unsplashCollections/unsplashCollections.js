// pages/unsplashcollections/unsplashcollections.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collectionRawData: [],
    isLoading: false,
    page: 1,
    perPage: 16,
  },

  getUnsplashCollections() {
    const unsplashAccessKey = "toEemLqn_LPFUNiS4kMCMRhFGyHhMWVOcG6fddAsE5k";
    wx.request({
      url:
        "https://api.unsplash.com/collections?page=" +this.data.page +"&per_page=" +this.data.perPage,
      method: "GET",
      header: {
        Authorization: `Client-ID ${unsplashAccessKey}`,
      },
      success: (res) => {
        this.setData({
          collectionRawData: this.data.collectionRawData.concat(res.data),
        });
        this.data.page++
        this.data.isLoading = false
        console.log("getUnsplashCollections----collectionRawData", this.data.collectionRawData);
      },
      fail: (err) => {
        console.error("getUnsplashCollections", err);
      },
    });
  },

  toUnsplashCollectionDetail(e){
    let currCollectionId = e.currentTarget.dataset.cid
    let currCollectionTitle = e.currentTarget.dataset.ctitle
    let currCollectionPicCount = e.currentTarget.dataset.ccount
    let currCollectionUserName = e.currentTarget.dataset.cusername
    wx.navigateTo({
      url: "/pages/unsplashCollectionDetail/unsplashCollectionDetail?currCollectionId=" + currCollectionId + "&currCollectionTitle="+ currCollectionTitle + "&currCollectionPicCount="+ currCollectionPicCount+ "&currCollectionUserName="+ currCollectionUserName,
    });
  },
  onLoad(options) {
    wx.setNavigationBarTitle({
      title: 'Unsplash 影集',
    });
    this.getUnsplashCollections();
  },

  onReady() {

  },

  onShow() {

  },

  onHide() {

  },

  onUnload() {

  },

  onPullDownRefresh() {
    this.setData({
      collectionRawData: [],
      page: 1,
    });
    this.getUnsplashCollections();
    setTimeout(() => {
      wx.stopPullDownRefresh({});
    }, 500)
  },

  onReachBottom() {
    this.data.isLoading = true;
    this.getUnsplashCollections();
  },

  onShareAppMessage() {

  }
})