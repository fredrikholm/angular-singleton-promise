(function () {
    "use strict";

    angular
        .module("angular-singleton-promise", [])
        .service("SingletonPromise", SingletonPromise);
    
    SingletonPromise.$inject = ["$q"];
    
    function SingletonPromise($q) {
        var deferred = {};
        var inProgress = {};

        function create(params) {
            var context = params.context ? params.context : "";
            var varyBy = params.varyBy ? params.varyBy.toString() : "";
            var key = context + params.fn.toString() + varyBy;

            if (inProgress.hasOwnProperty(key)) {
                return deferred[key].promise;
            }
            deferred[key] = $q.defer();
            inProgress[key] = true;
            params.fn()
                .then(function (data) {
                    deferred[key].resolve(data);
                })
                .catch(function (data) {
                    deferred[key].reject(data);
                })
                .finally(function () {
                    delete inProgress.key;
                });
            return deferred[key].promise;
        }

        return create;
    }
})();
