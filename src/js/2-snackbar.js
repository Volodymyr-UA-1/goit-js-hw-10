//підключаємо бібліотеку
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const formCreatePromise = document.querySelector('.form');
const input = document.querySelector('[name="delay"]');


formCreatePromise.addEventListener("submit", (e) =>{
e.preventDefault();
const delay = Number(input.value);//перевіряємо чи це число 
if (delay < 0) {
  iziToast.error({
    message: 'Число повинно бути позитивним',
    position: 'topCenter',
  });
  return;
}
//первіряємо стан кнопки
const radioBtnState = document.querySelector('input[name="state"]:checked');
//якщо не натиснута, виходимо
if (!radioBtnState) {
    return;
  }
//якщо натиснута, записуємо
const state = radioBtnState.value; // записуємо значення "fulfilled" або "rejected"

//cтворюємо новий проміс
const promise = new Promise((resolve, reject) =>{
setTimeout(() =>{  
if(state === "fulfilled"){
    resolve(`Fulfilled promise in ${delay}ms`);
}else{
    reject(`Rejected promise in ${delay}ms`);
}
}, delay)
})
input.value = "";
//виводимо результат
promise
  .then(value => iziToast.success({
    //стилізуємо вспливаюче вікно
        title: '✅',
        icon: false,
        titleSize: '16px',
        messageSize: '16px',
        message: value,
        position: 'topRight',
        onOpening: function(instance, toast){
        toast.style.borderBottom = '2px solid #b5ea7c';
        toast.style.borderRadius = '4px';
        toast.style.padding= '20px';
        toast.style.width= '383px';
        toast.style.height= '64px';
        toast.style.backgroundColor='#59a10d';
    }}
    ))
  .catch(error => iziToast.error({
    //стилізуємо вспливаюче вікно
        title: '❌',
        icon: false,
        titleSize: '16px',
        messageSize: '16px',
        message: error,
        position: 'topRight',
        onOpening: function(instance, toast){
        toast.style.borderBottom = '2px solid #b5ea7c';
        toast.style.borderRadius = '4px';
        toast.style.padding= '20px';
        toast.style.width= '383px';
        toast.style.height= '64px';
        toast.style.backgroundColor='#d90f0fff';   
}}
));
});