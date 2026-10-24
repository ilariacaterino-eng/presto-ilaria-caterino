let navbar = document.querySelector('#navbar');
let links = document.querySelectorAll('.nav-link');
let logoNavbar = document.querySelector('.logo');
let navbarToggler = document.querySelector('.navbar-toggler');
let firstNumber = document.querySelector('#firstNumber');
let secondNumber = document.querySelector('#secondNumber');
let thirdNumber = document.querySelector('#thirdNumber');


console.log(navbarToggler);


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
function createInterval(n, element, time){
    counter = 0;
    let interval = setInterval(()=>{
        if(counter < n){
            counter ++
            element.innerHTML = counter;
        }else{
            clearInterval(interval);
        }
    }, time);
    setTimeout(()=>{
        check = true;
    }, 8000);
}
let check = true;
let observer = new IntersectionObserver((entries)=>{
    entries.forEach(element =>{
        if(element.isIntersecting && check == true){
            createInterval(100, firstNumber, 100);
            createInterval(200, secondNumber, 50);
            createInterval(300, thirdNumber, 20);
            check = false;
        }
    })
});
observer.observe(firstNumber);

let reviews = [
    {name: 'Pippo', title: 'buono ma...', description: 'ho ordinato un cartonato di Albano ma da quando è entrato in casa mi spariscono i taralli', vote: 4},
    {name: 'Ugo', title: 'brutto', description: 'questo sito è cosi brutto che neanche i sofficini gli sorridono', vote: 1},
    {name: 'Calogero', title: 'meh', description: 'dà pot ji', vote: 3},
    {name: 'Kevin Agatino Pio', title: 'ottimo consigliatissimo', description: 'piu che buono il materiale mia moglie li a conprati per andare in palestra e finalmente l istruttore la notata e sono scappati inzieme.. poveraccio ancora non sa cosa gli haspetta e grazzie ha questi magici pantaloni sono libbero', vote: 5},
];

let swiperWrapper = document.querySelector('.swiper-wrapper');
reviews.forEach(element =>{
    let div = document.createElement('div');
    div.classList.add('swiper-slide');
    div.innerHTML = `<div class="swiper-slide">
              <div class="card-review">
                <p class="text-center mt-2">${element.name}</p>
                <p class="lead text-center">${element.title}</p>
                <p class="text-center m-3">${element.description}</p>
                <div class="d-flex justify-content-center star">
                  
                </div>
              </div>
            </div>`;
    swiperWrapper.appendChild(div);
})
let divStar = document.querySelectorAll('.star');
divStar.forEach((element, index) =>{
    for(let i = 1; i <= reviews[index].vote; i++){
        let icon = document.createElement('i');
        icon.classList.add('fa-solid', 'fa-star');
        element.appendChild(icon);
    };
    let difference = 5 - reviews[index].vote;
    for(let i = 1; i <= difference; i++){
        let icon = document.createElement('i');
        icon.classList.add('fa-regular', 'fa-star');
        element.appendChild(icon);
    };
    
});


const swiper = new Swiper('.swiper1', {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    coverflowEffect: {
        rotate: 50,
        stretch: 20,
        depth: 90,
        modifier: 1,
        slideShadows: false,
    },
    pagination: {
        el: '.swiper-pagination',
    },
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});



