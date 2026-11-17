// navbar

let navbar = document.querySelector('#navbar');
let links = document.querySelectorAll('.nav-link');
let navbarToggler = document.querySelector('.navbar-toggler');
let logo = document.querySelector('.logo');
function checkScroll(){
    navbar.classList.toggle('scrolled', window.scrollY > 0);
}

window.addEventListener('scroll', checkScroll);
checkScroll();
// navbar end


let circle = document.querySelector('.circle');
let teachers = [
    {name: 'Ugo', description: 'Docente Frontend di Hackademy 69', url: './media/ugo.jpg'},
    {name: 'Sandro', description: 'Docente Frontend e responsabile Hackademy', url: './media/gatto.jpg'},
    {name: 'Mauro', description: 'Docente Frontend e noto sex-symbol', url: './media/gatto2.jpg'},
    {name: `Giacomino guardiano delle galassie e dell'iperspazio`, description: 'Docente Backend e giocatore di ruolo', url: './media/gatto3.jpg'},
];
teachers.forEach((element)=>{
    let div = document.createElement('div');
    div.classList.add('moved');
    div.style.backgroundImage = `url(${element.url})`
    circle.appendChild(div);

})
let flipCard = document.querySelector('.flipCard');
let opener = document.querySelector('.opener');
let movedDivs = document.querySelectorAll('.moved');
let check = false;

opener.addEventListener('click', ()=>{
    if(check == false){
        opener.style.transform = `rotate(45deg)`;
        movedDivs.forEach( (element, i) =>{
            let angle = (360 * i) / movedDivs.length;
            element.style.transform = `rotate(${angle}deg) translate(125px) rotate(-${angle}deg)`;
        })
        check = true;
    }else{
        opener.style.transform = ``;
        movedDivs.forEach(element=>{
            element.style.transform = ``;
        })
        check = false;
        flipCard.classList.add('d-none');
    }
});




let fronte = document.querySelector('.fronte');
let retro = document.querySelector('.retro');
movedDivs.forEach((element, i)=>{
    element.addEventListener('click', ()=>{
        flipCard.classList.remove('d-none');
        let docente = teachers[i];
        fronte.style.backgroundImage = `url(${docente.url})`;
        retro.innerHTML = `<p class="h1">${docente.name}</p>
                            <p class="font-retro-custom">${docente.description}</p>`
    });
})

