/* When the page loads, show the first 50 monsters. /X 
Each monster's name, age, and description should be shown. /X
Above your list of monsters, you should have a form to create /X
a new monster. You should have fields for name, age, and /X
description, and a 'Create Monster Button'. /X
When you click the button, the monster should be added to the /X
list and saved in the API. /X

At the end of the list of monsters, show a button. 
When clicked, the button should load the next 50 monsters 
and show them.
 */


 //make fetch request, make sure we are getting objs correctly /X
 //locate element we will be appending monsters to /X
 //create monster elements, append to parent element /X
 //perform iterarively for fetched objs /X

 const monstList = document.querySelector("#monster-container")
 const formDiv = document.querySelector("#create-monster")
 

 
 
 fetch(`http://localhost:3000/monsters/?_limit=5&`)
    .then(resp => resp.json())
    .then(monsterObjs => {
        console.log(monsterObjs)
        monsterObjs.forEach(monster => {renderMonster(monster)})
    })


function renderMonster(monstObj){
    const monstDiv = document.createElement("div")
    const monstName = document.createElement("h3")
    const monstAge = document.createElement("h5")
    const monstDesc = document.createElement("p")
    monstName.textContent = `Name: ${monstObj.name}`
    monstAge.textContent = `Age: ${monstObj.age}`
    monstDesc.textContent = `Description: ${monstObj.description}`
    monstDiv.appendChild(monstName)
    monstDiv.appendChild(monstAge)
    monstDiv.appendChild(monstDesc)
    //using prepend so I can see my added monster at the top of the list
    monstList.prepend(monstDiv)
}

//target element we will be adding form to /X
//create form elements - name, age, description, create monster btn /X
//append to doc /X
//add event listener to form /X
//create post request for form /X
//Render new monster /X

function renderMonstForm(){
    const monstForm = document.createElement('form')
    const formName = document.createElement('input')
    const formAge = document.createElement('input')
    const formDesc = document.createElement('input')
    const formButton = document.createElement('button')
    monstForm.id = "monster-form"
    formName.name = "name"
    formAge.name = "age"
    formDesc.name = "description"
    formButton.id = "form-button"
    formName.placeholder = "Name"
    formAge.placeholder = "Age"
    formDesc.placeholder = "Description"
    formButton.textContent = "Create Monster"
    monstForm.appendChild(formName)
    monstForm.appendChild(formAge)
    monstForm.appendChild(formDesc)
    monstForm.appendChild(formButton)
    formDiv.appendChild(monstForm)
}

renderMonstForm()

const monstForm = document.querySelector('#monster-form')
monstForm.addEventListener("submit",function(event){
    event.preventDefault()
    
    const newMonst = {
        name: event.target.name.value,
        age: parseFloat(event.target.age.value),
        description: event.target.description.value
    }
    //debugger

    fetch("http://localhost:3000/monsters", {
        method: 'POST',
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(newMonst)
    })
    .then(response => response.json())
    .then(newMonst =>{
        console.log(`Success! ${newMonst}`)
        renderMonster(newMonst)
    })
    monstForm.reset()
})

//locate elements to be targeted - both buttons! /X
//add event listener to elements /X
//conditional page logic - clear HTML with each fetch /X

const forward = document.querySelector('#forward')
const back = document.querySelector("#back")
let page = 1

forward.addEventListener("click", function(){
    page++
    fetch(`http://localhost:3000/monsters/?_limit=5&_page=${page}`)
    .then(resp => resp.json())
    .then(monsterObjs => {
        console.log(monsterObjs)
        monstList.innerHTML = ""
        monsterObjs.forEach(monster => {renderMonster(monster)})
    })
})

back.addEventListener("click", function(){
    if (page > 1){
        page --
        fetch(`http://localhost:3000/monsters/?_limit=5&_page=${page}`)
        .then(resp => resp.json())
        .then(monsterObjs => {
            console.log(monsterObjs)
            monstList.innerHTML = ""
            monsterObjs.forEach(monster => {renderMonster(monster)})
        })
    } else {
        alert("You are at the first page.")
    }
})
