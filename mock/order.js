import Mock from 'mockjs'

const data = Mock.mock({
  'orderVo|20': [{
    id: 1,
    phone: 18816277282,
    number: 12312312,
    userId: 1,
    deliverMode: 0,
    channel: 1,
    orderSubVoList: [
      {
        id: 1, //	int	子订单ID
        cartId: 2, //	int	购物车项ID
        goodzId: 1, //	int	商品ID
        goodzTitle: '商品标题1', //	string	商品标题
        goodzType: 0, //	int	商品类型 0：服务类 1：产品类
        quantity: '', //	int	数量 暂时不用
        price: '', //	double	单价 暂时不用
        totalPrice: 1231.12, //	double	总价格
        couponId: 1, //	int	用户选了就是他选的优惠券ID，如果没选，系统会择优选择
        couponDiscountAmount: 12.12, //	double	优惠券优惠金额
        totalDiscountAmount: 12.12, //	double	总优惠金额
        realPayPrice: 23.43, //	double	总优惠金额
        serviceDetailList: [
          {
            serviceId: 1, //	int	服务项目ID
            serviceName: '洗鞋', //	String	服务名称
            price: '49' //	double	服务项目价格
          },
          {
            serviceId: 2, //	int	服务项目ID
            serviceName: '氧化', //	String	服务名称
            price: '49' //	double	服务项目价格
          },
          {
            serviceId: 3, //	int	服务项目ID
            serviceName: '脱毛', //	String	服务名称
            price: '49' //	double	服务项目价格
          }
        ], //	list	服务类订单 服务项目明细列表 由 serviceDetail 组成的List
        serviceImageList: [
          {
            url: 'http://img3.imgtn.bdimg.com/it/u=1086323686,2139155&fm=26&gp=0.jpg', //	String	图片URL
            aspect: 1 //	int	球鞋展示面 鞋子展示面：0：正面 1：背后 2：侧面
          },
          {
            url: 'http://img5.imgtn.bdimg.com/it/u=2684793832,4225520105&fm=26&gp=0.jpg', //	String	图片URL
            aspect: 1 //	int	球鞋展示面 鞋子展示面：0：正面 1：背后 2：侧面
          },
          {
            url: 'http://img5.imgtn.bdimg.com/it/u=3160151100,430019057&fm=11&gp=0.jpg', //	String	图片URL
            aspect: 2 //	int	球鞋展示面 鞋子展示面：0：正面 1：背后 2：侧面
          }
        ] // list	服务类订单 服务照片列表 由 serviceImage 组成的List
      },
      {
        id: 1, //	int	子订单ID
        cartId: 2, //	int	购物车项ID
        goodzId: 1, //	int	商品ID
        goodzTitle: '商品标题2', //	string	商品标题
        goodzType: 0, //	int	商品类型 0：服务类 1：产品类
        quantity: '', //	int	数量 暂时不用
        price: '', //	double	单价 暂时不用
        totalPrice: 1231.12, //	double	总价格
        couponId: 1, //	int	用户选了就是他选的优惠券ID，如果没选，系统会择优选择
        couponDiscountAmount: 12.12, //	double	优惠券优惠金额
        totalDiscountAmount: 12.12, //	double	总优惠金额
        realPayPrice: 23.43, //	double	总优惠金额
        serviceDetailList: [
          {
            serviceId: 1, //	int	服务项目ID
            serviceName: '洗鞋', //	String	服务名称
            price: '49' //	double	服务项目价格
          },
          {
            serviceId: 2, //	int	服务项目ID
            serviceName: '氧化', //	String	服务名称
            price: '49' //	double	服务项目价格
          },
          {
            serviceId: 3, //	int	服务项目ID
            serviceName: '脱毛', //	String	服务名称
            price: '49' //	double	服务项目价格
          }
        ], //	list	服务类订单 服务项目明细列表 由 serviceDetail 组成的List
        serviceImageList: [
          {
            url: 'http://img3.imgtn.bdimg.com/it/u=1086323686,2139155&fm=26&gp=0.jpg', //	String	图片URL
            aspect: 1 //	int	球鞋展示面 鞋子展示面：0：正面 1：背后 2：侧面
          },
          {
            url: 'http://img5.imgtn.bdimg.com/it/u=2684793832,4225520105&fm=26&gp=0.jpg', //	String	图片URL
            aspect: 1 //	int	球鞋展示面 鞋子展示面：0：正面 1：背后 2：侧面
          },
          {
            url: 'http://img5.imgtn.bdimg.com/it/u=3160151100,430019057&fm=11&gp=0.jpg', //	String	图片URL
            aspect: 2 //	int	球鞋展示面 鞋子展示面：0：正面 1：背后 2：侧面
          }
        ] // list	服务类订单 服务照片列表 由 serviceImage 组成的List
      }
    ],
    totalPrice: 123.43,
    couponId: 1,
    couponAmount: 50.21,
    realPayPrice: 72.12,
    storeVo: {
      id: 1, //	int	id
      name: '店名', //	String	店名
      provinceName: '浙江', //	String	省份名称
      cityName: '杭州', //	String	城市名称
      countyName: '余杭', //	String	区县名称
      address: '详细地址详细地址详细地址详细地址', //	String	详细地址
      linkMan: '联系人', //	String	联系人
      phone: '18816288229', //	String	联系电话
      pictureUrl: '', //	String	招牌照片
      gpsLocation: '', //	String	GPS位置
      businessHour: '7：00到17：00', //	String	营业时间
      describe: '描述描述描述描述描述描述描述描述描述v' //	String	描述
    },
    toStoreId: 1,
    toStoreExpressId: 1,
    toStoreExpressName: '顺丰',
    toStoreExpressNumber: 12312,
    toUserAddressId: 1,
    userAddressVo: {
      id: 1, //	int	id
      linkName: '联系人', //	String	联系人
      provinceId: 1, //	int	省份ID
      provinceCode: '123131', //	String	省份code
      provinceName: '浙江', //	String	省份名称
      cityId: 2, //	int	城市ID
      cityName: '杭州', //	String	城市名称
      cityCode: '123123', //	String	城市code
      countyId: 1, //	int	区县ID
      countyCode: '12313', //	String	区县code
      countyName: '余杭', //	String	区县名称
      address: '详细地址详细地址详细地址', //	String	详细地址
      phone: '18816252232', //	String	脱敏后的手机号码
      describe: '说明说明说明说明说明说明' //	String	说明
    },
    toUserExpressId: 213,
    toUserExpressName: '圆通',
    toUserExpressNumber: '1312312',
    // 0待支付 1等待物流信息 2运输到店途中 3到店核验中 4清洗/修复中 5清洗/修复完成 6寄回中 7订单完成 8退款中 9已退款 -1已取消 -2已关闭
    status: 0,
    applyTime: 123123123,
    // 支付渠道 0：微信支付
    payChannel: 0,
    payTime: 12123123131,
    endTime: 123123123,
    closeReason: '订单失败原因'
  }],
  'orderSubVo': {
  }
})

export default [
  {
    url: '/api/bgms/order/find2Manage',
    type: 'post',
    response: config => {
      const items = data.orderVo
      return {
        code: 1,
        object: items,
        page: {
          currentPage: 1,
          pageRecords: 20,
          totalPages: 1,
          totalRecords: 1,
          startRecord: 0,
          nextPage: 1,
          previousPage: 1,
          hasNextPage: false,
          hasPreviousPage: false
        }
      }
    }
  },
  {
    url: '/api/bgms/order/detail',
    type: 'post',
    response: config => {
      return {
        code: 1,
        object: {
          id: 1,
          number: 123123,
          phone: 18817223333,
          userId: 123,
          deliverMode: 1,
          channel: 0,
          orderSubVoList: [
            {
              id: 1, //	int	子订单ID
              cartId: 2, //	int	购物车项ID
              goodzId: 1, //	int	商品ID
              goodzTitle: '商品标题1', //	string	商品标题
              goodzType: 0, //	int	商品类型 0：服务类 1：产品类
              quantity: '', //	int	数量 暂时不用
              price: '', //	double	单价 暂时不用
              totalPrice: 1231.12, //	double	总价格
              couponId: 1, //	int	用户选了就是他选的优惠券ID，如果没选，系统会择优选择
              couponDiscountAmount: 12.12, //	double	优惠券优惠金额
              totalDiscountAmount: 12.12, //	double	总优惠金额
              realPayPrice: 23.43, //	double	总优惠金额
              serviceDetailList: [
                {
                  serviceId: 1, //	int	服务项目ID
                  serviceName: '洗鞋', //	String	服务名称
                  classifyCode: '000001',
                  price: '49' //	double	服务项目价格
                },
                {
                  serviceId: 2, //	int	服务项目ID
                  serviceName: '氧化', //	String	服务名称
                  classifyCode: '000002',
                  price: '49' //	double	服务项目价格
                },
                {
                  serviceId: 3, //	int	服务项目ID
                  serviceName: '脱毛', //	String	服务名称
                  classifyCode: '000002',
                  price: '49' //	double	服务项目价格
                }
              ], //	list	服务类订单 服务项目明细列表 由 serviceDetail 组成的List
              serviceImageList: [
                {
                  url: 'http://img3.imgtn.bdimg.com/it/u=1086323686,2139155&fm=26&gp=0.jpg', //	String	图片URL
                  aspect: 0, //	int	球鞋展示面 鞋子展示面：0：正面 1：背后 2：侧面
                  step: 0
                },
                {
                  url: 'http://img5.imgtn.bdimg.com/it/u=2684793832,4225520105&fm=26&gp=0.jpg', //	String	图片URL
                  aspect: 1, //	int	球鞋展示面 鞋子展示面：0：正面 1：背后 2：侧面
                  step: 0
                },
                {
                  url: 'http://img5.imgtn.bdimg.com/it/u=3160151100,430019057&fm=11&gp=0.jpg', //	String	图片URL
                  aspect: 2, //	int	球鞋展示面 鞋子展示面：0：正面 1：背后 2：侧面
                  step: 0
                },
                {
                  url: 'http://img5.imgtn.bdimg.com/it/u=3160151100,430019057&fm=11&gp=0.jpg', //	String	图片URL
                  aspect: 3, //	int	球鞋展示面 鞋子展示面：0：正面 1：背后 2：侧面
                  step: 0
                },
                {
                  url: 'http://img3.imgtn.bdimg.com/it/u=1086323686,2139155&fm=26&gp=0.jpg', //	String	图片URL
                  aspect: 0, //	int	球鞋展示面 鞋子展示面：0：正面 1：背后 2：侧面
                  step: 1
                },
                {
                  url: 'http://img5.imgtn.bdimg.com/it/u=2684793832,4225520105&fm=26&gp=0.jpg', //	String	图片URL
                  aspect: 1, //	int	球鞋展示面 鞋子展示面：0：正面 1：背后 2：侧面
                  step: 1
                },
                {
                  url: 'http://img5.imgtn.bdimg.com/it/u=3160151100,430019057&fm=11&gp=0.jpg', //	String	图片URL
                  aspect: 2, //	int	球鞋展示面 鞋子展示面：0：正面 1：背后 2：侧面
                  step: 1
                },
                {
                  url: 'http://img5.imgtn.bdimg.com/it/u=3160151100,430019057&fm=11&gp=0.jpg', //	String	图片URL
                  aspect: 3, //	int	球鞋展示面 鞋子展示面：0：正面 1：背后 2：侧面
                  step: 1
                },
                {
                  url: 'http://img3.imgtn.bdimg.com/it/u=1086323686,2139155&fm=26&gp=0.jpg', //	String	图片URL
                  aspect: 0, //	int	球鞋展示面 鞋子展示面：0：正面 1：背后 2：侧面
                  step: 2
                },
                {
                  url: 'http://img5.imgtn.bdimg.com/it/u=2684793832,4225520105&fm=26&gp=0.jpg', //	String	图片URL
                  aspect: 1, //	int	球鞋展示面 鞋子展示面：0：正面 1：背后 2：侧面
                  step: 2
                },
                {
                  url: 'http://img5.imgtn.bdimg.com/it/u=3160151100,430019057&fm=11&gp=0.jpg', //	String	图片URL
                  aspect: 2, //	int	球鞋展示面 鞋子展示面：0：正面 1：背后 2：侧面
                  step: 2
                },
                {
                  url: 'http://img5.imgtn.bdimg.com/it/u=3160151100,430019057&fm=11&gp=0.jpg', //	String	图片URL
                  aspect: 3, //	int	球鞋展示面 鞋子展示面：0：正面 1：背后 2：侧面
                  step: 2
                }
              ], // list	服务类订单 服务照片列表 由 serviceImage 组成的List
              orderStoreCollectVo: {
                id: 1, //	int	ID
                orderId: 1, //	int	订单ID
                orderSubId: 1, //	int	子订单ID
                brand: '品牌', //	string	品牌
                model: '系列', //	string	系列
                amount: 1231.12, //	double	评估金额
                remark: '备注备注备注备注备注备注备注备注' //	string	备注
              }
            },
            {
              id: 1, //	int	子订单ID
              cartId: 2, //	int	购物车项ID
              goodzId: 1, //	int	商品ID
              goodzTitle: '商品标题2', //	string	商品标题
              goodzType: 0, //	int	商品类型 0：服务类 1：产品类
              quantity: '', //	int	数量 暂时不用
              price: '', //	double	单价 暂时不用
              totalPrice: 1231.12, //	double	总价格
              couponId: 1, //	int	用户选了就是他选的优惠券ID，如果没选，系统会择优选择
              couponDiscountAmount: 12.12, //	double	优惠券优惠金额
              totalDiscountAmount: 12.12, //	double	总优惠金额
              realPayPrice: 23.43, //	double	总优惠金额
              serviceDetailList: [
                {
                  serviceId: 1, //	int	服务项目ID
                  serviceName: '洗鞋', //	String	服务名称
                  price: '49' //	double	服务项目价格
                },
                {
                  serviceId: 2, //	int	服务项目ID
                  serviceName: '氧化', //	String	服务名称
                  price: '49' //	double	服务项目价格
                },
                {
                  serviceId: 3, //	int	服务项目ID
                  serviceName: '脱毛', //	String	服务名称
                  price: '49' //	double	服务项目价格
                }
              ], //	list	服务类订单 服务项目明细列表 由 serviceDetail 组成的List
              serviceImageList: [
                {
                  url: 'http://img3.imgtn.bdimg.com/it/u=1086323686,2139155&fm=26&gp=0.jpg', //	String	图片URL
                  aspect: 0, //	int	球鞋展示面 鞋子展示面：0：正面 1：背后 2：侧面
                  step: 0
                },
                {
                  url: 'http://img5.imgtn.bdimg.com/it/u=2684793832,4225520105&fm=26&gp=0.jpg', //	String	图片URL
                  aspect: 1, //	int	球鞋展示面 鞋子展示面：0：正面 1：背后 2：侧面
                  step: 0
                },
                {
                  url: 'http://img5.imgtn.bdimg.com/it/u=3160151100,430019057&fm=11&gp=0.jpg', //	String	图片URL
                  aspect: 2, //	int	球鞋展示面 鞋子展示面：0：正面 1：背后 2：侧面
                  step: 0
                },
                {
                  url: 'http://img5.imgtn.bdimg.com/it/u=3160151100,430019057&fm=11&gp=0.jpg', //	String	图片URL
                  aspect: 3, //	int	球鞋展示面 鞋子展示面：0：正面 1：背后 2：侧面
                  step: 0
                },
                {
                  url: 'http://img3.imgtn.bdimg.com/it/u=1086323686,2139155&fm=26&gp=0.jpg', //	String	图片URL
                  aspect: 0, //	int	球鞋展示面 鞋子展示面：0：正面 1：背后 2：侧面
                  step: 1
                },
                {
                  url: 'http://img5.imgtn.bdimg.com/it/u=2684793832,4225520105&fm=26&gp=0.jpg', //	String	图片URL
                  aspect: 1, //	int	球鞋展示面 鞋子展示面：0：正面 1：背后 2：侧面
                  step: 1
                },
                {
                  url: 'http://img5.imgtn.bdimg.com/it/u=3160151100,430019057&fm=11&gp=0.jpg', //	String	图片URL
                  aspect: 2, //	int	球鞋展示面 鞋子展示面：0：正面 1：背后 2：侧面
                  step: 1
                },
                {
                  url: 'http://img5.imgtn.bdimg.com/it/u=3160151100,430019057&fm=11&gp=0.jpg', //	String	图片URL
                  aspect: 3, //	int	球鞋展示面 鞋子展示面：0：正面 1：背后 2：侧面
                  step: 1
                },
                {
                  url: 'http://img3.imgtn.bdimg.com/it/u=1086323686,2139155&fm=26&gp=0.jpg', //	String	图片URL
                  aspect: 0, //	int	球鞋展示面 鞋子展示面：0：正面 1：背后 2：侧面
                  step: 2
                },
                {
                  url: 'http://img5.imgtn.bdimg.com/it/u=2684793832,4225520105&fm=26&gp=0.jpg', //	String	图片URL
                  aspect: 1, //	int	球鞋展示面 鞋子展示面：0：正面 1：背后 2：侧面
                  step: 2
                },
                {
                  url: 'http://img5.imgtn.bdimg.com/it/u=3160151100,430019057&fm=11&gp=0.jpg', //	String	图片URL
                  aspect: 2, //	int	球鞋展示面 鞋子展示面：0：正面 1：背后 2：侧面
                  step: 2
                },
                {
                  url: 'http://img5.imgtn.bdimg.com/it/u=3160151100,430019057&fm=11&gp=0.jpg', //	String	图片URL
                  aspect: 3, //	int	球鞋展示面 鞋子展示面：0：正面 1：背后 2：侧面
                  step: 2
                }
              ], // list	服务类订单 服务照片列表 由 serviceImage 组成的List
              orderStoreCollectVo: {
                id: 1, //	int	ID
                orderId: 1, //	int	订单ID
                orderSubId: 1, //	int	子订单ID
                brand: '品牌', //	string	品牌
                model: '系列', //	string	系列
                amount: 1231.12, //	double	评估金额
                remark: '备注备注备注备注备注备注备注备注' //	string	备注
              }
            }
          ],
          totalPrice: 122.21,
          couponId: 1,
          couponAmount: 20,
          realPayPrice: 101.12,
          storeVo: {
            id: 1, //	int	id
            name: '店名', //	String	店名
            provinceName: '浙江', //	String	省份名称
            cityName: '杭州', //	String	城市名称
            countyName: '余杭', //	String	区县名称
            address: '详细地址详细地址详细地址详细地址', //	String	详细地址
            linkMan: '联系人', //	String	联系人
            phone: '18816288229', //	String	联系电话
            pictureUrl: '', //	String	招牌照片
            gpsLocation: '', //	String	GPS位置
            businessHour: '7：00到17：00', //	String	营业时间
            describe: '描述描述描述描述描述描述描述描述描述v' //	String	描述
          },
          toStoreId: 1,
          toStoreExpressId: 1,
          toStoreExpressName: '顺丰',
          toStoreExpressNumber: '123123',
          toUserAddressId: 1,
          userAddressVo: {
            id: 1, //	int	id
            linkName: '联系人', //	String	联系人
            provinceId: 1, //	int	省份ID
            provinceCode: '123131', //	String	省份code
            provinceName: '浙江', //	String	省份名称
            cityId: 2, //	int	城市ID
            cityName: '杭州', //	String	城市名称
            cityCode: '123123', //	String	城市code
            countyId: 1, //	int	区县ID
            countyCode: '12313', //	String	区县code
            countyName: '余杭', //	String	区县名称
            address: '详细地址详细地址详细地址', //	String	详细地址
            phone: '18816252232', //	String	脱敏后的手机号码
            describe: '说明说明说明说明说明说明' //	String	说明
            
          },
          toUserExpressId: 213,
          toUserExpressName: '圆通',
          toUserExpressNumber: '1312312',
          status: 2,
          applyTime: 123123123,
          payChannel: 1,
          payTime: 12312312,
          endTime: 123123,
          closeReason: '原因原因原因原因原因原因原因原因原因',
          orderLogVos: [
            {
              orderId: 1, //	int	订单ID
              operate: '操作内容操作内容操作内容', //	int	操作内容
              status: 1, //	int	操作后状态，参见订单状态表
              remark: '该次操作的说明该次操作的说明该次操作的说明' //	int	该次操作的说明
            }
          ],
          payOrderNumber: '123123123'
        }
      }
    }
  },
  {
    url: '/api/bgms/order/store-collect',
    type: 'post',
    response: config => {
      return {
        code: 1
      }
    }
  },
  {
    url: '/api/bgms/order/service-result',
    type: 'post',
    response: config => {
      return {
        code: 1
      }
    }
  },
  {
    url: '/api/bgms/order/cancel',
    type: 'post',
    response: config => {
      return {
        code: 1
      }
    }
  },
  {
    url: '/api/bgms/order/find-order-express-log',
    type: 'post',
    response: config => {
      return {
        code: 1,
        message: '成功!',
        object: {
          id: 3,
          orderId: 36,
          number: '78106635796306',
          comCode: 'zto', 
          trend: 0,
          senderPhone: null,
          receiverPhone: '18758255201',
          content: '{\"resultcode\":\"200\",\"reason\":\"成功的返回\",\"result\":{\"company\":\"中通\",\"com\":\"zto\",\"no\":\"78106635796306\",\"status\":\"1\",\"status_detail\":null,\"list\":[{\"datetime\":\"2019-07-21 22:42:43\",\"remark\":\"【汕头市】【澄海】（0754-83915199）的陈建林[13531292530]（13531292530）已揽收\",\"zone\":\"\"},{\"datetime\":\"2019-07-21 22:52:50\",\"remark\":\"【汕头市】快件离开【澄海】已发往【杭州中转部】\",\"zone\":\"\"},{\"datetime\":\"2019-07-22 03:03:24\",\"remark\":\"【揭阳市】快件已经到达【潮汕中心】\",\"zone\":\"\"},{\"datetime\":\"2019-07-22 03:05:48\",\"remark\":\"【揭阳市】快件离开【潮汕中心】已发往【金华中转部】\",\"zone\":\"\"},{\"datetime\":\"2019-07-22 19:05:29\",\"remark\":\"【嘉兴市】快件已经到达【杭州中转部】\",\"zone\":\"\"},{\"datetime\":\"2019-07-22 20:13:57\",\"remark\":\"【嘉兴市】快件离开【杭州中转部】已发往【杭州好运路】\",\"zone\":\"\"},{\"datetime\":\"2019-07-23 07:32:02\",\"remark\":\"【杭州市】快件已经到达【杭州好运路】\",\"zone\":\"\"},{\"datetime\":\"2019-07-23 07:32:02\",\"remark\":\"【杭州市】【杭州好运路】的杨志祥[18258439513]（18258439513）正在第1次派件,请保持电话畅通,并耐心等待（95720为中通快递员外呼专属号码，请放心接听）\",\"zone\":\"\"},{\"datetime\":\"2019-07-23 11:59:53\",\"remark\":\"【杭州市】快件已在【杭州好运路】签收,签收人:本人,如有疑问请电联:18258439513\\/0571-86029965,您的快递已经妥投。风里来雨里去,只为客官您满意。上有老下有小,赏个好评好不好？【请在评价快递员处帮忙点亮五颗星星哦~】\",\"zone\":\"\"}]},\"error_code\":0}',
          createTime: 1575614719978
        },
        map: {}
      }
    }
  }

]
