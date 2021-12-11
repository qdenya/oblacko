'use strict';
const formHome = document.querySelector('.order_form_rend');
const totalPriceTag = document.querySelector('.order_form_total_price'); 
const btnSbm = document.querySelector('.order_form_submit');
const modal = document.querySelector('.modal');
const modalBtn = document.querySelector('.modal_item_btn');
const modalTitle = document.querySelector('.modal_item_title');
const modalText = document.querySelector('.modal_item_text');
const modalTabak1 = document.querySelector(".modal_tabak_right");
const modalTabak2 = document.querySelector(".modal_tabak_left");

let baner = localStorage.getItem('qdenya');
let login = [1, 0];

function toggleModal() {
  modal.classList.toggle("modal_visible");
}

const loadBaner = function() {
    let pars = JSON.parse(localStorage.getItem("qdenya"));
    if(pars[0] == 1) {
      modalTitle.textContent = "Просмотр данного сайта разрешён только лицам, достигшим возраста 18 лет.";
      modalText.textContent = "Нажав кнопку “Подтверждаю”, Вы подтверждаете, что Вам исполнилось 18 лет.";
      modalBtn.textContent = "Подтверждаю";
      toggleModal();
      modalBtn.addEventListener("click", function() {
        toggleModal();
        login = [0, 0];
        localStorage.setItem('qdenya', JSON.stringify(login));
      });
    }
    if(pars[1] == 1) {
      modalTitle.textContent = "Заявка отправлена";
      modalText.textContent = "Совсем скоро мы свяжемся с Вами!";
      modalBtn.textContent = "Закрыть";
      modal.style.backgroundColor = "rgba(30, 24, 21, 0.6)";
      modalTabak1.style.display = "none";
      modalTabak2.style.display = "none";
      toggleModal();
      modalBtn.addEventListener("click", function() {
        toggleModal();
        login = [0, 0];
        localStorage.setItem('qdenya', JSON.stringify(login));
      });
    }
};

function check() {
  if(baner) {
    loadBaner();
  } else {
    localStorage.setItem('qdenya', JSON.stringify(login));
    loadBaner();
  }
}

function setBanner() {
  login = [0, 1];
  localStorage.setItem('qdenya', JSON.stringify(login));
}

check();

const order = [];

const getData = async function(url) {
  const response = await fetch(url);
  if(!response.ok) {
    throw new Error(`Ошибка при загрузке данных. Код ответа: ${response.status}`);
  }
  return await response.json();
};

function renderCart() {
  formHome.textContent = '';
  let tip, chek;
  order.forEach(function({ id, name, type, price, variable, count }) {
    if(type == 'count') {
      tip = `
      <div class="order_form_item_count_con">
      <div class="order_form_item_count">
          <img src="img/icons/user/minus.svg" alt="-" class="counter-button order_form_item_count_minus" data-id=${id}>
          <span class="order_form_item_count_text">${count}</span>
          <img src="img/icons/user/plus.svg" alt="+" class="counter-button order_form_item_count_plus" data-id=${id}>
        </div>
      </div>  `;
    } else {
      tip = `<div class="order_form_item_select">`;
        for(let i=0; i<variable.length; i++) {
          if(price == variable[i][2]) {
            chek = 'checked';
          } else {
            chek = '';
          }
          tip = tip + 
          `<div class="order_form_item_select_radio_btn ">
              <input class="order_form_item_select_radio " id="radio-${id+'-'+variable[i][0]}" type="radio" name="radio${id}" value="1" `+ chek +`>
              <label class="select-button" for="radio-${id+'-'+variable[i][0]}" data-id=${id} data-price=${variable[i][2]}>${variable[i][1]}</label>
            </div>`;
        }
        tip = tip + `</div>`;
    }
    let card =  `
      <div class="order_form_item">
        <span class="order_form_item_text">${name}</span>
        <input type="hidden" name="${name}" value="${count}">
        `+ tip + `
        <span class="order_form_item_total">${price*count} BYN</span>
      </div>
    `;
    formHome.insertAdjacentHTML('afterbegin', card);
  });
  const totalPrice = order.reduce(function(result, item) { 
    return result + (parseFloat(item.price))*item.count; 
  }, 0);
  totalPriceTag.textContent = totalPrice + ' BYN';
}

function createFormHome(items) {
  let tip, count, chek;
  const { id, name, type, price, variable } = items;

  //order.push({id, name, type, price, variable, count: 0});
 
  if(type == 'count') {
    order.push({id, name, type, price, variable, count: 0});
    count = 0;
    tip = `
    <div class="order_form_item_count_con">
    <div class="order_form_item_count">
        <img src="img/icons/user/minus.svg" alt="-" class="counter-button order_form_item_count_minus" data-id=${id}>
        <span class="order_form_item_count_text">0</span>
        <img src="img/icons/user/plus.svg" alt="+" class="counter-button order_form_item_count_plus" data-id=${id}>
      </div>
    </div>  `;
  } else {
    count = 1;
    order.push({id, name, type, price, variable, count: 1});
    tip = `<div class="order_form_item_select">`;
      for(let i=0; i<variable.length; i++) {
        if(price == variable[i][2]) {
            chek = 'checked';
          } else {
            chek = '';
          }
        tip = tip + 
        `<div class="order_form_item_select_radio_btn select-button">
            <input class="order_form_item_select_radio" id="radio-${id+'-'+variable[i][0]}" type="radio" name="radio${id}" value="1" `+chek+`>
            <label for="radio-${id+'-'+variable[i][0]}" data-id=${id} data-price=${variable[i][2]}>${variable[i][1]}</label>
          </div>`;
      }
      tip = tip + `</div>`;
  }
  let card =  `
    <div class="order_form_item">
      <span class="order_form_item_text">${name}</span>
      `+ tip + `
      <span class="order_form_item_total">${price*count} BYN</span>
    </div>
  `;
  formHome.insertAdjacentHTML('afterbegin', card);
  const totalPrice = order.reduce(function(result, item) { 
    return result + (parseFloat(item.price))*item.count; 
  }, 0);
  totalPriceTag.textContent = totalPrice + ' BYN';
}

function changeCount(event) {
  const target = event.target;
  if(target.classList.contains('counter-button')) {
    let food = order.find(function(item) {
      return item.id === target.dataset.id;
    });
    if(target.classList.contains('order_form_item_count_minus')) {
      if(food.count>0) {
        food.count--;
      }
    }
    if(target.classList.contains('order_form_item_count_plus')) {
      food.count++;
    }
  }
  if(target.classList.contains('select-button')) {
    let food = order.find(function(item) {
      return item.id === target.dataset.id;
    });
    food.price = target.dataset.price;
  }
  renderCart();
}

getData('./db/formHome.json').then(function(data){
  data.forEach(createFormHome);
});

formHome.addEventListener('click', changeCount);
btnSbm.addEventListener('click', setBanner);

renderCart();
console.log(order);
