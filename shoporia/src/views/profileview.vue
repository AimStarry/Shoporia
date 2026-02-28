<template>
  <div class="min-h-screen bg-[#0a0a0a] text-stone-200 selection:bg-amber-500/30 selection:text-white font-sans overflow-x-hidden">
    
    <div v-if="loading && !user" class="flex flex-col items-center justify-center h-screen space-y-6">
      <div class="w-12 h-[1px] bg-amber-500/20 relative overflow-hidden">
        <div class="absolute inset-0 bg-amber-500 animate-loading-slide"></div>
      </div>
      <p class="text-[9px] uppercase tracking-[0.6em] text-amber-500/60 animate-pulse">Decrypting Identity</p>
    </div>

    <div v-else-if="user" class="max-w-[1400px] mx-auto px-6 py-12 md:py-24 animate-reveal">
      
      <nav class="flex flex-col md:flex-row justify-between items-start md:items-center mb-20 gap-8">
        <div class="flex items-center gap-6">
          <div class="relative group">
            <div class="absolute -inset-1 bg-gradient-to-tr from-amber-600 to-transparent rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div class="relative w-16 h-16 bg-stone-900 border border-white/10 rounded-full flex items-center justify-center text-amber-500 font-serif italic text-xl">
              {{ user.firstName?.charAt(0) }}{{ user.lastName?.charAt(0) }}
            </div>
          </div>
          <div>
            <p class="text-[9px] uppercase tracking-[0.4em] text-stone-500 mb-1">Maison Member since {{ new Date(user.createdAt).getFullYear() }}</p>
            <h2 class="text-lg font-serif italic tracking-widest text-white">Salutations, {{ user.firstName }}</h2>
          </div>
        </div>
        
        <div class="flex items-center gap-4 w-full md:w-auto">
          <button v-if="user.role === 'admin'" @click="router.push('/admin')" 
                  class="flex-1 md:flex-none text-[9px] uppercase tracking-[0.3em] font-bold border border-amber-900/50 text-amber-500/80 px-6 py-3 hover:bg-amber-500 hover:text-black transition-all duration-500">
            Curator Panel
          </button>
          <button @click="handleLogout" 
                  class="flex-1 md:flex-none text-[9px] uppercase tracking-[0.3em] text-stone-500 hover:text-white transition-all py-3 px-4 border border-transparent hover:border-white/10">
            End Session
          </button>
        </div>
      </nav>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        <div class="lg:col-span-4 space-y-8">
          <div class="relative p-10 border border-white/5 bg-gradient-to-b from-white/[0.03] to-transparent rounded-sm backdrop-blur-md">
            <div class="flex justify-between items-start mb-12">
              <h3 class="text-[10px] uppercase tracking-[0.5em] text-amber-500 font-bold">Member Dossier</h3>
              <span class="text-[8px] px-2 py-1 border border-amber-500/20 text-amber-500 uppercase tracking-widest">{{ user.role }}</span>
            </div>

            <div class="space-y-10">
              <div class="group">
                <label class="text-[8px] uppercase text-stone-600 block mb-2 tracking-widest group-hover:text-amber-500 transition-colors">Legal Identity</label>
                <p class="text-2xl font-serif text-white">{{ user.firstName }} {{ user.lastName }}</p>
              </div>

              <div class="group">
                <label class="text-[8px] uppercase text-stone-600 block mb-2 tracking-widest group-hover:text-amber-500 transition-colors">Electronic Contact</label>
                <p class="text-sm tracking-[0.1em] text-stone-300 font-light">{{ user.email }}</p>
              </div>

              <div class="grid grid-cols-2 gap-8">
                <div>
                  <label class="text-[8px] uppercase text-stone-600 block mb-2 tracking-widest">Biological Sex</label>
                  <p class="text-xs uppercase text-stone-400">{{ user.gender || 'Private' }}</p>
                </div>
                <div>
                  <label class="text-[8px] uppercase text-stone-600 block mb-2 tracking-widest">Date of Birth</label>
                  <p class="text-xs text-stone-400">{{ user.birthDate ? formatDate(user.birthDate) : 'Undefined' }}</p>
                </div>
              </div>

              <div class="pt-10 border-t border-white/5">
                <label class="text-[8px] uppercase text-stone-600 block mb-2 tracking-widest">Direct Line</label>
                <p class="text-sm tracking-widest text-stone-300">{{ user.contactNumber || 'No Terminal Linked' }}</p>
              </div>
            </div>

            <div class="absolute bottom-4 right-4 opacity-[0.02] pointer-events-none select-none">
              <span class="text-6xl font-serif italic text-white">Arch.</span>
            </div>
          </div>
        </div>

        <div class="lg:col-span-8 space-y-12">
          
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div class="p-8 border border-white/5 bg-stone-900/30 flex justify-between items-end">
              <div>
                <p class="text-[8px] uppercase tracking-[0.4em] text-stone-500 mb-2">Total Value Acquired</p>
                <p class="text-2xl font-serif text-amber-500">₱{{ orders.reduce((acc, o) => acc + (o.total || 0), 0).toLocaleString() }}</p>
              </div>
              <svg class="w-8 h-8 opacity-10" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.97 0-1.8 1.39-3.06 3.11-3.43V4h2.67v1.94c1.46.31 2.53 1.14 2.87 2.41h-1.93c-.27-.76-.78-1.43-1.96-1.43-1.4 0-2.31.66-2.31 1.68 0 .93.85 1.38 2.68 1.82 2.67.65 4.19 1.67 4.19 4.07.01 2.06-1.47 3.26-3.22 3.6z"/></svg>
            </div>
            <div class="p-8 border border-white/5 bg-stone-900/30 flex justify-between items-end">
              <div>
                <p class="text-[8px] uppercase tracking-[0.4em] text-stone-500 mb-2">Archived Pieces</p>
                <p class="text-2xl font-serif text-white">{{ orders.length }} Items</p>
              </div>
              <svg class="w-8 h-8 opacity-10" fill="currentColor" viewBox="0 0 24 24"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10z"/></svg>
            </div>
          </div>

          <div class="border border-white/5 relative overflow-hidden">
            <div class="p-8 border-b border-white/5 flex justify-between items-center">
              <h4 class="text-[10px] uppercase tracking-[0.5em] font-bold">Acquisition Ledger</h4>
              <button @click="router.push('/orders')" class="text-[8px] uppercase tracking-widest text-amber-500 hover:text-white transition-colors">View All →</button>
            </div>
            
            <div v-if="orders.length > 0" class="divide-y divide-white/[0.03]">
              <div v-for="order in orders.slice(0, 5)" :key="order._id" 
                   @click="router.push('/orders')"
                   class="group grid grid-cols-1 sm:grid-cols-4 gap-4 p-8 hover:bg-white/[0.01] transition-all cursor-pointer items-center">
                
                <div class="sm:col-span-2">
                  <p class="text-[8px] text-stone-600 uppercase tracking-widest mb-1">REF: {{ order._id.slice(-8).toUpperCase() }}</p>
                  <h5 class="text-sm font-serif italic text-stone-200 group-hover:text-amber-500 transition-colors">
                    Processed on {{ formatDate(order.createdAt) }}
                  </h5>
                </div>

                <div class="text-left sm:text-center">
                  <span :class="getStatusClass(order.status)" class="text-[8px] uppercase tracking-[0.2em] px-3 py-1 border rounded-full">
                    {{ order.status }}
                  </span>
                </div>

                <div class="text-left sm:text-right">
                  <p class="text-white text-sm font-bold tracking-tighter">₱{{ order.total?.toLocaleString() }}</p>
                </div>
              </div>
            </div>

            <div v-else class="py-24 text-center">
              <p class="text-[10px] uppercase tracking-[0.4em] italic text-stone-600 mb-6">No prior acquisitions found.</p>
              <router-link to="/products" class="text-[9px] uppercase tracking-[0.3em] border-b border-stone-800 pb-1 hover:border-amber-500 transition-colors">Explore Collection</router-link>
            </div>
          </div>

          <div class="p-10 bg-gradient-to-r from-amber-900/10 to-transparent border border-amber-900/20">
             <div class="max-w-md">
                <h5 class="text-xs uppercase tracking-[0.3em] text-amber-500 mb-4 font-bold">Priority Curation</h5>
                <p class="text-stone-400 text-xs leading-relaxed mb-6 font-light">Your membership grants you early access to rare archive releases. Keep your digital contact updated to receive notifications.</p>
                <button class="text-[9px] uppercase tracking-[0.4em] text-white font-bold hover:text-amber-500 transition-colors">Manage Subscriptions →</button>
             </div>
          </div>

        </div>
      </div>
    </div>

    <div v-else class="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <div class="w-16 h-16 border border-white/5 rounded-full flex items-center justify-center mb-8">
        <svg class="w-6 h-6 text-stone-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
      </div>
      <h2 class="font-serif italic text-3xl mb-4 text-white">Identity Unverified</h2>
      <p class="text-stone-500 text-xs tracking-widest uppercase mb-12 max-w-xs leading-relaxed">Please authenticate your credentials to access the private archives.</p>
      <router-link to="/login" class="group relative px-12 py-5 overflow-hidden border border-white/10 hover:border-amber-500 transition-colors">
        <span class="relative z-10 text-[10px] font-bold uppercase tracking-[0.5em]">Login</span>
        <div class="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import api from '../api';

const router = useRouter();
const user = ref(null);
const orders = ref([]);
const loading = ref(true);

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

const getStatusClass = (status) => {
  const s = status?.toLowerCase();
  if (s === 'delivered') return 'border-emerald-500/30 text-emerald-500 bg-emerald-500/5';
  if (s === 'processing' || s === 'paid') return 'border-amber-500/30 text-amber-500 bg-amber-500/5';
  return 'border-stone-500/30 text-stone-500 bg-stone-500/5';
};

onMounted(async () => {
  const cachedUser = localStorage.getItem('user');
  if (cachedUser) {
    user.value = JSON.parse(cachedUser);
  }

  try {
    const [profileRes, ordersRes] = await Promise.all([
      api.get('/users/profile'),
      api.get('/orders/myorders')
    ]);

    user.value = profileRes.data;
    orders.value = ordersRes.data;
    
    localStorage.setItem('user', JSON.stringify(profileRes.data));
  } catch (err) {
    console.error("Session invalid:", err);
    if (err.response?.status === 401) {
      handleLogout();
    }
  } finally {
    loading.value = false;
  }
});

const handleLogout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  router.push('/login');
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');

.font-serif { font-family: 'Playfair Display', serif; }

.animate-reveal { animation: reveal 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
@keyframes reveal { 
  from { opacity: 0; transform: translateY(20px); } 
  to { opacity: 1; transform: translateY(0); } 
}

@keyframes loading-slide {
  0% { transform: translateX(-100%); }
  50% { transform: translateX(0); }
  100% { transform: translateX(100%); }
}
.animate-loading-slide { animation: loading-slide 1.5s infinite ease-in-out; }

/* Hide scrollbar but keep functionality */
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
</style>