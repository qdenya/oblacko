      $('.mheader_btn_close').on('click', function (e) {
          e.preventDefault();
          $('.mheader').toggleClass('mheader_active');
        });
      $('.mheader_tab_links_item').on('click', function (e) {
          e.preventDefault();
          $('.mheader').toggleClass('mheader_active');
          tabActivate($(this).data('name'));
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
    document.location.hash = '#'+name;
  }