import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'
import initGlobal from './global'
// import ElementPlus from 'element-plus'
// import { ElMessage, ElMessageBox, ElDropdown, ElDropdownItem, ElDropdownMenu, ElButton, 
//    ElContainer, ElAside, ElHeader, ElMain, ElFooter, ElMenu, ElSubmenu,
//    ElMenuItemGroup, ElMenuItem, ElForm, ElFormItem, ElInput, ElPopover, 
//    ElTag, ElCard, ElTable, ElTableColumn, ElPagination, ElDialog, ElPopconfirm, 
//    ElUpload, ElLoading, ElSelect, ElOption, ElRadioGroup, ElRadio, ElCascader, ElCheckbox, 
//    ElInputNumber, ElDrawer,ElDatePicker } from 'element-plus'
// import 'element-plus/dist/index.css'
//import 'element-plus/lib/theme-chalk/index.css'
// 修改后的主题样式必须放在最后面
//import '../theme/index.css'

const app = createApp(App)
app.use(router).use(store)//.use(ElementPlus)

initGlobal(app)

app.mount('#app')

// app.use(ElButton)
//   .use(ElContainer)
//   .use(ElAside)
//   .use(ElHeader)
//   .use(ElMain)
//   .use(ElFooter)
//   .use(ElMenu)
//   .use(ElSubmenu)
//   .use(ElMenuItemGroup)
//   .use(ElMenuItem)
//   .use(ElForm)
//   .use(ElFormItem)
//   .use(ElInput)
//   .use(ElPopover)
//   .use(ElTag)
//   .use(ElCard)
//   .use(ElTable)
//   .use(ElTableColumn)
//   .use(ElPagination,{locale:zhCn})
//   .use(ElDialog)
//   .use(ElPopconfirm)
//   .use(ElUpload)
//   .use(ElLoading)
//   .use(ElSelect)
//   .use(ElOption)
//   .use(ElRadioGroup)
//   .use(ElRadio)
//   .use(ElCascader)
//   .use(ElCheckbox)
//   .use(ElInputNumber)
//   .use(ElDrawer)
//   .use(ElDropdown)
//   .use(ElDropdownItem)
//   .use(ElDropdownMenu)
//   .use(ElDatePicker)