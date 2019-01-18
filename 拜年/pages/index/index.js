//index.js
//获取应用实例
const app = getApp()
var _animation;
var _animationIndex
const _ANIMATION_TIME = 500;
Page({
  data: {
    animationData: ''
  },
  getUserInfo: function (e) {
    console.log(e)
    this.setData({
      haed_img: e.detail.userInfo.avatarUrl,
      name: e.detail.userInfo.nickName,
    })
  },

  onLoad: function () {
    var that=this
    var height=wx.getSystemInfoSync().windowHeight;
    this.setData({
      height: height+'px'
    })
    wx.request({
      url: 'http://yyb.wm57.mingtengnet.com/home/index/index',
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值
        // 'accessusertoken': wx.getStorageSync('key'
      },
      data: {
      
      },
      success: function (res) {
        console.log(res)
        if (res.data.status == 1) {
          that.setData({
            url: res.data.result.header,
            list: res.data.result.content,
          })
        }
        else {
          wx.showToast({
            title: res.data.message,
            icon: 'loading',
            duration: 2000,
          })
        }
      }
    })
  },
  onShow: function () {
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })

    this.animation = animation

    // animation.scale(2, 2).rotate(45).step()

    this.setData({
      animationData: animation.export()
    })
    var n = 0;
    //连续动画需要添加定时器,所传参数每次+1就行
    setInterval(function () {
      // animation.translateY(-60).step()
      n = n + 1;
      // console.log(n);
      this.animation.rotate(10 * (n)).step()
      this.setData({
        animationData: this.animation.export()
      })
    }.bind(this), 100)
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var headimg = this.data.haed_img
    var name=this.data.name
    var tit = this.data.list.index_title
    return {
      // title: list.goods_name,
      desc: name + tit,
      imageUrl: headimg,
      path: '/pages/index/index',

      success: function (res) {
        console.log(res)
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }


})
