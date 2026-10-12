import test from 'node:test';
import assert from 'node:assert/strict';
import { cleanProductUrl } from '../src/utils/clean-product-url.js';

test('removes tracking queries and fragment while preserving product and SKU', () => {
  assert.equal(cleanProductUrl(' https://detail.tmall.com/item.htm?abbucket=0&id=955037755613&skuId=5881221109744&spm=abc#tracking ').url, 'https://detail.tmall.com/item.htm?id=955037755613&skuId=5881221109744');
});
test('normalizes sku_id and supports products without SKU', () => {
  assert.equal(cleanProductUrl('https://item.taobao.com/item.htm?sku_id=123&id=456').url, 'https://item.taobao.com/item.htm?id=456&skuId=123');
  assert.equal(cleanProductUrl('https://item.taobao.com/item.htm?id=456').url, 'https://item.taobao.com/item.htm?id=456');
});
test('preserves sku_properties as a SKU selector', () => {
  const result = cleanProductUrl('https://item.taobao.com/item.htm?id=456&sku_properties=1627207%3A80882%3B125465%3A123456&spm=abc');
  assert.equal(result.url, 'https://item.taobao.com/item.htm?id=456&sku_properties=1627207%3A80882%3B125465%3A123456');
  assert.equal(result.skuProperties, '1627207:80882;125465:123456');
  assert.equal(result.removedCount, 1);
});
test('prefers a numeric SKU ID when both SKU formats are present', () => {
  assert.equal(cleanProductUrl('https://item.taobao.com/item.htm?id=456&skuId=789&sku_properties=1%3A2').url, 'https://item.taobao.com/item.htm?id=456&skuId=789');
});
test('rejects unrelated hosts, invalid identities and unresolved short links', () => {
  for (const url of ['https://tmall.com.evil.example/?id=1', 'javascript:alert(1)', 'https://detail.tmall.com/item.htm?id=no', 'https://e.tb.cn/a', 'https://item.taobao.com/?id=1&skuId=no']) assert.throws(() => cleanProductUrl(url));
  assert.equal(cleanProductUrl('  '), null);
});
