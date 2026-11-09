// navbar
let navbar = document.querySelector('#navbar');
let links = document.querySelectorAll('.nav-link');
let logoNavbar = document.querySelector('.logo');
let navbarToggler = document.querySelector('.navbar-toggler');
window.addEventListener('scroll', ()=>{
    let scrolled = window.scrollY;
    if(scrolled > 0){
        navbar.classList.remove('bg-black');
        navbar.classList.add('bg-yellow');
        links.forEach(element => {
            element.style.color = 'var(--black)';
        });
        logoNavbar.src = 'http://127.0.0.1:5500/media/icon1.svg'
        navbarToggler.classList.add('navbar-toggler-scrolled');
    }else{
        navbar.classList.add('bg-black');
        navbar.classList.remove('bg-yellow');
        links.forEach(element => {
            element.style.color = 'var(--yellow)';
        });
        logoNavbar.src = 'http://127.0.0.1:5500/media/iconyellow.svg'
        navbarToggler.classList.remove('navbar-toggler-scrolled');
    }
});
// navbar end






fetch('./annunci.json').then((response)=> response.json()).then((data)=>{
    data.sort((a, b)=> a.price - b.price);
    let radioWrapper = document.querySelector('#radioWrapper');
    let cardWrapper = document.querySelector('#cardWrapper');
    function radioButtonCreate(){
        let categories = data.map((element)=> element.category);
        let filtered = Array.from(new Set(categories));
        console.log(filtered);
        filtered.forEach(element =>{
            let div = document.createElement('div');
            div.classList.add('form-check');
            div.innerHTML = `<input class="form-check-input" type="radio" name="categories" id="${element}">
            <label class="form-check-label" for="${element}">
            ${element}
                                    </label>`;
            radioWrapper.appendChild(div);
        })
    }
    function showCard(array){
        cardWrapper.innerHTML = '';
        array.forEach(element=>{
            let div = document.createElement('div');
            div.classList.add('card-custom');
            div.innerHTML = `<h4 class="text-center p-3" title="${element.name}">${element.name}</h4>
            <p>${element.category}</p>
            <p>${element.price} €</p>`;
            cardWrapper.appendChild(div);        
        })
    }
    radioButtonCreate();
    showCard(data);
    function filterByCategory(categoria){
        if(categoria != 'all'){
            let filteredCategory = data.filter(element => element.category === categoria);
            showCard(filteredCategory);
        }else{
            showCard(data);
        }
    }
    let radioButtons = document.querySelectorAll('.form-check-input');
    radioButtons.forEach(element =>{
        element.addEventListener('click', ()=>{
            filterByCategory(element.id);
        })
    })
    let priceInput = document.querySelector('#priceInput');
    let priceValue = document.querySelector('#priceValue');
    function setPriceInput(){
        let price = data.map( element => +element.price);
        price.sort((a, b)=> a - b);
        let maxPrice = Math.ceil(price.pop());
        priceInput.max = maxPrice;
        priceInput.value = maxPrice;
        priceValue.innerHTML = `${maxPrice} €`;
    }
    setPriceInput();
    function filterByPrice(){
        let filteredPrice = data.filter( element => +element.price <= priceInput.value);
        showCard(filteredPrice);
        
    }
    priceInput.addEventListener('input', ()=>{
        priceValue.innerHTML = `${priceInput.value} €`;
        filterByPrice();
    })
    
    let wordInput = document.querySelector('#wordInput');
    function filterByWord(parola){
        let paroleFiltrate = data.filter((element)=> element.name.toLowerCase().includes(parola.toLowerCase()));
        showCard(paroleFiltrate);
    }
    wordInput.addEventListener('input', ()=>{
        filterByWord(wordInput.value);
    })
    
    
})