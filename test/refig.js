import test from 'ava';
import Refig from '../out';

/** Singular file loading
  * Load a single file.
  */
test('single file load', (t) => {
  t.plan(1);

  const refig = new Refig();

  return refig.load('1.json').then(r => {
    t.same(r, { foo: 'bar' });
  });
});

/** multiple file load
  * Load multiple files with one function call
  */
test('multiple file load', (t) => {
  t.plan(2);

  const refig = new Refig();

  return refig.load(['1.json', '2.json']).then(([ r1, r2 ]) => {
    t.same(r1, { foo: 'bar' });
    t.same(r2, { baz: 'qux' });
  });
});

/** default name
  * Set a default file name, and try to load a directory.
  */
test('default name', (t) => {
  t.plan(1);

  const refig = new Refig();
  refig.set('name', '2.json');

  return refig.load('.').then(r => {
    t.same(r, { baz: 'qux' });
  });
});
