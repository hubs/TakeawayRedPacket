//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    coupons: [ 
      { 
        title: '饿了么外卖天天大红包', 
        app_id:'wxece3a9a4c82f58c9', 
        app_path:'pages/sharePid/web/index?scene=s.click.ele.me/z1UV6wu', 
        color:"green", 
        image:"http://toolfk.xiuxiandou.com/yhq/coupe2/elm_hb.png", 
      },
      { 
        title: '美团56元外卖红包天天拿', 
        app_id:'wxde8ac0a21135c07d', 
        app_path:'/index/pages/h5/h5?weburl=https%3A%2F%2Fact.meituan.com%2Fclover%2Fpage%2Fadunioncps%2Fshare_coupon%3FutmSource%3D31378%26utmMedium%3DDD79FAAC047818417795B310E9CD2981%26activity%3DOwMkGzn6oK', 
        color:"cyan", 
        image:"http://toolfk.xiuxiandou.com/yhq/coupe2/mt_hb.png", 
      }, 
      
      { 
        title: '美团商城百万优惠券', 
        app_id:'wxde8ac0a21135c07d', 
        app_path:'/index/pages/h5/h5?weburl=https%3A%2F%2Fact.meituan.com%2Fclover%2Fpage%2Fadunioncps%2Fcoupon_shop%3FutmSource%3D31378%26utmMedium%3DDD79FAAC047818417795B310E9CD2981%26activity%3D0AlN4OtEIa', 
        color:"blue", 
        image:"http://toolfk.xiuxiandou.com/yhq/coupe2/mt_sc.png", 
      }, 
      { 
        title: '美团商超生鲜33元红包天天领', 
        app_id:'wxde8ac0a21135c07d', 
        app_path:'/index/pages/h5/h5?weburl=https%3A%2F%2Fact.meituan.com%2Fclover%2Fpage%2Fadunioncps%2Fshare_coupon%3FutmSource%3D31378%26utmMedium%3DDD79FAAC047818417795B310E9CD2981%26activity%3DLj7hGmmCBO', 
        color:"pink", 
        image:"http://toolfk.xiuxiandou.com/yhq/coupe2/mt_cs.png"
      }, 
     
      { 
        title: '饿了么瓜果蔬菜大折扣', 
        app_id:'wxece3a9a4c82f58c9', 
        app_path:'pages/sharePid/web/index?scene=s.click.ele.me/Mv9f4wu', 
        color:"mauve", 
        image:"http://toolfk.xiuxiandou.com/yhq/coupe2/elm_sc.png", 
      } 
    ],
    swipers:[ 
      { 
        app_id:'wxece3a9a4c82f58c9', 
        app_path:'pages/sharePid/web/index?scene=s.click.ele.me/z1UV6wu', 
        image:"http://toolfk.xiuxiandou.com/yhq/coupe/elm_hb.png", 
      },
      { 
        app_id:'wxde8ac0a21135c07d', 
        app_path:'/index/pages/h5/h5?weburl=https%3A%2F%2Fact.meituan.com%2Fclover%2Fpage%2Fadunioncps%2Fshare_coupon%3FutmSource%3D31378%26utmMedium%3DDD79FAAC047818417795B310E9CD2981%26activity%3DOwMkGzn6oK', 
        image:"http://toolfk.xiuxiandou.com/yhq/coupe/mt_hb.png", 
      }
    ],
    systemPlatform: wx.getSystemInfoSync().platform,
    title: 'Hi',
    mini_lists:[],
    show_intro:false,
    ref_count:0,
    ref_dou:0,
    UID:0,
    days_str:null,
  },

  onLoad: function () {
    let that = this;
    if (app.globalData.openid){
      that.updateData();
    } else if (this.data.canIUse) {
      app.userInfoReadyCallback = res => {
        that.updateData();
      }
    }else{
      setTimeout(function () {
        that.updateData();
      },2000);
    }

    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
  },

  updateData:function(){
    let data = {};

    let coupons = app.globalData.coupons;
    let swipers = app.globalData.swipers;
    if(coupons.length>0){
      data.coupons = coupons;
    }

    if(swipers.length>0){
      data.swipers = swipers;
    }

    data.mini_lists = app.globalData.mini_lists;

    console.log(data);
    data.title=this.renderTitle();

    data.show_intro = app.globalData.show_intro;
    data.ref_count = app.globalData.ref_count;
    data.ref_dou = app.globalData.ref_dou;
    data.UID = app.globalData.UID;
    data.days_str = app.globalData.days_str;
    this.setData(data);
    
  },
  //分享给朋友
  onShareAppMessage: function (res) {
    if (res.from === 'button') {// 来自页面内分享按钮
      return {
        title: app.globalData.share_friend,
        imageUrl: "/images/bg2.jpg",
        path: '/pages/index/index?uid='+app.globalData.openid,
      }
    }
    return {
      title: app.globalData.share_title,
      path: '/pages/index/index?uid='+app.globalData.openid,
      imageUrl:'/images/bg2.jpg',
    }
  },
  //分享到朋友圈
  onShareTimeline: function (res) {
    return {
      title: app.globalData.share_title,
      query: '/pages/index/index?uid='+app.globalData.openid,
      imageUrl:'/images/bg2.jpg',
    }
  },
  //ysuu
  subClick:function(){
    let template = 'duLdaU2oLyN_lInTvKVKgsQH99Ac-cWbjMSWN9ilPSI';
    wx.requestSubscribeMessage({
      tmplIds: [template],
      success (res) {
        if(res[template]=="accept"){
          wx.showToast({
            title: app.globalData.subscribe_title,
            icon: 'none',
            duration: 3000
          });

          wx.request({
            url: 'xxxxx',
            method: 'POST',
            data:  { openid: app.globalData.openid}
          });
        }
       }
    })
  },
  //jump mini
  jumpClick:function(e){
    let appId = e.currentTarget.dataset.appid;
    let path  = e.currentTarget.dataset.path;
    wx.navigateToMiniProgram({
      appId: appId,
      path: path
    })
  },

  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  renderTitle() {
    var t = new Date().getHours();
    return t < 6 || t > 21 ? "🍢 夜深了" : t < 9 ? "☕️ 早安" : t < 12 ? "🍜 吃了吗" : t < 14 ? "🍕 中午啦" : t < 18 ? "🍧 下午好" : "🍺 晚上好";
  },
   //跳转到其他小程序
   jump_mini(e){
    let appid = e.currentTarget.dataset.appid;
    let app_path = e.currentTarget.dataset.path;
    wx.navigateToMiniProgram({
      appId: appid,
      path:app_path
     
    })
  },
})