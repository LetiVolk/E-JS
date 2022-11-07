/* ENTREGA 4 */

/* const formulario = document.getElementById('form');
const ultimaPizza = JSON.parse(localStorage.getItem('pizza') || "[]")[0];
console.log(ultimaPizza)
if (!ultimaPizza) {
    document.getElementById('msjPizza').innerHTML =
    '<small class="msjErrorI">Hasta ahora no ha seleccionado ninguna pizza. Elija un número del 1 al 6...</small>';
}
else {
    document.getElementById('msjPizza').innerHTML =

        `
     <p>La última pizza seleccionada fue ...</p>
     <div class="msjUltPizza" >
           <h2>${ultimaPizza.nombre}</h1>
           <h4>$${ultimaPizza.precio}</h3>
           <h5>Esta pizza viene con ${ultimaPizza.ingredientes}</h4>
           <img id="myImgU" src="${ultimaPizza.imagen}" >
           </div>
               `;
}
const checkChoice = (numberInput) => {
    let valid = false;
    const choiceValue = numberInput;
    if (isEmpty(choiceValue)) {
        showError(numberInput, '<small class="msjError">Elija un número</small>');
    } else if (!NumberValid(choiceValue)) {
        showError(numberInput, '<small class="msjError">La opción es incorrecta, elija un número del 1 al 6</small>');
    } else {
        valid = true;
    }
    return valid
}

const isEmpty = (value) => value == '';

const NumberValid = (choice) => choice <= pizzas.length && choice >= 1;

const showError = (input, message) => {
    ;
    document.getElementById('msjPizza').innerHTML = message;
}

formulario.addEventListener('submit', validar);

function validar(evt) {

    evt.preventDefault();

    let numberInput = document.getElementById('choice').value;
    const isChoiceValid = checkChoice(numberInput);
    const isFormValid = isChoiceValid
    if (isFormValid) {
        const pizzaCh = pizzas.filter(pizza => pizza.id == numberInput);
        document.getElementById('msjPizza').innerHTML = pizzaCh.map(showMsj).join('');
        localStorage.setItem('pizza', JSON.stringify(pizzaCh));
    }
    formulario.reset();
}

const showMsj = (pizza) =>
    `
         <img id="myImg" src="${pizza.imagen}" >
           <h1>- ${pizza.nombre} -</h1>
           <h3>$${pizza.precio}</h3>
           <h4>Esta pizza viene con ${pizza.ingredientes}</h4>
           
    `;

 */

const url = "https://pokeapi.co/api/v2/pokemon/"
const card = document.getElementById('card_container')
const btn = document.querySelector('.btn_submit')
const input = document.getElementById('choice')
const form = document.getElementById('form');

const traerPokemon = async () => {
    try {
        const id = input.value.toLocaleLowerCase();
        const response = await fetch(url + id);
        const data = await response.json();
        console.log(data)
        const cardMsj =
            `
        <div id="card">
            <img class="poke_img" src="${data.sprites.other.home.front_default}">
            <div class="card_txt">
                <h2>${data.name}</h2>
                <div class="type">
                    <h6>TIPO:</H6>
                    <h3>${data.types[0].type.name}</h3>
                </div>
                <h5>MIDE: ${data.height / 10}mts - PESA: ${data.weight / 10}kg</h5>
                </div>
        </div>      
      `
        card.innerHTML = cardMsj
    }
    catch (error) {
        showError('<small class="msjError"><i class="fa-solid fa-face-frown"></i>  No se encontró ese Pokemón</small>');
    }
}

const isEmpty = (value) => value === '';

const showError = (message) => {
    document.getElementById('card_container').innerHTML = message;
}

const validar = (e) => {
    e.preventDefault();
    if (isEmpty(input.value)) {
        showError('<small class="msjError"><i class="fa-solid fa-triangle-exclamation"></i> Elija un número</small>');
    }
    else { traerPokemon(); }
    form.reset();
}

const init = () => {
    form.addEventListener('submit', validar)
}

init();

