# angular-singleton-promise
Protects your asynchronous code against multiple identical requests. 

Basically, what it does is to help you avoid constructs like this:

```javascript
var customerSearchDeferred = null;
var customerSearchInProgress = false;

function getCustomers(filter) {
    if (customerSearchInProgress) {
        return customerSearchDeferred.promise;
    }
    customerSearchDeferred = $q.defer();
    customerSearchInProgress = true;
    DataService.search("api/customers", filter)
        .then(function (data) {
            customerSearchDeferred.resolve(data.results);
        })
        .catch(function (data) {
            customerSearchDeferred.reject(data);
        })
        .finally(function () {
            customerSearchInProgress = false;
        });
    return customerSearchDeferred.promise;
}
```
...and instead use something like this:

```javascript
function getCustomers(filter) {
    return SingletonPromise({
        context: "customers",
        varyBy: filter,
        fn: function () {
            return DataService.search("api/customers", filter);
        }
    });
}
```

##Installation
Install via `bower`
```
bower install angular-singleton-promise --save
```
