Page({
  data: {
    currWallId: "",
    currWallDetail: {},
    currWallDate: "",
    currWallViews: "",
    currWallDownload: "",
    loading: true,
    rowCol: [{ size: "327rpx", borderRadius: "24rpx" }, 1, { width: "61%" }],
  },

  previewWall() {
    wx.previewImage({
      urls: [this.data.currWallDetail.urls.regular],
    });
  },
  getDetailById(id) {
    wx.request({
      url: "https://wallhaven.cc/api/v1/w/" + id,
      method: "GET",
      success: (res) => {
        console.log(res.data.data);
        this.setData({
          currWallDetail: res.data.data,
          currWallViews: res.data.data.views,
          currWallDate: res.data.data.created_at.substring(0,10),
        });
      },
      fail: (err) => {
        console.error("getWallhavenWallFailed", err);
      },
    });
  },

  
  downloadWall() {
    wx.showLoading({
      title: "下载中，请稍后",
    });
    wx.downloadFile({
      url: this.data.currWallDetail.path,
      success: function (res) {
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: function (data) {
            wx.hideLoading();
            wx.showModal({
              title: "提示",
              content: "保存成功",
              modalType: false,
            });
          },
          fail: function (err) {
            if (
              err.errMsg === "saveImageToPhotosAlbum:fail:auth denied" ||
              err.errMsg === "saveImageToPhotosAlbum:fail auth deny" ||
              err.errMsg === "saveImageToPhotosAlbum:fail authorize no response"
            ) {
              wx.showModal({
                title: "提示",
                content: "需要您授权保存相册",
                modalType: false,
                success: (modalSuccess) => {
                  wx.openSetting({
                    success(settingdata) {
                      console.log("settingdata", settingdata);
                      if (settingdata.authSetting["scope.writePhotosAlbum"]) {
                        wx.showModal({
                          title: "提示",
                          content: "获取权限成功,再次点击图片即可保存",
                          modalType: false,
                        });
                      } else {
                        wx.showModal({
                          title: "提示",
                          content: "获取权限失败，将无法保存到相册哦~",
                          modalType: false,
                        });
                      }
                    },
                    fail(failData) {
                      console.log("failData", failData);
                    },
                    complete(finishData) {
                      console.log("finishData", finishData);
                    },
                  });
                },
              });
            }
          },
          complete(res) {
            wx.hideLoading();
          },
        });
      },
    });
  },


  toWallhavenUser(){
    let currUserName= this.data.currWallDetail.uploader.username;
    let currUserAvatar = JSON.stringify(this.data.currWallDetail.uploader.avatar['200px']);
    wx.navigateTo({
      url:
        "/pages/wallhavenUser/wallhavenUser?currUserAvatar=" +
        currUserAvatar +
        "&currUserName=" +
        currUserName
    });
  },
  onLoad(e) {
    let currId = e.currId;
    console.log(currId);
    this.getDetailById(currId);
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
