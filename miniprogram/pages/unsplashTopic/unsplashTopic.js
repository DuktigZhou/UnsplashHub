// pages/unsplashTopic/unsplashTopic.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    topicRawData: [],
    topicChs: [
      {
        "on-the-lake": "特辑：在湖边",
      },
      {
        wallpapers: "壁纸",
      },
      {
        "3d-renders": "3D 渲染",
      },
      {
        nature: "自然",
      },
      {
        "textures-patterns": "纹理和图案",
      },
      {
        "architecture-interior": "建筑与室内设计",
      },
      {
        film: "胶片",
      },
      {
        "street-photography": "街头摄影",
      },
      {
        experimental: "实验性摄影",
      },
      {
        animals: "动物",
      },
      {
        "fashion-beauty": "时尚与美容",
      },
      {
        "business-work": "商业与工作",
      },
      {
        "food-drink": "美食与饮品",
      },
      {
        travel: "旅行",
      },
      {
        people: "人物",
      },
      {
        spirituality: "灵性",
      },
      {
        athletics: "运动",
      },
      {
        health: "健康",
      },
      {
        "current-events": "时事",
      },
      {
        "arts-culture": "艺术与文化",
      },
    ],
  },

  filters:{
    findTranslation(slug) {
      for (var i = 0; i < this.data.topicChs.length; i++) {
        var translation = this.data.topicChs[i];
        if (translation.hasOwnProperty(slug)) {
          return translation[slug];
        }
      }
      return ""; // 如果没有对应翻译，则返回空字符串
    },
  },
  getUnsplashTopic() {
    const unsplashAccessKey = "toEemLqn_LPFUNiS4kMCMRhFGyHhMWVOcG6fddAsE5k";
    wx.request({
      url: "https://api.unsplash.com/topics?per_page=30",
      method: "GET",
      header: {
        Authorization: `Client-ID ${unsplashAccessKey}`,
      },
      success: (res) => {
        this.setData({
          topicRawData: res.data,
        });

        console.log(
          "getUnsplashCollections----collectionRawData",
          this.data.topicRawData
        );
      },
      fail: (err) => {
        console.error("getUnsplashCollections", err);
      },
    });
  },
  toUnsplashTopicDetail(e) {
    let currTopicId = e.currentTarget.dataset.tid;
    let currTopicSlug = e.currentTarget.dataset.tslug;
    wx.navigateTo({
      url:
        "/pages/unsplashTopicDetail/unsplashTopicDetail?currTopicId=" +
        currTopicId +
        "&currTopicSlug=" +
        currTopicSlug,
    });
  },



  onLoad(options) {
    wx.setNavigationBarTitle({
      title: "",
    });
    this.getUnsplashTopic();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},
});
