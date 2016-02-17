Refig
=====
> Manage configuration files with `Promise` objects.

Refig is a library for reading and parsing configuration files.  It handles directories, uses a parser of your choice, caches configurations, and is based on top of `Promise` objects (for a nice asynchronous flow).

## Installation
```shell
$ npm install --save refig
```

## Usage
```javascript
import Refig from 'refig';
const refig = new Refig();
```

## API

<a name="Refig"></a>
### Refig
**Kind**: global class  

* [Refig](#Refig)
    * [new Refig(opts)](#new_Refig_new)
    * [.load](#Refig+load)
    * [.merge](#Refig+merge)
    * [.pick](#Refig+pick)
    * [.purge](#Refig+purge)
    * [.set](#Refig+set)

<a name="new_Refig_new"></a>
#### new Refig(opts)

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Options |

<a name="Refig+load"></a>
#### refig.load
Read and parse a configuration file.

**Kind**: instance property of <code>[Refig](#Refig)</code>  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>Array</code> &#124; <code>String</code> | A string (or array of strings) of a path. |

<a name="Refig+merge"></a>
#### refig.merge
Fetch multiple configurations and merge them.

**Kind**: instance property of <code>[Refig](#Refig)</code>  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>Array</code> &#124; <code>String</code> | A string (or array of strings) of a path. |

<a name="Refig+pick"></a>
#### refig.pick
Pick a single attribute out of a file.

**Kind**: instance property of <code>[Refig](#Refig)</code>  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>Array</code> &#124; <code>String</code> | A string (or array of strings) of a path. |
| name | <code>String</code> | Name of the attribute to pick. |

<a name="Refig+purge"></a>
#### refig.purge
Purge a file from the cache.

**Kind**: instance property of <code>[Refig](#Refig)</code>  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>Array</code> &#124; <code>String</code> | A string (or array of strings) of a path. |

<a name="Refig+set"></a>
#### refig.set
Set an option

**Kind**: instance property of <code>[Refig](#Refig)</code>  

## Examples
Since Refig is designed around `Promise` objects, you can do some pretty interesting things.

```javascript
refig.merge('~/foo/bar.json', '/usr/share/foo/bar.json')
.then(opts => Object.assign(opts, refig.pick('package.json', 'foo')))
.then(opts => {
  // two configurations + package.json settings, all merged.
});
```

## Credits

|![Jamen Marz][jamen-image]|
|:--------:|
| [@jamen] |

## License
[MIT][license] &copy; Jamen Marzonie

<!-- All links must be "tagged" -->
 [@jamen]: https://github.com/jamen
 [jamen-image]: https://avatars2.githubusercontent.com/u/6251703?v=3&s=125

 [license]: LICENSE
