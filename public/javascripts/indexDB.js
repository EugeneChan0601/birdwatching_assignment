
function openDB(dbName, version = 1) {
    return new Promise((resolve, reject) => {
        var indexedDB =
            window.indexedDB ||
            window.mozIndexedDB ||
            window.webkitIndexedDB ||
            window.msIndexedDB;
        let db;

        const request = indexedDB.open(dbName, version);

        request.onsuccess = function (event) {
            db = event.target.result;
            console.log("Index DB opened successfully.");
            resolve(db);
        };

        request.onerror = function (event) {
            console.log("Failed to open indexDB.");
        };

        request.onupgradeneeded = function (event) {

            console.log("DB updating");
            db = event.target.result;
            var objectStoreSighting;
            var objectStoreChat;

            objectStoreSighting = db.createObjectStore("sighting", {
                keyPath: "id",
                autoIncrement: true
            });

            objectStoreSighting.createIndex("date", "date", {unique: false});
            objectStoreSighting.createIndex("identification", "identification", {unique: false});
            objectStoreSighting.createIndex("location", "location", {unique: false});
            objectStoreSighting.createIndex("user", "user", {unique: false});
            objectStoreSighting.createIndex("description", "description", {unique: false});
            objectStoreSighting.createIndex("img", "img", {unique: false});
            objectStoreSighting.createIndex("password", "password", {unique: false});

            objectStoreChat = db.createObjectStore("chat", {
                keyPath: "id",
                autoIncrement: true
            });

            objectStoreChat.createIndex("room_num", "room_num", {unique: false});
            objectStoreChat.createIndex("user", "user", {unique: false});
            objectStoreChat.createIndex("text", "text", {unique: false});
        };
    });
}

// function  addData(db, storeName, data) {
//     var request = db
//         .transaction([storeName],"readwrite")
//         .objectStore(storeName)
//         .add(data)
//     request.onsuccess = function (event) {
//         console.log("Data has been added to "+storeName+".")
//     }
//     request.onerror = function (event) {
//         console.log("Failed to add data.")
//     }
// }

function  addData(storeName, data) {
    var db
    var request = indexedDB.open("helloIndexDB",1)
    request.onsuccess = function () {
        db = request.result
        var transaction = db.transaction([storeName],"readwrite")
        var objectStore = transaction.objectStore(storeName)
        var requestAdd = objectStore.add(data)
        requestAdd.onsuccess = function (event) {
            console.log("Data has been added to "+storeName+".")
        }
        requestAdd.onerror = function (event) {
            console.log("Failed to add data.")
        }
    }
}

// function getDataById(db, storeName, id) {
//     return new Promise((resolve,reject) => {
//         var transaction = db.transaction([storeName])
//         var objectStore = transaction.objectStore(storeName)
//         var request = objectStore.get(id)
//
//         request.onsuccess = function (event) {
//             console.log("Success! "+request.result)
//             resolve(request.result)
//         }
//         request.onerror = function (event) {
//             console.log("Failed to get data.")
//         }
//     })
// }

function getDataById(storeName, id) {
    return new Promise((resolve,reject) => {
        var db
        var request = indexedDB.open("helloIndexDB",1)
        request.onsuccess = function () {
            db = request.result
            var transaction = db.transaction([storeName])
            var objectStore = transaction.objectStore(storeName)
            var requestGet = objectStore.get(id)
            requestGet.onsuccess = function (event) {
                console.log("Success! "+request.result)
                resolve(request.result)
            }
            requestGet.onerror = function (event) {
                console.log("Failed to get data.")
            }
        }
    })
}

// function getDataByIndex(db, storeName, indexName, indexValue) {
//     var store = db.transaction(storeName, "readwrite").objectStore(storeName);
//     var request = store.index(indexName).get(indexValue);
//     request.onerror = function () {
//         console.log("Failed to get data.");
//     };
//     request.onsuccess = function (e) {
//         var result = e.target.result;
//         console.log("Success! ", result);
//     };
// }

function getDataByIndex(storeName, indexName, indexValue) {
    var db
    var request = indexedDB.open("helloIndexDB",1)
    request.onsuccess = function () {
        db = request.result
        var store = db.transaction(storeName, "readwrite").objectStore(storeName);
        var requestGet = store.index(indexName).get(indexValue);
        requestGet.onerror = function () {
            console.log("Failed to get data.");
        };
        requestGet.onsuccess = function (e) {
            var result = e.target.result;
            console.log("Success! ", result);
        };
    }
}

// function getAllData(db, storeName) {
//     let list = [];
//     var store = db
//         .transaction(storeName, "readwrite")
//         .objectStore(storeName);
//     var request = store.openCursor();
//     request.onsuccess = function (e) {
//         var cursor = e.target.result;
//         if (cursor) {
//             list.push(cursor.value);
//             cursor.continue();
//         } else {
//             console.log("Data: ", list);
//         }
//     };
// }

function getAllData(storeName) {
    var db
    var request = indexedDB.open("helloIndexDB",1)
    request.onsuccess = function () {
        db = request.result
        let list = [];
        var store = db
            .transaction(storeName, "readwrite")
            .objectStore(storeName);
        var requestGet = store.openCursor();
        requestGet.onsuccess = function (e) {
            var cursor = e.target.result;
            if (cursor) {
                list.push(cursor.value);
                cursor.continue();
            } else {
                console.log("Data: ", list);
            }
        };
    }
}

// function updateDB(db, storeName, data) {
//     var request = db
//         .transaction([storeName], "readwrite")
//         .objectStore(storeName)
//         .put(data);
//
//     request.onsuccess = function () {
//         console.log("Update succeed.");
//     };
//     request.onerror = function () {
//         console.log("Update failed");
//     };
// }

function updateDB(storeName, data) {
    var db
    var request = indexedDB.open("helloIndexDB",1)
    request.onsuccess = function () {
        db = request.result
        var requestUpdate = db
            .transaction([storeName], "readwrite")
            .objectStore(storeName)
            .put(data);

        requestUpdate.onsuccess = function () {
            console.log("Update succeed.");
        };
        requestUpdate.onerror = function () {
            console.log("Update failed");
        };
    }
}

function closeDB(db) {
    db.close();
}