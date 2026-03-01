<template>
  <div class="w-full bg-[#fcfcfc] min-h-screen font-sans">
    <div class="py-12 border-b border-gray-100 bg-white">
      <div class="max-w-[1440px] mx-auto px-6 md:px-12 flex items-center justify-between">
        <h1 class="text-4xl font-serif uppercase tracking-tighter">Checkout</h1>
        <router-link to="/cart" class="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-black">
          ← Back to Cart
        </router-link>
      </div>
    </div>

    <div class="max-w-[1440px] mx-auto px-6 md:px-12 py-16">
      <form @submit.prevent="handlePayment" class="flex flex-col lg:flex-row gap-16">
        <div class="flex-grow space-y-12">
          <section>
            <h2 class="text-xl font-serif uppercase mb-8 flex items-center gap-4">
              <span class="bg-black text-white w-6 h-6 rounded-full text-[10px] flex items-center justify-center font-sans">1</span>
              Shipping Information
            </h2>
            
            <div class="flex gap-8 mb-10 border-b border-gray-100 pb-6">
              <label class="flex items-center gap-3 cursor-pointer group">
                <input type="radio" v-model="form.deliveryMethod" value="delivery" name="method" class="w-4 h-4 accent-black">
                <span class="text-sm font-bold uppercase tracking-widest group-hover:text-amber-700 transition">Delivery</span>
              </label>
              <label class="flex items-center gap-3 cursor-pointer group">
                <input type="radio" v-model="form.deliveryMethod" value="pickup" name="method" class="w-4 h-4 accent-black">
                <span class="text-sm font-bold uppercase tracking-widest group-hover:text-amber-700 transition">Pick-up</span>
              </label>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <div class="md:col-span-2 space-y-2">
                <label class="text-[10px] uppercase tracking-widest font-bold text-gray-400">Full Name</label>
                <input v-model="form.fullName" type="text" required class="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-black bg-transparent transition">
              </div>
              <div class="md:col-span-2 space-y-2">
                <label class="text-[10px] uppercase tracking-widest font-bold text-gray-400">Email Address</label>
                <input v-model="form.email" type="email" required class="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-black bg-transparent transition">
              </div>
              <div class="md:col-span-2 space-y-2">
                <label class="text-[10px] uppercase tracking-widest font-bold text-gray-400">Phone Number</label>
                <input v-model="form.phone" type="tel" required class="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-black bg-transparent transition">
              </div>
              <div class="md:col-span-2 space-y-2">
                <label class="text-[10px] uppercase tracking-widest font-bold text-gray-400">Street Address</label>
                <input v-model="form.address" type="text" required class="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-black bg-transparent transition">
              </div>
              <div class="space-y-2">
                <label class="text-[10px] uppercase tracking-widest font-bold text-gray-400">City</label>
                <input v-model="form.city" type="text" required class="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-black bg-transparent transition">
              </div>
              <div class="space-y-2">
                <label class="text-[10px] uppercase tracking-widest font-bold text-gray-400">Province</label>
                <input v-model="form.province" type="text" required class="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-black bg-transparent transition">
              </div>
              <div class="space-y-2">
                <label class="text-[10px] uppercase tracking-widest font-bold text-gray-400">Postal Code</label>
                <input v-model="form.zip" type="text" required class="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-black bg-transparent transition">
              </div>
            </div>
          </section>
        </div>

        <aside class="w-full lg:w-[450px]">
          <div class="bg-white p-8 md:p-10 rounded-2xl shadow-2xl border border-gray-50 sticky top-12">
            <h2 class="text-xl font-serif uppercase mb-8 border-b border-gray-50 pb-4">Review Your Cart</h2>
            
            <div class="max-h-[300px] overflow-y-auto mb-8 pr-2 space-y-6 custom-scrollbar">
              <div v-for="item in cartItems" :key="item._id" class="flex gap-4">
                <div class="w-20 h-24 bg-[#f9f9f9] rounded overflow-hidden flex-shrink-0">
                  <img :src="getFullImageUrl(item.image)" class="w-full h-full object-cover">
                </div>
                <div class="flex-grow py-1">
                  <h4 class="text-sm font-bold uppercase tracking-tight leading-none mb-1">{{ item.name }}</h4>
                  <p class="text-[10px] text-gray-400 uppercase tracking-widest mb-2">{{ item.color || 'Onyx' }} / {{ item.size || 'Standard' }} (x{{ item.quantity || item.qty }})</p>
                  <p class="font-bold text-sm">₱{{ item.price.toLocaleString() }}</p>
                </div>
              </div>
            </div>

            <div class="space-y-3 border-t border-gray-50 pt-6 mb-8">
              <div class="flex justify-between text-xs uppercase tracking-widest text-gray-400">
                <span>Subtotal</span>
                <span class="font-bold text-black">₱{{ subtotal.toLocaleString() }}</span>
              </div>
              <div class="flex justify-between text-xs uppercase tracking-widest text-gray-400">
                <span>Shipping</span>
                <span class="font-bold text-black" :class="{'text-emerald-600': subtotal >= 10000}">
                  {{ subtotal >= 10000 ? 'Free' : '₱' + shipping.toLocaleString() }}
                </span>
              </div>
              <div class="flex justify-between text-lg font-serif border-t border-gray-100 pt-4 mt-4">
                <span class="italic">Total</span>
                <span class="font-bold">₱{{ total.toLocaleString() }}</span>
              </div>
            </div>

            <button type="submit" :disabled="loading || cartItems.length === 0"
                    class="w-full bg-black text-white py-5 rounded-full text-xs font-bold uppercase tracking-[0.3em] hover:bg-amber-800 transition-all active:scale-95 shadow-xl flex items-center justify-center gap-4 disabled:bg-gray-400">
              {{ loading ? 'Processing...' : 'Pay Now' }}
              <svg v-if="!loading" xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </aside>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import api from '../api';

const router = useRouter();
const loading = ref(false);
const cartItems = ref([]);

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

const form = reactive({
  deliveryMethod: 'delivery',
  fullName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  province: '',
  zip: ''
});

const subtotal = computed(() => {
  return cartItems.value.reduce((acc, i) => acc + (i.price * (i.quantity || i.qty || 1)), 0);
});

const shipping = computed(() => {
  return subtotal.value >= 10000 ? 0 : 250;
});

const total = computed(() => subtotal.value + shipping.value);

const handlePayment = async () => {
  if (cartItems.value.length === 0) {
    alert("Cannot proceed with an empty cart.");
    return;
  }

  try {
    loading.value = true;
    
    const orderData = {
      items: cartItems.value.map(item => ({
        productId: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity || item.qty || 1,
        image: item.image,
        color: item.color || 'Standard',
        size: item.size || 'OS'
      })),
      shippingAddress: {
        fullName: form.fullName,
        address: form.address,
        city: form.city,
        province: form.province,
        zip: form.zip
      },
      subtotal: subtotal.value,
      shipping: shipping.value,
      total: total.value,
      paymentMethod: 'COD'
    };

    await api.post('/orders', orderData);
    alert("Order successful! Thank you for choosing Shoporia.");
    localStorage.removeItem('cart');
    window.dispatchEvent(new Event('storage'));
    router.push('/profile'); 
  } catch (error) {
    console.error("Order Failed:", error.response?.data || error);
    alert(error.response?.data?.message || "There was an issue processing your order.");
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');
.font-serif { font-family: 'Playfair Display', serif; }

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f1f1;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #000;
  border-radius: 10px;
}
</style>