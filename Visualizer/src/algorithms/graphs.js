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

    }
    ans.push({ type: "success", visited: getVisited(visited), fullVisit: [...fullVisit], bfs: [...dfs] });
    console.log(ans);
    return ans;

}

function getWeight(edges, edge) {
    for (let i of edges) {
        if (i[0] === edge[0] && i[1] === edge[1]) {
            return i[2];
        }
    }
}

function leastDistanceNode(distanceTable, selected) {
    let ind = 0;
    let min = 5000;
    let ans;
    for (let i of distanceTable[distanceTable.length - 1][1]) {
        const currNode = ind + 1;
        if (!selected.includes(currNode) && (i < min)) {
            min = i;
            ans = currNode;
        }
        ++ind;
    }
    return ans;
}

function dc(obj) {
    return JSON.parse(JSON.stringify(obj));
}

export function dijkstraTimeline(lst, edges, start) {
    const distanceTable = [];
    const ans = [];
    const selected = [];
    const array = new Array(lst.length).fill(4000);
    const firstEntry = [start, [...array], selected];
    firstEntry[1][start - 1] = 0;
    for (let i of lst[start - 1][1]) {
        const edge = [start, i];
        const weight = getWeight(edges, edge);
        if (weight < firstEntry[1][i - 1]) {
            firstEntry[1][i - 1] = weight;
        }
    }
    distanceTable.push(firstEntry);
    selected.push(start);

    ans.push({ table: dc(distanceTable), highlight: start, selected: [...selected] })
    distanceTable[distanceTable.length - 1] = dc(distanceTable[distanceTable.length - 1]);

    while (selected.length != lst.length) {
        const leastDisNode = leastDistanceNode(distanceTable, selected);
        const currWeight = distanceTable[distanceTable.length - 1][1][leastDisNode - 1];
        const newEntry = [leastDisNode, [...(distanceTable[distanceTable.length - 1][1])], selected];
        selected.push(leastDisNode);
        distanceTable.push(newEntry);
        ans.push({ table: dc(distanceTable), highlight: leastDisNode, selected: [...selected] })
        distanceTable[distanceTable.length - 1] = dc(distanceTable[distanceTable.length - 1]);
        for (let i of lst[leastDisNode - 1][1]) {
            if (selected.includes(i)) {
                continue;
            }
            const distance = getWeight(edges, [leastDisNode, i]);
            if (currWeight + distance < distanceTable[distanceTable.length - 1][1][i - 1]) {
                ans.push({ table: dc(distanceTable), highlight: leastDisNode, selected: [...selected], neighbour: i, type: "change", msg: `${currWeight >= 4000 ? "∞" : currWeight} + ${distance >= 4000 ? "∞" : distance} --> ${(currWeight + distance) >= 4000 ? "∞" : currWeight + distance}  <  ${distanceTable[distanceTable.length - 1][1][i - 1]}` })

                distanceTable[distanceTable.length - 1][1][i - 1] = currWeight + distance;
                ans.push({ table: dc(distanceTable), highlight: leastDisNode, selected: [...selected], neighbour: i });

            } else {
                ans.push({ table: dc(distanceTable), highlight: leastDisNode, selected: [...selected], neighbour: i, type: "noChange", msg: `${currWeight >= 4000 ? "∞" : currWeight} + ${distance >= 4000 ? "∞" : distance} --> ${(currWeight + distance) >= 4000 ? "∞" : currWeight + distance}  >=  ${distanceTable[distanceTable.length - 1][1][i - 1]}` })

                ans.push({ table: dc(distanceTable), highlight: leastDisNode, selected: [...selected], neighbour: i });

            }

        }
    }
    ans.push({ table: dc(distanceTable), type: "success", selected: [...selected] })
    console.log(ans);
    return ans;
}

function getMst(key, parents, mst) {
    const ans = [];
    for (let i = 1; i < key.length; ++i) {
        if (mst[i] && parents[i] != -1 && mst[parents[i]]) {
            ans.push([i, parents[i]]);
            ans.push([parents[i], i]);
        }
    }
    return dc(ans);
}

export function primsTimeline(lst, edges, start) {
    const ans = [];
    const mst = new Array(lst.length + 1).fill(false);
    const key = new Array(lst.length + 1).fill(4000);
    const parents = new Array(lst.length + 1).fill(-1);
    key[start] = 0;


    while (1) {
        let min = 4000;
        let node;
        for (let i = 1; i < key.length; ++i) {
            if (mst[i] === false && key[i] < min) {
                min = key[i];
                node = i;
            }
        }
        if (!node) {
            break;
        }
        ans.push({ mst: [...mst], key: [...key], highlight: node, edges: [...getMst(key, parents, mst)] })
        mst[node] = true;
        ans.push({ mst: [...mst], key: [...key], highlight: node, edges: [...getMst(key, parents, mst)] })

        for (let i of lst[node - 1][1]) {
            if (mst[i]) {
                continue;
            }
            const edge = [node, i];
            const weight = getWeight(edges, edge);
            ans.push({ mst: [...mst], key: [...key], highlight: node, neighbour: i, edges: [...getMst(key, parents, mst)] })
            if (mst[i] === false && key[i] > weight) {
                const prevKey = key[i];
                key[i] = weight;
                parents[i] = node;
                ans.push({ mst: [...mst], key: [...key], highlight: node, neighbour: i, edges: [...getMst(key, parents, mst)], type: "change", msg: `E [${node},${i}] < ${prevKey}` });
            } else {
                const prevKey = key[i];
                ans.push({ mst: [...mst], key: [...key], highlight: node, neighbour: i, edges: [...getMst(key, parents, mst)], type: "noChange", msg: `E [${node},${i}] >= ${prevKey}` });

            }
        }
    }
    ans.push({ mst: [...mst], key: [...key], edges: [...getMst(key, parents, mst)], type: "success" });


    console.log(ans);
    return ans;
}

function getWeightedEdges(lst, edges) {
    const ans = [];
    for (let i of lst) {
        const first = i[0];
        for (let j of i[1]) {
            const second = j;
            const weight = getWeight(edges, [first, second]);
            ans.push([first, second, weight]);
        }
    }
    ans.sort((a, b) => {
        if (a[2] <= b[2]) {
            return -1
        } else {
            return 1
        }
    })
    return dc(ans);
}

function detectCycle(edges, nodes) {
    const maxval = Math.max(...nodes);
    console.log(maxval);
    const visited = new Array(maxval + 1).fill(false);
    const list = new Array(maxval + 1);
    for (let i = 0; i < list.length; ++i) {
        list[i] = [];
    }
    for (let i of edges) {
        const first = i[0];
        const second = i[1];
        const weight = i[2];
        if (!list[first].includes(second)) {
            list[first].push(second);
        }
        if (!list[second].includes(first)) {
            list[second].push(first);
        }
    }
    console.log(list)

    function solver(node, visited, parents) {
        for (let i of list[node]) {
            //node->i
            if (visited[i] && (parents[node] != i)) {
                console.log("yo", node, i)
                return true;
            } else if (visited[i] === false) {
                visited[i] = true;
                parents[i] = node;
                const res = solver(i, visited, parents);
                if (res) {
                    console.log("hi", node, i)
                    return res;
                }
            }
        }
        return false;
    }
    const parents = new Array(maxval + 1).fill(-1);


    for (let i = 1; i < list.length; ++i) {
        if (visited[i] || !nodes.includes(i)) {
            continue;
        }
        visited[i] = true;
        const res = solver(i, visited, parents);
        if (res) {
            console.log(i, visited, parents, list);
            return true;
        }
    }
    return false;
}

function getListOfNodes(edges) {
    const ans = [];
    for (let i of edges) {
        if (!ans.includes(i[0])) {
            ans.push(i[0]);
        }
        if (!ans.includes(i[1])) {
            ans.push(i[1]);
        }
    }
    return [...ans];
}

function checkForDuplicate(edges, edge) {
    for (let i of edges) {
        if ((i[0] === edge[0] && i[1] === edge[1]) || (i[1] === edge[0] && i[0] === edge[1])) {
            return true
        }
    }
    return false;
}

function eleminateDuplicates(edges) {
    const ans = [];
    for (let i of edges) {
        let stat = false;
        for (let j of ans) {
            if ((j[0] === i[0] && j[1] === i[1]) || (j[1] === i[0] && j[0] === i[1])) {
                stat = true;
                break;
            }
        }
        if (!stat) {
            ans.push(i);
        }
    }
    return dc(ans);
}

export function kruskalsTimeline(lst, edges) {
    const ans = [];
    const mst = [];
    const weightedEdges = getWeightedEdges(lst, edges);
    const notMst = [];

    let count = 0;
    for (let i = 0; i < weightedEdges.length; ++i) {
        if (checkForDuplicate(notMst, weightedEdges[i])) {
            continue;
        }
        if (checkForDuplicate(mst, weightedEdges[i])) {
            mst.push(weightedEdges[i]);
            continue;
        }
        ans.push({ weightedEdges: eleminateDuplicates(weightedEdges), currEdge: count, type: "testing", highlight: [...weightedEdges[i]], nodes: getListOfNodes(mst), mst: dc(mst) })
        const res = detectCycle([...dc(mst), weightedEdges[i]], getListOfNodes([...mst, weightedEdges[i]]));
        if (res) {
            ans.push({ weightedEdges: eleminateDuplicates(weightedEdges), currEdge: count, type: "inCorrect", highlight: [...weightedEdges[i]], nodes: getListOfNodes(mst), mst: dc(mst), msg: `E (${weightedEdges[i][0]},${weightedEdges[i][1]}) Forms Cycle` })
            ans.push({ weightedEdges: eleminateDuplicates(weightedEdges), currEdge: count, nodes: getListOfNodes(mst), mst: dc(mst) })
            notMst.push(weightedEdges[i])
            ++count;
            continue;
        } else {
            ans.push({ weightedEdges: eleminateDuplicates(weightedEdges), currEdge: count, type: "correct", highlight: [...weightedEdges[i]], nodes: getListOfNodes(mst), mst: dc(mst), msg: `E (${weightedEdges[i][0]},${weightedEdges[i][1]}) Does Not Form Cycle` })
            mst.push(weightedEdges[i]);
            ans.push({ weightedEdges: eleminateDuplicates(weightedEdges), currEdge: count, nodes: getListOfNodes(mst), mst: dc(mst) })
            ++count;
        }
    }
    console.log(mst);
    console.log(ans);
    return ans;


}



export function bellmanFordTimeline(lst, edges, start) {
    const ans = [];
    const n = lst.length;
    const key = new Array(n + 1).fill(4000);
    key[start] = 0;
    const undirectedEdges = eleminateDuplicates(edges);
    const history = [[0, key]];
    ans.push({ type: "start", history: dc(history) });
    let status = false;
    for (let i = 0; i < n - 1; ++i) {
        let stat = false;
        history[history.length - 1] = dc(history[history.length - 1]);
        history.push([i + 1, key]);
        ans.push({ type: "start", history: dc(history) });
        let index = -1;

        for (let j of edges) {
            ++index;
            const first = j[0];
            const second = j[1];
            const weight = j[2];

            if (key[first] + weight < key[second]) {
                ans.push({ history: dc(history), edges: dc(edges), currEdge: index, highlight: [first, second], type: "change", msg: `${key[first] >= 3000 ? "∞" : key[first]} + ${weight}  -->  ${key[first] + weight >= 3000 ? "∞" : key[first] + weight} < ${key[second] >= 3000 ? "∞" : key[second]}` });

                key[second] = key[first] + weight;
                ans.push({ history: dc(history), edges: dc(edges), currEdge: index, });
                stat = true;
            } else {
                ans.push({ history: dc(history), edges: dc(edges), currEdge: index, highlight: [first, second], type: "noChange", msg: `${key[first] >= 3000 ? "∞" : key[first]} + ${weight}  -->  ${key[first] + weight >= 3000 ? "∞" : key[first] + weight} >= ${key[second] >= 3000 ? "∞" : key[second]}` });
                ans.push({ history: dc(history), edges: dc(edges), currEdge: index });
            }
        }
        if (stat === false) {
            status = true;
            ans.push({ history: dc(history), type: "skip" });
            break;
        }
    }
    ans.push({ type: "success", history: dc(history) });


    if (status === false) {
        for (let j of edges) {
            const first = j[0];
            const second = j[1];
            const weight = j[2];
            if (key[first] + weight < key[second]) {
                // neg Cycle is present 
                console.log("Oh No")
                break;
            } else {

            }
        }
    }
    console.log(ans);
    return ans;

}

