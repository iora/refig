Refig
=====
Refig is a flexible configuration reading, writing, and caching library that works through `Promise` objects, traditional callbacks, and synchronously.  It parses information from local configurations, global configurations, and `package.json` (if available).  It defaults to `JSON` parsing and serializing, but you can set your own, as long as they follow the `JSON` interface (like `CSON`).

---

### The Problem
Configurations in modern applications can become wide-spread through a system, they use multiple locations to tell the application what to do depending on the scenario.  You can have global configs, local configs, and even `package.json` configs.  With a widespread system like this, it can be difficult to manage all the different locations a entry could be listed.

### The Solution
Refig provides a simple interface to source configurations files from multiple locations, parse all of them, and concatenate them into one object.  This makes it more flexible for the user and easier for you to develop...  Plus the caching and async interface makes for a fast library

---

# API
Refig has a consistent and simple API.

Note: Every asynchronous method also returns a `Promise`, so you don't have to use callbacks.

## Methods
Every asynchronous method also returns a `Promise`, so you don't have to use callbacks.

### `.set(config)`
### `.set(name, value)`
  1. `name`: (`String`) name to store option under.
  2. `value`: Value to set.
OR
  1. `config`: (`Object`) Object of options to store.

Example:
```javascript
refig.set('foo', 1)
// OR
refig.set({ bar: 2 });
```

===

### `.get(name)`
Returns a option out of the configuration.
  1. `name`: (`String`) name of option to fetch

===

### `.read(location, [callback])`
Read files or folders for configurations asynchronously.
  1. `location`: (`Array`/`String`) Path(s) leading to folders or files to be parsed.
  2. `callback`: (`Function`) A [Callback function](#callback-function)

Returns `Promise`

===

### `.readSync(location)`
The synchronous version of `.read`.
  1. `location`: (`Array`/`String`) Path(s) leading to folders or files to be parsed.

Returns configuration.

===

### Callback function
A callback is triggered once that function is done doing it's processes.
  1. `err`: (`Object`/`null`) The error encountered while processing, if none encountered it will be `null`.
  2. `result`: (`Object`/`null`) The result of the function, if there was no result (i.e an error happened) it will be `null`.  

---

# Examples
Here are some examples for what you can do with Refig:

```javascript
refig
.set({name:'my-package', default:'my-package.json'})
.read(process.cwd()) // For CLI's.
.then(function(config){
   // ...
});
```

Since they return promises, you can cluster them:
```javascript
Promise.all([
  refig.read('some-folder'),
  refig.read('another-folder'),
  refig.read('some.json')
])
.then(function(configs){
  // Configs is an array of each config, in the order they were in the array.
});
```

However, if you want to read from multiple places, then merge the results.  Refig has shorthand for this:
```javascript
refig
.read([ 'some-folder', 'another-folder', 'some.json' ])
.then(function(config){
  // Config is the merged result of all 3 locations.
});
```
