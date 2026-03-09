const action_delete = {
    action: 'delete',
    // icon_type: "img",
    icon_type: ''
};
const action_edit = {
    action: 'edit',
    // icon_type: "img",
    icon_type: ''
};
const action_detail = {
    action: 'detail',
    icon_type: ''
};
const action_start = {
    action: 'start',
    icon_type: 'font',
    i_class: 'el-icon-video-play'
};


export const _optTypes = {
    详情: action_detail,
    查看: action_detail,
    编辑: action_edit,

    删除: action_delete,
    剔除: action_delete,
    下载: {
        action: 'download',
        icon_type: 'img'
    },
    操作记录: {
        action: 'opt',
        icon_type: 'img'
    },
    启用: action_start,
    运行: action_start
    // 上架: {
    //     action: "onsell",
    //     icon_type: "",
    // },
    // 下架: {
    //     action: "close",
    //     icon_type: "",
    // },
    // 交易记录: {
    //     action: "record",
    //     icon_type: "",
    // },
};



Date.prototype.format = function (format) {
    var o = {
        'M+': this.getMonth() + 1, // month
        'd+': this.getDate(), // day
        'H+': this.getHours(), // hour
        'm+': this.getMinutes(), // minute
        's+': this.getSeconds(), // second
        'q+': Math.floor((this.getMonth() + 3) / 3), // quarter
        S: this.getMilliseconds()
        // millisecond
    };
    if (/(y+)/.test(format))
        format = format.replace(
            RegExp.$1,
            (this.getFullYear() + '').substr(4 - RegExp.$1.length)
        );
    for (var k in o)
        if (new RegExp('(' + k + ')').test(format))
            format = format.replace(
                RegExp.$1,
                RegExp.$1.length == 1
                    ? o[k]
                    : ('00' + o[k]).substr(('' + o[k]).length)
            );
    return format;
};

// Date.prototype.addDate = function (strInterval, Number) {
//     var dtTmp = this;
//     switch (strInterval) {
//         case 's':
//             return new Date(dtTmp.getTime() + 1000 * Number);
//         case 'n':
//             return new Date(dtTmp.getTime() + 60000 * Number);
//         case 'h':
//             return new Date(dtTmp.getTime() + 3600000 * Number);
//         case 'd':
//             return new Date(dtTmp.getTime() + 86400000 * Number);
//         case 'w':
//             return new Date(dtTmp.getTime() + 86400000 * 7 * Number);
//         case 'q':
//             return new Date(
//                 dtTmp.getFullYear(),
//                 dtTmp.getMonth() + Number * 3,
//                 dtTmp.getDate(),
//                 dtTmp.getHours(),
//                 dtTmp.getMinutes(),
//                 dtTmp.getSeconds()
//             );
//         case 'm':
//             return new Date(
//                 dtTmp.getFullYear(),
//                 dtTmp.getMonth() + Number,
//                 dtTmp.getDate(),
//                 dtTmp.getHours(),
//                 dtTmp.getMinutes(),
//                 dtTmp.getSeconds()
//             );
//         case 'y':
//             return new Date(
//                 dtTmp.getFullYear() + Number,
//                 dtTmp.getMonth(),
//                 dtTmp.getDate(),
//                 dtTmp.getHours(),
//                 dtTmp.getMinutes(),
//                 dtTmp.getSeconds()
//             );
//     }
// };