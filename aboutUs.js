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

let opener = document.querySelector('.opener');
let circle = document.querySelector('.circle');
let teachers = [
    {name: 'Ugo', description: 'Docente Frontend di Hackademy 69', url: './media/ugo.jpg'},
    {name: 'Sandro', description: 'Docente Frontend e responsabile Hackademy', url: './media/gatto.jpg'},
    {name: 'Mauro', description: 'Docente Frontend e noto sex symbol', url: './media/gatto2.jpg'},
    {name: `Giacomino guardiano delle galassie e dell'iperspazio`, description: 'Docente Backend e giocatore di ruolo', url: './media/gatto3.jpg'},
];
teachers.forEach( element =>{
    let div = document.createElement('div');
    div.classList.add('moved');
    div.style.backgroundImage = `url(${element.url})`;
    circle.appendChild(div);
})

let flipCard = document.querySelector('.flip-card');
let movedDivs = document.querySelectorAll('.moved');
let check = false;
opener.addEventListener('click', ()=>{
    if(check == false){
        opener.style.transform = `rotate(45deg)`;
        movedDivs.forEach((element, i) => {
            let angles = (360 * i) / movedDivs.length;
            element.style.transform = `rotate(${angles}deg) translate(150px) rotate(-${angles}deg)`;
        })
        check = true;
    }else{
        check = false;
        opener.style.transform = ``;
        movedDivs.forEach((element, i) => {
            element.style.transform = ``;
        })  
        flipCard.classList.add('d-none');
    }
})
let fronte = document.querySelector('.fronte');
let retro = document.querySelector('.retro');
movedDivs.forEach((element, i) =>{
    element.addEventListener('click', ()=>{
        flipCard.classList.remove('d-none');
        let docente = teachers[i];
        fronte.style.backgroundImage = `url(${docente.url})`
        retro.innerHTML = `<p class="h4">${docente.name}</p>
                            <p class="lead">${docente.description}</p>`
    })
})
