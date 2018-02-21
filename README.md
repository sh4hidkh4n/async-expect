# async-expect
Expectation function taken from [expect](https://github.com/mjackson/expect). 
This is not for writing test but to use it when writing asynchronus code with the help of `async-await`. (see below for example [use-case](https://github.com/sh4hidkh4n/async-expect#3-using-async-expect))

# Usage

## Installation

Using [npm](https://www.npmjs.org/):

    $ npm install --save expect

Then, use as you would anything else:

```js

const expect = require("async-expect")

```

## Use Case
When using async-await it becomes hard to catch errors. We have to wrap each `await` call to `try-catch` block to specifically handle that error. Wrapping multiple `await` calls in one `try-catch` block will create problem which `await` call thrown this error.  
Example:
### Without async-expect
#### 1. One try-catch block
```js
try{ 
    let user = await User.find(ctx.body.username);

    let like = await Post.addLike(user.username);

    let somthingelse = await forSomethingelse();

}catch(err){
    // no way to get find which call returned that error.
    // if those are third party lib function then you'll have rely
    // on regex to find error type and etc
    console.log(err) // nothing you can do at this point.
}
```
#### 2. Multiple try-catch block

```js
try{
    // let user = await User.find(ctx.body.username);
    var user = await User.find(ctx.body.username);
}catch(err){
    app.redirect("/err", "invalid user")
}

try{
    // problem1 - user isnt accessible here. let block scoped
    // have to user var
    // let like = await Post.addLike(user.username);
    var like = await Post.addLike(user.username);
}catch(err){
    app.redirect("/err", "invalid user")
}

// problem2 - readablity issue

```

#### 3. Using async-expect

```js

const expect = require("async-expect");

try{ 
    let user = await User.find(ctx.body.username);
    expect(user.username).toExists("Username is invalid", "INVALID-USER")

    let like = await Post.addLike(user.username);
    expect(like.status).toBe(true, 
        "User doesn't have permission to see", "PERM-DENIED")

    let somthingelse = await forSomethingelse();
    expect(somethingelse).toBe(Object, "something else is wrong", "SOMETHING-ERROR", somethingelse)

}catch(err){
    switch(err.name){
        case: "INVALID-USER":
            app.redirect("/register", "Please register to continue");
            break;
        case: "PERM-DENIED":
            app.redirect("/user", "You dont have enough permission");
            break;
        case: "SOMETHING-ERROR":
            let somethingelse = err.extra
            doSomething(somethingelse);
            break;
    }
}

```

## Assertions

Currently it contains 7 assertive function which is more than enough to be useful in conjunction with async-await.
> Note: [error-message, error-name, error-extra] parameters are optional. 

### toExist

> `expect(object).toExist([error-message, error-name, error-extra])`

Asserts the given `object` is truthy.

```js
expect('something truthy').toExist()
```

### toNotExist

> `expect(object).toNotExist([error-message, error-name, error-extra])`

Asserts the given `object` is falsy.

```js
expect(null).toNotExist()
```

### toBe

> `expect(object).toBe(value, [error-message, error-name, error-extra])`

Asserts that `object` is equal to `value` using `==`.

```js
try { 
  let role = await User.getRole();
  expect(role).toBe("admin", "Only admin user is allowed", "NotAdminError");
}catch(err){
  if(err.name == "NotAdminError"){
    app.redirect("/user", {message: "You're not allowed to perform this operation"});
  }
}
```

### toNotBe

> `expect(object).toNotBe(value, [error-message, error-name, error-extra])`

Asserts that `object` is not equal to `value` using `!=`.

### toBeA(constructor)

> `expect(object).toBeA(constructor, [error-message, error-name, error-extra])`<br>
> `expect(object).toBeAn(constructor, [error-message, error-name, error-extra])`

Asserts the given `object` is an `instanceof constructor`.

```js
expect(new User).toBeA(User)
expect(new Asset).toBeAn(Asset)
```

### toBeA(string)

> `expect(object).toBeA(string, [error-message, error-name, error-extra])`<br>
> `expect(object).toBeAn(string, [error-message, error-name, error-extra])`

Asserts the `typeof` the given `object` is `string`.

```js
expect(2).toBeA('number')
```

### toNotBeA(constructor)

> `expect(object).toNotBeA(constructor, [error-message, error-name, error-extra])`<br>
> `expect(object).toNotBeAn(constructor, [error-message, error-name, error-extra])`

Asserts the given `object` is *not* an `instanceof constructor`.

```js
expect(new Asset).toNotBeA(User)
expect(new User).toNotBeAn(Asset)
```

### toNotBeA(string)

> `expect(object).toNotBeA(string, [error-message, error-name, error-extra])`<br>
> `expect(object).toNotBeAn(string, [error-message, error-name, error-extra])`

Asserts the `typeof` the given `object` is *not* `string`.

```js
expect('a string').toNotBeA('number')
expect(2).toNotBeAn('object')
```
