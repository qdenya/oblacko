$(document).ready(function () {
  const mMenuBtn = $(".header_mobile_link");
  const mMenu = $(".header_mobile_menu");

  mMenuBtn.on("click", function () {
    mMenu.toggleClass("active");
    $("body").toggleClass("no-scroll");
  });

  var swiper = new Swiper(".mySwiper", {
      effect: "coverflow",
      grabCursor: true,
      loop: true,
      autoplay: {
        delay: 5000,
      },
      centeredSlides: true,
      slidesPerView: "auto",
      coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      },
      pagination: {
        el: ".swiper-pagination",
      },
    });
    var swiper2 = new Swiper(".mySwiper2", {
      loop: true,
      autoplay: {
        delay: 5000,
      },
    });
});

