export const validateMobile = (rule, value, callback) => {
    // console.log(value, '')
    if (value === '') {
      callback(new Error('请输入手机号'));
    } else if (!/^1(3|4|5|6|7|8|9)[0-9]\d{8}$/.test(value)) {
      callback(new Error('请输入正确的手机号'));
    } else {
      callback();
    }
  };