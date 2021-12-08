// 1 - читаем хеш
let hash = document.location.hash;

$(document).ready(function(){
  let tabs = $('.tabs_item');
  let pages = $('.tabs_content_item');
  
  // 2 - активируем таб
  if (hash) {
    let name = hash.slice(1);
    tabActivate(name);
  }else{
    tabActivate('one');
  }

  $('.tabs_item').click(function(){
    tabActivate($(this).data('name'));
  })
  $('.header_top_menu_link').click(function(){
    tabActivate($(this).data('name'));
  })
  $('.mheader_tab_links_item').click(function(){
    tabActivate($(this).data('name'));
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
})