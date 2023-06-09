// Takes a coordinate pair and tests to see if it's valid in the maximum grid value N
const isValid = (x, y, N) => {
    if ((x >= 0 && x <= N) && (y >= 0 && y <= N)) {
        return true;
    }
}

const isEqual = (object1, object2) => {
    // console.log(object1)
    // console.log(object2)
    let equal = true;
    if ((object1.x !== object2.x) || (object1.y !== object2.y)) {
        equal = false;
    }
    return equal;
}

// Node factory function
const coordinate = (x, y, distance = 0) => {
    return {
        x: x,
        y: y,
        distance: distance,
    }
}

// All possible routes a knight can take
const col = [2, 2, -2, -2, 1, -1, 1, -1];
const row = [1, -1, 1, -1, 2, 2, -2, -2];

const knightTravels = (start, finish, N) => {
    // A new set to check if a chess space has been visited before
    let visited = new Set();
    let tracker = new Map();

    let x = []
    let y = []

    for (let i = 0; i < 8; i++) {
        x.push(i);
        y.push(i);
    }

    for (let i = 0; i < 8; i++) {
        for (let n = 0; n < 8; n++) {
            tracker.set('(' + x[i] + ',' + y[n] + ')', {
                parent: null,
                distance: Infinity
            })
        }
    }

    // Creating a queue and inserting node1
    let queue = [];
    queue.push(start);

    // let count = 0;
    // Loop queue until i t's empty
    while (queue) {
        // dequeue node 1
        // if(count === 12) break;
        // count++;
        let node = queue.shift();
        let x = node.x;
        let y = node.y;
        let d = node.distance;

        // If the current node is finish node
        if (x === finish.x && y === finish.y) {
            console.log(x + ' ' + y)
            console.log(visited);
            return d;
        }

        // Adding current node to visited
        visited.add(node);

        // Iterating over set to check for visited squares
        // If a node is in visited we skip the node
        // Check each movement for the knight and queue the valid moves
        for (let i = 0; i <= row.length; i++) {
            let x1 = x + row[i];
            let y1 = y + col[i];

            if (isValid(x1, y1, N) === true) {
                let node = coordinate(x1, y1, d + 1);
                let hasVisited = false;

                visited.forEach(item => {
                    // console.log('Item - x : ' + item.x + ' y : ' + item.y);
                    // console.log('Node - x : ' + node.x + ' y : ' + node.y);
                    if (isEqual(item, node) === true) hasVisited = true;
                })

                if (hasVisited === false) {
                    queue.push(node);
                    console.log(node);
                }
            }
        }
    }
    // return Infinity;
    return visited;
}

const gridSize = 7;
const start = coordinate(0, 0);
const end = coordinate(7, 7);

console.log(knightTravels(start, end, gridSize));

const getMoves = (x, y) => {
    let coordinates = []
    for (let i = 0; i <= row.length; i++) {
        let x1 = x + row[i]
        let y1 = y + col[i]
        if (isValid(x1, y1, 7) === true) {
            coordinates.push({ x: x1, y: y1 })
        }
    }
    return coordinates;
}

