let color = "black"

color = { color: "black" }

// console.log(color)

// fail style
// for (var i = 0; i < 5; i++) {
//     setTimeout(function() {
//         console.log(i)
//     }, 1000)
// }

// success style
// for (let i = 0; i < 5; i++) {
//     setTimeout(function() {
//         console.log(i)
//     }, 1000)
// }

const HEX = "#FF0000"

const arr = [1, 2, 3, 4, 5]

const obj = {a: 1}

arr.unshift(0) // [0, 1, 2, 3, 4, 5]

obj.b = 2 // {a: 1, b: 2}

// HEX = "#00FF00"

document.querySelector("h1").style.color = HEX

// function getAge(year) {
//     const current = new Date().getFullYear()
//     return current - year
// }

// const calculateAge = (year) => {
//     const current = new Date().getFullYear()
//     return current - year
// }

// const getAge = year => {
//     const current = new Date().getFullYear()
//     return current - year
// }

// const getAge = year => {
//     return new Date().getFullYear() - year
// }

// const getAge = year => new Date().getFullYear() - year

// const logAge = year => console.log(new Date().getFullYear() - year)

//  const person = {
//         age: 25,
//         name: "Max",
//         logNameWithTimeout: function()  {
//             window.setTimeout(function() {
//                 console.log(this.name)
//             }.bind(this), 1000)
//         }
//     }

//  const person = {
//         age: 25,
//         name: "Max",
//         logNameWithTimeout()  {
//             window.setTimeout(() => {
//                 console.log(this.name)
//             }, 1000)
//         }
//     }

const createPost = (title, text, date = new Date().toLocaleDateString()) => {
    // date = date || new Date().toLocaleDateString()
    // return {
    //     title: title,
    //     text: text,
    //     date: date
    // }
    return { title, text, date }
}

const post = createPost("Hello", "How are you?",)

// console.log(post)

// const createCar = (name, model) => {
//     return {name, model }
// }

const createCar = (name, model) => ({name, model})

const ford = createCar("Ford", "Focus")

// console.log(ford)

const yearFiled = "year"

const bmw = {
    name: "BMW",
    ['model']: "X6",
    [yearFiled]: 2018,
    logFields() { 
        // old style
        // console.log(this.name, this.model, this.yearFiled)
        // new style
        const {name, model, yearFiled} = this
        // console.log(name, model, yearFiled)
    }
}

// console.log(bmw)

// old style
// const year = bmw.year
// new style
const {year} = bmw

const form = document.querySelector("form")

form.addEventListener("submit", event => {
    event.preventDefault()

    const title = form.title.value
    const text = form.text.value
    const description = form.description.value

    // for spread operator
    // saveForm({title, text, description}) 
    // for rest operator
    saveForm(title, text, description) 

    console.log(title, text)
})

// // function saveForm(data) {
// // function saveForm({title, text, description}) {
// function saveForm(data) {
//     // const formData = {
//     //     date: new Date().toLocaleDateString(),
//     //     title: data.title,
//     //     text: data.text,
//     //     description: data.description
//     // }

//     // const {title, text, description} = data

//     // const formData = {
//     //     date: new Date().toLocaleDateString(),
//     //     title, text, description
//     // }

//     // spread operator
//     const formData = {...data, date: new Date().toLocaleDateString()}

//     console.log("Form data: ", formData)
// }

// rest operator
function saveForm(...args) {
    
    const [title, text, description] = args

    const formData = {
        date: new Date().toLocaleDateString(),
        title, text, description
        }

    console.log("Form data: ", formData)
}