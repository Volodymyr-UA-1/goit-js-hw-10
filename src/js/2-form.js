let formData = {
    email: "", 
    message: "",
}

const localStorageKey = "feedback-form-state";
const form = document.querySelector('.feedback-form');

form.addEventListener("input", (evt) => {
 formData[evt.target.name] = evt.target.value.trim();
  localStorage.setItem(localStorageKey, JSON.stringify(formData));
});

const dataSavedStorage = localStorage.getItem(localStorageKey);
if (dataSavedStorage) {
  try {
    formData = JSON.parse(dataSavedStorage);
    form.elements.email.value = formData.email || "";
    form.elements.message.value = formData.message || "";
  } catch (error) {
    console.warn("Error parsing saved form data:", error);
  }
}


form.addEventListener("submit", (evt) =>{
  evt.preventDefault();
  if (formData.email === "" || formData.message === "") {
    alert("Fill please all fields");
    return;
}
console.log(formData);
localStorage.removeItem(localStorageKey);
formData.email = ""; 
formData.message = "";
form.reset();
});



