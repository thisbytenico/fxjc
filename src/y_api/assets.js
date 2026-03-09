
import ajax from "@/utils/ajax";

export const api = {
    tableList: "/api/goverment/listForPage",
    companyList: "/api/company/listForPage",
    personList: "/api/person/listForPage",
    tableDelete: ""
}

export function exportGov(data) {
    return ajax.get({
        url: "/api/goverment/export",
        data,
        responseType:'blob',
        contentType:"application/x-www-form-urlencoded"
    });
}

export function exportCompany(data) {
    return ajax.get({
        url: "/api/company/export",
        data,
        responseType:'blob',
        contentType:"application/x-www-form-urlencoded"
    });
}

export function exportPerson(data) {
    return ajax.get({
        url: "/api/person/export",
        data,
        responseType:'blob',
        contentType:"application/x-www-form-urlencoded"
    });
}
export default api

