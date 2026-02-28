<template>
  <div class="w-full bg-[#fafafa] selection:bg-black selection:text-white overflow-hidden">
    
    <section class="relative min-h-[90vh] flex items-center px-6 md:px-20 py-20 bg-white">
      <div class="max-w-[1440px] mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-16 items-center">
        
        <div class="md:col-span-5 z-10">
          <div class="overflow-hidden mb-6">
            <span class="text-[10px] uppercase tracking-[0.8em] text-stone-400 block animate-slide-up">
              Est. 2026 — Manila
            </span>
          </div>
          
          <h1 class="text-7xl md:text-[8rem] font-serif leading-[0.8] text-[#1a1a1a] mb-12 uppercase tracking-tighter">
            The <br> 
            <span class="italic font-light text-stone-300 ml-4 md:ml-20">New</span> <br> 
            Standard
          </h1>

          <p class="text-stone-500 max-w-sm mb-12 font-light leading-relaxed">
            A curated dialogue between architectural precision and artisanal soul. Discover a collection where every stitch is a signature.
          </p>

          <router-link to="/products" class="inline-flex items-center group">
            <div class="w-14 h-14 rounded-full border border-stone-200 flex items-center justify-center group-hover:bg-black group-hover:border-black transition-all duration-500">
              <span class="text-xl group-hover:text-white transition-colors">→</span>
            </div>
            <span class="ml-4 text-[10px] uppercase tracking-[0.4em] font-bold">Begin Exploration</span>
          </router-link>
        </div>

        <div class="md:col-span-7 relative">
          <div class="relative z-10 aspect-[4/5] md:aspect-auto md:h-[750px] overflow-hidden group">
            <img src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1440" 
                 class="w-full h-full object-cover grayscale-[20%] group-hover:scale-105 transition-transform duration-[3s]">
          </div>
          <div class="absolute -top-10 -right-10 w-40 h-40 border border-stone-100 -z-0 hidden md:block"></div>
          <div class="absolute -bottom-20 -left-20 hidden md:block group-hover:translate-x-4 transition-transform duration-1000">
             <span class="text-[14rem] font-serif text-stone-50/50 select-none">01</span>
          </div>
        </div>
      </div>
    </section>

    <section class="max-w-[1440px] mx-auto px-6 md:px-20 py-40">
      <div class="flex flex-col md:flex-row justify-between items-end mb-32">
        <div class="max-w-xl">
          <h2 class="text-5xl md:text-7xl font-serif uppercase leading-none mb-8">Selected <br> <span class="italic font-light text-stone-400">Chapters</span></h2>
          <p class="text-stone-400 text-sm uppercase tracking-widest">A journey through form and function.</p>
        </div>
        <router-link to="/products" class="hidden md:block text-[10px] uppercase tracking-widest border-b border-stone-300 pb-2 hover:border-black transition-colors">
          View All Categories
        </router-link>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-12 gap-y-32 md:gap-y-64 gap-x-12">
        <div class="md:col-span-7 group cursor-pointer" @click="$router.push('/products')">
          <div class="relative overflow-hidden bg-stone-100 aspect-[16/10]">
            <img src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1200" 
                 class="w-full h-full object-cover mix-blend-multiply group-hover:scale-110 transition-transform duration-[2s]">
            <div class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-center justify-center">
               <span class="text-white text-[10px] uppercase tracking-[0.5em] border border-white px-8 py-3">View Bags</span>
            </div>
          </div>
          <div class="mt-12 max-w-md">
            <h3 class="text-4xl font-serif uppercase mb-4 tracking-tighter">The Sculptural Carry</h3>
            <p class="text-stone-500 font-light leading-relaxed italic text-lg">"Redefining the silhouette of everyday luxury through Italian craftsmanship."</p>
          </div>
        </div>

        <div class="md:col-span-4 md:col-start-9 group cursor-pointer self-center md:-mt-32" @click="$router.push('/products')">
          <div class="relative overflow-hidden bg-stone-100 aspect-[3/4]">
            <img src="https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=800" 
                 class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000">
          </div>
          <div class="mt-8 border-l border-stone-200 pl-8">
            <h3 class="text-2xl font-serif uppercase mb-2">Essential Leather</h3>
            <p class="text-stone-400 text-xs uppercase tracking-widest">Handmade Accessories</p>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-[#111] text-white py-40 overflow-hidden relative">
      <div class="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
        <span class="text-[30vw] font-serif uppercase tracking-tighter italic">Testimony</span>
      </div>

      <div class="max-w-[1440px] mx-auto px-6 md:px-20 relative z-10">
        <div class="max-w-4xl mx-auto text-center mb-32">
          <span class="text-[10px] uppercase tracking-[0.6em] text-stone-500 mb-8 block font-bold">The Collective Voice</span>
          <h3 class="text-5xl md:text-8xl font-serif mb-12 uppercase leading-none tracking-tighter">
            In Pursuit of <br> <span class="italic font-light">Perfection</span>
          </h3>
          <div class="w-20 h-[1px] bg-stone-700 mx-auto"></div>
        </div>
        
        <div v-if="loading" class="flex justify-center py-20">
          <div class="w-12 h-12 border border-stone-800 border-t-stone-200 rounded-full animate-spin"></div>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="(review, index) in reviews" :key="index" 
               class="p-12 border border-stone-800 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-700 group">
            <div class="flex text-[8px] space-x-1 mb-8 opacity-40 group-hover:opacity-100 transition-opacity">
              <span v-for="s in 5" :key="s" class="text-white">★</span>
            </div>
            <p class="text-stone-300 mb-12 leading-relaxed font-light italic text-xl">"{{ review.comment || review.text }}"</p>
            
            <div class="flex items-center gap-6">
              <div class="w-12 h-12 rounded-full overflow-hidden border border-stone-700 p-1">
                 <div class="w-full h-full bg-stone-800 rounded-full flex items-center justify-center text-xs font-serif italic text-stone-500">
                    {{ (review.name || 'A').charAt(0) }}
                 </div>
              </div>
              <div>
                <p class="text-[10px] font-bold uppercase tracking-[0.3em] text-white">{{ review.name || 'Anonymous' }}</p>
                <p class="text-[8px] text-stone-500 uppercase tracking-[0.4em] mt-1">Acquired Archive</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-40 text-center bg-white">
      <h4 class="text-sm uppercase tracking-[0.8em] text-stone-400 mb-8">Ready to Curate?</h4>
      <router-link to="/products" class="text-6xl md:text-9xl font-serif uppercase tracking-tighter hover:italic transition-all duration-700">
        Go to Store
      </router-link>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '../api';

const reviews = ref([]);
const loading = ref(true);

const mockReviews = [
  { name: 'Krizza P.', text: 'The attention to detail in the hardware is something I’ve only seen in high-end Parisian maisons.', rating: 5 },
  { name: 'Sultana R.', text: 'A truly bespoke experience. The bag arrived in museum-grade packaging.', rating: 5 },
  { name: 'Camila G.', text: 'Minimalism at its peak. Shoporia is now my go-to for investment pieces.', rating: 5 }
];

onMounted(async () => {
  try {
    const { data } = await api.get('/products/top-reviews'); 
    reviews.value = data?.length > 0 ? data.slice(0, 3) : mockReviews;
  } catch (error) {
    reviews.value = mockReviews;
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');

.font-serif { font-family: 'Playfair Display', serif; }

@keyframes slide-up {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-slide-up {
  animation: slide-up 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

/* Luxury Smooth Scroll Simulation */
html { scroll-behavior: smooth; }
</style>