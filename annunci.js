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


fetch('./annunci.json')
    .then((response) => response.json())
    .then((data) => {
        data.sort((a, b) => a.price - b.price);
        
        let radioWrapper = document.querySelector('#radioWrapper');
        let cardWrapper = document.querySelector('#cardWrapper');
        let priceInput = document.querySelector('#priceInput');
        let priceValue = document.querySelector('#priceValue');
        let wordInput = document.querySelector('#wordInput');

        
        function radioButtonCreate() {
            let categories = data.map((element) => element.category);
            let filtered = Array.from(new Set(categories));
            
            filtered.forEach((element) => {
                let div = document.createElement('div');
                div.classList.add('form-check');
                div.innerHTML = `<input class="form-check-input" type="radio" name="categories" id="${element}">
                <label class="form-check-label" for="${element}">
                ${element}
                </label>`;
                radioWrapper.appendChild(div);
            });
        }

        
        function showCard(array) {
            cardWrapper.innerHTML = '';
            if (array.length === 0) {
                cardWrapper.innerHTML = `<p class="text-center w-150">Nessun annuncio trovato</p>`;
                return;
            }
            array.forEach((element) => {
                let div = document.createElement('div');
                div.classList.add('card-custom');
                div.innerHTML = `<h4 class="text-center p-3" title="${element.name}">${element.name}</h4>
                <p>${element.category}</p>
                <p>${element.price} €</p>`;
                cardWrapper.appendChild(div);        
            });
        }

        radioButtonCreate();
        showCard(data);

        let radioButtons = document.querySelectorAll('.form-check-input');

        radioButtons.forEach((element) => {
            element.addEventListener('click', () => {
                globalFilter();
            });
        });

        
        function filterByCategory(array) {
            let selectedRadio = Array.from(radioButtons).find((el) => el.checked);
            let categoria = selectedRadio ? selectedRadio.id : 'all';

            if (categoria !== 'all') {
                return array.filter((element) => element.category === categoria);
            } else {
                return array;
            }
        }

        function setPriceInput(array) {
            let prices = array.map((element) => +element.price);
            if (prices.length > 0) {
                prices.sort((a, b) => a - b);
                let maxPrice = Math.ceil(prices[prices.length - 1]);
                
                priceInput.max = maxPrice;
                
                
                if (+priceInput.value > maxPrice) {
                    priceInput.value = maxPrice;
                }
                priceValue.innerHTML = `${priceInput.value} €`;
            } else {
                priceInput.max = 0;
                priceInput.value = 0;
                priceValue.innerHTML = `0 €`;
            }
        }

        setPriceInput(data);
        function filterByPrice(array) {
            return array.filter((element) => +element.price <= priceInput.value);
        }

        priceInput.addEventListener('input', () => {
            priceValue.innerHTML = `${priceInput.value} €`;
            globalFilter();
        });
        
        function filterByWord(array) {
            return array.filter((element) => 
                element.name.toLowerCase().includes(wordInput.value.toLowerCase())
            );
        }

        wordInput.addEventListener('input', () => {
            globalFilter();
        });

        function globalFilter() {
            let filteredByCategory = filterByCategory(data);
            setPriceInput(filteredByCategory);
            let filteredByPrice = filterByPrice(filteredByCategory);
            let filteredByWord = filterByWord(filteredByPrice);
            showCard(filteredByWord);
        }
    });