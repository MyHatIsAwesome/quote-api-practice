// Contains utility methods

module.exports = {
    asyncRoute: asyncRoute,
    success: success,
    failure: failure
};

// Wraps the route handling function
// If it throws an exception the request continues to the next handler
function asyncRoute (fn) {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    };
}

// Standard success response
function success(data) {
    if (!(data instanceof Object)) { data = { data: data }; }
    return Object.assign({ _time: Date.now(), success: true}, data);
}

// Standard error response
function failure(status, error) {
    return Object.assign({ _time: Date.now(), success: false }, { status: status, error: error });
}