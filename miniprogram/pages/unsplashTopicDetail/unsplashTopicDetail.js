// pages/unsplashTopicDetail/unsplashTopicDetail.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    currTopicId: "",
    currTopicSlug: "",
    currTopicDesc: "",
    isLoading: false,
    page: 1,
    perPage: 16,
    topicPicData: [],
    topicSloganChs: [
      {
        "on-the-lake": "特辑：在湖边",
        desc:
          "走进宁静的湖畔生活世界，感受我们最新主题：湖畔生活。展示你家族别致的小屋，水边懒散的夏日，寒冷夜晚中燃烧的壁炉，以及令人惊叹的日出和日落。庆祝湖畔生活的简单与宁静，远离城市喧嚣，沉浸在大自然的奇迹中。",
      },
      {
        wallpapers: "壁纸",
        desc: "查看一系列适合作为壁纸的摄影作品",
      },
      {
        "3d-renders": "3D 渲染",
        desc:
          "Unsplash社区通过3D渲染不断突破创新的界限。从抽象世界到逼真的室内设计，这个类别展示了使用软件设计并渲染成的令人兴奋的三维图像。",
      },
      {
        nature: "自然",
        desc:
          "通过摄影，我们可以将大自然的美丽定格在时间中。庆祝我们的星球和更远的地方的奇迹——从广阔的户外到自己后院的奇迹时刻。",
      },
      {
        "textures-patterns": "纹理和图案",
        desc:
          "无论您正在寻找令人惊叹的微距摄影还是复杂的建筑形状的镜头，您来对地方了。",
      },
      {
        "architecture-interior": "建筑与室内设计",
        desc:
          "探索我们的建筑环境——从野兽主义建筑到古怪的家居装饰。这个类别展示了世界各地最好的建筑和室内设计作品。",
      },
      {
        film: "胶片",
        desc:
          "让我们通过庆祝过去和现在的模拟影像来纪念摄影的起源。从复古拍立得相机到令人陶醉的35mm镜头，这个类别展示了胶片摄影所能提供的最好的作品。",
      },
      {
        "street-photography": "街头摄影",
        desc:
          "当你周围的街道成为你的画布时，你能发现什么？从迷人小镇的宁静通道到大城市的喧嚣与繁忙，这个类别展示了各种形式的街头摄影。",
      },
      {
        experimental: "实验性摄影",
        desc:
          "摄影有能力挑战观点，重新想象我们如何描绘周围的世界。这个类别探索不太可能的质感、新的格式和有趣的主题，推动创造力向前发展。",
      },
      {
        animals: "动物",
        desc: "异国野生动物、宠物小猫——透过屏幕揭示动物王国的美丽。",
      },
      {
        "fashion-beauty": "时尚与美容",
        desc:
          "时尚与美容是一种强大的自我表达形式。该分类通过激发人们对街头时尚、护肤产品、前卫的编辑摄影等的照片展示，记录了时尚的风格。",
      },
      {
        "business-work": "商业与工作",
        desc:
          "以多种形式反映现代工作场所的现实，包括远程办公和创业的图像，以及工程师和艺术家工作的照片。",
      },
      {
        "food-drink": "美食与饮品",
        desc:
          "从家中简单的烹饪晚餐到旅行中品尝新菜肴，食物将我们联系在一起。该分类探索了食物摄影的世界，包括从公园的夏日野餐到甜品的照片。",
      },
      {
        travel: "旅行",
        desc: "在家中舒适的环境中发现隐藏的奇迹和鼓舞人心的目的地。",
      },
      {
        people: "人物",
        desc:
          "捕捉真实的人物。摄影有能力反映我们周围的世界，为我们社区中的个人和群体发声，最重要的是讲述他们的故事。",
      },
      {
        spirituality: "灵性",
        desc:
          "摄影有能力探讨人生的重要问题，通过探索爱、失落、疗愈和人类联系的主题。",
      },
      {
        athletics: "运动",
        desc:
          "该分类庆祝日常生活中的行动，从艰难的健身锻炼、紧张的篮球比赛到极限高度的直升机滑雪。近距离感受运动员的强烈情感、球场上观众的狂热和挑战户外活动的危险。",
      },
      {
        health: "健康",
        desc:
          "通过展示从新医疗发现和替代药物到健康饮食和冥想等方面的照片，庆祝健康的心灵、身体和灵魂。",
      },
      {
        "current-events": "时事",
        desc:
          "照片影响着我们对周围世界的理解。该分类捕捉全球范围内的新闻瞬间，从政治抗议到文化庆典。",
      },
      {
        "arts-culture": "艺术与文化",
        desc:
          "让您每天接触到文化的精髓 — 展示来自世界各地的艺术、音乐和文学的摄影作品。",
      },
    ],
  },

  getUnsplashTopicPics() {
    const unsplashAccessKey = "toEemLqn_LPFUNiS4kMCMRhFGyHhMWVOcG6fddAsE5k";
    wx.request({
      url:
        "https://api.unsplash.com/topics/" +
        this.data.currTopicId +
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
          topicPicData: this.data.topicPicData.concat(res.data),
        });
        this.data.page++;
        this.data.isLoading = false;
        console.log(
          "getUnsplashTopicPics----topicPicData",
          this.data.topicPicData
        );
      },
      fail: (err) => {
        console.error("getUnsplashTopicPics", err);
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
    wx.setNavigationBarTitle({
      title: "Unsplash 主题",
    });
    this.data.currTopicId = e.currTopicId;
    this.data.currTopicSlug = e.currTopicSlug;
    var value = null;
    var desc = null;
    for (var i = 0; i < this.data.topicSloganChs.length; i++) {
      var item = this.data.topicSloganChs[i];
      if (item[this.data.currTopicSlug]) {
        value = item[this.data.currTopicSlug];
        desc = item.desc;
        break;
      }
    }

    this.setData({
      currTopicId: this.data.currTopicId,
      currTopicTitle: value || e.currTopicTitle,
      currTopicDesc: desc,
    });
    this.getUnsplashTopicPics();
  },

  onReady() {},

  onShow() {},

  onHide() {},

  onUnload() {},

  onPullDownRefresh() {
    this.setData({
      topicPicData: [],
      page: 1,
    });
    this.getUnsplashTopicPics();
    setTimeout(() => {
      wx.stopPullDownRefresh({});
    }, 500)
  },

  onReachBottom() {
    this.data.isLoading = true;
    this.getUnsplashTopicPics();
  },

  onShareAppMessage() {},
});
