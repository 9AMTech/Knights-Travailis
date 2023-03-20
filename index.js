const isEqual = (array1, array2) => {
    if (array1.length !== array2.length) return false;

    let equal = true;
    array1.forEach((item, x) => {
        if (item !== array2[x]) equal = false;
    });

    return equal;
}

// We are checking for invalid coordinates, coords must follow this statement
// 0 < coord < 9
// If they don't follow that we delete the coordinate
const isValid = (moves) => {
    // Moves is an array of moves of possible positions
    // Each position holds two coordinates
    return moves.filter(position =>
        position[0] > -1 && position[0] < 8
        && position[1] > -1 && position[1] < 8);
}


// This function will use the current position and display 
// all the possible moves for the given knight
const possibleMoves = (position) => {
    const moves = [
        // [X, Y]
        // FIRST UP
        // THEN LEFT
        [position[0] - 1, position[1] + 2],
        // THEN RIGHT
        [position[0] + 1, position[1] + 2],

        // FIRST DOWN
        // THEN LEFT
        [position[0] - 1, position[1] - 2],
        // THEN RIGHT
        [position[0] + 1, position[1] - 2],

        // FIRST LEFT
        // THEN UP
        [position[0] - 2, position[1] + 1],
        // THEN DOWN
        [position[0] - 2, position[1] - 1],

        // FIRST RIGHT
        // THEN UP
        [position[0] + 2, position[1] + 1],
        // THEN DOWN
        [position[0] + 2, position[1] - 1]
    ]
    return moves;
}

const createBoard = () => {
    let letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    let board = {};

    // Row
    for (let i = 0; i < 8; i++) {
        // Column
        for (let x = 0; x < 8; x++) {
            board[`${letters[i]}${x}`] = {
                position: [i, x],
                distance: Infinity,
            }
        }
    }
    return board;
}

// Here i will try to wire up everything into djikstras shortest path algorithm
const shortestPath = (start, end) => {
    let visited = [];
    let unvisited = createBoard();
    let count = 1;
    let queue = [];

    let currentNode = {
        position: start,
        distance: 0,
    }

    queue.push(currentNode);

    while (queue) {
        // if (count === 4) break;
        count++;
        console.log(queue);
        console.log(currentNode);

        for (item in queue) {
            if (isEqual(queue[item].position, end) === true) {
                console.log("You've completed travel!")
                for (item in visited) {
                    console.log(queue[item].position);
                }
                return;
            }
        }

        let sortedQueue = queue.sort((a, b) => {
            return a.distance - b.distance;
        });

        currentNode = sortedQueue.pop();

        // Finding the edges of the currentNode
        let newPositions = possibleMoves(currentNode.position);
        let availablePositions = isValid(newPositions);

        // Getting rid of the nodes that are in the visited array
        for (item in availablePositions) {
            for (node in visited) {
                if(availablePositions.length == undefined) return;
                if (isEqual(availablePositions[item], visited[node].position) === true) {
                    availablePositions.splice(item, 1);
                }
            }
        }

        // Getting rid of the current node from the unvisted array
        for (item in unvisited) {
            if (isEqual(unvisited[item].position, currentNode.position) === true) {
                visited.push(currentNode);
                delete unvisited[item];
            }
        }

        // Matching the distances of the purged list
        for (item in availablePositions) {
            let node = {
                position: [availablePositions[item][0], availablePositions[item][1]],
                distance: currentNode.distance + 1,
            }
            if (item.distance < node.distance) {
                item.distance = node.distance;
            }
            queue.push(node);
        }

        for (item in queue) {
            if (isEqual(currentNode.position, queue[item].position) === true) {
                queue.splice(queue.indexOf(queue[item]), 1);
            }
        }
    }
}

shortestPath([1, 1], [7, 7]);