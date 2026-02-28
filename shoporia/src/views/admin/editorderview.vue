<template>
  <div class="min-h-screen bg-[#fcfcfc] text-black font-sans pb-20">
    <nav class="py-6 px-6 md:px-12 bg-white border-b border-gray-100 sticky top-0 z-20">
      <div class="max-w-7xl mx-auto flex items-center gap-4 text-[10px] uppercase tracking-widest font-bold">
        <router-link to="/admin" class="text-gray-400 hover:text-black transition-colors">Dashboard</router-link>
        <span class="text-gray-300">/</span>
        <span class="text-amber-700">Order Management</span>
      </div>
    </nav>

    <div v-if="loading" class="flex flex-col items-center justify-center h-[60vh]">
      <div class="w-6 h-6 border-2 border-amber-600 border-t-transparent rounded-full animate-spin"></div>
      <p class="text-[9px] uppercase tracking-widest mt-4 text-stone-400">Retrieving Archive...</p>
    </div>

    <div v-else-if="order" class="max-w-5xl mx-auto px-6 py-16">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        <div class="lg:col-span-2 space-y-8">
          <header>
            <h1 class="text-4xl font-serif uppercase tracking-tighter">Order Detail</h1>
            <p class="text-[10px] uppercase tracking-[0.4em] text-gray-400 mt-2">Internal ID: {{ order._id }}</p>
          </header>

          <div class="bg-white border border-gray-100 p-8 shadow-sm">
            <h3 class="text-[11px] uppercase tracking-widest font-black border-b border-black pb-2 mb-6">Acquired Items</h3>
            <div class="space-y-6">
              <div v-for="item in order.items" :key="item._id" class="flex items-center gap-6 pb-6 border-b border-gray-50 last:border-0">
                <div class="w-20 h-20 bg-gray-50 flex-shrink-0 border border-stone-100">
                  <img :src="getImageUrl(item.image)" class="w-full h-full object-cover">
                </div>
                <div class="flex-grow">
                  <h4 class="text-xs font-bold uppercase tracking-tight">{{ item.name }}</h4>
                  <p class="text-[9px] text-stone-400 mt-1 uppercase tracking-widest">
                    {{ item.color }} / {{ item.size }}
                  </p>
                  <p class="text-[10px] text-stone-500 mt-1 font-mono">QTY: {{ item.quantity }}</p>
                </div>
                <div class="text-right">
                    <p class="text-xs font-bold">₱{{ (item.price * item.quantity).toLocaleString() }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="space-y-6">
          <div class="bg-black text-white p-8 shadow-xl">
            <h3 class="text-[11px] uppercase tracking-widest font-bold mb-8 border-b border-white/10 pb-2">Status Control</h3>
            
            <div class="space-y-8">
              <div>
                <label class="text-[9px] uppercase text-gray-400 block mb-4">Fulfillment Status</label>
                <select v-model="order.status" class="bg-stone-800 text-white text-[10px] uppercase tracking-widest px-4 py-2 border-none w-full outline-none">
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>

              <div class="pt-6 border-t border-white/10">
                <div class="flex justify-between items-end mb-2">
                    <p class="text-[9px] uppercase text-gray-400">Shipping</p>
                    <p class="text-xs font-mono">₱{{ order.shipping?.toLocaleString() }}</p>
                </div>
                <p class="text-[9px] uppercase text-gray-400 mb-1">Total Valuation</p>
                <p class="text-3xl font-serif text-amber-500">₱{{ order.total?.toLocaleString() }}</p>
                <p class="text-[8px] uppercase tracking-widest text-stone-500 mt-2">Payment: {{ order.paymentMethod }}</p>
              </div>

              <button @click="handleUpdate" :disabled="updating"
                      class="w-full bg-white text-black py-4 text-[10px] font-bold uppercase tracking-widest hover:bg-amber-500 hover:text-white transition-all disabled:opacity-50">
                {{ updating ? 'Syncing...' : 'Commit Update' }}
              </button>
            </div>
          </div>

          <div class="bg-white p-8 border border-gray-100 shadow-sm">
            <h3 class="text-[11px] uppercase tracking-widest font-bold mb-4 border-b border-stone-100 pb-2">Consignee Info</h3>
            <p class="text-xs font-bold uppercase tracking-tight">{{ order.shippingAddress?.fullName }}</p>
            <div class="mt-4 space-y-1 text-[10px] text-stone-500 uppercase tracking-wide">
                <p>{{ order.shippingAddress?.address }}</p>
                <p>{{ order.shippingAddress?.city }}, {{ order.shippingAddress?.province }}</p>
                <p>ZIP: {{ order.shippingAddress?.zip }}</p>
            </div>
            <div class="mt-6 pt-4 border-t border-stone-50">
                 <p class="text-[9px] text-stone-400">Created: {{ new Date(order.createdAt).toLocaleString() }}</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import api from '../../api';

const route = useRoute();
const router = useRouter();
const order = ref(null);
const loading = ref(true);
const updating = ref(false);

const BACKEND_URL = 'http://localhost:5000';

const getImageUrl = (path) => {
  if (!path) return '/placeholder.jpg';
  return path.startsWith('http') ? path : `${BACKEND_URL}${path}`;
};

const fetchOrder = async () => {
  try {
    loading.value = true;
    const orderId = route.params.id;
    
    // Safety check for ID
    if (!orderId || orderId === 'undefined') {
       throw new Error("Invalid Order Reference");
    }

    const { data } = await api.get(`/orders/${orderId}`);
    order.value = data;
  } catch (err) {
    console.error("Fetch Error:", err.response?.data || err);
    alert(err.response?.data?.message || "Order record not found.");
    router.push('/admin');
  } finally {
    loading.value = false;
  }
};

const handleUpdate = async () => {
  try {
    updating.value = true;
    await api.put(`/orders/${order.value._id}/status`, { 
        status: order.value.status 
    });
    alert("Logistics archive updated.");
    router.push('/admin');
  } catch (err) {
    alert("Fulfillment update failed.");
  } finally {
    updating.value = false;
  }
};

onMounted(fetchOrder);
</script>