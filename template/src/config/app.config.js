/**
 * @author chauvetxiao
 *
 * 应用配置项
 * <p>
 * 请勿将和业务相关的配置项放在此配置文件中
 * </p>
*/

module.exports = {
    request: {
        api_prefix: 'https://app.work.weixin.qq.com/wework_admin/',  // 请求的前缀
        max_try: 3,   // 网络登录请求的重试次数
        app_type: 4    // 登录获取登陆态的应用类型，每个类型一个枚举值
    }
};
