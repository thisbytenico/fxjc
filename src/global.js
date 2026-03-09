// import { ElMessage, ElMessageBox } from 'element-plus'

import ModalBtn from "./components/Btn/ModalBtn.vue";
import CForm from "./components/Form/Form.vue";
import Filter from "./components/Form/Filter.vue";
import CTable from "@/components/Table/CTable.vue";
import SelectSearch from "@/components/Form/SelectSearch.vue";
import Modal from '@/components/Modal.vue';
import Empty from '@/components/Empty.vue'

import Tags from '@/components/Tags.vue';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

export default function (app) {
    // 注册全局方法
    app.component(
        'CForm', CForm
    ).component(
        'ModalBtn', ModalBtn
    ).component(
        'CFilter', Filter
    ).component(
        'CTable', CTable
    ).component(
        'Modal', Modal
    ).component(
        'SelectSearch', SelectSearch
    ).component(
        'Tags', Tags
    ).component(
        'Empty', Empty
    )

    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
        app.component(key, component)
    }
    
    // 注册全局方法
    app.config.globalProperties.$confirm = ElMessageBox.confirm;
    app.config.globalProperties.$prompt = ElMessageBox.prompt;
    app.config.globalProperties.$g_alert = (msg, callback) => {
        ElMessageBox.alert(msg, "提示", {
            confirmButtonText: "确 认",
            callback
        });
    };
    app.config.globalProperties.$msg = (message = "操作成功", type = "success") => {
        ElMessage({
            message,
            type
        });
    };
}

Date.prototype.format = function (format) {
    var o = {
        "M+": this.getMonth() + 1, // month
        "d+": this.getDate(), // day
        "H+": this.getHours(), // hour
        "m+": this.getMinutes(), // minute
        "s+": this.getSeconds(), // second
        "q+": Math.floor((this.getMonth() + 3) / 3), // quarter
        "S": this.getMilliseconds()
        // millisecond
    }
    if (/(y+)/.test(format))
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(format))
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    return format;
}

window.addEventListener("load", () => {
    var div_global_loading = document.querySelector(".div_loading_c");
    div_global_loading &&
      div_global_loading.remove &&
      div_global_loading.remove();
 });