
import ajax from "@/utils/ajax";


export function getScoreRanking(data) {
    return ajax.get({
        url: "/api/statistic/getScoreRanking",
        data,
        loading:false
    });
}

export function getDeclareStatistic(data) {
    return ajax.get({
        url: "/api/statistic/getDeclareStatistic",
        data,
        loading:false
    });
}

export function getTrendStatistic(data) {
    return ajax.get({
        url: "/api/statistic/getTrendStatistic",
        data,
        loading:false
    });
}

export function getGovernmentStatistic(data) {
    return ajax.get({
        url: "/api/statistic/getGovernmentStatistic",
        data,
        loading:false
    });
}

export function getPersonListForPage(data) {
    return ajax.get({
        url: "/api/statistic/getPersonListForPage",
        data,
        loading:false
    });
}

