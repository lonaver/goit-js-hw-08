import throttle from 'lodash.throttle';
let formData = {};
const KEY_LOCAL_STORAGE_FORM = 'feedback-form-state';

const formEl = document.querySelector('.feedback-form');
const emailInputEl = document.querySelector('.feedback-form input');
const messageInputEl = document.querySelector('.feedback-form textarea');

const getValueFromLocalStorage = () => {
  const response = localStorage.getItem(KEY_LOCAL_STORAGE_FORM);
  if (response) {
    const dataForForm = JSON.parse(response);
    if (dataForForm['email']) {
      emailInputEl.value = dataForForm['email'];
    }
    if (dataForForm['message']) {
      messageInputEl.value = dataForForm['message'];
    }
    formData = { ...dataForForm };
  }
};
getValueFromLocalStorage();

const handleClickInputForm = e => {
  if (e.target.name !== 'email' && e.target.name !== 'message') {
    return;
  }

  formData[e.target.name] = e.target.value;
  localStorage.setItem(KEY_LOCAL_STORAGE_FORM, JSON.stringify(formData));
};

const handleFormSubmit = e => {
  e.preventDefault();
  if (
    formData['email'] === '' ||
    formData['message'] === '' ||
    !formData['email'] ||
    !formData['message']
  ) {
    alert('You need fill in all fields');
    return;
  }
  console.log(formData);
  localStorage.removeItem(KEY_LOCAL_STORAGE_FORM);
  e.currentTarget.reset();
  formData = {};
};

formEl.addEventListener('input', throttle(handleClickInputForm, 500));

formEl.addEventListener('submit', handleFormSubmit);
