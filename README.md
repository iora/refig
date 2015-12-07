# Refig
Refig is a flexible configuration reading and writing library that works through `Promise` objects, traditional callbacks, and synchronously.  It parses information from your own configs as well as `package.json` if available.  It defaults to `JSON` parsing and serializing, but you can set your own, as long as they follow the `JSON` interface (like `CSON`).

## Example
Say we had the following structure:

```
some-package
├── index.js
├── package.json
└── my-cli.json
```

This structure is problematic when we want the developer to be able to config inside of `package.json` and/or `my-cli.json`:

`package.json`:
```javascript
{
  "name": "some-package",
  "version": "..."
  // ...
  "my-cli": {
    "foo": "bar"
  }
}
```

`my-cli.json`
```javascript
{
  "foo": "bar"
}
```


We can use refig to easily fix this:

```javascript
refig.set({
  'name': 'my-cli',
  'default': 'my-cli.json'
})
.read('some-package').then((config) => {
  console.log(config.foo);
});
```
