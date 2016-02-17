import test from 'ava';
import Refig from '../out';

/** single file pick
  * Load a single file and pick from it.
  */
test('single file pick', (t) => {
  t.plan(1);

  const refig = new Refig();

  return refig.pick('1.json', 'foo').then(r => {
    t.same(r, [ 'bar' ]);
  });
});

/** multiple file pick
  * Load multiple files and pick from them.
  */
test('multiple file pick', (t) => {
  t.plan(1);

  const refig = new Refig();

  return refig.pick(['1.json', '3.json'], 'foo').then(r => {
    t.same(r, [ 'bar', 'qux' ]);
  });
});
