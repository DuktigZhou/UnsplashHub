Page({
  data: {
    currPicId: "",
    currPicDetail: {},
    currPicDate: "",
    currPicViews: "",
    currPicDownload: "",
    loading: true,
    rowCol: [{ size: "327rpx", borderRadius: "24rpx" }, 1, { width: "61%" }],
  },

  previewPic() {
    wx.previewImage({
      urls: [this.data.currPicDetail.urls.regular],
    });
  },
  getDetailById(id) {
    const unsplashAccessKey = "toEemLqn_LPFUNiS4kMCMRhFGyHhMWVOcG6fddAsE5k";
    wx.request({
      url: "https://api.unsplash.com/photos/" + id,
      method: "GET",
      header: {
        Authorization: `Client-ID ${unsplashAccessKey}`,
      },
      success: (res) => {
        this.setData({
          currPicDetail: res.data,
          currPicViews: (res.data.views / 1000).toFixed(1) + 'K',
          currPicDownload: (res.data.downloads / 1000).toFixed(1),
        });
        console.log(this.data.currPicDetail);
        const promoted_at = new Date(res.data.promoted_at);

        const month = String(promoted_at.getUTCMonth() + 1).padStart(2, "0");
        const day = String(promoted_at.getUTCDate()).padStart(2, "0");
        const hours = String(promoted_at.getUTCHours()).padStart(2, "0");
        const minutes = String(promoted_at.getUTCMinutes()).padStart(2, "0");
        const formattedDate = `${month}/${day} ${hours}:${minutes}`;
        console.log(formattedDate);

        this.setData({
          currPicDate: formattedDate,
        });
        console.log(formattedDate);
      },
      fail: (err) => {
        console.error("getUnsplashPicFailed", err);
      },
    });
  },

  
  downloadPic() {
    wx.showLoading({
      title: "下载中，请稍后",
    });
    wx.downloadFile({
      url: this.data.currPicDetail.urls.full,
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


  toUnsplashUser(){
    let currUserId = this.data.currPicDetail.user.id;
    let currUserName= this.data.currPicDetail.user.username;
    let currUserAvatar = this.data.currPicDetail.user.profile_image.medium;
    wx.navigateTo({
      url:
        "/pages/unsplashUser/unsplashUser?currUserId=" +
        currUserId +
        "&currUserName=" +
        currUserName
    });
  },
  onLoad(e) {
    let currId = e.currId;
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
