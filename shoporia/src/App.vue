<template>
  <div class="w-full min-h-screen flex flex-col font-sans selection:bg-stone-200 selection:text-black bg-white">
    
    <div class="w-full bg-black text-white text-[9px] md:text-[10px] uppercase tracking-[0.3em] py-2.5 text-center px-4">
      Complimentary Express Shipping on Orders Over ₱10,000
    </div>

    <nav class="w-full sticky top-0 z-[100] bg-white/90 backdrop-blur-md border-b border-stone-100 px-6 md:px-12 py-4">
      <div class="max-w-[1440px] mx-auto flex items-center justify-between relative">
        
        <div class="hidden lg:flex gap-10 text-[11px] uppercase tracking-[0.25em] font-bold text-stone-400">
          <router-link to="/products" class="hover:text-black transition-colors relative group">
            Collection
            <span class="absolute -bottom-1 left-0 w-0 h-[1px] bg-black transition-all group-hover:w-full"></span>
          </router-link>
          <router-link to="/feature" class="hover:text-black transition-colors relative group">
            Features
            <span class="absolute -bottom-1 left-0 w-0 h-[1px] bg-black transition-all group-hover:w-full"></span>
          </router-link>
          <router-link to="/contact" class="hover:text-black transition-colors relative group">
            Contact Us
            <span class="absolute -bottom-1 left-0 w-0 h-[1px] bg-black transition-all group-hover:w-full"></span>
          </router-link>
        </div>

        <div class="lg:hidden">
          <button @click="isMobileMenuOpen = !isMobileMenuOpen" class="text-black p-2 -ml-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path v-if="!isMobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2" d="M4 8h16M4 16h16" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <router-link to="/" class="absolute left-1/2 -translate-x-1/2 flex flex-col items-center group">
          <img src="/logo.png" alt="Shoporia Logo" class="h-10 md:h-14 w-auto object-contain brightness-0 transition-transform duration-700 group-hover:scale-105" />
          <span class="hidden md:block text-[7px] uppercase tracking-[0.7em] text-stone-300 mt-1.5 ml-1">Manila</span>
        </router-link>

        <div class="flex items-center gap-4 md:gap-7 text-stone-900">
          
          <router-link to="/profile" class="hidden sm:block hover:opacity-50 transition-opacity" title="Account">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-[1.2rem] h-[1.2rem]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.1" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </router-link>

          <router-link to="/orders" class="hover:opacity-50 transition-opacity relative group" title="My Orders">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-[1.2rem] h-[1.2rem]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.1" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
            <span class="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-black text-white text-[8px] px-2 py-1 tracking-widest uppercase hidden md:group-hover:block whitespace-nowrap">Archives History</span>
          </router-link>

          <router-link to="/cart" class="relative hover:opacity-50 transition-opacity" title="Shopping Bag">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-[1.2rem] h-[1.2rem]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.1" d="M16 11V7a4 4 0 11-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span v-if="cartCount > 0" class="absolute -top-1.5 -right-2 bg-stone-900 text-white text-[8px] w-4 h-4 flex items-center justify-center rounded-full font-bold border border-white">
              {{ cartCount }}
            </span>
          </router-link>
          
        </div>
      </div>
      
      <transition name="menu-slide">
        <div v-if="isMobileMenuOpen" class="lg:hidden absolute top-full left-0 w-full bg-white border-b border-stone-100 shadow-2xl overflow-hidden">
          <div class="flex flex-col py-12 px-8 gap-8 uppercase tracking-[0.4em] text-[10px] font-bold text-center">
            <router-link @click="isMobileMenuOpen = false" to="/products" class="text-stone-900">Collection</router-link>
            <router-link @click="isMobileMenuOpen = false" to="/feature" class="text-stone-900">Features</router-link>
            <router-link @click="isMobileMenuOpen = false" to="/contact" class="text-stone-900">Contact Us</router-link>
            <div class="h-[1px] w-12 bg-stone-200 mx-auto my-2"></div>
            <router-link @click="isMobileMenuOpen = false" to="/orders" class="text-stone-400">Order Tracking</router-link>
            <router-link @click="isMobileMenuOpen = false" to="/profile" class="text-stone-400">My Account</router-link>
          </div>
        </div>
      </transition>
    </nav>

    <main class="flex-grow">
      <router-view v-slot="{ Component }">
        <transition name="page-fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <footer class="bg-stone-50 border-t border-stone-100 pt-24 pb-12 mt-auto">
      <div class="max-w-[1440px] mx-auto px-6 md:px-12">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          
          <div class="flex flex-col items-start">
            <img src="/logo.png" alt="Shoporia" class="h-10 w-auto mb-8 brightness-0 opacity-80" />
            <p class="text-stone-400 text-xs leading-relaxed uppercase tracking-tighter max-w-[240px]">
              A curated destination for timeless silhouettes and artisan craftsmanship.
            </p>
          </div>

          <div>
            <h4 class="text-[10px] uppercase tracking-[0.4em] font-black text-stone-900 mb-8">Client Services</h4>
            <ul class="space-y-5 text-[11px] text-stone-500 uppercase tracking-widest font-medium">
              <li><router-link to="/contact" class="hover:text-black transition-colors">Contact Us</router-link></li>
              <li><router-link to="/orders" class="hover:text-black transition-colors">Track My Order</router-link></li>
              <li><router-link to="/" class="hover:text-black transition-colors">Returns & Exchanges</router-link></li>
            </ul>
          </div>

          <div>
            <h4 class="text-[10px] uppercase tracking-[0.4em] font-black text-stone-900 mb-8">Maison</h4>
            <ul class="space-y-5 text-[11px] text-stone-500 uppercase tracking-widest font-medium">
              <li><router-link to="/feature" class="hover:text-black transition-colors">Sustainability</router-link></li>
              <li><router-link to="/" class="hover:text-black transition-colors">Terms of Service</router-link></li>
              <li><router-link to="/" class="hover:text-black transition-colors">Privacy</router-link></li>
            </ul>
          </div>

          <div>
            <h4 class="text-[10px] uppercase tracking-[0.4em] font-black text-stone-900 mb-8">Newsletter</h4>
            <p class="text-[11px] text-stone-400 mb-6 tracking-tight leading-relaxed">Join the inner circle for seasonal arrivals.</p>
            <div class="flex border-b border-stone-200 pb-3 group focus-within:border-black transition-colors">
              <input type="email" placeholder="EMAIL ADDRESS" class="bg-transparent text-[10px] w-full focus:outline-none uppercase tracking-widest placeholder:text-stone-300">
              <button class="text-[10px] uppercase font-bold tracking-[0.2em] ml-4 hover:opacity-50 transition-opacity">Subscribe</button>
            </div>
          </div>
        </div>

        <div class="flex flex-col md:flex-row justify-between items-center border-t border-stone-100 pt-12 text-[9px] uppercase tracking-[0.5em] text-stone-300 font-bold">
          <span>© 2026 Shoporia Archives Manila</span>
          <div class="flex gap-8 mt-6 md:mt-0">
            <a href="#" class="hover:text-black transition-colors">Instagram</a>
            <a href="#" class="hover:text-black transition-colors">Twitter</a>
            <a href="#" class="hover:text-black transition-colors">Threads</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const isMobileMenuOpen = ref(false);
const cartCount = ref(0);

const updateCartCount = () => {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  cartCount.value = cart.reduce((acc, item) => acc + item.qty, 0);
};

onMounted(() => {
  updateCartCount();
  // Sync across tabs and triggers
  window.addEventListener('storage', updateCartCount);
});
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');

body {
  scroll-behavior: smooth;
  -webkit-font-smoothing: antialiased;
}

.font-serif {
  font-family: 'Playfair Display', serif;
}

/* Transitions */
.menu-slide-enter-active, .menu-slide-leave-active { 
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1); 
}
.menu-slide-enter-from, .menu-slide-leave-to { 
  opacity: 0; 
  transform: translateY(-20px); 
}

.page-fade-enter-active, .page-fade-leave-active {
  transition: opacity 0.4s ease;
}
.page-fade-enter-from, .page-fade-leave-to {
  opacity: 0;
}

/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 5px;
}
::-webkit-scrollbar-track {
  background: #fdfdfd;
}
::-webkit-scrollbar-thumb {
  background: #000;
}
</style>