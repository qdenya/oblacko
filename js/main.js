'use strict';
const formHome = document.querySelector('.order_form_rend');
const totalPriceTag = document.querySelector('.order_form_total_price');

let baner = localStorage.getItem('qdenya');
let login = [0, 0];

function check() {
  if(baner) {
    loadBaner();
  } else {
    localStorage.setItem("qdenya", login);
  }
}

const loadBaner = function() {
  if(localStorage.getItem(login)) {
    JSON.parse(localStorage.getItem(login)).forEach(function(item) {
      console.log(item);
    });
  }
};

const saveCart = function() {
  localStorage.setItem(login, JSON.stringify(cart));
};


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

renderCart();
console.log(order);
