// Async

// setTimeout(function() {
//   console.log('setTimeout');
// }, 2000);

// var counter = 0

// var interval = setInterval(function() {
//   console.log(++counter);
// }, 1000 * 2);

// setTimeout(function() {
//   clearInterval(interval);
// }, 1000 * 10);


/*
    Client -> Server -> Database -> Server -> Client
*/


//!!! Старый подход (callbacks)

// console.log('Клиент: хочу получить список пользователей');
// console.log('...');
// setTimeout(function() {
//   console.log('Сервер: запрашиваю список пользователей в БД');
//   console.log('...');
//   setTimeout(function() {
//     console.log('БД: формирую список пользователей');
//     console.log('...');
//     setTimeout(function() {
//       console.log('Сервер: трансформирую данные для клиента');
//       console.log('...');
//       setTimeout(function() {
//         console.log('Клиент: получил данные и отображаю их');
//       }, 1000);
//     }, 500);
//   }, 500);
// }, 1000);

//!!! promise

// console.log('Клиент: хочу получить список пользователей');
// console.log('...');

// var promise = new Promise(function(resolve, reject) {
//   setTimeout(function() {
//     console.log('Сервер: запрашиваю список пользователей в БД');
//     console.log('...');
//     resolve();
//   }, 1000);
// })
// .then(function() {
//   return new Promise(function(resolve, reject) {
//     setTimeout(function() {
//         var users = [
//             {uid: 'id1', name: 'Max'},
//             {uid: 'id2', name: 'Elena'}
//         ]
//         // reject('БД: не смогла получить список пользователей');
//         console.log('БД: формирую список пользователей');
//         console.log('...');
//         resolve(users);
//     }, 500)
//   })
// })
// .then(function(dbUsers) {
//   return new Promise(function(resolve, reject) {
//     setTimeout(function() {
//         console.log('Сервер: трансформирую данные для клиента');
//         console.log('...');
//         var users = dbUsers.map(function(user) {
//             return {
//                 id: user.uid,
//                 firstName: user.name,
//                 timestamp: Date.now()
//             }
//         })
//         resolve(users);
//     }, 500)
//   })
// })
// .then(function(users) {
//     return new Promise(function(resolve, reject) {
//         setTimeout(function() {
//             console.log('Клиент: получил данные и отображаю их');
//             console.log('...');
//             console.log(users);
//             resolve();
//     }, 2000)
//   })
// })
// .catch(function(error) {
//     console.error(error);
// })
// .finally(function() {
//     console.log('Finally');
// })

//!!! fetch

// document.querySelector('#load').addEventListener('click', load)

// function load() {
//     var url = 'https://jsonplaceholder.typicode.com/users';

//     fetch(url)
//         .then(function(response) {
//             return response.json();
//         })
//         .then(function(data) {
//             var ul = document.querySelector('#list');

//             var html = data.map(function(item) {
//                 return '<li>' + item.id + ' ' + item.name + ' (' + item.email + ')</li>';
//             }).join(' ');

//             ul.insertAdjacentHTML('afterbegin', html);
//         })
//         .catch(function(error) {
//             console.log(error);
//         });
// }

//!!! async await

// document.querySelector('#load').addEventListener('click', load)

// async function load() {
//     var url = 'https://jsonplaceholder.typicode.com/users'

//     var response = await fetch(url)
//     var data = await response.json()

//     var html = data.map(function(item) {
//         return '<li>' + item.id + ' ' + item.name + ' (' + item.email + ')</li>'
//     }).join(' ')

//     document.querySelector('#list').insertAdjacentHTML('afterbegin', html)
// }

//!!! Promise

function sleep(ms) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve()
        }, ms)
    })
}

// sleep(1500).then(function() {
//     console.log('After 1.5 sec')
// })

// sleep(3000).then(function() {
//     console.log('After 3 sec')
// })

// Promise.all([sleep(1500), sleep(3000)]).then(function() {
//     console.log('All promises')
// })

// Promise.race([sleep(1500), sleep(3000)]).then(function() {
//     console.log('race promises')
// })

var p1 = sleep(1500).then(function() {
    return {
        name: 'promise 1500'
    }
})

var p2 = sleep(3000).then(function() {
    return {
        name: 'promise 3000'
    }
})

var p3 = sleep(4000).then(function() {
    return {
        name: 'promise 4000'
    }
})


// Promise.all([p1, p2, p3]).then(function(data) {
//     console.log('All promises', data)
// })

// Promise.race([p1, p2, p3]).then(function(data) {
//     console.log('race promises', data)
// })

async function start() {
    var dataAll = await Promise.all([p1, p2, p3])
    console.log('dataAll', dataAll)

    var dataRace = await Promise.race([p1, p2, p3])
    console.log('dataRace', dataRace)
}

start()

//!!! Custom Promise
// var promise = new Promise(function(resolve, reject) {
//     setTimeout(() => {
//         resolve(2);
//     }, 1000);
// })

// promise
//     .then(num => num * 2) 
//     .catch(err => console.log(err))
//     .then(num => num * 3)
//     .finally(() => console.log('finally'))

class MyPromise {
    constructor(callback) {
        this.onCatch = null;
        this.onFinally = null;
        this.thenCbs = [];
        this.isRejected = false;

        function resolver(data) {
            // if (this.thenCbs.length) {
            //     this.thenCbs.shift()(data);
            // }
            if (this.isRejected) {
                return;
            }

            this.thenCbs.forEach(cb => {
                data = cb(data);
            })

            if (this.onFinally) {
                this.onFinally();
            }
        }

        function rejecter(error) {
            this.isRejected = true;

            if (this.onCatch) {
                this.onCatch(error);
            }

            if (this.onFinally) {
                this.onFinally();
            }
        }

        callback(resolver.bind(this), rejecter.bind(this));
    }

    then(cb) {
        this.thenCbs.push(cb);
        return this;
    }

    catch(cb) {
        this.onCatch = cb;
        return this;
    }

    finally(cb) {
        this.onFinally = cb;
        return this;
    }
}

const promise = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        reject('Some error')
        resolve(2);
    }, 1000);
})

promise
    .then(num => num * 2) 
    .catch(err => console.error(err))
    .then(num => num * 3)
    .finally(() => console.log('finally'))
    .then(num => console.log('Done!', num))