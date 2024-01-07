// number, string, boolean, null, indefined
// object

var carObj = {
    name: "Fiat",
    model: "500",
    weight: "850kg",
    color: "white"
}

// car.__proto__ = Object.prototype
// [] => Array => Object

function Car(name, year, model, weight, color) {
    this.name = name
    this.year = year
    this.model = model
    this.weight = weight
    this.color = color
}

Car.prototype.getAge = function() {
    return new Date().getFullYear() - this.year
}

var ford = new Car("Ford", 2015, "Mustang", "1500kg", "red")

var bmw = Object.create({
    getAge: function() {
        return new Date().getFullYear() - this.year
    },
    calculateDistancePerYear: function() {
        Object.defineProperty(this, "distancePerYear", {
            value: Math.ceil(this.distance / this.getAge()),
            enumerable: false,
            writable: false,
            configurable: false
        })
    }
}, {
    name: {
        value: "BMW",
        enumerable: true,
        writable: false,
        configurable: false
        },
    model: {
        value: "X6",
        enumerable: true,
        writable: false,
        configurable: false
        },
    year: {
        value: 2018,
        enumerable: true,
        writable: false,
        configurable: false
        },
    distance: {
        value: 12000,
        enumerable: true,
        writable: true,
        configurable: false
        },
    age: {
        enumerable: true,
        get: function() {
            console.log("Получаем возраст")
            return new Date().getFullYear() - this.year
        },
        set: function() {
            console.log("Устанавливаем значение")
        }
    }
})

// old style
// for (var key in bmw) {
//     if (bmw.hasOwnProperty(key)) {
//         console.log(key, bmw[key])
//     }
// }

// new style
// var keys = Object.keys(bmw).forEach(function(key) { 
//     console.log(bmw[key])
// })

var createCounter = function(counterName) {
    var counter = 0
    return {
        increment: function() {
            counter++
        },
        decrement: function() {
            counter--
        },
        getCounter: function() {
            return counter
        },
        counterName: counterName
    }
}

var counterA = createCounter("Counter A")
var counterB = createCounter("Counter B")

counterA.increment()
counterA.increment()
counterA.increment()

counterB.decrement()
counterB.decrement()

var person = {
    name: "Max",
    age: 30,
    job: "Frontend",
    displayInfo: function(ms) {
        // old style
        // var self = this // замыкание
        // setTimeout(function() {
        //     console.log("Name: ", self.name)
        //     console.log("Age: ", self.age)
        //     console.log("Job: ", self.job)
        // }, ms)

        // new style
        setTimeout(function() {
            console.log("Name: ", this.name)
            console.log("Age: ", this.age)
            console.log("Job: ", this.job)
        }.bind(this), ms)

    }
}

// person.displayInfo(person, 5000)

function printObject(objName) {
    console.log("Printing object: ", objName)
    for (var key in this) {
        if (this.hasOwnProperty(key)) {
            console.log("[" + key + "]", this[key])
        }
    }
}

var person = {
    firstName: "Max",
    job: "Backend",
    age: 29,
    friends: ["Elena", "Igor"]
}

var car = {
    name: "Ford",
    model: "Focus",
    year: 2017
}

var printPerson = printObject.bind(person)
// printPerson("Person")

// printObject.call(car, "Car")

// printObject.apply(person, ["Person"])

var array = [1, 2, 3, 4, 'Hello']

function multBy(arr, n) {
    return arr.map(function(i) {
        if (typeof i === "string") {
            return i + i
        }
        return i * n
    })
}

Array.prototype.multBy = function(n) {
    return this.map(function(i) {
        if (typeof i === "string") {
            return i + i
        }
        return i * n
    })
}