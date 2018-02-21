'use strict';

const assert = require("./assert");
const {isA, isArray, isFunction, isObject} = require("./functions");


class AsyncExpect{
    constructor(item){
        this.item = item
    }

    toExists(message, name, extra){
        assert(
            this.item,
            message || `Expected ${this.item} to exists`,
            name || "ValueNotExists" ,
            extra || false
        )
    }

    toNotExists(message, name, extra) {
        assert(
            !this.item,
            message || `Expected ${this.item} to exists`,
            name || "ValueNotExists",
            extra || false
        )
    }

    toBe(value, message, name, extra){
        assert(
            this.item == value,
            message || `Expected ${this.item} to be equals to ${value}`,
            name || "ValueNotSame",
            extra || false
        )
    }
    
    toNotBe(value, message, name, extra) {
        assert(
            this.item != value,
            message || `Expected ${this.item} to be equals to ${value}`,
            name || "ValueNotSame",
            extra || false
        )
    }

    toBeA(value, message, name, extra) {
        assert(
            isA(this.item, value),
            message || `Expected ${this.item} to be equals to ${value}`,
            name || "ValueNotSame",
            extra || false
        )
    }

    toNotBeA(value, message, name, extra) {
        assert(
            !isA(this.item, value),
            message || `Expected ${this.item} to be unequals to ${value}`,
            name || "ValueSame",
            extra || false
        )
    }

    toExactlyBe(value, message, name, extra) {
        assert(
            this.item === value,
            message || `Expected ${this.item} to be equals to ${value}`,
            name || "ValueNotSame",
            extra || false
        )
    }
}

module.exports = function (item) {
    return new AsyncExpect(item)
};