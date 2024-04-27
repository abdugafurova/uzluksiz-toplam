const arr = [36.8, 36.6, 36.2, 36.2, 36.2, 36.2, 37.6, 36.8, 36.2, 36.4, 
36.4, 36.4, 37.2, 37.0, 37.0, 37.1, 36.8, 36.2, 36.2, 36.5, 36.4, 36.2, 36.6, 36.3, 36.4,
38.2, 36.2, 36.1, 36.2, 36.3, 36.1, 36.3, 36.4, 36.9, 37.1, 37.2, 38.0, 37.1, 37.2, 37.2,
36.9, 36.4, 37.2, 36.6, 36.9, 36.2, 36.8, 37.0, 37.2, 37.2, 37.1, 37.4, 37.2, 36.9, 36.8, 
36.6, 36.2, 36.2, 36.2, 36.2, 36.6, 36.8, 36.2, 36.4, 36.8, 36.6, 36.2, 36.2, 36.2, 36.2,
36.4, 36.4, 37.2, 37.0, 37.0, 37.1, 36.8, 36.2, 36.2, 36.5, 36.4, 36.2, 36.6, 36.3, 36.4,
38.2, 36.2, 36.1, 36.2, 36.3, 36.1, 36.3, 36.4, 36.9, 37.1, 37.2, 38.0, 37.1, 37.2, 37.2,
36.9, 36.4, 37.2, 36.6, 36.9, 36.2, 36.8, 37.0, 37.2, 37.2, 37.1, 37.4, 37.2, 36.9, 36.8,
36.4, 36.4, 37.2, 37.0, 37.0, 37.1, 36.8, 36.2, 36.2, 36.5, 36.4, 36.2, 36.6, 36.3, 36.4,
38.2, 36.2, 36.1, 36.2, 36.3, 36.1, 36.3, 36.4, 36.9, 37.1, 37.2, 38.0, 37.1, 37.2, 37.2,
36.9, 36.4, 37.2, 36.6, 36.9, 36.2, 36.8, 37.0, 37.2, 37.2, 37.1, 37.4, 37.2, 36.9,36.6,
36.4, 36.4, 37.2, 37.0, 37.0, 37.1, 36.8, 36.2, 36.2, 36.5, 36.4, 36.2, 36.6, 36.3, 36.4,
38.2, 36.2, 36.1, 36.2, 36.3, 36.1, 38.0, 37.1, 37.2, 37.2,
36.9, 36.4, 37.2, 36.6, 36.9, 36.2, 36.8, 37.0, 37.2, 37.2, 37.1, 37.4, 37.2, 36.9, 36.6]
let len = arr.length



let arrayXi = []
let arrayNi = []
let arrayNiStar = []
let arrayUi = []
let nm0 = 0
let nm0Before = 0
let nm0Last = 0
let nmeBefore = 0
let values1 = document.getElementById("qiymatlar1")
let values2 = document.getElementById("qiymatlar2")
let moments = document.getElementById("momentbody")

function printTable(xi, ni){
    let sumni=0
    // console.log("|  [ xi, xi+1 )          |  ni  |  wi  |  ni*  |");
    for (let i = 0; i < xi.length; i++) {
        sumni+=ni[i]
        // console.log("|  [", xi[i][0].toFixed(2), " , ", xi[i][1].toFixed(2), "  |", ni[i], "   |", ni[i]/100, " |", sumni, " |");
        arrayNiStar.push(sumni)
    }
}

function findMax(arr){
    let max = arr[0];

    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
        max = arr[i];
        }
    }
    return max
}

function findMin(arr){
    let min = arr[0];

    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < min) {
        min = arr[i];
        }
    }
    return min
}

function findK(n){
    return 1+(3.32*Math.log10(n))
}

function findH(arr){

    let min = findMin(arr)
    let max = findMax(arr)

    let k = findK(arr.length)

    return (max-min)/k
}

function setFirstTable(arr, h){
    let min = findMin(arr)
    let max = findMax(arr)
    let arrXi = []
    let arrNi = []
    
    for (let i = min; i <= max; i+=h) {
        arrXi.push([parseFloat(i.toFixed(2)), parseFloat((i+h).toFixed(2))])
        let ni = findNi(arr, i, i+h);
        arrNi.push(ni)
    }
    arrayNi = arrNi
    arrayXi = arrXi
    printTable(arrXi, arrNi)
}


function findX0(xi, ni){
    let max = findMax(ni)
    for (let i = 0; i < ni.length; i++) {
        if(ni[i]==max) {
            nm0 = max
            nm0Before = ni[i-1]
            nmeBefore = arrayNiStar[i-1]
            nm0Last = ni[i+1]
            return (xi[i][0].toFixed(2))
        }
    }
}

function findNi(arr, min, max){
    let sum = 0
    for (let i = 0; i < arr.length; i++) {
        if(min <= arr[i] && max > arr[i]){
            sum++;
        }       
    }
    return sum
}

function findm(x0, h){
    let m = (x0 + h*((nm0-nm0Before)/((nm0-nm0Before)+(nm0-nm0Last)))).toFixed(2)
    return parseFloat(m)
}

function findM(x0, h, len){
    let M = (x0 + (h * (((len/2) - nmeBefore)/nm0)))
    M = parseFloat(M.toFixed(2))
    return M
}

function findUi(xi, h, C){
    let arrUi = []
    for (let i = 0; i < xi.length; i++) {
        let ayirma = parseFloat((xi[i]-C).toFixed(2))
        let ui = parseFloat((ayirma/h).toFixed(2))
        arrUi.push(ui)
    }
    arrayUi = arrUi
}

function findXiDiapazon(xi){
    let res = []
    for (let i = 0; i < xi.length; i++) {
        let sum = xi[i][0] + xi[i][1]
        res.push(sum/2)
    }
    return res
}


function printLastTable(ni, nistar, xi, ui){
    let result = []
    
    for (let i = 0; i < ni.length; i++) {
        let res = []
        let ans1 = ni[i] * ui[i]
        let ans2 = ni[i] * (ui[i]*ui[i])
        let ans3 = ni[i] * (ui[i]*ui[i]*ui[i])
        let ans4 = ni[i] * (ui[i]*ui[i]*ui[i]*ui[i])
        res.push(ni[i], nistar[i], xi[i], ui[i], ans1, ans2, ans3, ans4)
        result.push(res)
    }
    return result
}

let k = findK(len);
let h = parseFloat((findH(arr)).toFixed(2))
setFirstTable(arr, h)
let x0 = parseFloat(findX0(arrayXi, arrayNi))

let m = findm(x0, h)
let M = findM(x0, h, len)
let C = x0;
let arrXiDia = findXiDiapazon(arrayXi)


findUi(arrXiDia, h, C);



let result = printLastTable(arrayNi, arrayNiStar, arrXiDia, arrayUi)




function findMoment(type, arr, len){
    let sum = 0
    switch(type){
        case 1:
            for (let i = 0; i < arr.length; i++) {
                sum+=arr[i][4]
            }
            break;
        case 2:
            for (let i = 0; i < arr.length; i++) {
                sum+=arr[i][5]
            }
            break;
        case 3:
            for (let i = 0; i < arr.length; i++) {
                sum+=arr[i][6]
            }
            break;
            case 4:
                for (let i = 0; i < arr.length; i++) {
                    sum+=arr[i][7]
                }
                break;
            }
            return sum/len
        }

let M1 = findMoment(1, result, len);
let M2 = findMoment(2, result, len);
let M3 = findMoment(3, result, len);
let M4 = findMoment(4, result, len);

function findMyu(type, h){
    switch(type){
        case 1:
            return 0;
        case 2:
            return (M2-(M1*M1))*(h*h);
        case 3:
            return (M3 - 3*M1*M2 + 2*(M1*M1*M1)) * (h*h*h)
        case 4:
            return (M4 - (4*M1*M3) + (6 * M2 * (M1*M1)) - (3 * (M1 * M1 * M1 * M1))) * (h*h*h*h)
    }
}

        
        
//-------------------------------------------------------
//HTML codes
        
function render(){
    document.getElementById('nbody').innerHTML =``
    for (let i = 0; i < arr.length; i+=10) {
        document.getElementById('nbody').innerHTML += ` 
        <tr> 
        <td>${arr[i]}</td>
        <td>${arr[i+1]}</td>
        <td>${arr[i+2]}</td>
        <td>${arr[i+3]}</td>
        <td>${arr[i+4]}</td>
        <td>${arr[i+5]}</td>
        <td>${arr[i+6]}</td>
        <td>${arr[i+7]}</td>
        <td>${arr[i+8]}</td>
        <td>${arr[i+9]}</td>
        </tr>`;
    }
}
render()


function renderLastTable(){
    document.getElementById('lastbody').innerHTML =``
    for (let i = 0; i < result.length; i++) {
        let el = result[i]
        document.getElementById('lastbody').innerHTML += ` 
        <tr>
        <td>${arrayXi[i]}</td>
        <td>${el[0]}</td>
        <td>${el[1]}</td>
        <td>${el[2]}</td>
        <td>${el[3]}</td>
        <td>${el[4]}</td>
        <td>${el[5]}</td>
        <td>${el[6]}</td>
        <td>${el[7]}</td>
        </tr>`;
    }
}
renderLastTable()

function renderFirstTable(){
    document.getElementById('firstbody').innerHTML =``
    for (let i = 0; i < result.length; i++) {
        let el = result[i]
        document.getElementById('firstbody').innerHTML += ` 
        <tr>
        <td>${arrayXi[i]}</td>
        <td>${el[0]}</td>
        <td>${el[0]/100}</td>
        <td>${el[1]}</td>
        </tr>`;
    }
}
renderFirstTable()

let htmlkh = document.createElement("h3");
htmlkh.textContent = "K: " + k + " h: " + h
values1.append(htmlkh)

let htmlX0 = document.createElement("h3");
let htmlMm = document.createElement("h3");
htmlX0.textContent = "х0: " + x0 + " C: " + C
values2.append(htmlX0)
values2.append(htmlMm)



function renderMomentTable(){
    document.getElementById('momentbody').innerHTML =``
        document.getElementById('momentbody').innerHTML += ` 
        <tr>
        <td>${M1}</td>
        <td>${M2}</td>
        <td>${M3}</td>
        <td>${M4}</td>
        </tr>`;
    
}
renderMomentTable()