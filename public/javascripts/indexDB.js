
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
            console.log("open indexDB success");
            resolve(db);
        };

        request.onerror = function (event) {
            console.log("failed to open indexDB");
        };

        request.onupgradeneeded = function (event) {

            console.log("onupgradeneeded");
            db = event.target.result;
            var objectStore;

            objectStore = db.createObjectStore("sighting", {
                keyPath: "sightingId",
                autoIncrement: true
            });

            objectStore.createIndex("date", "date", {unique: false});
            objectStore.createIndex("identification", "identification", {unique: false});
            objectStore.createIndex("location", "location", {unique: false});
            objectStore.createIndex("user", "user", {unique: false});
            objectStore.createIndex("description", "description", {unique: false});
            objectStore.createIndex("img", "img", {unique: false});
            objectStore.createIndex("password", "password", {unique: false});
        };
    });
}