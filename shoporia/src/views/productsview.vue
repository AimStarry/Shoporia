<template>
  <div class="w-full bg-white min-h-screen font-sans selection:bg-black selection:text-white">
    
    <header class="relative h-[40vh] md:h-[50vh] w-full overflow-hidden flex items-center justify-center">
      <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2000" 
           class="absolute inset-0 w-full h-full object-cover brightness-[0.45] scale-105" alt="Our Products">
      <div class="relative text-center z-10 px-6">
        <nav class="flex justify-center space-x-2 mb-4 animate-fade-in">
           <span class="text-[9px] uppercase tracking-[0.4em] text-stone-400">Shoporia</span>
           <span class="text-[9px] uppercase tracking-[0.4em] text-stone-400">/</span>
           <span class="text-[9px] uppercase tracking-[0.4em] text-white font-bold">Archives</span>
        </nav>
        <h1 class="text-white text-5xl md:text-8xl font-serif uppercase tracking-tighter leading-none mb-4">
          The <span class="italic font-light">Collection</span>
        </h1>
        <p class="text-stone-300 text-[10px] md:text-xs uppercase tracking-[0.5em] max-w-md mx-auto leading-relaxed">
          Exceptional pieces for the discerning collector
        </p>
      </div>
    </header>

    <div class="max-w-[1600px] mx-auto px-6 md:px-12 py-12">
      
      <button @click="isSidebarOpen = !isSidebarOpen" 
              class="lg:hidden w-full border border-stone-200 py-4 mb-8 text-[10px] uppercase tracking-[0.3em] font-bold flex justify-center items-center gap-2">
        <span>{{ isSidebarOpen ? 'Close Filters' : 'Filter & Sort' }}</span>
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      </button>

      <div class="flex flex-col lg:flex-row gap-16">
        
        <aside :class="isSidebarOpen ? 'block' : 'hidden lg:block'" class="w-full lg:w-72 flex-shrink-0 animate-fade-in">
          <div class="sticky top-32 space-y-12">
            
            <section>
              <h4 class="text-[10px] uppercase tracking-[0.3em] font-black text-stone-900 mb-6">Search Archives</h4>
              <div class="relative border-b border-stone-200 group focus-within:border-black transition-colors">
                <input v-model="searchQuery" type="text" placeholder="Keywords..." 
                       class="w-full bg-transparent py-3 px-0 text-xs focus:outline-none placeholder:text-stone-300 tracking-widest uppercase">
                <span class="absolute right-0 top-3 text-xs opacity-40">🔍</span>
              </div>
            </section>

            <section>
              <h4 class="text-[10px] uppercase tracking-[0.3em] font-black text-stone-900 mb-6">Categories</h4>
              <ul class="space-y-4">
                <li v-for="cat in categories" :key="cat"
                    @click="activeCategory = cat"
                    class="text-[11px] uppercase tracking-widest cursor-pointer transition-all flex justify-between items-center group"
                    :class="activeCategory === cat ? 'text-stone-900 font-bold' : 'text-stone-400 hover:text-stone-900'">
                  <span class="relative">
                    {{ cat }}
                    <span class="absolute -bottom-1 left-0 h-[1px] bg-black transition-all" 
                          :class="activeCategory === cat ? 'w-full' : 'w-0 group-hover:w-full'"></span>
                  </span>
                  <span class="text-[9px] opacity-40">[{{ getCategoryCount(cat) }}]</span>
                </li>
              </ul>
            </section>

            <section class="pt-8 border-t border-stone-100">
              <h4 class="text-[10px] uppercase tracking-[0.3em] font-black text-stone-900 mb-6">Arrange By</h4>
              <div class="flex flex-col gap-3">
                 <button v-for="option in sortOptions" :key="option.val"
                         @click="sortBy = option.val"
                         class="text-left text-[10px] uppercase tracking-widest transition-colors"
                         :class="sortBy === option.val ? 'text-stone-900 font-bold underline underline-offset-4' : 'text-stone-400 hover:text-stone-900'">
                   {{ option.label }}
                 </button>
              </div>
            </section>

            <div class="p-8 bg-stone-50 border border-stone-100 mt-12">
               <p class="text-[9px] uppercase tracking-[0.4em] text-stone-400 leading-relaxed mb-4">The Shoporia Guarantee</p>
               <p class="text-[11px] text-stone-600 font-serif italic italic leading-relaxed">
                 All archive pieces undergo rigorous multi-point authentication and restorative care before acquisition.
               </p>
            </div>
          </div>
        </aside>

        <main class="flex-grow">
          <div v-if="loading" class="flex flex-col items-center justify-center py-32 space-y-6">
            <div class="w-16 h-[1px] bg-stone-200 overflow-hidden relative">
               <div class="absolute inset-0 bg-black animate-loading-bar"></div>
            </div>
            <p class="text-[10px] uppercase tracking-[0.5em] text-stone-400 animate-pulse">Curating your selection...</p>
          </div>

          <div v-else-if="filteredProducts.length === 0" class="text-center py-32">
              <p class="font-serif italic text-3xl text-stone-300 mb-8">No pieces found in this category.</p>
              <button @click="resetFilters" class="text-[10px] uppercase tracking-[0.4em] font-bold border-b-2 border-black pb-2 hover:opacity-50 transition-all">Reset Archives</button>
          </div>

          <div v-else class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-10 gap-y-20">
            <div v-for="product in filteredProducts" :key="product._id" 
                 class="group flex flex-col h-full bg-white relative">
              
              <router-link :to="`/product/${product._id}`" class="relative aspect-[4/5] overflow-hidden bg-stone-100 block">
                <img :src="getFullImageUrl(product.image)" :alt="product.name" 
                     class="w-full h-full object-cover transition-transform duration-[2.5s] ease-out group-hover:scale-110"
                     :class="product.countInStock === 0 ? 'grayscale brightness-75' : ''">
                
                <div class="absolute top-6 left-6 flex flex-col gap-2">
                  <span v-if="product.countInStock === 0" class="bg-black text-white px-3 py-1.5 text-[8px] font-bold uppercase tracking-widest">
                    Out of Stock
                  </span>
                  <span v-else-if="product.countInStock <= 5" class="bg-white text-black px-3 py-1.5 text-[8px] font-bold uppercase tracking-widest shadow-sm">
                    Only {{ product.countInStock }} Remaining
                  </span>
                </div>

                <div class="absolute inset-0 flex flex-col justify-end p-6 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <button 
                    @click.stop.prevent="addToCart(product)" 
                    :disabled="product.countInStock === 0"
                    class="w-full bg-black text-white py-5 text-[9px] font-bold uppercase tracking-[0.3em] hover:bg-stone-800 transition-colors disabled:bg-stone-200 disabled:text-stone-400 disabled:cursor-not-allowed">
                    {{ product.countInStock === 0 ? 'Waitlist' : 'Add to Collection' }}
                  </button>
                </div>
              </router-link>

              <div class="pt-8 flex flex-col flex-grow">
                <div class="flex justify-between items-start gap-4 mb-4">
                  <div class="flex flex-col">
                    <span class="text-[9px] uppercase tracking-[0.3em] text-stone-400 mb-2">{{ product.category }}</span>
                    <router-link :to="`/product/${product._id}`">
                      <h3 class="text-xl font-serif text-stone-900 group-hover:italic transition-all">
                        {{ product.name }}
                      </h3>
                    </router-link>
                  </div>
                  <span class="text-sm font-bold text-stone-900 tracking-tighter">₱{{ product.price?.toLocaleString() }}</span>
                </div>
                
                <p class="text-stone-500 text-xs leading-relaxed mb-6 font-light line-clamp-2">
                  {{ product.description }}
                </p>
                
                <div class="mt-auto pt-6 border-t border-stone-50 flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <div class="flex gap-0.5">
                      <span v-for="star in 5" :key="star" 
                            :class="star <= Math.floor(product.rating || 0) ? 'text-black' : 'text-stone-200'" 
                            class="text-[9px]">★</span>
                    </div>
                    <span class="text-[9px] text-stone-400 uppercase tracking-widest">({{ product.numReviews }})</span>
                  </div>
                  <router-link :to="`/product/${product._id}`" class="text-[9px] font-bold uppercase tracking-widest border-b border-transparent hover:border-black transition-all">
                    View Details
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </main>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import api from '../api';

const products = ref([]);
const loading = ref(true);
const isSidebarOpen = ref(false);

const searchQuery = ref('');
const activeCategory = ref('All Products');
const sortBy = ref('newest');

const categories = ['All Products', 'Bags', 'Wallets', 'Watches', 'Perfumes'];
const sortOptions = [
  { label: 'Latest Acquisitions', val: 'newest' },
  { label: 'Value: Low to High', val: 'low' },
  { label: 'Value: High to Low', val: 'high' }
];

// HELPER FUNCTION FOR RENDER IMAGES
const getFullImageUrl = (imagePath) => {
  if (!imagePath) return 'https://via.placeholder.com/400x500';
  if (imagePath.startsWith('http')) return imagePath;
  const baseUrl = import.meta.env.VITE_API_URL.replace('/api', '');
  return `${baseUrl}${imagePath}`;
};

const fetchProducts = async () => {
  try {
    loading.value = true;
    const response = await api.get('/products');
    products.value = response.data;
  } catch (error) {
    console.error("Collection Access Denied:", error.message);
  } finally {
    loading.value = false;
  }
};

const filteredProducts = computed(() => {
  let result = [...products.value];

  // Category Filter
  if (activeCategory.value !== 'All Products') {
    result = result.filter(p => p.category.toLowerCase() === activeCategory.value.toLowerCase());
  }

  // Search Filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(p => 
      p.name.toLowerCase().includes(query) || 
      p.description.toLowerCase().includes(query)
    );
  }

  // Sorting
  if (sortBy.value === 'low') {
    result.sort((a, b) => a.price - b.price);
  } else if (sortBy.value === 'high') {
    result.sort((a, b) => b.price - a.price);
  } else {
    result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  return result;
});

const getCategoryCount = (cat) => {
  if (cat === 'All Products') return products.value.length;
  return products.value.filter(p => p.category.toLowerCase() === cat.toLowerCase()).length;
};

const resetFilters = () => {
  searchQuery.value = '';
  activeCategory.value = 'All Products';
  sortBy.value = 'newest';
};

const addToCart = (product) => {
  if (product.countInStock === 0) return;

  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const existItem = cart.find(x => x._id === product._id);
  
  if (existItem) {
    if (existItem.qty < product.countInStock) {
      existItem.qty++;
      alert(`The archive has been updated with another ${product.name}.`);
    } else {
      alert(`Maximum archive availability reached for this item.`);
    }
  } else {
    cart.push({ ...product, qty: 1 });
    alert(`${product.name} successfully added to your curation.`);
  }
  
  localStorage.setItem('cart', JSON.stringify(cart));
  window.dispatchEvent(new Event('storage'));
};

onMounted(fetchProducts);
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');

.font-serif { font-family: 'Playfair Display', serif; }

@keyframes fade-in {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fade-in 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes loading-bar {
  0% { transform: translateX(-100%); }
  50% { transform: translateX(0%); }
  100% { transform: translateX(100%); }
}

.animate-loading-bar {
  animation: loading-bar 1.5s infinite ease-in-out;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;  
  overflow: hidden;
}
</style>