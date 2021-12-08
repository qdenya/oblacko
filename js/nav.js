$(document).ready(function(){
  let tabs = $('.tabs_item');
  let pages = $('.tabs_content_item');

  tabActivate('one');
  
  
  $('.mheader_btn_close').on('click', function (e) {
      e.preventDefault();
      $('.mheader').toggleClass('mheader_active');
    });
  $('.m-link').on('click', function (e) {
      $('a[href^="#"]').click(function(){ // #1
        let anchor = $(this).attr('href');  // #2
        $('html, body').animate({           // #3
        scrollTop:  $(anchor).offset().top  // #4
        }, 600);                            // #5
      });
      document.location.hash = '#content';
      tabActivate($(this).data('name'));
      $('.mheader').toggleClass('mheader_active');
      e.preventDefault();
    });
  $('.mheader_btn_open').on('click', function (e) {
      e.preventDefault();
      $('.mheader').toggleClass('mheader_active');
    })  

  function tabActivate(name){
    tabs.each(function(ind, tab){
      if($(tab).data('name') == name){
        $(tab).addClass('tabs_item_active');
      }else{
        $(tab).removeClass('tabs_item_active');
      }
    });
    pages.each(function(ind, page){
      $(page).hide();
    });
    $('.page_'+name).show();

    // 3 - обновляем хеш
    document.location.hash = '#content';
  }
})  