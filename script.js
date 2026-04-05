const rows = 10; //numbers of tiles horizontally
const columns = 10; //number of tiles vertically

const density = 0.15;
const totalBombs = Math.floor(rows*columns*density); // Greatest Integer Function

const board = document.getElementById('board');

let tileSheet = []; // empty cartesian coordinate system array.
let bombSheet = [];

for (let y=1; y < columns+1; y++){

    for(let x=1; x < rows+1; x++){
        tileSheet.push(
            {
                x: x,
                y: y
            }
        )
    }

}

function bombPlacer(){
//ensures no duplicates
        let axe = Math.floor(Math.random()*rows) +1;
        let why = Math.floor(Math.random()*columns) +1;
        if(bombSheet.some(t => t.x === axe && t.y === why)) return bombPlacer();
        else return {axe, why};
}

// choosing bomb spots
    for(let i=1; i < totalBombs+1; i++){
        let {axe, why} = bombPlacer();
        bombSheet.push({
            x: axe,
            y: why
        })
    }

// Adding divs
tileSheet.forEach((tile) => {
    let text = isNearby(tile)
    const tempTile = document.createElement('div');
    tempTile.className = 'tile';
    tempTile.style.top = `${-40 + tile.x*40}px`;
    tempTile.style.left = `${-40 + tile.y*40}px`;
    tempTile.innerText = text==="0" ? "": text;
    if(bombSheet.some(t => t.x === tile.x && t.y === tile.y)) tempTile.classList.add('bomb');
    board.appendChild(tempTile)
})


function isNearby(tile){
    let nearby = 0;
    if(bombSheet.some(t => t.x === tile.x && t.y === tile.y)) return nearby = '💣'


    let checks = [ //clockwise list of surrounding blocks coordinates
        {x: tile.x-1,y: tile.y-1},
        {x: tile.x,y: tile.y-1},
        {x: tile.x+1,y: tile.y-1},
        {x: tile.x+1,y: tile.y},
        {x: tile.x+1,y: tile.y+1},
        {x: tile.x,y: tile.y+1},
        {x: tile.x-1,y: tile.y+1},
        {x: tile.x-1,y: tile.y},
    ]
    checks.forEach((neighbor) =>{
        //exclude non-existing tiles
        if (!(neighbor.x>0 && neighbor.y>0 && neighbor.x<= columns && neighbor.y<= rows)) return;

        //if the neighbour is a bomb, add nearby
        if(bombSheet.some(t => t.x === neighbor.x && t.y === neighbor.y)){
            nearby++;
        }
    })  
    //console.log(nearby);
    return nearby.toLocaleString();
}
