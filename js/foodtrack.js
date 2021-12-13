'use strict';
function setBanner() {
  let login = [0, 1];
  localStorage.setItem('qdenya', JSON.stringify(login));
}
function init() {
  const btnSbmForm = document.querySelector('.footer_right_submit');
  btnSbmForm.addEventListener('click', setBanner);
}

init();