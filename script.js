const rows = 10; //numbers of tiles horizontally
const columns = 10; //number of tiles vertically

const density = 0.15;
const totalBombs = Math.floor(rows*columns*density); // Greatest Integer Function

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

// choosing bomb spots
    for(let i=1; i < totalBombs+1; i++){
        bombSheet.push({
            x: Math.round(Math.random()*rows),
            y: Math.round(Math.random()*columns)
        })
    }


console.log(bombSheet);