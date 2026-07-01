import test from 'node:test';
import assert from 'node:assert/strict';
import { sanitizeCartItems, buildCheckoutItems } from './cartUtils.mjs';

test('sanitizeCartItems ignores invalid quantities', () => {
  const sanitized = sanitizeCartItems({
    'product-1': 2,
    'product-2': '3',
    'product-3': 0,
    'product-4': -1,
    'product-5': 'abc',
  });

  assert.deepEqual(sanitized, {
    'product-1': 2,
    'product-2': 3,
  });
});

test('buildCheckoutItems separates valid and invalid products', () => {
  const { validItems, invalidItems, sanitizedCartItems } = buildCheckoutItems(
    {
      'product-1': 2,
      'product-2': 1,
      'missing-product': 1,
    },
    ['product-1', 'product-2']
  );

  assert.deepEqual(sanitizedCartItems, {
    'product-1': 2,
    'product-2': 1,
    'missing-product': 1,
  });
  assert.deepEqual(validItems, [
    { product: 'product-1', quantity: 2 },
    { product: 'product-2', quantity: 1 },
  ]);
  assert.deepEqual(invalidItems, [{ product: 'missing-product', quantity: 1 }]);
});
