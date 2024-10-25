export function heapArrToTreeArr(arr) {
    const ans = []
    let level = 0;
    while (1) {
        const start = Math.floor(Math.pow(2, level) - 1);
        const end = start + Math.floor(Math.pow(2, level)) - 1;
        const tempArr = [];
        let i;
        for (i = start; i <= end && i < arr.length; ++i) {
            tempArr.push(arr[i]);
        }
        if (i >= arr.length) {
            if (i <= end) {
                for (let j = 0; j <= end - i; ++j) {
                    tempArr.push(null);
                }
            }
            ans.push(tempArr);
            break;
        }
        ans.push(tempArr);
        ++level;

    }
    // console.log(ans);
    return ans;
}

export function heapArrToTreeObj(arr) {
    const head = { val: arr[0], right: null, left: null };
    function solver(arr, ind, head) {
        if (!head) {
            return;
        }
        const leftInd = ind * 2 + 1;
        const rightInd = ind * 2 + 2;
        if (leftInd < arr.length) {
            head.left = { val: arr[leftInd], right: null, left: null }
            solver(arr, leftInd, head.left);
        }
        if (rightInd < arr.length) {
            head.right = { val: arr[rightInd], right: null, left: null }
            solver(arr, rightInd, head.right)
        }
    }
    solver(arr, 0, head);
    // console.log(head);
    return head;
}

export function heapSortTimeline(arr, heapType) {
    let newArr = [...arr];
    let ans = [];
    while (newArr.length != 0) {
        const ans1 = deletionTimeline(newArr, heapType);
        ans = ans.concat(ans1);
        newArr = deletionInHeap(newArr, heapType);
    }
    ans.push({ type: "fullSuccessful" })
    // console.log(ans);
    return ans;
}

export function arrToHeap(arr, heapType) {
    let newArr = [];
    for (let i of arr) {
        newArr = insertionInHeap(newArr, i, heapType);
    }
    // console.log(newArr);
    return newArr;
}



export function insertionTimeline(arr, val, heapType) {
    const ans = [];
    if (arr === null || arr.length === 0) {
        ans.push({ currx: 0, curry: 0, type: "push" });
        ans.push({ type: "successful" });
        return ans;
    }

    const newArr = [...arr];

    newArr.push(val);
    let curInd = newArr.length - 1;
    const [x, y] = getIndices(curInd);
    ans.push({ currx: x, curry: y, type: "push" });


    while (1) {
        if (curInd === 0) {
            ans.push({ type: "successful" });
            break;
        }
        const parentInd = Math.floor((curInd - 1) / 2);
        const [x, y] = getIndices(curInd);
        const [p, q] = getIndices(parentInd);
        ans.push({ currx: x, curry: y, parx: p, pary: q, type: "parentSelected" });


        if ((heapType === "max" && newArr[parentInd] >= newArr[curInd]) || (heapType === "min" && newArr[parentInd] <= newArr[curInd])) {
            ans.push({ currx: x, curry: y, parx: p, pary: q, type: "noChange" });
            ans.push({ type: "successful" });

            break;
        } else {
            ans.push({ currx: x, curry: y, parx: p, pary: q, type: "swap" });
            ans.push({ currx: p, curry: q, type: "swapComplete" });

            const temp = newArr[parentInd];
            newArr[parentInd] = newArr[curInd];
            newArr[curInd] = temp;
            curInd = parentInd;
        }
    }
    // console.log(ans);
    return ans;
}

function getIndices(ind) {
    const x = Math.floor(Math.log2(ind + 1));
    const y = ind - (Math.floor(Math.pow(2, x)) - 1);
    return [x, y];

}

export function insertionInHeap(arr, val, heapType) {
    if (arr === null || arr.length === 0) {
        return [val];
    }

    const newArr = [...arr];

    newArr.push(val);
    let curInd = newArr.length - 1;

    while (1) {
        if (curInd === 0) {
            break;
        }
        const parentInd = Math.floor((curInd - 1) / 2);

        if ((heapType === "max" && newArr[parentInd] >= newArr[curInd]) || (heapType === "min" && newArr[parentInd] < newArr[curInd])) {
            break;
        } else {
            const temp = newArr[parentInd];
            newArr[parentInd] = newArr[curInd];
            newArr[curInd] = temp;
            curInd = parentInd;
        }
    }
    // console.log(newArr);
    return newArr;
}

export function deletionTimeline(arr, heapType) {
    const ans = []
    const newArr = [...arr];
    newArr[0] = newArr[newArr.length - 1];
    newArr.pop();

    const [x1, y1] = getIndices(0);
    const [x2, y2] = getIndices(arr.length - 1);

    if (newArr.length === 0) {
        ans.push({ x1: x1, x2: x2, y1: y1, y2: y2, type: "delete" })
        ans.push({ x1: x1, x2: x2, y1: y1, y2: y2, type: "deleteComplete" })
        ans.push({ type: "successful" })
        return ans;
    }

    ans.push({ x1: x1, x2: x2, y1: y1, y2: y2, type: "replaceBeforeDelete" })
    ans.push({ x1: x1, x2: x2, y1: y1, y2: y2, type: "replaceBeforeDeleteCompleted" })
    ans.push({ x1: x1, x2: x2, y1: y1, y2: y2, type: "delete" })
    ans.push({ x1: x1, x2: x2, y1: y1, y2: y2, type: "deleteComplete" })



    function solver(ind, arr) {
        const leftInd = ind * 2 + 1;
        const rightInd = ind * 2 + 2;

        const [a, b] = getIndices(leftInd);
        const [c, d] = getIndices(rightInd);

        const [x1, y1] = getIndices(ind);
        let stat = false;

        if (heapType === "max" && arr[ind] < (Math.max(leftInd < arr.length ? arr[leftInd] : -1, rightInd < arr.length ? arr[rightInd] : -1))) {
            let maxVal;
            let maxInd;
            const right = rightInd < arr.length ? arr[rightInd] : -1;
            const left = leftInd < arr.length ? arr[leftInd] : -1;
            maxVal = Math.max(right, left);
            maxInd = right === maxVal ? rightInd : leftInd;
            const temp = arr[ind];
            arr[ind] = arr[maxInd];
            arr[maxInd] = temp;

            const [x2, y2] = getIndices(maxInd);
            ans.push({ x1: x1, y1: y1, a: leftInd < arr.length ? a : null, b: leftInd < arr.length ? b : null, c: rightInd < arr.length ? c : null, d: rightInd < arr.length ? d : null, type: "comparingChildren" })
            ans.push({ x1: x1, y1: y1, x2: x2, y2: y2, type: "verifying" })
            ans.push({ x1: x1, y1: y1, x2: x2, y2: y2, type: "swap" })
            ans.push({ x1: x1, y1: y1, x2: x2, y2: y2, type: "swapComplete" })
            ans.push({ x1: x2, y1: y2, type: "next" })

            stat = true;

            solver(maxInd, arr);
        } else if (heapType === "min" && arr[ind] > (Math.min(leftInd < arr.length ? arr[leftInd] : Number.POSITIVE_INFINITY, rightInd < arr.length ? arr[rightInd] : Number.POSITIVE_INFINITY))) {
            let minVal;
            let minInd;
            const right = rightInd < arr.length ? arr[rightInd] : Number.POSITIVE_INFINITY;
            const left = leftInd < arr.length ? arr[leftInd] : Number.POSITIVE_INFINITY;
            minVal = Math.min(right, left);
            minInd = right === minVal ? rightInd : leftInd;
            const temp = arr[ind];
            arr[ind] = arr[minInd];
            arr[minInd] = temp;
            const [x2, y2] = getIndices(minInd);
            ans.push({ x1: x1, y1: y1, a: leftInd < arr.length ? a : null, b: leftInd < arr.length ? b : null, c: rightInd < arr.length ? c : null, d: rightInd < arr.length ? d : null, type: "comparingChildren" })
            ans.push({ x1: x1, y1: y1, x2: x2, y2: y2, type: "verifying" })
            ans.push({ x1: x1, y1: y1, x2: x2, y2: y2, type: "swap" })
            ans.push({ x1: x1, y1: y1, x2: x2, y2: y2, type: "swapComplete" })
            ans.push({ x1: x2, y1: y2, type: "next" })

            stat = true;


            solver(minInd, arr);
        }
        if (!stat) {
            if (leftInd >= arr.length && rightInd >= arr.length) {
                ans.push({ type: "successful" })

            } else {
                ans.push({ x1: x1, y1: y1, a: leftInd < arr.length ? a : null, b: leftInd < arr.length ? b : null, c: rightInd < arr.length ? c : null, d: rightInd < arr.length ? d : null, type: "comparingChildren" })
                if (heapType === "max") {
                    let maxVal;
                    let maxInd;
                    const right = rightInd < arr.length ? arr[rightInd] : -1;
                    const left = leftInd < arr.length ? arr[leftInd] : -1;
                    maxVal = Math.max(right, left);
                    maxInd = right === maxVal ? rightInd : leftInd;
                    const [x2, y2] = getIndices(maxInd);
                    ans.push({ x1: x1, y1: y1, x2: x2, y2: y2, type: "verifying" })
                    ans.push({ x1: x1, y1: y1, x2: x2, y2: y2, type: "noChange" })

                } else {
                    let minVal;
                    let minInd;
                    const right = rightInd < arr.length ? arr[rightInd] : Number.POSITIVE_INFINITY;
                    const left = leftInd < arr.length ? arr[leftInd] : Number.POSITIVE_INFINITY;
                    minVal = Math.min(right, left);
                    minInd = right === minVal ? rightInd : leftInd;
                    const [x2, y2] = getIndices(minInd);
                    ans.push({ x1: x1, y1: y1, x2: x2, y2: y2, type: "verifying" })
                    ans.push({ x1: x1, y1: y1, x2: x2, y2: y2, type: "noChange" })

                }
                ans.push({ type: "successful" })
            }
        }


    }

    solver(0, newArr);
    // console.log(ans);
    return ans;
}

export function deletionInHeap(arr, heapType) {
    if (arr === null || arr.length === 0) {
        return null;
    }

    const newArr = [...arr];
    newArr[0] = newArr[newArr.length - 1];
    newArr.pop();

    if (newArr.length === 0) {
        return [];
    }

    function solver(ind, arr) {
        const leftInd = ind * 2 + 1;
        const rightInd = ind * 2 + 2;

        if (heapType === "max" && arr[ind] < (Math.max(leftInd < arr.length ? arr[leftInd] : -1, rightInd < arr.length ? arr[rightInd] : -1))) {
            let maxVal;
            let maxInd;
            const right = rightInd < arr.length ? arr[rightInd] : -1;
            const left = leftInd < arr.length ? arr[leftInd] : -1;
            maxVal = Math.max(right, left);
            maxInd = right === maxVal ? rightInd : leftInd;
            const temp = arr[ind];
            arr[ind] = arr[maxInd];
            arr[maxInd] = temp;
            solver(maxInd, arr);
        } else if (heapType === "min" && arr[ind] > (Math.min(leftInd < arr.length ? arr[leftInd] : Number.POSITIVE_INFINITY, rightInd < arr.length ? arr[rightInd] : Number.POSITIVE_INFINITY))) {
            let minVal;
            let minInd;
            const right = rightInd < arr.length ? arr[rightInd] : Number.POSITIVE_INFINITY;
            const left = leftInd < arr.length ? arr[leftInd] : Number.POSITIVE_INFINITY;
            minVal = Math.min(right, left);
            minInd = right === minVal ? rightInd : leftInd;
            const temp = arr[ind];
            arr[ind] = arr[minInd];
            arr[minInd] = temp;
            solver(minInd, arr);
        }
    }

    solver(0, newArr);
    // console.log(newArr);
    return newArr;
}