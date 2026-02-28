<template>
  <div class="bg-white min-h-screen selection:bg-stone-200 selection:text-black">
    
    <section class="relative h-[90vh] w-full overflow-hidden flex items-center justify-center">
      <div class="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1440" 
          alt="Luxury Background" 
          class="w-full h-full object-cover brightness-75 scale-105"
        />
        <div class="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60"></div>
      </div>

      <div class="relative z-10 text-center px-6 max-w-5xl">
        <span class="text-white text-[10px] uppercase tracking-[0.6em] mb-6 block animate-fade-in">
          The 2026 Spring-Summer Collection
        </span>
        <h1 class="text-white text-6xl md:text-9xl font-serif uppercase tracking-tighter leading-[0.85] mb-8">
          Shoporia <br/>
          <span class="italic font-light lowercase">Archives</span>
        </h1>
        
        <div class="flex flex-col md:flex-row items-center justify-center gap-6">
          <router-link to="/products" 
            class="group relative overflow-hidden bg-white text-black px-12 py-5 uppercase tracking-[0.3em] text-[10px] font-bold transition-all duration-700 hover:text-white">
            <span class="relative z-10">Explore Collection</span>
            <div class="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
          </router-link>
          
          <router-link to="/feature" 
            class="text-white text-[10px] uppercase tracking-[0.4em] border-b border-white/40 pb-1 hover:border-white transition-all">
            The Campaign Film
          </router-link>
        </div>
      </div>

      <div class="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
        <div class="w-[1px] h-12 bg-gradient-to-b from-white to-transparent"></div>
      </div>
    </section>

    <section class="max-w-[1440px] mx-auto px-6 md:px-12 py-24 md:py-40">
      <div class="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        
        <div class="md:col-span-5 aspect-[3/4] overflow-hidden group">
          <img 
            src="https://images.unsplash.com/photo-1549439602-43ebca2327af?q=80&w=800" 
            class="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
            alt="Craftsmanship"
          />
        </div>

        <div class="md:col-span-6 md:col-start-7 space-y-8">
          <h2 class="text-[10px] uppercase tracking-[0.4em] text-stone-400">Our Heritage</h2>
          <h3 class="text-4xl md:text-6xl font-serif leading-tight text-stone-900">
            A devotion to <span class="italic underline decoration-stone-200 underline-offset-8">materiality</span> and form.
          </h3>
          <p class="text-stone-500 font-light leading-relaxed max-w-md">
            Each Shoporia piece is a testament to the slow-craft movement. We believe luxury isn't found in a logo, but in the weight of the silk, the grain of the leather, and the echo of timeless design.
          </p>
          <div class="pt-4">
            <router-link to="/contact" class="text-xs uppercase tracking-widest font-bold border-b-2 border-black pb-2 hover:opacity-50 transition-opacity">
              Book a Private Viewing
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-stone-50 py-24 px-6">
      <div class="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
        <div v-for="(cat, index) in ['Bags', 'Accessories', 'Ready-to-wear']" :key="index"
          class="relative h-[600px] overflow-hidden group cursor-pointer">
          <img 
            :src="`https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=800&sig=${index}`"
            class="w-full h-full object-cover brightness-90 transition-transform duration-1000 group-hover:scale-105"
          />
          <div class="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/40 transition-all duration-500">
            <h4 class="text-white text-2xl font-serif italic tracking-widest uppercase opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-700">
              {{ cat }}
            </h4>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');

.font-serif { font-family: 'Playfair Display', serif; }

@keyframes fade-in {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fade-in 1.2s ease-out forwards;
}

/* Custom underline thickness */
.decoration-stone-200 { text-decoration-color: #e7e5e4; }
</style>