const isA = (object, value) => {
    if (isFunction(value))
        return object instanceof value

    if (value === 'array')
        return Array.isArray(object)

    return typeof object === value
}

const isFunction = (object) =>
    typeof object === 'function'

const isArray = (object) =>
    Array.isArray(object)

const isObject = (object) =>
    object && !isArray(object) && typeof object === 'object'

module.exports = {
    isA, isFunction, isArray, isObject
}