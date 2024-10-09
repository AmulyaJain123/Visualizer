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

function getVisited(visited) {
    const ans = [];
    for (let i = 0; i < visited.length; ++i) {
        if (visited[i]) {
            ans.push(i);
        }
    }
    return ans;
}

export function bfsTimeline(lst) {
    const ans = [];
    const visited = new Array(lst[lst.length - 1][0] + 1).fill(false);
    const fullVisit = [];
    const queue = [];
    const bfs = [];
    for (let i = 1; i <= lst[lst.length - 1][0]; ++i) {
        if (visited[i]) {
            continue;
        }
        //visit the node 
        visited[i] = true;
        bfs.push(i);
        queue.push(i);
        while (queue.length != 0) {

            const front = queue.shift();
            ans.push({ type: "start", highlight: [front], visited: getVisited(visited), fullVisit: [...fullVisit], bfs: [...bfs] });
            console.log(front);
            for (let j of lst[front - 1][1]) {
                if (visited[j] === false) {
                    ans.push({ type: "exploration", highlight: [front], explore: [j], visited: getVisited(visited), fullVisit: [...fullVisit], bfs: [...bfs] });
                    visited[j] = true;
                    bfs.push(j);

                    queue.push(j);
                    ans.push({ type: "visitedExplored", highlight: [front], visited: getVisited(visited), fullVisit: [...fullVisit], bfs: [...bfs] });
                }
            }
            fullVisit.push(front);
            ans.push({ type: "fullVisit", highlight: [front], visited: getVisited(visited), fullVisit: [...fullVisit], bfs: [...bfs] });

        }

    }
    ans.push({ type: "success", visited: getVisited(visited), fullVisit: [...fullVisit], bfs: [...bfs] });
    console.log(ans);
    return ans;

}

export function dfsTimeline(lst) {
    const ans = [];
    const visited = new Array(lst[lst.length - 1][0] + 1).fill(false);
    const fullVisit = [];
    const stack = [];
    const dfs = [];
    for (let i = 1; i <= lst[lst.length - 1][0]; ++i) {
        if (visited[i]) {
            continue;
        }
        //visit the node 
        stack.unshift(i);

        function solver(stack, visited) {
            const top = stack.shift();
            visited[top] = true;
            dfs.push(top);
            ans.push({ type: "start", highlight: [top], visited: getVisited(visited), fullVisit: [...fullVisit], bfs: [...dfs] });
            for (let j of lst[top - 1][1]) {
                if (visited[j] === false) {
                    stack.unshift(j);
                    ans.push({ type: "exploration", highlight: [top], explore: [j], visited: getVisited(visited), fullVisit: [...fullVisit], bfs: [...dfs] });
                    solver(stack, visited);
                }
            }
            fullVisit.push(top);
            ans.push({ type: "fullVisit", highlight: [top], visited: getVisited(visited), fullVisit: [...fullVisit], bfs: [...dfs] });
        }

        solver(stack, visited);

        // while (stack.length != 0) {

        //     const top = stack.shift();
        //     ans.push({ type: "start", highlight: [top], visited: getVisited(visited), fullVisit: [...fullVisit], dfs: [...bfs] });
        //     console.log(front);
        //     for (let j of lst[front - 1][1]) {
        //         if (visited[j] === false) {
        //             ans.push({ type: "exploration", highlight: [front], explore: [j], visited: getVisited(visited), fullVisit: [...fullVisit], bfs: [...bfs] });
        //             visited[j] = true;
        //             bfs.push(j);

        //             queue.push(j);
        //             ans.push({ type: "visitedExplored", highlight: [front], visited: getVisited(visited), fullVisit: [...fullVisit], bfs: [...bfs] });
        //         }
        //     }
        //     fullVisit.push(front);
        //     ans.push({ type: "fullVisit", highlight: [front], visited: getVisited(visited), fullVisit: [...fullVisit], bfs: [...bfs] });

        // }

    }
    ans.push({ type: "success", visited: getVisited(visited), fullVisit: [...fullVisit], bfs: [...dfs] });
    console.log(ans);
    return ans;

}

