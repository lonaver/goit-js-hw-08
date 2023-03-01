import throttle from 'lodash.throttle';
let formData = {};
const KEY_LOCAL_STORAGE_FORM = 'feedback-form-state';

const formEl = document.querySelector('.feedback-form');
const emailInputEl = document.querySelector('.feedback-form input');
const messageInputEl = document.querySelector('.feedback-form textarea');
const btnSubmitEl = document.querySelector('button');

const response = localStorage.getItem(KEY_LOCAL_STORAGE_FORM);
if (response) {
  const dataForForm = JSON.parse(response);
  emailInputEl.value = dataForForm['email'];
  messageInputEl.value = dataForForm['message'];
  formData = { ...dataForForm };
}

const handleClickInputForm = e => {
  if (e.target.name !== 'email' && e.target.name !== 'message') {
    return;
  }

  formData[e.target.name] = e.target.value;
  localStorage.setItem(KEY_LOCAL_STORAGE_FORM, JSON.stringify(formData));
};

const handleFormSubmit = e => {
  e.preventDefault();
  console.log(JSON.stringify(formData));
  localStorage.removeItem(KEY_LOCAL_STORAGE_FORM);
  e.currentTarget.reset();
};

formEl.addEventListener('input', throttle(handleClickInputForm, 500));

formEl.addEventListener('submit', handleFormSubmit);
