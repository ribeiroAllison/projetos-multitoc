const tbodyElement = document.getElementById('resTbody'); // the tbody element where to add the new rows

// Function to create a new row to be filled and 
function inserir(){
  let createRow = document.getElementById('row').cloneNode(true);
  tbodyElement.appendChild(createRow);
  createRow.id = 'row' + (document.getElementsByClassName('row').length-1);
  

}

// declaring variable inputs

// table 1 - TAXES
let taxII = 0;
let taxIPI =  0;
let taxPIS =  0;
let taxCOFINS = 0;
let taxICMS = 0;


//table 2 - EXPENSES

let expNCM =  0;
let expDolar = 0;
let expSIS =  0;
let expFreight = 0;
let expMar =  0;
let expCap =  0;
let expIns =  0;
let expWeight = 0;

// table 3 - results



function getVariables(){

// Getting data from user input
  
// table 1 - TAXES 
  taxII = document.getElementById('II').value;
  taxIPI = document.getElementById('IPI').value;
  taxPIS = document.getElementById('PIS').value;
  taxCOFINS = document.getElementById('COFINS').value;
  taxICMS = document.getElementById('ICMS').value;


  //table 2 - EXPENSES

  expNCM = document.getElementById('NCM').value;
  expDolar = document.getElementById('dolar').value;
  expSIS = document.getElementById('sis').value;
  expFreight = document.getElementById('freight').value;
  expMar = document.getElementById('mar').value;
  expCap = document.getElementById('cap').value;
  expIns = document.getElementById('ins').value;
  expWeight = document.getElementById('weight').value;


}

// All expenses are rated according to the percentage ratio of the row's weight or FOB value
let rowWeight = 0;
let totalFOB = 0;
let fobRatio = 0;


// Declaring  variables to be the pushed into the array bellow
let rowFreight = 0;
let rowCap = 0;
let rowIns = 0;
let fob = 0;
let rateII = 0;
let rateIPI = 0;
let ratePIS = 0;
let rateCOFINS = 0;
let rateICMS = 0;

// Array of expense variables to receive the data when the row is created and functions bellow are called
let freightList = [];
let capList = [];
let insList = [];
let fobList = [];
let IIList = [];
let IPIList = [];
let PISList = [];
let COFINSList = [];
let ICMSList = [];



function calculate(){
  getVariables(); // gather all variables from DOM 
  freightList = []; // erase previous data from arrays (if there were any)
  capList = [];
  insList = [];
  fobList = []; 
  IIList = [];
  IPIList = [];
  PISList = [];
  COFINSList = [];
  ICMSList = [];

  for(let i = 1; i < document.getElementsByClassName('row').length; i++){
    rateII = document.querySelector(`#row${i} .rateII`).value;
    IIList.push(rateII);
    rateIPI = document.querySelector(`#row${i} .rateIPI`).value;
    IPIList.push(rateIPI);
    ratePIS = document.querySelector(`#row${i} .ratePIS`).value;
    PISList.push(ratePIS);
    rateCOFINS = document.querySelector(`#row${i} .rateCOFINS`).value;
    COFINSList.push(rateCOFINS);
    rateICMS = document.querySelector(`#row${i} .rateICMS`).value;
    ICMSList.push(rateICMS);

    

  }

  // Loop through all the rows created by user
  for(let i = 1; i < document.getElementsByClassName('row').length; i++){
    fob = document.querySelector(`#row${i} .resFOB`).value;
    fobList.push(fob);
    
    rowWeight= document.querySelector(`#row${i} .resPeso`).value/expWeight; // Define the percentage of the row weight

    //stablish final values per row
    rowFreight = expFreight * rowWeight;
    rowCap = expCap * rowWeight;
    freightList.push(rowFreight);
    capList.push(rowCap);
    


  }

  //sum up all Fob variables from DOM
  for (value of fobList){
    totalFOB += Number(value);
  };

  for(let i = 1; i < document.getElementsByClassName('row').length; i++){
    fobRatio = document.querySelector(`#row${i} .resFOB`).value/totalFOB;
    rowIns = expIns * fobRatio;
    insList.push(rowIns);
    

  }


}


function populate(){
  calculate();

  for(let j = 1; j < document.getElementsByClassName('row').length; j++){
    const fixedFreight = new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'USD'}).format(freightList[j-1]);
    document.querySelector(`#row${j} .resFreight`).value = fixedFreight;

    const fixedIns = new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'USD'}).format(insList[j-1]);
    document.querySelector(`#row${j} .resIns`).value = fixedIns;

    const rowFOB = document.querySelector(`#row${j} .resFOB`).value

    const rowVA = (Number(rowFOB) + Number(freightList[j-1]) + Number(insList[j-1])) * expDolar;
    const fixedRowVA = new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(rowVA);
    document.querySelector(`#row${j} .resVA`).value = fixedRowVA;

    const rowII = Number(rowVA) * (Number(IIList[j-1])/100);
    const fixedRowII = new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(rowII);
    document.querySelector(`#row${j} .resII`).value = fixedRowII;

    const rowIPI = (Number(rowVA) + Number(rowII)) * (Number(IPIList[j-1])/100);
    const fixedRowIPI = new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(rowIPI);
    document.querySelector(`#row${j} .resIPI`).value = fixedRowIPI;

    const rowPIS = Number(rowVA) * (Number(PISList[j-1])/100);
    const fixedRowPIS = new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(rowPIS);
    document.querySelector(`#row${j} .resPIS`).value = fixedRowPIS;
    
    const rowCOFINS = Number(rowVA) * (Number(COFINSList[j-1])/100);
    const fixedRowCOFINS = new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(rowCOFINS);
    document.querySelector(`#row${j} .resCOFINS`).value = fixedRowCOFINS;



    
    
  }
}


