import test from 'ava';
import Refig from '../out';

/** merge
  * Load multiple files and pick from them.
  */
test('merge', (t) => {
  t.plan(1);

  const refig = new Refig();

  return refig.merge(['1.json', '2.json']).then(r => {
    t.same(r, { foo: 'bar', baz: 'qux' });
  });
});
