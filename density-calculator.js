//declare variables
let metal;
let diametro = 0;
let qtdFios = 0;
let metragem = 0;
let pesoEspecifico = 0;

 //declaring constants
const cuMm2 = 8.90207909993193;
const ccaMm2 = 2.89892771094733;
const steelMm2 = 7.86324890713395;
const pi = Math.PI;


//read data from HTML and apply to proper variables
function getVariables(){
    diametro = document.getElementById('diameter').value;
    qtdFios = document.getElementById('wires').value;
    metragem = document.getElementById('metro').value;
    function getMetal(){
        let metalArray = document.getElementsByClassName('radio');
        for(option of metalArray){
            if (option.checked){
                metal = option.value

            }
        }
    }
    getMetal();
}

//calculate specific weight depending on the metal type
function calculaEspec(){
    let area = pi * ((diametro/2)**2);
    switch(metal){
        
        case('cca'): 
        pesoEspecifico= area * ccaMm2;
        break;

        case('cu'):
        pesoEspecifico= area * cuMm2;
        break;

        case('ccs'):
        pesoEspecifico= area * steelMm2;
        break;

        
    }
    return document.getElementById('espec').value = `${pesoEspecifico.toFixed(4)} Kg/Km (um fio)` ;
}

//reset variables
function limpar(){
    document.getElementById('diameter').value = '';
    document.getElementById('wires').value = '';
    document.getElementById('metro').value = '';
    document.getElementById('espec').value = '';
    document.getElementById('pesoCabo').value = '';
    function clearMetal(){
        let metalArray = document.getElementsByClassName('radio');
        for(option of metalArray){
            option.checked = false;
        }
    }
    clearMetal();
    diametro = 0;
    qtdFios = 0;
    metragem = 0;
    metal = "";


}

//DOM event to call limpar() function
document.getElementById('erase').addEventListener('click', limpar);



//calculate the total metal weight in the cable
const pesoRolo = () => {
    let peso = (pesoEspecifico * qtdFios * metragem)/1000;
    document.getElementById('pesoCabo').value = `${peso.toFixed(4)} Kg por rolo`;
} 




