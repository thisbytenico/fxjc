const actions = {
    setLoading({ commit }, { show, text = "处理中请稍候..." }) {
        commit("SET_LOADING", {
            show,
            text
        });
    }
}
export default actions