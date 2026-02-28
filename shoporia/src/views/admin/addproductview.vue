<template>
  <div class="min-h-screen bg-[#fafafa] text-stone-900 font-sans pb-32 selection:bg-amber-100">
    <nav class="py-8 px-6 md:px-12 bg-white border-b border-stone-100 sticky top-0 z-50">
      <div class="max-w-7xl mx-auto flex items-center justify-between">
        <div class="flex items-center gap-4 text-[9px] uppercase tracking-[0.4em] font-bold">
          <router-link to="/admin" class="text-stone-300 hover:text-black transition-all">Registry</router-link>
          <span class="text-stone-200">/</span>
          <span class="text-amber-700">New Acquisition</span>
        </div>
        <button @click="router.back()" class="text-[9px] uppercase tracking-widest font-black text-stone-400 hover:text-black transition-colors">
          Cancel
        </button>
      </div>
    </nav>

    <div class="max-w-6xl mx-auto px-6 py-12 lg:py-20">
      <header class="mb-16">
        <span class="text-[10px] uppercase tracking-[0.6em] text-stone-400 block mb-2">Internal Archive</span>
        <h1 class="text-5xl font-serif uppercase tracking-tighter leading-none">Curate <span class="italic font-light">New Piece</span></h1>
      </header>

      <div class="flex flex-col lg:flex-row gap-16 items-start">
        
        <div class="w-full lg:w-5/12 lg:sticky lg:top-32 space-y-8">
          <div class="bg-white p-6 shadow-2xl border border-stone-100 group">
            <div class="aspect-[3/4] bg-stone-50 overflow-hidden mb-6 relative">
              <img v-if="imagePreview" :src="imagePreview" class="w-full h-full object-cover animate-reveal" />
              <div v-else class="absolute inset-0 flex flex-col items-center justify-center space-y-4">
                <svg class="w-8 h-8 text-stone-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" stroke-width="1.2"/></svg>
                <span class="text-[8px] uppercase tracking-[0.4em] text-stone-300">Awaiting Visual</span>
              </div>
            </div>
            <div class="space-y-2">
              <span class="text-[8px] uppercase tracking-widest text-amber-700 font-bold">{{ form.category || 'Category' }}</span>
              <h3 class="text-lg font-serif uppercase truncate">{{ form.name || 'Unnamed Piece' }}</h3>
              <p class="text-sm font-light text-stone-400">₱ {{ form.price ? form.price.toLocaleString() : '0' }}</p>
            </div>
          </div>
          <div class="p-6 border-l-2 border-stone-900 bg-white shadow-sm">
            <p class="text-[10px] italic text-stone-500 leading-relaxed">"Ensure all specifications are verified before synchronizing with the public catalog. Items added here will be immediately available for global acquisition."</p>
          </div>
        </div>

        <form @submit.prevent="submitProduct" class="w-full lg:w-7/12 space-y-12">
          
          <div class="bg-white p-8 md:p-12 shadow-sm border border-stone-100 space-y-10">
            <h3 class="text-[10px] uppercase tracking-[0.5em] text-stone-900 font-black border-b border-stone-50 pb-4">01. Core Specifications</h3>
            
            <div class="space-y-8">
              <div class="group relative">
                <label class="text-[9px] uppercase text-stone-400 font-bold tracking-widest block mb-2">Product Designation</label>
                <input v-model="form.name" type="text" placeholder="e.g. MONOGRAMMED TOTE" required 
                  class="w-full border-b border-stone-200 py-3 text-sm focus:outline-none focus:border-black transition-all bg-transparent peer">
                <div class="absolute bottom-0 left-0 h-[1px] bg-black w-0 peer-focus:w-full transition-all duration-500"></div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div class="relative">
                  <label class="text-[9px] uppercase text-stone-400 font-bold tracking-widest block mb-2">Curated Category</label>
                  <select v-model="form.category" required class="w-full border-b border-stone-200 py-3 text-sm focus:outline-none focus:border-black bg-transparent appearance-none">
                    <option v-for="cat in ['Bags', 'Wallets', 'Watches', 'Perfumes']" :key="cat" :value="cat">{{ cat }}</option>
                  </select>
                </div>
                <div class="relative">
                  <label class="text-[9px] uppercase text-stone-400 font-bold tracking-widest block mb-2">Valuation (PHP)</label>
                  <input v-model.number="form.price" type="number" step="0.01" required class="w-full border-b border-stone-200 py-3 text-sm focus:outline-none focus:border-black font-serif">
                </div>
              </div>
            </div>
          </div>

          <div class="bg-white p-8 md:p-12 shadow-sm border border-stone-100 space-y-10">
            <h3 class="text-[10px] uppercase tracking-[0.5em] text-stone-900 font-black border-b border-stone-50 pb-4">02. Logistics & Identity</h3>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <label class="text-[9px] uppercase text-stone-400 font-bold tracking-widest block mb-2">Inventory</label>
                <input v-model.number="form.countInStock" type="number" required class="w-full border-b border-stone-200 py-3 text-sm focus:border-black outline-none transition-all">
              </div>
              <div>
                <label class="text-[9px] uppercase text-stone-400 font-bold tracking-widest block mb-2">Colorway</label>
                <input v-model="form.color" type="text" placeholder="e.g. Noir" class="w-full border-b border-stone-200 py-3 text-sm focus:border-black outline-none transition-all">
              </div>
              <div>
                <label class="text-[9px] uppercase text-stone-400 font-bold tracking-widest block mb-2">Sizing</label>
                <input v-model="form.size" type="text" placeholder="e.g. Medium" class="w-full border-b border-stone-200 py-3 text-sm focus:border-black outline-none transition-all">
              </div>
            </div>

            <div>
              <label class="text-[9px] uppercase text-stone-400 font-bold tracking-widest block mb-2">Artisan Narrative</label>
              <textarea v-model="form.description" rows="4" required placeholder="Describe the craftsmanship and heritage..." 
                class="w-full bg-stone-50 p-6 text-xs italic resize-none focus:outline-none border-l-2 border-transparent focus:border-stone-900 transition-all"></textarea>
            </div>
          </div>

          <div class="bg-white p-8 md:p-12 shadow-sm border border-stone-100 space-y-8">
            <h3 class="text-[10px] uppercase tracking-[0.5em] text-stone-900 font-black border-b border-stone-50 pb-4">03. Visual Manifest</h3>
            
            <div class="relative">
              <div @click="$refs.fileInput.click()" class="border-2 border-dashed border-stone-200 p-12 text-center hover:border-stone-900 hover:bg-stone-50 transition-all cursor-pointer group">
                <input type="file" ref="fileInput" @change="handleFileUpload" accept="image/*" class="hidden">
                <p class="text-[10px] uppercase tracking-widest font-black text-stone-400 group-hover:text-black">
                  {{ selectedFile ? selectedFile.name : 'Upload High-Resolution Asset' }}
                </p>
                <p class="text-[8px] text-stone-300 mt-2">JPEG, PNG, WEBP (Max 5MB)</p>
              </div>
            </div>

            <button type="submit" :disabled="loading" 
                    class="w-full bg-stone-900 text-white py-6 text-[10px] font-bold uppercase tracking-[0.6em] hover:bg-amber-900 transition-all active:scale-[0.99] disabled:opacity-50 shadow-xl">
              {{ loading ? 'Synchronizing Archive...' : 'Confirm Acquisition' }}
            </button>
          </div>

        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '../../api';

const router = useRouter();
const loading = ref(false);
const imagePreview = ref(null);
const selectedFile = ref(null);
const fileInput = ref(null);

const form = reactive({
  name: '',
  price: 0,
  category: 'Bags',
  countInStock: 0,
  description: '',
  color: '',
  size: ''
});

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    selectedFile.value = file;
    imagePreview.value = URL.createObjectURL(file);
  }
};

const submitProduct = async () => {
  if (!selectedFile.value) {
    alert("An item must have a visual representation to be archived.");
    return;
  }

  try {
    loading.value = true;
    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('price', form.price);
    formData.append('category', form.category);
    formData.append('countInStock', form.countInStock);
    formData.append('description', form.description);
    formData.append('color', form.color);
    formData.append('size', form.size);
    formData.append('image', selectedFile.value);

    await api.post('/products', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });

    router.push('/admin'); 
  } catch (err) {
    alert(err.response?.data?.message || "Error syncing item.");
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
  from { opacity: 0; transform: scale(1.05); filter: blur(10px); } 
  to { opacity: 1; transform: scale(1); filter: blur(0); } 
}

/* Chrome/Safari hide arrows for number input */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>