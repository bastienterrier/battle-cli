(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const map = require('../src/config/map.json')
const mapCode = require('../src/config/map_code.json')

let selectedCode = 0

const currentMap = [];

const copyToClipboard = (data) => {
  const el = document.createElement('textarea');
  el.value = JSON.stringify(data);
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
};

function reverseCodeClass(codeClass){
  const _codeClass = codeClass.replace('code-', '')
  for(const code in mapCode){
    if(mapCode[code].toLowerCase() === _codeClass){
      return parseInt(code)
    }
  }
  return -1
}

function getCodeClass(code){
  return 'code-' + mapCode[code].toLowerCase()
}

function findCodeClass(elt){
  return Array.from(elt.classList).find(className => className.indexOf('code-') > -1 )
}

function findArrayPosition(elt){
  const position = Array.from(elt.classList).find(className => className.indexOf('cell_') > -1 )

  const [, i, j] = position.split('_')
  return [i, j]
}

function addRowAfter(row, i){
  if(!row){
    const rowSize = currentMap[0].length
    row = new Array(rowSize).fill(selectedCode)
    console.log(row)
  }

  const mapTable = document.getElementById('map')

  // add new row to currentMap
  currentMap[i] = []

  const _row = document.createElement('tr')
  _row.classList.add('row_'+i)

  mapTable.appendChild(_row)

  row.forEach((column, j) => {
    // add new column to currentMap
    currentMap[i][j] = -1; 

    const _cell = document.createElement('td')
    _cell.classList.add('cell', 'column_'+j, 'cell_'+i+'_'+j)
    _cell.classList.add(getCodeClass(column))

    _cell.addEventListener('click', (event) => {
      const clickedElement = event.target || event.srcElement;
      const codeClass = findCodeClass(clickedElement)
      clickedElement.classList.remove(codeClass)
      clickedElement.classList.add(getCodeClass(selectedCode))
    } )
    
    _row.appendChild(_cell)
  })
}

function displayMap() {

  map.forEach((row, i) => {

    addRowAfter( row, i)
    
  });
}

function displayCodes(){
  const codesContainer = document.getElementById('codes-container')

  for(const code in mapCode){
    const codeElt = document.createElement('div')
    codeElt.classList.add('code', getCodeClass(code))
    codeElt.title = mapCode[code]

    codeElt.addEventListener('click', () => {
      const allCodes = document.getElementsByClassName('code')
      Array.from(allCodes).map(code => code.classList.remove('selected'))

      codeElt.classList.add('selected')
      selectedCode = code
    })

    codesContainer.appendChild(codeElt)

  }
}

function save(){
  const allCells = document.getElementsByClassName('cell')

  Array.from(allCells).forEach(cell => {
    const [i, j] = findArrayPosition(cell)
    currentMap[i][j] = reverseCodeClass(findCodeClass(cell))
  })

  console.log(currentMap)
  copyToClipboard(currentMap)

}

function bindActionBtns(){
  // SAVE
  document.getElementById('btn--save').addEventListener('click', () => save())
  // ADD ROW AFTER
  document.getElementById('btn--add-row').addEventListener('click', () => {
    const height = currentMap.length
    addRowAfter(null, height)
  })
}

displayMap()
displayCodes()
bindActionBtns()
},{"../src/config/map.json":2,"../src/config/map_code.json":3}],2:[function(require,module,exports){
module.exports=[[2,1,3,3,3,1,2],[2,1,3,0,3,1,2],[2,1,0,2,0,1,2],[2,1,1,0,1,1,2],[2,2,2,2,2,2,2],[2,2,2,2,2,2,2],[1,0,2,2,2,1,1]]
},{}],3:[function(require,module,exports){
module.exports={
  "0": "Village",
  "1": "Forest",
  "2": "Plains",
  "3": "Mountain"
}
},{}]},{},[1]);
