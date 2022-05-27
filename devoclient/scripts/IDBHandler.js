async function IDBHandler() {
    let idbPromise = new Promise(function(resolve, reject){
        // Check IDB support
        if(!('indexedDB' in window)){
            reject("IndexedDB is not supported in this browser");
        }
    
        var request = indexedDB.open("DevosDB", 1);
        request.onerror = function(event){
            reject("Error opening IDB");
        }
        
        request.onupgradeneeded = function(){
            db = request.result;
            const store = db.createObjectStore("ballots", { keyPath: "id" });
            store.createIndex("address", ["address"], {unique: true});
        }
    
        request.onsuccess = function(event){
            console.log("Opened IDB on DevosDB");
            db = request.result;
            resolve(true);
        }
    });
    let result = await idbPromise;
}

export default IDBHandler;