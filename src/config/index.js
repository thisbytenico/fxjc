export const baseURL = process.env.BASE_API
export const okCode = 200
export const statusField = "code"
export const pageField = "pageNo"
export const totalField = "totalCount"
export const imgServerURL ="" //"http://10.0.52.114";//"http://sofn.com.cn:8001"
//不需要提示消息的状态码，8:未查询到数据
export const getIsNotTipCode = (code) => {
    return /8|1/gm.test(code)
}
export const defaultOpenid = "oRLXX510CSyQvxwN54q6j4Tgw_lY"
export const nftStatus = ['未上架', '待上架', '售卖中', '盲盒内', '持有中', '已提出']