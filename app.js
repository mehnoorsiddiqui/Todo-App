function getAndUpdate(){
    console.log("Updating List...");
    tit = document.getElementById('title').value;
    //if there is no key whose name is itemsJson then make it but first push the value of input into an 
    //array  named as itemJsonArray
    if (localStorage.getItem('itemsJson')==null){
        itemJsonArray = [];
        itemJsonArray.push(tit);
        localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
    }
    //if there is any key name itemsJson then change this string into an array named as itemJsonArray
    else{
        itemJsonArrayStr = localStorage.getItem('itemsJson')
        itemJsonArray = JSON.parse(itemJsonArrayStr);
        itemJsonArray.push(tit);
        localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray))
    }
    update();
}

function update(){
    //if there is no key whose name is itemsJson then make it but first push the value of input into an 
    //array  named as itemJsonArray
    if (localStorage.getItem('itemsJson')==null){
        itemJsonArray = [];
        localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
    }
    //if there is any key name itemsJson then change this string into an array named as itemJsonArray
    else{
        itemJsonArrayStr = localStorage.getItem('itemsJson')
        itemJsonArray = JSON.parse(itemJsonArrayStr);
        localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray))
    }
    //Populate the table
    let tableBody=document.getElementById("tableBody");
    let str="";
    itemJsonArray.forEach((element,index) => {
        str+=` <tr class="noteCard">
        <th scope="row">${index+1}</th>
        <td>${element}</td>
        <td><button class="btn btn-success ">Edit</button> </td>
        <td><button class="btn btn-danger" onclick="deleted(${index})">Delete</button> </td>
      </tr>`;
    });
    tableBody.innerHTML=str;
}

let add=document.getElementById("add");
add.addEventListener("click",getAndUpdate);
update();
function deleted(itemIndex){
    console.log("Delete", itemIndex);
    itemJsonArrayStr = localStorage.getItem('itemsJson')
    itemJsonArray = JSON.parse(itemJsonArrayStr);
    // Delete itemIndex element from the array
    itemJsonArray.splice(itemIndex, 1);
    localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
    update();
}
let search = document.getElementById("searchTxt");
search.addEventListener("input", function(e) {
    let searchVal = search.value.toLowerCase();
    let noteCards  = document.getElementsByClassName("noteCard");
    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName("td")[0].innerText;
        if (cardTxt.includes(searchVal)) {
            element.style.display = "table-cell";
        }
        else {
            element.style.display = "none";
        }
    })
});