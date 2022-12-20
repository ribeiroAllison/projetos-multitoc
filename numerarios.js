const tbodyElement = document.getElementById('resTbody'); // the tbody element where to add the new rows

// Function to create a new row to be filled
function inserir(){
  let createRow = document.getElementById('row').cloneNode(true);
  tbodyElement.appendChild(createRow);
  createRow.id = 'row' + (document.getElementsByClassName('row').length-1);
  

}

// declaring variable inputs


//table 2 - EXPENSES

let expNCM =  0;
let expDolar = 0;
let expSIS =  0;
let expFreight = 0;
let expMar =  0;
let expCap =  0;
let expIns =  0;
let expWeight = 0;





function getVariables(){

// Getting data from user input


  //table 2 - EXPENSES

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
let nature = '';

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
let natureList = [];



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
  natureList = [];

  //iterate through row class array and extract the values encountered to a new array outside the loop, declared above
  //this way all the inputs from each row the user filled will be stored on its own array above, in order of rows IDs
  //The ID of the rows start with 1 and increase by 1 for each new created row
  //So the first row will have the id #row1, the second #row2 and so on
  //With this system the data stored in the arrays above will be located in the index i-1 in comparisson to IDs
  //For example, data from row1 will be store in correspondent arrays[0], like freightList[0] corresponds to inputs on row1
  //freightList[1] corresponds to freight input of row2 etc

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
    nature = document.querySelector(`#row${i} .resNat`).value;
    natureList.push(nature);
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
  
    totalFOB = fobList.reduce((accumulator, currentValue) =>{
      return accumulator + currentValue;
    });
  

  for(let i = 1; i < document.getElementsByClassName('row').length; i++){
    fobRatio = document.querySelector(`#row${i} .resFOB`).value/totalFOB;
    rowIns = expIns * fobRatio;
    insList.push(rowIns);
    

  }


}


function populate(){
  calculate();
  let resII = [];
  let resIPI = [];
  let resPIS = [];
  let resCOFINS = [];
  let resICMS = [];
  

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
    resII.push(rowII);

    const rowIPI = (Number(rowVA) + Number(rowII)) * (Number(IPIList[j-1])/100);
    const fixedRowIPI = new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(rowIPI);
    document.querySelector(`#row${j} .resIPI`).value = fixedRowIPI;
    resIPI.push(rowIPI);

    const rowPIS = Number(rowVA) * (Number(PISList[j-1])/100);
    const fixedRowPIS = new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(rowPIS);
    document.querySelector(`#row${j} .resPIS`).value = fixedRowPIS;
    resPIS.push(rowPIS);

    const rowCOFINS = Number(rowVA) * (Number(COFINSList[j-1])/100);
    const fixedRowCOFINS = new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(rowCOFINS);
    document.querySelector(`#row${j} .resCOFINS`).value = fixedRowCOFINS;
    resCOFINS.push(rowCOFINS);

    let ICMS;
    if(natureList[j-1] === "Isento de ICMS"){
      ICMS= 0;
    } else{
      ICMS = ((rowVA + rowII + rowIPI + rowPIS + rowCOFINS) / (1 - (Number(ICMSList[j-1])/100))) * (Number(ICMSList[j-1])/100)

    }

    const rowICMS = ICMS;
    const fixedRowICMS = new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(rowICMS);
    document.querySelector(`#row${j} .resICMS`).value = fixedRowICMS;
    resICMS.push(rowICMS);

    
  }

  const totalII = resII.reduce((accumulator, currentValue) =>{
    return accumulator + currentValue;
  });
  const totalIPI = resIPI.reduce((accumulator, currentValue) =>{
    return accumulator + currentValue;
  });
  const totalPIS = resPIS.reduce((accumulator, currentValue) =>{
    return accumulator + currentValue;
  });
  const totalCOFINS = resCOFINS.reduce((accumulator, currentValue) =>{
    return accumulator + currentValue;
  });
  const totalICMS = resICMS.reduce((accumulator, currentValue) =>{
    return accumulator + currentValue;
  });

  const totalExpenses = totalIPI + totalII + totalPIS + totalCOFINS + totalICMS + Number(expMar) + Number(expSIS);

  document.getElementById('totalII').value = totalII.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
  document.getElementById('totalIPI').value = totalIPI.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
  document.getElementById('totalPIS').value = totalPIS.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
  document.getElementById('totalCOFINS').value = totalCOFINS.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
  document.getElementById('totalICMS').value = totalICMS.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
  document.getElementById('totalMar').value = Number(expMar).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
  document.getElementById('totalSis').value = Number(expSIS).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
  document.getElementById('totalExpenses').value = totalExpenses.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
  
}

function limpar(){
  document.getElementById('totalII').value = '';
  document.getElementById('totalIPI').value = '';
  document.getElementById('totalPIS').value = '';
  document.getElementById('totalCOFINS').value = '';
  document.getElementById('totalICMS').value = '';
  document.getElementById('totalMar').value = '';
  document.getElementById('totalSis').value = '';
  document.getElementById('totalExpenses').value = '';
  document.getElementById('dolar').value = '';
  document.getElementById('sis').value = '';
  document.getElementById('freight').value = '';
  document.getElementById('mar').value = '';
  document.getElementById('cap').value = '';
  document.getElementById('ins').value = '';
  document.getElementById('weight').value = '';

  location.reload();


}


