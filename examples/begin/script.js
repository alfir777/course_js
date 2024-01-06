// class -> .CLASS_NAME
// id -> #ID
// tag -> TAG_NAME

var button = document.querySelector('button')
var h1 = document.querySelector('h1')
var input = document.querySelector('input')
var divs = document.querySelectorAll('div')
var link = document.querySelector('a')
var p = document.querySelectorAll('p')
document.querySelector('#alert').addEventListener('click', function() {
    alert('clicked')
})
document.querySelector('#promt').addEventListener('click', function() {
    var age = prompt('how old are you?', 5)
    if (age > 18) {
        alert('you can enter')
    } else {
        alert('you can not enter')
    }
})
document.querySelector('#confirm').addEventListener('click', function() {
    var decision = confirm('are you sure?')
    if (decision) {
        alert('you clicked ok')
    } else {
        alert('you clicked cancel')
    }
})
document.querySelector('#wrapper').addEventListener('click', function(event) {
    tagName = event.target.tagName.toLowerCase()

    if (tagName === 'p') {
        event.target.style.color = 'red'
    }

    if (event.target.classList.contains('color')) {
        event.target.style.color = 'blue'
    }
})

document.querySelector('#save').addEventListener('click', function(event) {
    var input = document.querySelector('#inputSave').value
    var obj = {
        text: input
    }
    localStorage.setItem('headerText', JSON.stringify(obj))
})

document.addEventListener('DOMContentLoaded', function() {

    var obj

    try {
        var obj = JSON.parse(localStorage.getItem('headerText'))
    } catch (e) {
        obj = {}
    }

    if (obj && obj.text && obj.text.trim()) {
        document.querySelector('h1').textContent = obj.text
    }
})


function buttonHandler() {
    console.log('clicked')
    h1.textContent = input.value
}

h1.addEventListener('mouseenter', function() {
    this.style.color = 'red'
    this.style.backgroundColor = 'black'
})

h1.addEventListener('mouseleave', function() {
    this.style.color = 'black'
    this.style.backgroundColor = 'white'
})

button.addEventListener('click', buttonHandler)

for (var i = 0; i < divs.length; i++) {
    divs[i].addEventListener('click', function(event) {
        event.stopPropagation()
        this.style.backgroundColor = 'black'
        console.log(this.getAttribute('id'));
        console.log(event);
    })
}

function handleLinkClick(event) {
    event.preventDefault()
    console.log(event.target.getAttribute('href'));
    var div = divs[0]
    div.style.backgroundColor = 'yellow'
    setTimeout(function() {
        div.style.backgroundColor = 'white'
    }, 1000)
}

link.addEventListener('click', handleLinkClick)


for (var i = 0; i < p.length; i++) {
    p[i].addEventListener('click', function(event) {
        event.target.style.color = 'red'
    })
}

// console.log('after error')
// console.warn('warning')
// console.info('info')
// console.error('error')

// throw new Error('error message')

// var str = '1,2,3,4,5,6,7,8,9,10'
// var array = str.split(',')

// // console.log(array.join(';'))
// // console.log(array.reverse())

// array.splice(0, 2, '11', '22')

// var newArray = array.concat([11, 22])

// console.log(newArray)

// var objArr = [
//     { name: 'Denis', age: 29 },
//     { name: 'Ivan', age: 20 },
//     { name: 'Anna', age: 18 }
// ]

// var foundPerson = objArr.find(function(person) {
//     return person.age === 20
// })

// console.log(foundPerson)

// var oddArray = [1, 2, 3, 4, 5, 6, 7, 8, 9].filter(function(i) {
//     return i % 2 !== 0
// })

// console.log(oddArray)

// var numArray = array.map(function(i) {
//     return parseInt(i)
// }  )   

// console.log(numArray)

// // var sum = numArray.reduce(function(total, i) {
// //     return total + i
// // })

// var sum = numArray.reduce(function(total, i) {
//     return total + i
// })

// console.log(sum)

// var person = {
//     name: 'Denis',
//     age: 29,
//     job: 'frontend',
//     car: {
//         model: 'ford'
//     }
// }

// console.log(JSON.stringify(person))

// var date = new Date()