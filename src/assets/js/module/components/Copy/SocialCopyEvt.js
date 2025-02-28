// const socialCopyEvt = (th) => {
//   // 카카오톡 공유 스크립트
//   // https://t1.kakaocdn.net/kakao_js_sdk/2.2.0/kakao.min.js
//
//   shareAct(th.data('social'), window.location, th.data('socialtxt'));
//
//   function shareAct(a,url,text){
//     let snsCode = a;
//     let cUrl = url;
//     let isOpen = false;
//
//     switch(snsCode){
//       case"kakao":
//         // 카카오톡
//         Kakao.Share.sendScrap({
//           requestUrl: url
//         });
//         break;
//       case"twitter":
//         //트위터
//         cUrl = "https://twitter.com/intent/tweet?text="+text+":&url="+cUrl;
//         isOpen = true;
//         break;
//       case"facebook":
//         //페이스북
//         cUrl = "http://www.facebook.com/sharer/sharer.php?u="+cUrl;
//         isOpen = true;
//         break;
//       case"naver-blog":
//         cUrl = "http://blog.naver.com/openapi/share?url="+cUrl+"&title="+text;
//         isOpen = true;
//         break;
//     }
//
//     if(isOpen) window.open(cUrl,'','width=600,height=300,top=100,left=100,scrollbars=yes');
//   }
// }
// export default socialCopyEvt;