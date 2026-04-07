"use strict";

//Not for double pair brackets & roots & Square:
//Next update this.And by using while loop, Regex and Parser.

let number = document.querySelectorAll(".number");
let operatorCls = document.querySelectorAll(".operator");
let clear = document.querySelector("#clear");
let equal = document.querySelector("#equl");
let display = document.querySelector("#display");
let point = document.querySelector("#point");
let cancel = document.querySelector("#cancel");
let openBracket = document.querySelector("#openBraket");
let closeBracket = document.querySelector("#closeBraket");

let total = "";
let result = "";

// Clear C button:
clear.addEventListener("click", (e) => {
    display.value = "";
    total = "";
    result = "";
    console.clear();
});

// Operator (+-*/) button:
operatorCls.forEach((op) => {
    op.addEventListener("click", (e) => {
        let operator = op.textContent;
        total += operator;
        display.value += operator;
        display.scrollLeft = display.scrollWidth;
        console.log(operator);
    });
});

// Number button (1,2,3,4,5,6,7,8,9):
number.forEach((numberCls) => {
    numberCls.addEventListener("click", (e) => {
        let num = numberCls.textContent; //5,6
        total += num;
        console.log(num);
        display.value += num;
        display.scrollLeft = display.scrollWidth;
    });
});

//Point button:
point.addEventListener("click", (e) => {
    let dot = point.textContent;
    total += dot;
    console.log(dot);
    display.value += dot;
    display.scrollLeft = display.scrollWidth;
});

//Cancel button:
cancel.addEventListener("click", () => {
    console.log("Before cancel Total: ", total);
    total = total.slice(0, -1);
    console.log("After cancel Total: ", total);
    console.log("Before cancel Display", display.value);
    display.value = "";
    display.value += total;
    console.log("After cancel Display", display.value);
});

//Parenthesis():
openBracket.addEventListener("click", () => {
    total += openBracket.textContent;
    console.log(openBracket.textContent);
    display.value += openBracket.textContent;
});
closeBracket.addEventListener("click", () => {
    total += closeBracket.textContent;
    console.log(closeBracket.textContent);
    display.value += closeBracket.textContent;
});

//Equal to (=) button:
equal.addEventListener("click", (e) => {
    console.log("Total:", total);
    //Using Function Constructor:
    // result =new Function("return " + total)(); 

    //Using eval() function buil-in:
    // result =eval(total);

    //Using Math.js:
    // result=math.evaluate(total);

    //Using parser:
    // let total2 = total;
    // console.log("Before Regex Total2 :", total2);
    // total2 = total2.match(/\((\d+(\.\d+)?|[/*+-])+\)/g);
    // console.log("After Regex Total2 :", total2);

    // for (let i = 1; i < total.length; i++) {
    //     if (total[i] === "*") {
    //         result = Number(total[i - 1]) * Number(total[i + 1]);
    //         total.splice(i - 1, 3, result);
    //         console.log(total);
    //         i--;
    //     }
    // }

    let indexNum1 = 0;
    let indexNum2 = 0;
    let arr = [];

    total = total.match(/\(|\d+(\.\d+)?|[/*+-]|\)/g);
    console.log(total);

    //Bracket loop Start
    // Checking and getting index number of "(":
    for (let i = 0; i < total.length; i++) {
        for (let i = 0; i < total.length; i++) {
            if (total[i] === "(") {
                indexNum1 += i;
            }
        }
        // Checking and getting index number of ")":
        for (let i = 0; i < total.length; i++) {
            if (total[i] === ")") {
                indexNum2 += i;
            }
        }

        //New Arr create for inside of Bracket Calculation:
        for (let i = indexNum1 + 1; i < indexNum2; i++) {
            arr.push(total[i]);
            console.log("arr: ", arr);
        }
        let finalArr = [...arr];
        console.log("finalArr: ", finalArr);

        //Bracket */ Calculation:
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === "*") {
                result = Number(arr[i - 1]) * Number(arr[i + 1]);
                arr.splice(i - 1, 3, result);
                console.log(arr);
                i--;
            }
            else if (arr[i] === "/") {
                result = Number(arr[i - 1]) / Number(arr[i + 1]);
                arr.splice(i - 1, 3, result);
                console.log(arr);
                i--;
            }
        }
        //Bracket +- Calculation:
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === "+") {
                result = Number(arr[i - 1]) + Number(arr[i + 1]);
                arr.splice(i - 1, 3, result);
                console.log(arr);
                i--;
            } else if (arr[i] === "-") {
                result = Number(arr[i - 1]) - Number(arr[i + 1]);
                arr.splice(i - 1, 3, result);
                console.log(arr);
                i--;
            }
        }

        console.log("Before total :", total);
        //Bracket value convert in string and add to Total array: 
        for (let i = 0; i < total.length; i++) {
            if (total[i] === "(") {
                total.splice(i, finalArr.length + 2, arr.join());
            }
        }

    }   // End of Full 
    //.........................................................
    console.log("After total: ", total);

    //Calculation out of bracket */:
    for (let i = 0; i < total.length; i++) {
        if ((total[i] === "*") || (total[i] === "/")) {
            if (total[i] === "*") {
                result = Number(total[i - 1]) * Number(total[i + 1]);
                total.splice(i - 1, 3, result);
                console.log(total);
                i--;
            } else {
                result = Number(total[i - 1]) / Number(total[i + 1]);
                total.splice(i - 1, 3, result);

                console.log(total);
                i--;
            }
        }
    }
    //Calculation out of bracket +-:
    for (let i = 0; i < total.length; i++) {
        if ((total[i] === "+") || (total[i] === "-")) {
            if (total[i] === "+") {
                result = Number(total[i - 1]) + Number(total[i + 1]);
                total.splice(i - 1, 3, result);

                console.log(total);
                i--;
            } else {
                result = Number(total[i - 1]) - Number(total[i + 1]);
                total.splice(i - 1, 3, result);

                console.log(total);
                i--;
            }
        }
    }
        //Result Output: 
        total=total.join("");
        console.log(total);
        total = Number(total).toFixed(2);
        console.log(total);
        display.value += ` = ${total} `;
        display.scrollLeft = display.scrollWidth;
    
});
