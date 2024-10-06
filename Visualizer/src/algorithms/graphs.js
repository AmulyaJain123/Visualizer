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
            else if (j[1] === nodeVal && !array.includes(j[0])) {
                array.push(j[0])
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
            const one = matrix[0][j];
            const two = matrix[i][0];
            if (one === two) {
                matrix[i][j] = 1;
                continue;
            }
            for (let x of arr) {
                if ((x[0] === one && x[1] === two) || (x[0] === two && x[1] === one)) {
                    matrix[i][j] = 1;
                    matrix[j][i] = 1;
                    break;

                }
            }
        }
    }
    console.log(matrix);
    return matrix
}

export function listToDisplay(arr) {

    // Method- Concentric Circles
    // const newArr = JSON.parse(JSON.stringify(arr));
    // newArr.sort((a, b) => {
    //     if (a[1].length <= b[1].length) {
    //         return -1;
    //     }
    //     return 1;
    // })
    // const r = 120;
    // const levels = Math.ceil(newArr.length / 4);
    // const center = [0, levels * r];
    // const ans = [];
    // for (let i = 0; i < newArr.length; ++i) {
    //     const currLevel = Math.ceil((i + 1) / 4);
    //     const shift = (currLevel - 1) * (90 / levels);
    //     const ind = (i + 1) % 4;
    //     let x;
    //     let y;
    //     if (ind === 1) {
    //         x = currLevel * r * (Math.sin(shift * (Math.PI / 180)));
    //         y = ((levels) * r) - currLevel * r * (Math.cos(shift * (Math.PI / 180)));
    //     } else if (ind === 2) {
    //         x = currLevel * r * (Math.cos(shift * (Math.PI / 180)));
    //         y = center[1] + currLevel * r * (Math.sin(shift * (Math.PI / 180)));
    //     } else if (ind === 3) {
    //         x = -currLevel * r * (Math.sin(shift * (Math.PI / 180)));
    //         y = center[1] + currLevel * r * (Math.cos(shift * (Math.PI / 180)));
    //     } else {
    //         x = -(currLevel * r * (Math.cos(shift * (Math.PI / 180))));
    //         y = center[1] - currLevel * r * (Math.sin(shift * (Math.PI / 180)));
    //     }
    //     ans.push([newArr[i][0], [x, y]]);
    // }

    //Method- Single Circle
    const n = arr.length;
    const ans = []
    const angle = 2 * Math.PI / n;
    const r = 60 + (Math.floor(n / 4)) * 60;
    for (let i = 0; i < arr.length; ++i) {
        let offset = angle * i;
        offset = offset % 90;
        const y = r - (r * (Math.cos(offset)))
        const x = r * (Math.sin(offset))
        ans.push([arr[i][0], [x, y]]);
    }

    console.log(ans);
    return ans;
}