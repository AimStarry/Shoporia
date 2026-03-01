<template>
  <div class="w-full bg-[#fafafa] min-h-screen font-sans selection:bg-stone-200 selection:text-black pb-32">
    
    <header class="py-20 md:py-32 text-center border-b border-stone-100 bg-white">
      <span class="text-[9px] uppercase tracking-[0.6em] text-stone-400 block mb-4 animate-fade-in">Transaction History</span>
      <h1 class="text-6xl md:text-8xl font-serif uppercase tracking-tighter text-stone-900 leading-none">
        The <span class="italic font-light">Ledger</span>
      </h1>
    </header>

    <div class="max-w-[1200px] mx-auto px-6 py-16">
      
      <div v-if="loading" class="flex flex-col items-center justify-center py-40 space-y-6">
        <div class="w-12 h-[1px] bg-stone-200 relative overflow-hidden">
          <div class="absolute inset-0 bg-stone-900 animate-loading-bar"></div>
        </div>
        <p class="text-[9px] uppercase tracking-[0.4em] text-stone-400">Consulting Archives</p>
      </div>

      <div v-else-if="orders.length === 0" class="text-center py-40 border border-dashed border-stone-200">
        <p class="font-serif italic text-3xl text-stone-300">Your acquisition history is currently void.</p>
        <router-link to="/products" class="mt-10 inline-block text-[10px] uppercase tracking-[0.4em] font-bold bg-stone-900 text-white px-10 py-4 hover:bg-stone-800 transition-all">
          Begin Collection
        </router-link>
      </div>

      <div v-else class="space-y-32">
        <section v-for="order in orders" :key="order._id" class="animate-reveal">
          
          <div class="flex flex-col md:flex-row justify-between items-end border-b border-stone-900 pb-4 mb-10 gap-4">
            <div class="w-full md:w-auto">
              <p class="text-[9px] font-bold uppercase tracking-[0.4em] text-stone-400 mb-1">Entry Reference</p>
              <h2 class="text-xl font-mono tracking-tight text-stone-900">#{{ order._id.slice(-12).toUpperCase() }}</h2>
            </div>
            <div class="flex gap-8 text-right w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-4 md:pt-0 border-stone-100">
              <div>
                <p class="text-[9px] uppercase tracking-[0.3em] text-stone-400 mb-1">Date</p>
                <p class="text-xs font-bold uppercase tracking-widest">{{ new Date(order.createdAt).toLocaleDateString('en-GB') }}</p>
              </div>
              <div>
                <p class="text-[9px] uppercase tracking-[0.3em] text-stone-400 mb-1">Status</p>
                <p class="text-xs font-bold uppercase tracking-widest text-amber-700 italic">{{ order.status }}</p>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 gap-12">
            <div v-for="item in order.items" :key="item._id" 
                 class="flex flex-col lg:flex-row items-start lg:items-center gap-8 group">
              
              <div class="w-full lg:w-64 aspect-[4/5] bg-stone-100 overflow-hidden relative">
                <img :src="getFullImageUrl(item.image)" :alt="item.name" 
                     class="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700">
                <div class="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-[9px] font-bold tracking-widest uppercase">
                  Qty: {{ item.quantity || item.qty }}
                </div>
              </div>

              <div class="flex-grow space-y-4 w-full">
                <div class="flex flex-col md:flex-row justify-between items-start gap-4">
                  <div class="space-y-1">
                    <h3 class="text-3xl md:text-4xl font-serif uppercase tracking-tighter leading-none group-hover:italic transition-all">{{ item.name }}</h3>
                    <p class="text-[10px] text-stone-400 uppercase tracking-[0.3em]">
                      Variation: {{ item.color || 'Onyx' }} — {{ item.size || 'Standard' }}
                    </p>
                  </div>
                  <div class="text-left md:text-right">
                    <p class="text-[9px] uppercase tracking-widest text-stone-400 mb-1">Unit Value</p>
                    <p class="font-serif text-xl">₱{{ item.price.toLocaleString() }}</p>
                  </div>
                </div>
                
                <div class="w-full h-[1px] bg-stone-100 group-hover:bg-stone-200 transition-colors"></div>
                
                <div class="flex justify-between items-center pt-2">
                  <span class="text-[9px] uppercase tracking-widest text-stone-300">Shoporia Archives Manila</span>
                  <p class="font-bold text-sm tracking-widest">SUBTOTAL: ₱{{ (item.price * (item.quantity || item.qty)).toLocaleString() }}</p>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-16 bg-stone-50 p-8 md:p-12 flex flex-col md:flex-row justify-between items-center gap-8 rounded-sm">
              <div class="text-center md:text-left">
                <p class="text-[10px] uppercase tracking-[0.5em] text-stone-400 mb-2">Total Collection Investment</p>
                <h4 class="text-4xl font-serif">₱{{ order.total.toLocaleString() }}</h4>
              </div>

              <div class="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                <router-link :to="`/rate/${order._id}`" 
                   class="bg-stone-900 text-white px-12 py-5 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-stone-700 transition-all text-center">
                   Review Pieces
                </router-link>
              </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '../api';

const orders = ref([]);
const loading = ref(true);

const getFullImageUrl = (imagePath) => {
  if (!imagePath) return 'https://via.placeholder.com/400x500';
  if (imagePath.startsWith('http')) return imagePath;
  const baseUrl = import.meta.env.VITE_API_URL.replace('/api', '');
  return `${baseUrl}/${imagePath}`;
};

const fetchOrders = async () => {
  try {
    loading.value = true;
    const response = await api.get('/orders/myorders');
    orders.value = response.data;
  } catch (err) {
    console.error("Acquisition Fetch Error:", err);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchOrders();
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');

.font-serif { font-family: 'Playfair Display', serif; }

@keyframes loading-bar {
  0% { left: -100%; width: 30%; }
  50% { left: 0%; width: 100%; }
  100% { left: 100%; width: 30%; }
}
.animate-loading-bar { animation: loading-bar 1.5s infinite ease-in-out; }

.animate-reveal { animation: reveal 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
@keyframes reveal { 
  from { opacity: 0; transform: translateY(30px); } 
  to { opacity: 1; transform: translateY(0); } 
}

.animate-fade-in { animation: opacity-in 2s ease-out; }
@keyframes opacity-in { from { opacity: 0; } to { opacity: 1; } }
</style>