const optionMenu = document.querySelector(".select-menu"),
       selectBtn = optionMenu.querySelector(".select-btn"),
       options = optionMenu.querySelectorAll(".option"),
       sBtn_text = optionMenu.querySelector(".sBtn-text");

selectBtn.addEventListener("click", () => optionMenu.classList.toggle("active"));       

options.forEach(option => {
    option.addEventListener("click", ()=>{
        let selectedOption = option.querySelector(".option-text").innerText;
        sBtn_text.innerText = selectedOption;

        optionMenu.classList.remove("active");
    });
});

function escolhaForn(num){
    var passaValor= function()
    {
        window.location = "../detalheForn/item.html?logo="+listForn[num].logo+"&&nome="+listForn[num].nome+"&&descricao="+listForn[num].descricao+"&&aprovado="+listForn[num].aprovado;
    }
    passaValor();
}

class Fornecedor{
    constructor(logo, nome, descricao, aprovado){
        this.logo = logo;
        this.nome = nome;
        this.descricao = descricao;
        this.aprovado = aprovado;
    }
}

listForn = [];
let forn1 = new Fornecedor("titulo_green_bean", "forn 0", "desc", false);
let forn2 = new Fornecedor("titulo_expresso_repair", "forn 1", "desc1", false);
let forn3 = new Fornecedor("titulo_cafetech", "forn 2", "desc2", true);
let forn4 = new Fornecedor("titulo_heritage", "forn 3", "desc3", false);
listForn.push(forn1, forn2, forn3, forn4);
