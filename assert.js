module.exports = function (condition, msg, name, extra) {
    if (condition) {
        return;
    }
    let err = new Error(msg);
    err.name = name

    if(extra) err.extra = extra
    else err.extra = {}

    throw err
}