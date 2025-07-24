// Base JavaScript Document
// 대표,부가사이트 포함 전체 공통 스크립트

/*-----------------------------------------------------------------*/
// SNB
/*-----------------------------------------------------------------*/
//<![CDATA[
$(function() {

	// Default
	$("#side .snb>li > ul").prev("a").append("<span class='unfd'> 펼치기</span>"); // 폴딩 아이콘 펼치기
	$("#side .snb>li > ul").prev("a.on").find(".unfd").text(" 접기"); // 폴딩 아이콘 접기

	$("#side .snb a[target='_blank']").append("<span class='blank'> 새창</span>"); // 새창 아이콘 활성
	$("#side .snb a.on").parent("li").addClass("open"); // 메뉴 활성화

	// 토글처리

	$("#side .snb>li > ul").prev("a").click(function() {

		// 다른 메뉴 닫기
		$(this).parent().siblings().find(">a").removeClass("on").end().removeClass("open");

		// 현재 메뉴 토글
		$(this).toggleClass("on");
		$(this).parent("li:first").toggleClass("open");
		$("#side .snb li > ul").prev("a").find(".unfd").text(" 펼치기"); // 폴딩 아이콘 펼치기
		$("#side .snb li.open > ul").prev("a").find(".unfd").text(" 접기"); // 폴딩 아이콘 접기

		return false;

	});

});
//]]>

/*-----------------------------------------------------------------*/
// LNB
/*-----------------------------------------------------------------*/
//<![CDATA[
$(function() {

	$("#lnb.nav a").next("div").hide(); // 모두 접기
	//$("#lnb.nav li > div").prev("a").append("<span class='unfd'>메뉴 펼치기</span>"); // 폴딩 아이콘 처리
	//$("#lnb.nav li > div").prev("a.on").find(".unfd").text("메뉴 접기"); // 폴딩 아이콘 처리
	//$("#lnb.nav a[target='_blank']").append("<span class='blank'>새창</span>"); // 메뉴 새창 아이콘 처리

	//$("#lnb.nav a.on").next("ul").show(); // on 보이기
	//$("#lnb.nav a.on").parents('li').find('div').show(); // on 보이기


	// 토글처리
	$("#lnb.nav li > div").prev("a").click(function() {
		$(this).toggleClass("on");
		$(this).next("div").toggle();
		//$(this).find(".unfd").text("메뉴 펼치기");
		//$("#lnb.nav li > div").prev("a.open").find(".unfd").text("메뉴 접기");

		// 다른 메뉴 닫기
		$(this).parent().siblings().find("a").removeClass("on").end().find("div").hide();

		return false;
	});

});
//]]>


/*-----------------------------------------------------------------*/
// Select Menu
/*-----------------------------------------------------------------*/
$(function(){
	//  CSS셀렉트
	var CSSSELECT = (function(){

		var $baseSelect = $(".cssSelect");
		var $buttonSelect = $baseSelect.find("button");
		var $boxSelect = $baseSelect.find(".lst");
		var $sltRelated_a = $boxSelect.find(">li>a");

		$buttonSelect.attr("title","축소됨");

		$buttonSelect.on("click", function(e) {
			//e.preventDefault();
			e.stopPropagation(); // 버블링 차단

			var $this = $(this),
				$top = $this.closest(".cssSelect");
			if($top.hasClass("on")){
				$top.removeClass("on");
				$this.attr("title","축소됨");
			} else {
				$baseSelect.removeClass("on");
				$top.addClass("on");
				$buttonSelect.attr("title","축소됨");
				$this.attr("title","확장됨");
			};
		});

		$(document).on("click.cssSelectClose", function(e){
			if($baseSelect.hasClass("on")){ // cssSelect on일때
				if(!$baseSelect.has(e.target).length){ // cssSelect에 클릭 이벤트가 발생되어 있는게 없다면
					$baseSelect.removeClass("on");
					$buttonSelect.attr("title","축소됨");
				}
			}
		});

	})();
});

/*-----------------------------------------------------------------*/
// Input Label showhide
/*-----------------------------------------------------------------*/
$(document).ready(function(){
	$(".inpLabelBox input").focus(function() {
		$(this).parents(".inpLabelBox").find("label").hide();
	});
	$(".inpLabelBox input").blur(function() {
		if ($(this).val()) {
			$(this).parents(".inpLabelBox").find("label").hide();
		} else {
			$(this).parents(".inpLabelBox").find("label").show();
		}
	});
	$(".inpLabelBox input").trigger("blur");
});


/*-----------------------------------------------------------------*/
// Main TabMenu
/*-----------------------------------------------------------------*/
$(function(){
	var tab = $('.cont_main .tab_mn');
	tab.find(">li:first-child").addClass('active');
	tab.find(">li>div").closest("li").find(">a").attr("title", "비활성");
	tab.find(">li.active>div").closest("li").find(">a").attr("title", "활성");
	function onSelectTab(e){
		e.preventDefault();
		var t = $(this);
		var myclass = t.parents('li:first').attr('class');
		var aLink = $(this).next("div").length;
		if ($(this).next("div").length ==  "0") {
			window.open(this.href);
		} else {
			t.parents('.tab_mn:first').attr('class','tab_mn '+myclass);
			t.closest("li").siblings("li").removeClass("active").end().addClass("active");
			t.closest("li").siblings("li").find(">a").attr("title", "비활성");
			t.attr("title", "활성");
		}
	}
	tab.find('>li>a').click(onSelectTab);
});


/*-----------------------------------------------------------------*/
// Content TabMenu
/*-----------------------------------------------------------------*/
$(function(){
	var contTab = $('.cont_body .tab_mn');
	function onSelectContTab(e){
		e.preventDefault();
		var t = $(this);
		var myclass = t.parents('li:first').attr('class');
		contTab.find('>ul>li>a').removeClass('on');
		t.addClass('on');
		t.parents('.tab_mn:first').attr('class','tab_mn '+myclass);
	}
	contTab.find('>ul>li>a').click(onSelectContTab);
});

/*-----------------------------------------------------------------*/
//관련사진
/*-----------------------------------------------------------------*/
$(function(){

	try{
		// 썸네일 리스트 복제
		cloneTourGallery = $('.tourGallery .lst').clone().appendTo("body");
		cloneTourGallery.wrap("<div id='lightbox'><div class='lb-container'></div></div>");
		$("#lightbox .lst li a img").unwrap();
		$("#lightbox").before("<div id='lightboxOverlay'></div>");
		$("#lightbox .lb-container").append("<button class='btn-close'>레이어 닫기</button>");

		// 레이어 팝업 슬라이드
		var lbTourGallery = $('#lightbox .lst').bxSlider({
			mode: 'fade',
			slideZIndex: 20,
			auto: true,
			autoHover: true,
			autoStart: false,
			pager: false,
			adaptiveHeight: true
		});
		// Show
		$('a.lightbox').on("click", function(e){
			e.preventDefault();
			$("#lightboxOverlay").fadeIn("slow");
			var top  = $(window).scrollTop() + 50;
			$("#lightbox").css({
				top: top + 'px'
			}).fadeIn("slow");
			lightboxItem = $(this).parent("li").index();
			// Reload slider
			lbTourGallery.reloadSlider({
				mode: 'fade',
				slideZIndex: 20,
				startSlide: lightboxItem,
				auto: true,
				autoHover: true,
				autoStart: false,
				pager: false,
				adaptiveHeight: true
			});
			//$("#lightbox .lst li").eq(lightboxItem).find("a").focus(); // 레이어로 포커스
			$("#lightbox .bx-prev").focus();
		});
		// Hide
		$("body").on("click", "#lightbox .btn-close, #lightboxOverlay", function(e){
			e.preventDefault();
			$("#lightboxOverlay").fadeOut("slow");
			$("#lightbox").fadeOut("slow");
			$(".tourGallery .lst li").eq(lightboxItem).find("a").focus(); // 리스트로 포커스
		});

		// 썸네일 슬라이드
		var tourGallery = $('.tourGallery .lst').bxSlider({
			//mode: 'fade',
			slideZIndex: 20,
			minSlides:1,
			maxSlides: 5,
			moveSlides: 1,
			slideWidth: 167,
			slideMargin: 5,
			auto: true,
			autoHover: true,
			autoControls: true,
			infiniteLoop:false,
			//controls: false,
			//autoStart: false,
			pager: false,
			responsive:true
		});
		$('.tourGallery .lst li a').on("hover focus", function(){
			$('.tourGallery .lst li').removeClass("on");
			$(this).parent().addClass("on");
		});
		$('.tourGallery .lst li a').mouseleave(function(){
			$(this).parent().removeClass("on");
		});
		$('*').not($('.tourGallery .lst li a')).focus(function(){
			$(this).parent().removeClass("on");
		});
	} catch(e) {

	}
});

/*-----------------------------------------------------------------*/
//SNS 공유
/*-----------------------------------------------------------------*/
$(function(){
	if(!($(".btn_twitter") == null || $(".btn_twitter") =="")){
		$(".btn_twitter").attr("onClick","window.open('http://twitter.com/intent/tweet?text="+ encodeURI(document.title)+"&url="+document.location+"','win','width=640,height=480,toolbar=0,scrollbars=0,resizable=0')" );
	}
	if(!($(".btn_facebook") == null || $(".btn_facebook") =="")){
		$(".btn_facebook").attr("onClick","window.open('http://facebook.com/sharer.php?u="+document.location+"','win','width=640,height=480,toolbar=0,scrollbars=0,resizable=0')" );
	}
});

/*-----------------------------------------------------------------*/
// 글자크기 조절
/*-----------------------------------------------------------------*/
(function($) {
 $.fn.browserZoom = function(options) {
	 var defaults = {
   /*
   curr:81.3,
   rate:6.25,
   max:105,
   min:75
   */
   curr:$('body').css('font-size'),
   rate:1,
   max:parseInt($('body').css('font-size'))+2,
   min:parseInt($('body').css('font-size'))-2
  };

  this.each(function() {
   var obj = $(this);
   var o = $.extend(defaults, options);
   if( o.curr==null ) {
    o.curr=curr;
   }

   zoom();
   $('.btn_zin',obj).click(function() {
    o.curr = parseInt(o.curr) + parseInt(o.rate);

    //console.log(o.max);

    if( o.curr>o.max ) {
     o.curr = o.max;
    }
    zoom();
   });
   $('.btn_zout',obj).click(function() {
    o.curr = parseInt(o.curr) - parseInt(o.rate);
    if( o.curr<o.min ) {
     o.curr = o.min;
    }
    zoom();
   });

   function zoom() {
    try {
     $('body').css('fontSize', o.curr);
    } catch(e) {
    	out.println("base 파일 에러 발생");
     // nothing
     // alert( e );
    }
   }
	 
	 $('.btn_fw_bold',obj).click(function() {
    	$('.cont_body').css('font-weight', 'bold');
   });
	  $('.btn_fw_normal',obj).click(function() {
    	$('.cont_body').css('font-weight', 'normal');
   });

  });
 };
})(jQuery);

$(document).ready(function(){
 try {
  $(document).browserZoom();

 } catch(e) {
  //alert(e)
 }
});

/*-----------------------------------------------------------------*/
//Skip Top
/*-----------------------------------------------------------------*/
$(function(){
	$(".skip_top a").on('click', function(event) {
		if (this.hash !== "") {
		 event.preventDefault();

		 var hash = this.hash;

		 $('html, body').animate({
		   scrollTop: $(hash).offset().top
		 }, 400, function(){
		   window.location.hash = hash;
		 });
		} // End if
	});
});


/*-----------------------------------------------------------------*/
//문서뷰어 프리뷰
/*-----------------------------------------------------------------*/
function filePreviewDirect(url){
	//일반적인 미리보기
	//window.open("<c:url value='/filePreview.do?atchFileId="+atchFileId+"&fileSn="+fileSn+"'/>");

	//대구시 미리보기 API 링크타입
	//alert(document.domain)
	var text = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	for( var i=0; i < 5; i++ )
		text += possible.charAt(Math.floor(Math.random() * possible.length));

	// filePath 전체 경로를 인코딩해서 전달 20230428 LMS
	url = "http://"+document.domain+"/"+url;
	url=encodeURIComponent(url);
	//openurl = "http://152.99.22.79:8080/SynapDocViewServer/job?fid="+text+"&filePath=http://"+document.domain+"/"+url+"&convertType=0&fileType=URL";
	openurl = "https://dviewer.daegu.go.kr:8443/SynapDocViewServer/job?fid="+text+"&filePath="+url+"&convertType=0&fileType=URL";
	//alert(openurl);
	window.open(openurl);

}

function fileDirectDownload(fileStreCours,fileNm){
	if(fileStreCours == '' || fileNm ==''){
		alert('파일 링크가 잘못되었습니다.');
		return;
	}

	fileNm = encodeURIComponent(fileNm);
	hostname=window.location.hostname;
	//window.location.href="https://"+hostname+"/icms/FileDirectDownload.do?fileStreCours="+fileStreCours+"&fileNm="+fileNm;
	window.location.href="/icms/FileDirectDownload.do?fileStreCours="+fileStreCours+"&fileNm="+fileNm;
}

function fileDirectDownloadWindowOpen(fileStreCours,fileNm){
	if(fileStreCours == '' || fileNm ==''){
		alert('파일 링크가 잘못되었습니다.');
		return;
	}

	fileNm = encodeURIComponent(fileNm);
	window.open("/icms/FileDirectDownload.do?fileStreCours="+fileStreCours+"&fileNm="+fileNm);
}


//클립보드 복사
function is_ie() {
	  if(navigator.userAgent.toLowerCase().indexOf("chrome") != -1) return false;
	  if(navigator.userAgent.toLowerCase().indexOf("msie") != -1) return true;
	  if(navigator.userAgent.toLowerCase().indexOf("windows nt") != -1) return true;
	  return false;
	}

	function copy_to_clipboard() {
	  if( is_ie() ) {
	    window.clipboardData.setData("Text", window.location.href);
	    alert("복사되었습니다.");
	    return;
	  }
	  prompt("Ctrl+C를 눌러 복사하세요.", window.location.href);
	}

function go_login(menu_id){
	var ref = window.location.href;
	//alert(ref);
	window.location.href='/icms/login/IcmsLoginUsr.do';
}
