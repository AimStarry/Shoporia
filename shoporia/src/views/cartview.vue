<template>
  <div class="w-full bg-[#fafafa] min-h-screen font-sans selection:bg-stone-200 selection:text-black pb-24">
    
    <header class="py-20 md:py-28 text-center border-b border-stone-100 bg-white">
      <span class="text-[9px] uppercase tracking-[0.6em] text-stone-400 block mb-4 animate-fade-in">Selected Essentials</span>
      <h1 class="text-6xl md:text-7xl font-serif uppercase tracking-tighter text-stone-900 leading-none">
        Shopping <span class="italic font-light text-stone-400">Bag</span>
      </h1>
    </header>

    <div class="max-w-[1440px] mx-auto px-6 md:px-12 py-12 md:py-20">
      
      <div v-if="cartItems.length === 0" class="text-center py-40 border border-dashed border-stone-200 bg-white/50 rounded-sm">
        <p class="font-serif italic text-3xl text-stone-300 mb-10">Your curation is currently empty.</p>
        <router-link to="/products" class="inline-block bg-stone-900 text-white px-12 py-5 text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-stone-800 transition-all">
          Explore Collection
        </router-link>
      </div>

      <div v-else class="flex flex-col lg:flex-row gap-16 xl:gap-24 items-start">
        
        <div class="flex-grow w-full space-y-10">
          <transition-group name="list" tag="div" class="space-y-10">
            <div v-for="item in cartItems" :key="item._id || item.name" 
                 class="flex flex-col sm:flex-row items-start gap-8 pb-10 border-b border-stone-100 group">
              
              <div class="w-full sm:w-44 aspect-[3/4] bg-stone-100 overflow-hidden relative rounded-sm">
                <img :src="getFullImageUrl(item.image)" :alt="item.name" 
                     class="w-full h-full object-cover grayscale-[0.1] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000">
              </div>

              <div class="flex-grow flex flex-col justify-between h-full py-1 space-y-6 w-full">
                <div class="flex justify-between items-start gap-4">
                  <div class="space-y-1">
                    <h3 class="text-2xl md:text-3xl font-serif uppercase tracking-tight text-stone-900">{{ item.name }}</h3>
                    <p class="text-[10px] text-stone-400 uppercase tracking-[0.3em] font-medium">
                      {{ item.color || 'Onyx' }} — {{ item.size || 'Standard' }}
                    </p>
                  </div>
                  <p class="font-serif text-xl text-stone-900">₱{{ item.price ? item.price.toLocaleString() : 0 }}</p>
                </div>

                <div class="flex items-center justify-between mt-auto">
                  <div class="flex items-center border border-stone-200 bg-white">
                    <button @click="updateQty(item, -1)" class="px-3 py-2 hover:bg-stone-50 transition-colors border-r border-stone-200">
                      <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M20 12H4" stroke-width="1.5"/></svg>
                    </button>
                    <span class="px-5 text-xs font-bold w-12 text-center">{{ item.quantity || 1 }}</span>
                    <button @click="updateQty(item, 1)" class="px-3 py-2 hover:bg-stone-50 transition-colors border-l border-stone-200">
                      <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 4v16m8-8H4" stroke-width="1.5"/></svg>
                    </button>
                  </div>

                  <button @click="removeItem(item._id || item.name)" 
                          class="text-[9px] uppercase tracking-[0.3em] font-bold text-stone-300 hover:text-red-800 transition-colors border-b border-stone-200 hover:border-red-800 pb-1">
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </transition-group>
          
          <router-link to="/products" class="inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.4em] text-stone-400 hover:text-black transition-all">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M10 19l-7-7m0 0l7-7m-7 7h18" stroke-width="1.5"/></svg>
            Back to Collection
          </router-link>
        </div>

        <aside class="w-full lg:w-[420px] sticky top-32">
          <div class="bg-white border border-stone-100 p-8 md:p-10 rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.02)]">
            <h2 class="text-xs font-bold uppercase tracking-[0.5em] mb-10 text-stone-900 border-b border-stone-50 pb-6">Checkout Summary</h2>
            
            <div class="space-y-6">
              <div class="flex justify-between text-[11px] uppercase tracking-widest text-stone-400">
                <span>Subtotal</span>
                <span class="text-stone-900 font-bold">₱{{ subtotal.toLocaleString() }}</span>
              </div>
              
              <div class="flex justify-between text-[11px] uppercase tracking-widest text-stone-400">
                <span>Shipping</span>
                <span class="text-stone-900 font-bold" :class="{'text-emerald-600': subtotal >= 10000}">
                  {{ subtotal >= 10000 ? 'Complimentary' : '₱' + shipping.toLocaleString() }}
                </span>
              </div>

              <div class="h-[1px] bg-stone-100 my-8"></div>

              <div class="flex justify-between items-end pb-8">
                <div>
                  <p class="text-[9px] uppercase tracking-[0.4em] text-stone-400 mb-1">Total Amount</p>
                  <p class="text-4xl font-serif text-stone-900">₱{{ total.toLocaleString() }}</p>
                </div>
              </div>

              <router-link 
                to="/checkout" 
                class="block w-full bg-stone-900 text-white py-6 text-[11px] font-bold uppercase tracking-[0.4em] text-center hover:bg-stone-700 transition-all active:scale-[0.98] shadow-lg group"
              >
                Complete Acquisition
                <span class="inline-block ml-2 group-hover:translate-x-2 transition-transform">→</span>
              </router-link>

              <div class="mt-8 flex items-center justify-center gap-4 opacity-30 grayscale">
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" class="h-3" alt="Visa" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" class="h-5" alt="Mastercard" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" class="h-4" alt="Paypal" />
              </div>
            </div>
          </div>

          <p class="mt-8 text-[9px] uppercase tracking-[0.3em] text-stone-400 text-center leading-relaxed">
            By proceeding, you agree to the <br> <span class="underline cursor-pointer">Terms of Archive Access</span>
          </p>
        </aside>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';

const cartItems = ref([]);
const shipping = ref(250);

const getFullImageUrl = (imagePath) => {
  if (!imagePath) return 'https://via.placeholder.com/400x500';
  if (imagePath.startsWith('http')) return imagePath;
  const baseUrl = import.meta.env.VITE_API_URL.replace('/api', '');
  return `${baseUrl}${imagePath}`;
};

onMounted(() => {
  const savedCart = localStorage.getItem('cart');
  if (savedCart) {
    cartItems.value = JSON.parse(savedCart);
  }
});

const subtotal = computed(() => {
  return cartItems.value.reduce((acc, item) => {
    const qty = item.quantity || item.qty || 1;
    const price = item.price || 0;
    return acc + (price * qty);
  }, 0);
});

const total = computed(() => {
  const actualShipping = subtotal.value >= 10000 ? 0 : shipping.value;
  return subtotal.value + actualShipping;
});

const updateStorage = () => {
  localStorage.setItem('cart', JSON.stringify(cartItems.value));
  window.dispatchEvent(new Event('storage'));
};

const updateQty = (item, change) => {
  if (!item.quantity) {
    item.quantity = item.qty || 1;
  }
  
  const newQty = item.quantity + change;
  
  if (newQty >= 1) {
    item.quantity = newQty;
    item.qty = newQty;
    updateStorage();
  }
};

const removeItem = (id) => {
  cartItems.value = cartItems.value.filter(item => (item._id || item.name) !== id);
  updateStorage();
};

watch(cartItems, () => {
  updateStorage();
}, { deep: true });
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');

.font-serif { font-family: 'Playfair Display', serif; }

.list-enter-active, .list-leave-active {
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}
.list-enter-from, .list-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

.animate-fade-in { animation: fadeIn 2s ease-out; }
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>