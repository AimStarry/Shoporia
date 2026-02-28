<template>
  <div class="w-full bg-white min-h-screen font-sans selection:bg-black selection:text-white">
    <div v-if="loading" class="flex items-center justify-center min-h-screen">
       <p class="text-[10px] uppercase tracking-[0.5em] animate-pulse">Retrieving from Archives...</p>
    </div>

    <div v-else-if="product._id" class="max-w-[1440px] mx-auto px-6 md:px-12 py-12 md:py-24">
      <div class="grid grid-cols-1 md:grid-cols-12 gap-16 items-start">
        
        <div class="md:col-span-7 space-y-4">
          <div class="aspect-[4/5] bg-[#f7f7f7] overflow-hidden group">
            <img 
              :src="getImageUrl(product.image)" 
              :alt="product.name" 
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </div>

        <div class="md:col-span-5 sticky top-24">
          <nav class="flex text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-8">
            <router-link to="/products" class="hover:text-black transition-colors">Collection</router-link>
            <span class="mx-2">/</span>
            <span class="text-black">{{ product.category }}</span>
          </nav>

          <h1 class="text-5xl font-serif uppercase tracking-tighter leading-none mb-4">
            {{ product.name }}
          </h1>
          
          <p class="text-2xl font-light mb-8">₱{{ product.price?.toLocaleString() }}</p>

          <div class="space-y-8 pb-12 border-b border-gray-100">
            <div>
              <p class="text-[10px] uppercase tracking-widest text-gray-400 mb-3">Description</p>
              <p class="text-gray-600 leading-relaxed text-sm max-w-md">
                {{ product.description }}
              </p>
            </div>

            <div class="flex gap-12">
              <div>
                <p class="text-[10px] uppercase tracking-widest text-gray-400 mb-3">Color</p>
                <span class="text-xs uppercase tracking-widest border border-black px-4 py-2">
                  {{ product.color || 'Default' }}
                </span>
              </div>
              <div>
                <p class="text-[10px] uppercase tracking-widest text-gray-400 mb-3">Size</p>
                <span class="text-xs uppercase tracking-widest">{{ product.size || 'Standard' }}</span>
              </div>
            </div>
          </div>

          <div class="pt-10 space-y-4">
            <div class="flex items-center border border-gray-200 w-max mb-6">
              <button @click="qty > 1 ? qty-- : null" class="px-5 py-3 hover:bg-gray-50 transition-colors">-</button>
              <span class="px-8 text-sm font-medium">{{ qty }}</span>
              <button @click="qty++" class="px-5 py-3 hover:bg-gray-50 transition-colors">+</button>
            </div>

            <div class="grid grid-cols-1 gap-3">
              <button 
                @click="handleAddToCart" 
                :disabled="product.countInStock === 0"
                class="w-full bg-black text-white py-5 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-stone-800 transition-colors disabled:bg-gray-300"
              >
                {{ product.countInStock > 0 ? 'Add to Cart' : 'Sold Out' }}
              </button>
              
              <button 
                @click="handleBuyNow"
                :disabled="product.countInStock === 0"
                class="w-full border border-black py-5 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-black hover:text-white transition-all disabled:border-gray-200 disabled:text-gray-300"
              >
                Buy it Now
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-24 bg-[#fafafa] py-24 border-t border-gray-100 -mx-6 md:-mx-12">
        <div class="max-w-4xl mx-auto px-6">
          <div class="text-center mb-16">
            <h2 class="text-3xl font-serif uppercase tracking-tight">Testimonials</h2>
            <div class="flex justify-center gap-1 mt-4 text-amber-500">
               <span v-for="i in 5" :key="i" class="text-xs">
                 {{ i <= Math.round(product.rating) ? '★' : '☆' }}
               </span>
            </div>
            <p class="text-[10px] uppercase tracking-widest text-gray-400 mt-2">
              Based on {{ product.numReviews || 0 }} verified acquisitions
            </p>
          </div>

          <div v-if="product.reviews && product.reviews.length > 0" class="space-y-12">
            <div v-for="review in product.reviews" :key="review._id" class="border-b border-gray-200 pb-12 last:border-0">
              <div class="flex justify-between items-start mb-4">
                <div>
                  <p class="text-xs font-bold uppercase tracking-widest">{{ review.name }}</p>
                  <p class="text-[10px] text-gray-400 uppercase tracking-tighter">{{ formatDate(review.createdAt) }}</p>
                </div>
                <div class="flex gap-0.5 text-amber-600">
                  <span v-for="star in review.rating" :key="star" class="text-[10px]">★</span>
                </div>
              </div>
              <p class="text-gray-700 font-serif italic text-lg leading-relaxed">
                "{{ review.comment }}"
              </p>
            </div>
          </div>

          <div v-else class="text-center py-10">
            <p class="text-gray-400 italic font-serif text-lg">The collection awaits its first testimony.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router'; // Added useRouter
import api from '../api';

const route = useRoute();
const router = useRouter(); // Initialize router
const product = ref({});
const qty = ref(1);
const loading = ref(true);
const BACKEND_URL = 'http://localhost:5000';

const getImageUrl = (path) => {
  if (!path) return '';
  return path.startsWith('http') ? path : `${BACKEND_URL}${path}`;
};

const formatDate = (dateString) => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  });
};

onMounted(async () => {
  try {
    loading.value = true;
    const { data } = await api.get(`/products/${route.params.id}`);
    product.value = data;
  } catch (err) {
    console.error("Collection fetch failed", err);
  } finally {
    loading.value = false;
  }
});

const handleAddToCart = () => {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const existItem = cart.find(x => x._id === product.value._id);
  
  if (existItem) {
    if (existItem.qty + qty.value <= product.value.countInStock) {
      existItem.qty += qty.value;
      alert(`Updated: ${product.value.name} quantity in bag.`);
    } else {
      alert(`Stock Limit: Only ${product.value.countInStock} available.`);
    }
  } else {
    cart.push({ ...product.value, qty: qty.value });
    alert(`Added: ${product.value.name} to bag.`);
  }
  
  localStorage.setItem('cart', JSON.stringify(cart));
};

/**
 * Buy Now Logic:
 * Adds item to cart and redirects immediately to checkout.
 */
const handleBuyNow = () => {
  if (product.value.countInStock === 0) return;

  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const existItemIndex = cart.findIndex(x => x._id === product.value._id);

  if (existItemIndex !== -1) {
    // If it exists, update it to the current selected quantity
    cart[existItemIndex].qty = qty.value;
  } else {
    // Otherwise, add it
    cart.push({ ...product.value, qty: qty.value });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  
  // Redirect to checkout
  router.push('/checkout');
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');
.font-serif { font-family: 'Playfair Display', serif; }
</style>