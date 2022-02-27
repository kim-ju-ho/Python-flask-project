// (function($){
//     $.ajaxSetup({ cache: false });
//     $.ajaxUtil = {
//         // Ajax default (타입 json)
//         // return true, false, data
//         // $.ajaxUtil.ajaxDefault(url, param)
//         ajaxDefault: function (url, param) {
//             var isResult = true;
//
//             $.ajax({
//                 url: url,
//                 data: param,
//                 type: 'post',
//                 dataType: 'json',
//                 async: false,
//                 success: function (data) {
//                     if (data == 'true') {
//                         isResult = true;
//                     } else if (data == 'false') {
//                         isResult = false;
//                     }
//                     else {
//                         isResult = data;
//                     }
//                 }, error: function (request, status, error) {
//                     // error 처리(권한)
//                     if (request.status == '401' || request.status == '403') {
//                         // MSG : 권한이 없거나 세션이 만료되었습니다.
//                         alert(MSG_COMM_E016);
//                     }
//                     else {
//                         // MSG : 시스템 오류가 발생하였습니다.
//                         alert(MSG_COMM_1002);
//                     }
//                     isResult = 'syserr';
//                 }
//             });
//
//             return isResult;
//         }
// })