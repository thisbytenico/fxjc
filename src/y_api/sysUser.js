
import ajax from "@/utils/ajax";

export const api = {
    tableList: "/api/sysUser/listForPage",
    tableDelete: ""
}

export function tableRowAdd(data) {
    return ajax.post({
        url: "/api/sysUser/add",
        data
    });
}

export function tableRowUpdate(data) {
    return ajax.post({
        url: "/api/sysUser/update",
        data
    });
}

export function submitDeleteBatch(data) {
    return ajax.post({
        url: "/api/sysUser/deleteBatch",
        data
    });
}

export function submitDelete(data) {
    return ajax.get({
        url: "/api/sysUser/delete",
        data
    });
}

export function resetPassword(data) {
    return ajax.post({
        url: "/api/sysUser/resetPassword",
        data
    });
}

export function updateStatus(data) {
    return ajax.post({
        url: "/api/sysUser/updateStatus",
        data
    });
}
export default api

