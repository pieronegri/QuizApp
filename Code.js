function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index')
    .setTitle('Quiz App')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function getFilterOptions() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('ValoriAmmessi');
  const data = sheet.getDataRange().getValues();
  
  // Leggi Tabella Materia (colonne A-B)
  const materie = [];
  let row = 0;
  
  // Scorri fino a trovare header o fine dati per tabella Materia
  while (row < data.length && data[row][0] !== '' && data[row][1] !== '') {
    const id = data[row][0];
    const title = data[row][1];
    
    // Salta header se presente (se la cella non è "ID" o simile, è un dato)
    if (title && title !== 'Title' && title !== 'Titolo') {
      materie.push(title);
    }
    row++;
  }
  
  // Leggi Tabella Argomento (colonne D-F)
  const materiaArgomentiMap = {};
  
  row = 0;
  while (row < data.length) {
    const materiaTitle = data[row][3]; // Colonna D
    const argomentoId = data[row][4]; // Colonna E
    const argomentoTitle = data[row][5]; // Colonna F
    
    if (!materiaTitle || !argomentoTitle) {
      row++;
      continue;
    }
    
    // Salta header
    if (materiaTitle === 'MateriaTitle' || argomentoTitle === 'Title') {
      row++;
      continue;
    }
    
    // Crea mappa se non esiste
    if (!materiaArgomentiMap[materiaTitle]) {
      materiaArgomentiMap[materiaTitle] = [];
    }
    
    // Aggiungi argomento se non è già presente
    if (!materiaArgomentiMap[materiaTitle].includes(argomentoTitle)) {
      materiaArgomentiMap[materiaTitle].push(argomentoTitle);
    }
    
    row++;
  }
  
  // Ordina argomenti per materia
  Object.keys(materiaArgomentiMap).forEach(materia => {
    materiaArgomentiMap[materia].sort();
  });
  
  return {
    materie: materie.sort(),
    materiaArgomentiMap: materiaArgomentiMap
  };
}

function getRandomQuestion(materia, argomento) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('Domande');
  const data = sheet.getDataRange().getValues();
  
  // Rimuovi header
  data.shift();
  
  // Filtra domande
  const filtered = data.filter(row => {
    const materiaMatch = !materia || row[1] === materia;
    
    let argomentoMatch = !argomento;
    
    if (argomento && row[2]) {
      const argomentiCella = row[2].toString().split(',').map(a => a.trim());
      argomentoMatch = argomentiCella.includes(argomento);
    }
    
    return materiaMatch && argomentoMatch;
  });
  
  if (filtered.length === 0) {
    return null;
  }
  
  // Seleziona random
  const random = filtered[Math.floor(Math.random() * filtered.length)];
  
  return {
    id: random[0],
    materia: random[1],
    argomento: random[2],
    domanda: random[3],
    feedback: random[4]
  };
}

function getUserEmail() {
  return Session.getActiveUser().getEmail();
}