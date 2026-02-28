<template>
  <div class="min-h-screen bg-[#0a0a0a] flex items-stretch overflow-hidden font-sans selection:bg-amber-500/30">
    
    <div class="hidden lg:flex lg:w-1/2 relative overflow-hidden">
      <img 
        src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1920&auto=format&fit=crop" 
        alt="Atmospheric Archive" 
        class="absolute inset-0 w-full h-full object-cover grayscale brightness-50 contrast-125 transition-transform duration-[10s] hover:scale-110"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-60"></div>
      <div class="relative z-10 self-end p-20">
        <span class="text-[10px] uppercase tracking-[0.8em] text-amber-500 mb-4 block animate-reveal">EST. 2026</span>
        <h2 class="text-5xl font-serif italic text-white leading-tight animate-reveal">The Shoporia <br> Archive Manila</h2>
      </div>
    </div>

    <div class="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 bg-white relative">
      
      <router-link to="/" class="absolute top-8 right-8 text-gray-300 hover:text-black transition-colors p-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </router-link>

      <div class="max-w-md w-full animate-reveal">
        <header class="mb-12">
          <span class="text-[9px] uppercase tracking-[0.6em] text-gray-400 block mb-2">Authenticated Access</span>
          <h1 class="text-4xl font-serif uppercase tracking-tighter text-gray-900 leading-none">Identity <span class="italic font-light">Login</span></h1>
        </header>

        <transition name="fade">
          <div v-if="errorMsg" class="mb-8 p-4 bg-red-50 border-l-2 border-red-500 text-red-700 text-[10px] uppercase tracking-widest font-bold">
            {{ errorMsg }}
          </div>
        </transition>

        <form @submit.prevent="handleLogin" class="space-y-10">
          <div class="relative">
            <label class="text-[9px] uppercase text-gray-400 font-black tracking-widest block mb-2">Email Address</label>
            <input 
              v-model="email" 
              type="email" 
              placeholder="member@shoporia.com" 
              required 
              class="w-full border-b border-gray-100 py-3 text-sm focus:outline-none bg-transparent transition-all placeholder:text-gray-200 focus:border-black peer"
            >
            <div class="absolute bottom-0 left-0 w-0 h-[1px] bg-black transition-all duration-500 peer-focus:w-full"></div>
          </div>
          
          <div class="relative">
            <div class="flex justify-between items-end mb-2">
              <label class="text-[9px] uppercase text-gray-400 font-black tracking-widest">Secret Key</label>
              <a href="#" class="text-[8px] uppercase tracking-widest text-gray-300 hover:text-black transition-colors">Forgot?</a>
            </div>
            <input 
              v-model="password" 
              type="password" 
              placeholder="••••••••" 
              required 
              class="w-full border-b border-gray-100 py-3 text-sm focus:outline-none bg-transparent transition-all placeholder:text-gray-200 focus:border-black peer"
            >
            <div class="absolute bottom-0 left-0 w-0 h-[1px] bg-black transition-all duration-500 peer-focus:w-full"></div>
          </div>

          <button 
            type="submit" 
            :disabled="loading"
            class="group relative w-full overflow-hidden bg-black text-white py-5 text-[10px] font-bold uppercase tracking-[0.5em] transition-all disabled:bg-gray-200"
          >
            <span class="relative z-10">{{ loading ? 'Authenticating...' : 'Enter the Archives' }}</span>
            <div class="absolute inset-0 bg-amber-900 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
          </button>
        </form>

        <footer class="mt-16 pt-8 border-t border-gray-50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p class="text-[10px] uppercase tracking-[0.2em] text-gray-400">
            No profile yet? 
            <router-link to="/signup" class="text-black font-black ml-2 border-b border-black/10 hover:border-black transition-all">Request Access</router-link>
          </p>
          <div class="flex gap-4 opacity-20 grayscale hover:opacity-100 transition-all duration-700">
             <span class="text-[8px] font-bold uppercase tracking-widest">Maison Shoporia</span>
          </div>
        </footer>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import api from '../api'; 
import { useRouter } from 'vue-router';

const router = useRouter();
const email = ref('');
const password = ref('');
const loading = ref(false);
const errorMsg = ref('');

const handleLogin = async () => {
  errorMsg.value = '';
  try {
    loading.value = true;
    
    const response = await api.post('/users/login', {
      email: email.value,
      password: password.value
    });

    if (!response.data || !response.data.user) {
      throw new Error("Credentials invalid for archive access.");
    }

    const { token, user } = response.data;

    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    // Optional: Elegant custom greeting instead of alert
    // Use a toast library or store it for the next page
    
    if (user.role === 'admin') {
      router.push('/admin');
    } else {
      router.push('/products');
    }

  } catch (error) {
    console.error("Login Error:", error);
    errorMsg.value = error.response?.data?.message || "Authentication failed. Check your security key.";
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');

.font-serif { font-family: 'Playfair Display', serif; }

.animate-reveal {
  animation: reveal 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes reveal {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.fade-enter-active, .fade-leave-active { transition: opacity 0.5s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

/* Custom placeholder color for darker theme */
::placeholder {
  opacity: 0.5;
  letter-spacing: 0.1em;
}
</style>