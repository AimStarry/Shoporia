<template>
  <div class="w-full bg-[#fdfdfd] min-h-screen font-sans selection:bg-black selection:text-white">
    <div class="py-16 text-center border-b border-gray-100 bg-white">
      <h1 class="text-5xl md:text-6xl font-serif uppercase tracking-tighter text-gray-900">Rate</h1>
      <p class="text-[10px] uppercase tracking-[0.4em] text-gray-400 mt-4">
        Share your experience with your recent collection
      </p>
    </div>

    <div class="max-w-[1440px] mx-auto px-6 md:px-12 py-16">
      <div v-if="loading" class="text-center py-20">
        <p class="text-[10px] uppercase tracking-[0.5em] animate-pulse">Scanning Acquisitions...</p>
      </div>

      <div v-else-if="ratingItems.length === 0" class="text-center py-20">
        <p class="font-serif italic text-2xl text-gray-300 mb-8">No recent acquisitions found to review.</p>
        <router-link to="/products" class="bg-black text-white px-10 py-4 text-[10px] font-bold uppercase tracking-widest hover:bg-amber-800 transition">
          Visit Collection
        </router-link>
      </div>

      <form v-else @submit.prevent="submitRatings" class="space-y-12">
        <div v-for="(item, index) in ratingItems" :key="item.product" 
             class="flex flex-col md:flex-row items-start gap-8 md:gap-16 pb-12 border-b border-gray-100">
          
          <div class="flex gap-6 w-full md:w-1/3">
            <div class="w-32 h-32 bg-[#f7f7f7] overflow-hidden rounded-sm flex-shrink-0">
              <img :src="getFullImageUrl(item.image)" :alt="item.name" class="w-full h-full object-cover">
            </div>
            <div class="pt-2">
              <h3 class="text-2xl font-serif uppercase tracking-tight">{{ item.name }}</h3>
              <p class="text-[10px] text-gray-400 uppercase tracking-widest mt-1">
                Purchased Qty: {{ item.quantity }}
              </p>
            </div>
          </div>

          <div class="w-full md:w-1/4 pt-2">
            <p class="text-[10px] uppercase tracking-widest text-gray-400 mb-4 text-center md:text-left">Rating</p>
            <div class="flex justify-center md:justify-start gap-2">
              <button 
                v-for="star in 5" 
                :key="star" 
                type="button"
                @click="item.rating = star"
                class="transition-transform active:scale-90"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  class="w-8 h-8" 
                  :class="star <= item.rating ? 'fill-black stroke-black' : 'fill-transparent stroke-gray-300'"
                  viewBox="0 0 24 24" 
                  stroke-width="1"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                </svg>
              </button>
            </div>
          </div>

          <div class="flex-grow w-full pt-2">
            <p class="text-[10px] uppercase tracking-widest text-gray-400 mb-2">Comment</p>
            <textarea 
              v-model="item.comment" 
              placeholder="How was the quality and craftsmanship?"
              class="w-full h-32 p-4 bg-transparent border border-gray-200 focus:outline-none focus:border-black transition-colors resize-none text-sm"
            ></textarea>
          </div>
        </div>

        <div class="flex justify-end pt-8">
          <button 
            type="submit"
            :disabled="submitting"
            class="bg-black text-white px-20 py-4 rounded-sm text-xs font-bold uppercase tracking-[0.3em] hover:bg-amber-800 transition-all active:scale-95 shadow-xl disabled:bg-gray-400"
          >
            {{ submitting ? 'Archiving...' : 'Confirm Testimony' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import api from '../api';

const router = useRouter();
const route = useRoute();
const ratingItems = ref([]);
const loading = ref(true);
const submitting = ref(false);

const getFullImageUrl = (imagePath) => {
  if (!imagePath) return 'https://via.placeholder.com/400x400';
  if (imagePath.startsWith('http')) return imagePath;
  const baseUrl = import.meta.env.VITE_API_URL.replace('/api', '');
  return `${baseUrl}${imagePath}`;
};

onMounted(async () => {
  try {
    const orderId = route.params.orderId;
    const { data } = await api.get('/orders/myorders');
    
    const productsToRate = [];
    const targetOrders = orderId ? data.filter(o => o._id === orderId) : data;

    targetOrders.forEach(order => {
      if (order.items && order.items.length > 0) {
        order.items.forEach(item => {
          const actualProductId = item.productId || (item.product && item.product._id) || item.product;
          
          if (actualProductId && !productsToRate.find(p => p.product === actualProductId)) {
            productsToRate.push({
              product: actualProductId, 
              name: item.name,
              image: item.image,
              quantity: item.quantity || item.qty || 1, 
              rating: 5,
              comment: ""
            });
          }
        });
      }
    });
    
    ratingItems.value = productsToRate;
  } catch (error) {
    console.error("Failed to load acquisitions:", error);
  } finally {
    loading.value = false;
  }
});

const submitRatings = async () => {
  if (ratingItems.value.some(item => !item.comment.trim())) {
    alert("Please provide a brief comment for your acquisitions.");
    return;
  }

  try {
    submitting.value = true;
    
    const promises = ratingItems.value.map(item => {
      return api.post(`/products/${item.product}/reviews`, {
        rating: item.rating,
        comment: item.comment
      });
    });

    await Promise.all(promises);
    alert("Your testimonial has been added to the Shoporia archives.");
    router.push('/orders'); 
  } catch (error) {
    console.error("Feedback Submission Failed:", error);
    if (error.response?.status === 404) {
      alert("Error: One or more products no longer exist in our database.");
    } else {
      alert(error.response?.data?.message || "Error saving feedback.");
    }
  } finally {
    submitting.value = false;
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');

.font-serif { font-family: 'Playfair Display', serif; }
textarea:focus { background-color: #fafafa; }
</style>