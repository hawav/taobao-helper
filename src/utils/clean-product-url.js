/** Keep product identity while removing tracking queries and fragments. */
export function cleanProductUrl(input) {
  const value = input.trim().replace(/&amp;/g, '&');
  if (!value) return null;
  let url;
  try { url = new URL(value); } catch { throw new Error('请输入完整的商品链接（以 https:// 开头）。'); }
  if (!['https:', 'http:'].includes(url.protocol)) throw new Error('仅支持 HTTP 或 HTTPS 链接。');
  const isSupportedHost = ['taobao.com', 'tmall.com'].some(domain => url.hostname === domain || url.hostname.endsWith(`.${domain}`));
  if (!isSupportedHost) throw new Error('请使用淘宝或天猫的商品详情链接。');
  const productId = url.searchParams.get('id');
  const skuId = url.searchParams.get('skuId') || url.searchParams.get('sku_id');
  const skuProperties = url.searchParams.get('sku_properties');
  if (!productId || !/^\d+$/.test(productId)) throw new Error('链接缺少有效的商品 id。短链接请先在浏览器打开，再复制详情页地址。');
  if (skuId && !/^\d+$/.test(skuId)) throw new Error('SKU 应为数字，请检查链接中的 skuId 或 sku_id。');
  const removedCount = [...url.searchParams].filter(([key]) => !['id', 'skuId', 'sku_id', 'sku_properties'].includes(key)).length;
  url.search = '';
  url.hash = '';
  url.searchParams.set('id', productId);
  if (skuId) url.searchParams.set('skuId', skuId);
  else if (skuProperties) url.searchParams.set('sku_properties', skuProperties);
  return { url: url.href, productId, skuId, skuProperties, removedCount };
}
