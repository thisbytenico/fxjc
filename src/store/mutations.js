const mutations = {
  SET_LOADING: (state,loading) => {
    if(!loading.text)
        loading.text="处理中请稍候..."
     state.loading = loading;
    
  },
  SET_SHOW_HTTP_MSG: (state,showHttpMsg) => {
     state.showHttpMsg = showHttpMsg;
  }
}
export default mutations