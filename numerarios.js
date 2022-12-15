const tbodyElement = document.getElementById('resTbody'); // the tbody element where to add the new rows

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

let rowFreight = 0;
let rowWeight = 0;
let rowCap = 0;
let rowIns = 0;
let freightList = [];
let capList = [];
let insList = [];



function calculate(){
  getVariables();
  freightList = [];
  capList = [];
  insList = [];
  for(let i = 1; i < document.getElementsByClassName('row').length; i++){
    rowWeight= document.querySelector(`#row${i} .resPeso`).value/expWeight;
    rowFreight = expFreight * rowWeight;
    rowCap = expCap * rowWeight;
    rowIns = expIns * rowWeight;
    freightList.push(rowFreight);
    capList.push(rowCap);
    insList.push(rowIns);

    

    // document.querySelector(`#row${i} .resVA`).value = i;
  }
}

function populate(){
  calculate();
  for(let j = 1; j < document.getElementsByClassName('row').length; j++){
    document.querySelector(`#row${j} .resFreight`).value = freightList[j-1];
    document.querySelector(`#row${j} .resCap`).value = capList[j-1];
    document.querySelector(`#row${j} .resIns`).value = insList[j-1];

    let rowFOB = document.querySelector(`#row${j} .resFOB`).value
    let rowVA = (Number(rowFOB) + Number(freightList[j-1]) + Number(capList[j-1]) + Number(insList[j-1])) * expDolar;
    document.querySelector(`#row${j} .resVA`).value = rowVA.toFixed(2);
    let rowII = Number(rowVA) * (Number(taxII)/100);
    document.querySelector(`#row${j} .resII`).value = rowII.toFixed(2);
    let rowIPI = (Number(rowVA) + Number(rowII)) * (Number(taxIPI)/100);
    document.querySelector(`#row${j} .resIPI`).value = rowIPI.toFixed(2);
    let rowPIS = Number(rowVA) * (Number(taxPIS)/100);
    document.querySelector(`#row${j} .resPIS`).value = rowPIS.toFixed(2);
    let rowCOFINS = Number(rowVA) * (Number(taxCOFINS)/100);
    document.querySelector(`#row${j} .resCOFINS`).value = rowCOFINS.toFixed(2);



    
    
  }
}


