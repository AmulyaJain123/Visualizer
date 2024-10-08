import { options } from "./options";

export function arrToAdjacencyList(arr) {
    const nodes = [];
    for (let i of arr) {
        const first = i[0];
        const second = i[1];
        if (!nodes.includes(first)) {
            nodes.push(first);
        }
        if (!nodes.includes(second)) {
            nodes.push(second);
        }


    }
    for (let i = 0; i < nodes.length; ++i) {
        nodes[i] = [nodes[i], []];
    }
    nodes.sort((a, b) => {
        if (a[0] <= b[0]) {
            return -1
        } else {
            return 1
        }
    })
    for (let i of nodes) {
        const nodeVal = i[0];
        const array = i[1];
        for (let j of arr) {
            if (j[0] === nodeVal && !array.includes(j[1])) {
                array.push(j[1])
            }
        }
        array.sort((a, b) => {
            if (a <= b) {
                return -1
            } else {
                return 1
            }
        })
    }
    console.log(nodes);
    return nodes;

}

export function arrToAdjacencyMatrix(arr) {
    const nodes = [];
    for (let i of arr) {
        const first = i[0];
        const second = i[1];
        if (!nodes.includes(first)) {
            nodes.push(first);
        }
        if (!nodes.includes(second)) {
            nodes.push(second);
        }


    }
    nodes.sort((a, b) => {
        if (a <= b) {
            return -1
        }
        return 1;
    })
    const n = nodes.length;
    const matrix = [];
    for (let i = 0; i < n + 1; ++i) {
        matrix.push(new Array(n + 1).fill(null));
    }
    for (let i = 1; i < matrix.length; ++i) {
        const ind = i - 1;
        matrix[0][i] = nodes[ind];
        matrix[i][0] = nodes[ind];
    }
    console.log(JSON.parse(JSON.stringify(matrix)));
    for (let i = 1; i < matrix.length; ++i) {
        for (let j = 1; j < matrix.length; ++j) {
            if (matrix[i][j] === 1) {
                continue;
            }
            const two = matrix[0][j];
            const one = matrix[i][0];
            if (one === two) {
                matrix[i][j] = 1;
                continue;
            }
            for (let x of arr) {
                if ((x[0] === one && x[1] === two)) {
                    matrix[i][j] = 1;
                    break;

                }
            }
        }
    }
    console.log(matrix);
    return matrix
}
