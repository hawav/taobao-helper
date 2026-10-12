<script setup>
import { computed, ref, watch } from 'vue';
import { cleanProductUrl } from './utils/clean-product-url.js';

const inputUrl = ref('');
const copyState = ref('');
const exampleUrl = 'https://detail.tmall.com/item.htm?abbucket=0&id=955037755613&mi_id=00007Ubq2lN4tHG_oIP7jOMoAzrQB9A6trCqHWCN4V59gFk&ns=1&skuId=5881221109744&spm=a21xtw.29978516.product_shelf.1.49081b15H62Svv&xxc=taobaoSearch';
const parsedResult = computed(() => {
  try { return { result: cleanProductUrl(inputUrl.value), error: '' }; }
  catch (error) { return { result: null, error: error.message }; }
});
watch(inputUrl, () => { copyState.value = ''; });
async function copyResult() {
  try {
    await navigator.clipboard.writeText(parsedResult.value.result.url);
    copyState.value = '已复制';
  } catch { copyState.value = '复制失败，请手动选择下方链接复制'; }
}
</script>

<template>
  <div class="min-h-screen px-5 sm:px-8">
    <header class="mx-auto flex max-w-5xl items-center justify-between py-7">
      <a href="./" class="flex items-center gap-3 font-bold tracking-tight"><span class="grid size-10 place-items-center rounded-xl bg-orange-500 text-xl text-white shadow-sm">淘</span><span class="text-lg">淘宝助手</span></a>
      <span class="rounded-full border border-stone-200 bg-white px-3 py-1 text-xs text-stone-500">链接清理工具</span>
    </header>
    <main class="mx-auto max-w-2xl pb-16 pt-10 sm:pt-16">
      <div class="mb-9 text-center">
        <span class="text-xs font-semibold tracking-[0.18em] text-orange-600">少一点参数，多一点清爽</span>
        <h1 class="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">让商品链接<span class="text-orange-500">轻一点。</span></h1>
        <p class="mt-5 text-sm leading-7 text-stone-500 sm:text-base">粘贴淘宝或天猫链接，自动去除多余参数。<br>只留下商品 ID 和 SKU，分享更简洁。</p>
      </div>
      <section class="rounded-3xl border border-stone-200/80 bg-white p-5 shadow-[0_12px_50px_-20px_rgba(70,50,20,0.15)] sm:p-8" aria-label="商品链接清理">
        <div class="mb-3 flex items-center justify-between"><label for="product-url" class="text-sm font-semibold">商品链接</label><button class="text-xs text-orange-600 hover:text-orange-800" @click="inputUrl = exampleUrl">试试示例 ↗</button></div>
        <textarea id="product-url" v-model="inputUrl" rows="4" spellcheck="false" placeholder="在这里粘贴 https://detail.tmall.com/item.htm?..." class="w-full resize-y rounded-xl border border-stone-200 bg-stone-50/70 p-4 text-sm leading-6 outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100" :aria-invalid="Boolean(parsedResult.error)" aria-describedby="input-help"></textarea>
        <div class="mt-2 flex items-center justify-between gap-3 text-xs"><p id="input-help" class="text-stone-400">支持 id、skuId / sku_id / sku_properties · 粘贴后自动清理</p><button v-if="inputUrl" class="shrink-0 text-stone-500 hover:text-stone-800" @click="inputUrl = ''">清空</button></div>
        <p v-if="parsedResult.error" role="alert" class="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{{ parsedResult.error }}</p>
        <div class="my-6 flex items-center gap-3"><div class="h-px flex-1 bg-stone-100"></div><span class="text-stone-300">↓</span><div class="h-px flex-1 bg-stone-100"></div></div>
        <div class="mb-3 flex items-center justify-between"><h2 class="text-sm font-semibold">清理后的链接</h2><span v-if="parsedResult.result" class="rounded-full bg-green-50 px-2.5 py-1 text-xs text-green-700">已移除 {{ parsedResult.result.removedCount }} 个参数</span></div>
        <div class="min-h-24 rounded-xl border border-dashed border-stone-200 bg-stone-50 p-4">
          <p v-if="parsedResult.result" class="break-all font-mono text-sm leading-6 text-stone-700">{{ parsedResult.result.url }}</p><p v-else class="pt-3 text-center text-sm text-stone-400">干净的链接，将在这里出现</p>
        </div>
        <div v-if="parsedResult.result" class="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-stone-500"><span>商品 ID <span class="font-mono text-stone-700">{{ parsedResult.result.productId }}</span></span><span v-if="parsedResult.result.skuId">SKU <span class="font-mono text-stone-700">{{ parsedResult.result.skuId }}</span></span><span v-else-if="parsedResult.result.skuProperties">SKU 规格 <span class="font-mono text-stone-700">{{ parsedResult.result.skuProperties }}</span></span></div>
        <button :disabled="!parsedResult.result" class="mt-6 w-full rounded-xl bg-orange-500 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-500 disabled:bg-stone-100 disabled:text-stone-400 disabled:shadow-none" @click="copyResult">{{ copyState === '已复制' ? '✓ 已复制链接' : '复制干净链接' }}</button>
        <p class="mt-2 text-center text-xs text-stone-500" role="status" aria-live="polite">{{ copyState }}</p>
      </section>
      <div class="mt-6 flex flex-wrap justify-center gap-x-7 gap-y-2 text-xs text-stone-400"><span>✓ 本地处理</span><span>✓ 不上传链接</span><span>✓ 保留商品与规格</span></div>
      <p class="mt-10 text-center text-xs leading-6 text-stone-400">只整理链接，不改变商品。<br>独立小工具，与淘宝、天猫官方无关联。</p>
    </main>
  </div>
</template>
