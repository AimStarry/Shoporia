<template>
  <div class="min-h-screen bg-[#fafafa] text-stone-900 font-sans pb-32 selection:bg-amber-100">
    
    <header class="py-12 bg-white border-b border-stone-100 px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6 sticky top-0 z-30 shadow-sm">
      <div class="text-center md:text-left">
        <span class="text-[9px] uppercase tracking-[0.5em] text-stone-400 block mb-1">Internal Operations</span>
        <h1 class="text-4xl font-serif uppercase tracking-tighter">Executive <span class="italic font-light">Control</span></h1>
      </div>

      <div class="flex items-center gap-4">
        <router-link to="/products" class="group flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest px-4 py-2 border border-stone-200 hover:bg-stone-50 transition-all">
          <svg class="w-3 h-3 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M10 19l-7-7m0 0l7-7m-7 7h18" stroke-width="2"/></svg>
          Public Shop
        </router-link>
        <router-link to="/admin/add-admin" class="bg-stone-900 text-white px-6 py-2.5 text-[10px] font-bold uppercase tracking-widest hover:bg-amber-800 transition-all shadow-lg">
          Grant Access
        </router-link>
      </div>
    </header>

    <div class="max-w-[1440px] mx-auto px-6 md:px-12 mt-12 space-y-20">
      
      <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="p-8 bg-white border border-stone-100 rounded-sm shadow-sm group hover:border-amber-200 transition-colors">
          <p class="text-[9px] uppercase tracking-[0.3em] text-stone-400 mb-3">Asset Valuation</p>
          <h4 class="text-3xl font-serif text-stone-900">₱{{ totalInventoryValue.toLocaleString() }}</h4>
          <div class="mt-4 h-[2px] w-full bg-stone-50 overflow-hidden">
            <div class="h-full bg-stone-900 w-2/3 group-hover:w-full transition-all duration-1000"></div>
          </div>
        </div>
        
        <div class="p-8 bg-white border border-stone-100 rounded-sm shadow-sm group hover:border-amber-200 transition-colors">
          <p class="text-[9px] uppercase tracking-[0.3em] text-stone-400 mb-3">Fulfillment Queue</p>
          <h4 class="text-3xl font-serif text-amber-600">{{ pendingOrdersCount }} <span class="text-sm italic font-sans text-stone-400">Pending</span></h4>
          <p class="text-[8px] mt-2 text-stone-400 uppercase tracking-widest">Requires Attention</p>
        </div>

        <div class="p-8 bg-white border border-stone-100 rounded-sm shadow-sm group hover:border-amber-200 transition-colors">
          <p class="text-[9px] uppercase tracking-[0.3em] text-stone-400 mb-3">Inquiry Volume</p>
          <h4 class="text-3xl font-serif">{{ messages.length }}</h4>
          <p class="text-[8px] mt-2 text-stone-400 uppercase tracking-widest">Customer Archives</p>
        </div>

        <div class="p-8 bg-stone-900 text-white rounded-sm shadow-xl relative overflow-hidden group">
          <div class="absolute -right-4 -top-4 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-all"></div>
          <p class="text-[9px] uppercase tracking-[0.3em] text-stone-500 mb-3">Gross Revenue</p>
          <h4 class="text-3xl font-serif text-amber-500">₱{{ totalRevenue.toLocaleString() }}</h4>
          <p class="text-[8px] mt-2 text-stone-400 uppercase tracking-widest">Total Acquisitions</p>
        </div>
      </section>

      <section id="orders" class="bg-white p-8 border border-stone-100 shadow-sm">
        <div class="flex justify-between items-center mb-8 border-b border-stone-100 pb-6">
          <h2 class="text-2xl font-serif uppercase tracking-tight">Logistics <span class="italic text-stone-400">Ledger</span></h2>
          <span class="text-[9px] bg-stone-50 px-3 py-1 uppercase tracking-widest font-bold text-stone-400">{{ orders.length }} Entries</span>
        </div>
        
        <div class="overflow-x-auto hidden md:block">
          <table class="w-full text-left text-[10px] uppercase tracking-[0.15em]">
            <thead>
              <tr class="text-stone-400 border-b border-stone-50">
                <th class="py-4 font-bold">Reference</th>
                <th>Consignee</th>
                <th>City / Province</th>
                <th>Value</th>
                <th>Status</th>
                <th class="text-right">Operations</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-stone-50">
              <tr v-for="order in orders" :key="order._id" class="group hover:bg-stone-50/50 transition-colors">
                <td class="py-5 font-mono text-[9px] text-stone-400">#{{ order._id.slice(-8).toUpperCase() }}</td>
                
                <td class="font-bold text-stone-900">
                  {{ order.shippingAddress?.fullName || 'Anonymous Client' }}
                </td>

                <td class="text-stone-500">
                  {{ order.shippingAddress?.city }}, {{ order.shippingAddress?.province }}
                </td>

                <td class="font-serif text-sm">₱{{ order.total?.toLocaleString() }}</td>
                <td>
                  <span :class="{
                    'bg-amber-50 text-amber-700': order.status === 'Processing',
                    'bg-emerald-50 text-emerald-700': order.status === 'Delivered',
                    'bg-blue-50 text-blue-700': order.status === 'Shipped'
                  }" class="px-3 py-1 rounded-full text-[8px] font-black tracking-widest shadow-sm">{{ order.status }}</span>
                </td>
                <td class="text-right py-5">
                  <div class="flex gap-2 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                    <button v-if="order.status === 'Processing'" @click="updateStatus(order._id, 'Shipped')" class="bg-blue-600 text-white px-3 py-1 hover:bg-blue-700 transition-colors">Ship</button>
                    <button v-if="order.status === 'Shipped'" @click="updateStatus(order._id, 'Delivered')" class="bg-emerald-600 text-white px-3 py-1 hover:bg-emerald-700 transition-colors">Deliver</button>
                    <button @click="router.push(`/admin/order/${order._id}`)" class="bg-stone-100 text-stone-600 px-3 py-1 hover:bg-black hover:text-white transition-colors">Detail</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="md:hidden space-y-4">
          <div v-for="order in orders" :key="order._id" class="p-4 border border-stone-100 rounded-sm space-y-3">
            <div class="flex justify-between items-start">
              <span class="text-[9px] font-mono text-stone-400 uppercase">#{{ order._id.slice(-8).toUpperCase() }}</span>
              <span class="text-[9px] font-black uppercase text-amber-700">{{ order.status }}</span>
            </div>
            <p class="text-xs font-bold uppercase">{{ order.shippingAddress?.fullName || 'Anonymous Client' }}</p>
            <p class="text-lg font-serif">₱{{ order.total?.toLocaleString() }}</p>
            <div class="flex gap-2 pt-2 border-t border-stone-50">
                <button @click="router.push(`/admin/order/${order._id}`)" class="flex-1 bg-stone-100 py-2 text-[9px] uppercase font-bold">Details</button>
                <button v-if="order.status !== 'Delivered'" @click="updateStatus(order._id, order.status === 'Processing' ? 'Shipped' : 'Delivered')" class="flex-1 bg-stone-900 text-white py-2 text-[9px] uppercase font-bold">Progress</button>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div class="flex justify-between items-end mb-10 border-b border-stone-900 pb-4">
          <h2 class="text-2xl font-serif uppercase tracking-tight">Product<span class="italic text-stone-400">Inventory</span></h2>
          <router-link to="/admin/add-product" class="text-[9px] font-bold uppercase tracking-[0.4em] border-b-2 border-stone-900 pb-1 hover:text-amber-700 hover:border-amber-700 transition-all">
            + Append Collection
          </router-link>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          <div v-for="product in products" :key="product._id" class="group bg-white border border-stone-100 p-4 hover:shadow-2xl transition-all duration-500 rounded-sm">
            <div class="aspect-[3/4] bg-stone-50 mb-4 overflow-hidden relative">
              <img :src="getImageUrl(product.image)" class="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700">
              <div class="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm p-2 translate-y-full group-hover:translate-y-0 transition-transform">
                 <p class="text-[8px] font-bold uppercase text-center tracking-widest text-stone-400">Stock: {{ product.countInStock || '∞' }}</p>
              </div>
            </div>
            <h3 class="font-bold text-[10px] uppercase tracking-widest truncate mb-1">{{ product.name }}</h3>
            <p class="text-amber-800 font-serif text-sm mb-4">₱{{ product.price.toLocaleString() }}</p>
            <div class="flex gap-1 border-t border-stone-50 pt-3">
              <button @click="router.push(`/admin/edit-product/${product._id}`)" class="flex-1 text-[8px] uppercase font-bold py-2 hover:bg-stone-900 hover:text-white transition-colors">Modify</button>
              <button @click="deleteProduct(product._id, product.name)" class="flex-1 text-[8px] uppercase font-bold py-2 text-red-800 hover:bg-red-800 hover:text-white transition-colors">Purge</button>
            </div>
          </div>
        </div>
      </section>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <section class="bg-white p-8 border border-stone-100 shadow-sm overflow-hidden">
          <h2 class="text-xl font-serif uppercase mb-8 border-b border-stone-50 pb-4">User <span class="italic text-stone-400">Directory</span></h2>
          <div class="space-y-4 max-h-[500px] overflow-y-auto pr-2">
            <div v-for="user in users" :key="user._id" class="flex items-center justify-between p-4 bg-stone-50/50 rounded-sm group hover:bg-white border border-transparent hover:border-stone-100 transition-all">
              <div>
                <p class="text-[10px] font-black uppercase tracking-widest">{{ user.firstName }} {{ user.lastName }}</p>
                <p class="text-[9px] text-stone-400 lowercase">{{ user.email }}</p>
              </div>
              <div class="flex items-center gap-4">
                <span class="text-[8px] uppercase font-bold tracking-[0.3em]" :class="user.role === 'admin' ? 'text-amber-600' : 'text-stone-300'">{{ user.role }}</span>
                <button @click="deleteUser(user._id, user.firstName)" class="opacity-0 group-hover:opacity-100 text-red-700 hover:text-red-500 transition-all">
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" stroke-width="1.5"/></svg>
                </button>
              </div>
            </div>
          </div>
        </section>

        <section class="bg-white p-8 border border-stone-100 shadow-sm">
          <h2 class="text-xl font-serif uppercase mb-8 border-b border-stone-50 pb-4">Inquiry <span class="italic text-stone-400">Archives</span></h2>
          <div class="space-y-6 max-h-[500px] overflow-y-auto pr-2">
            <div v-for="msg in messages" :key="msg._id" class="relative group p-6 border-l-2 border-stone-100 hover:border-amber-500 bg-[#fdfdfd] transition-all">
              <button @click="deleteMessage(msg._id)" class="absolute top-2 right-2 text-stone-300 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-all p-2">
                 <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M6 18L18 6M6 6l12 12" stroke-width="2"/></svg>
              </button>
              <div class="flex justify-between mb-3">
                <h5 class="font-black text-[9px] uppercase tracking-[0.3em]">{{ msg.name }}</h5>
                <span class="text-[8px] text-stone-400 font-mono">{{ new Date(msg.createdAt).toLocaleDateString() }}</span>
              </div>
              <p class="text-xs text-stone-600 leading-relaxed italic mb-4">"{{ msg.message }}"</p>
              <p class="text-[9px] text-amber-700 font-bold uppercase tracking-widest">{{ msg.email }}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import api from '../../api';

const router = useRouter();
const products = ref([]);
const users = ref([]);
const orders = ref([]);
const messages = ref([]);

const BACKEND_URL = 'http://localhost:5000';

const totalInventoryValue = computed(() => products.value.reduce((acc, curr) => acc + (curr.price * (curr.countInStock || 1)), 0));
const totalRevenue = computed(() => orders.value.reduce((acc, curr) => acc + (curr.total || 0), 0));
const pendingOrdersCount = computed(() => orders.value.filter(o => o.status === 'Processing').length);

const getImageUrl = (path) => {
  if (!path) return '/placeholder.jpg';
  return path.startsWith('http') ? path : `${BACKEND_URL}${path}`;
};

const fetchData = async () => {
  try {
    const [pRes, uRes, oRes, mRes] = await Promise.all([
      api.get('/products'),
      api.get('/users'),
      api.get('/orders'),
      api.get('/contacts')
    ]);
    products.value = pRes.data;
    users.value = uRes.data;
    orders.value = oRes.data;
    messages.value = mRes.data;
  } catch (err) {
    console.error("Dashboard Load Error:", err);
  }
};

const updateStatus = async (id, status) => {
  try {
    await api.put(`/orders/${id}/status`, { status });
    fetchData(); 
  } catch (err) {
    alert("Status update failed");
  }
};

const deleteUser = async (id, name) => {
  if (confirm(`Purge ${name} from the directory? This action is irreversible.`)) {
    try {
      await api.delete(`/users/${id}`);
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || "Purge failed.");
    }
  }
};

const deleteProduct = async (id, name) => {
  if (confirm(`Permanently remove ${name}?`)) {
    try {
      await api.delete(`/products/${id}`);
      fetchData();
    } catch { alert("Delete failed"); }
  }
};

const deleteMessage = async (id) => {
  if (confirm("Clear this inquiry?")) {
    try {
      await api.delete(`/contacts/${id}`);
      fetchData();
    } catch { alert("Failed to clear message"); }
  }
};

onMounted(fetchData);
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');
.font-serif { font-family: 'Playfair Display', serif; }

::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 10px; }
::-webkit-scrollbar-thumb:hover { background: #d1d5db; }
</style>