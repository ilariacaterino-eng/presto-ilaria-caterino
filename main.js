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


const swiper = new Swiper('.swiper', {
  // Optional parameters
  direction: 'orizzontal',
  loop: true,
  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});



