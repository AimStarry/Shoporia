<template>
  <div class="min-h-screen bg-[#fafafa] text-stone-900 font-sans pb-32 selection:bg-amber-100">
    <nav class="py-8 px-6 md:px-12 bg-white border-b border-stone-100 sticky top-0 z-50">
      <div class="max-w-7xl mx-auto flex items-center justify-between">
        <div class="flex items-center gap-4 text-[9px] uppercase tracking-[0.4em] font-bold">
          <router-link to="/admin" class="text-stone-300 hover:text-black transition-all">Registry</router-link>
          <span class="text-stone-200">/</span>
          <span class="text-amber-700">Modify Archive</span>
        </div>
        <button @click="router.back()" class="text-[9px] uppercase tracking-widest font-black text-stone-400 hover:text-black transition-colors">
          Discard Changes
        </button>
      </div>
    </nav>

    <div v-if="fetching" class="flex flex-col items-center justify-center h-[70vh] animate-pulse">
      <div class="w-12 h-[1px] bg-amber-600 mb-8 animate-reveal"></div>
      <p class="font-serif italic text-stone-400 uppercase tracking-[0.5em] text-[10px]">Accessing Secure Archive...</p>
    </div>

    <div v-else class="max-w-7xl mx-auto px-6 py-12 lg:py-20">
      <header class="mb-16">
        <span class="text-[9px] font-mono text-stone-400 block mb-2 uppercase tracking-widest">Reference: {{ productId.slice(-8) }}</span>
        <h1 class="text-5xl font-serif uppercase tracking-tighter leading-none">Modify <span class="italic font-light">Archive</span></h1>
      </header>

      <div class="flex flex-col lg:flex-row gap-16 items-start">
        <div class="w-full lg:w-4/12 lg:sticky lg:top-32 space-y-6">
          <div class="bg-white p-2 shadow-2xl border border-stone-100 group relative">
            <div class="aspect-[3/4] overflow-hidden bg-stone-50 relative">
              <img 
                :src="imagePreview || `http://localhost:5000${form.image}`" 
                class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
              />
              <div class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                <span class="text-[8px] text-white uppercase tracking-[0.3em] font-bold">Replacement Preview</span>
              </div>
            </div>
            
            <div class="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 shadow-sm border border-stone-100">
               <p class="text-[8px] uppercase tracking-widest font-black text-stone-400">Current Status</p>
               <p class="text-[10px] uppercase font-bold text-emerald-700">{{ form.countInStock > 0 ? 'In Inventory' : 'Depleted' }}</p>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="p-6 bg-white border border-stone-100 shadow-sm">
              <p class="text-[8px] uppercase text-stone-400 tracking-widest mb-1">Listed Valuation</p>
              <p class="font-serif text-lg">₱{{ form.price.toLocaleString() }}</p>
            </div>
            <div class="p-6 bg-white border border-stone-100 shadow-sm">
              <p class="text-[8px] uppercase text-stone-400 tracking-widest mb-1">Stock Count</p>
              <p class="font-serif text-lg">{{ form.countInStock }} Units</p>
            </div>
          </div>
        </div>

        <form @submit.prevent="updateProduct" class="w-full lg:w-8/12 space-y-10">
          <section class="bg-white p-8 md:p-12 shadow-sm border border-stone-100 space-y-10">
            <h3 class="text-[10px] uppercase tracking-[0.5em] text-stone-900 font-black border-b border-stone-50 pb-4">01. Identity & Narrative</h3>
            <div class="space-y-8">
              <div class="relative group">
                <label class="text-[9px] uppercase text-stone-400 font-bold tracking-widest block mb-2">Product Designation</label>
                <input v-model="form.name" type="text" required class="w-full border-b border-stone-200 py-3 text-sm focus:outline-none focus:border-black bg-transparent">
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label class="text-[9px] uppercase text-stone-400 font-bold tracking-widest block mb-2">Curated Category</label>
                  <select v-model="form.category" required class="w-full border-b border-stone-200 py-3 text-sm focus:outline-none focus:border-black bg-transparent">
                    <option v-for="cat in ['Bags', 'Wallets', 'Watches', 'Perfumes']" :key="cat" :value="cat">{{ cat }}</option>
                  </select>
                </div>
                <div>
                   <label class="text-[9px] uppercase text-stone-400 font-bold tracking-widest block mb-2">Asset Replacement</label>
                   <input type="file" @change="handleFileUpload" accept="image/*" class="text-[9px] block w-full text-stone-400 file:mr-4 file:py-2 file:px-4 file:border file:border-stone-100 file:text-[9px] file:uppercase file:bg-white file:text-black hover:file:bg-black hover:file:text-white transition-all cursor-pointer">
                </div>
              </div>
              <div>
                <label class="text-[9px] uppercase text-stone-400 font-bold tracking-widest block mb-2">Narrative Description</label>
                <textarea v-model="form.description" rows="4" required class="w-full bg-stone-50 p-6 text-xs italic focus:outline-none border-l-2 border-transparent focus:border-stone-900 transition-all"></textarea>
              </div>
            </div>
          </section>

          <section class="bg-white p-8 md:p-12 shadow-sm border border-stone-100 space-y-10">
            <h3 class="text-[10px] uppercase tracking-[0.5em] text-stone-900 font-black border-b border-stone-50 pb-4">02. Valuation & Specifications</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div class="lg:col-span-2">
                <label class="text-[9px] uppercase text-stone-400 font-bold tracking-widest block mb-2">Current Price (PHP)</label>
                <input v-model.number="form.price" type="number" step="0.01" required class="w-full border-b border-stone-200 py-3 text-sm focus:border-black outline-none font-serif">
              </div>
              <div class="lg:col-span-2">
                <label class="text-[9px] uppercase text-stone-400 font-bold tracking-widest block mb-2">In-Stock Reserve</label>
                <input v-model.number="form.countInStock" type="number" required class="w-full border-b border-stone-200 py-3 text-sm focus:border-black outline-none font-serif">
              </div>
              <div class="lg:col-span-2">
                <label class="text-[9px] uppercase text-stone-400 font-bold tracking-widest block mb-2">Color Specification</label>
                <input v-model="form.color" type="text" class="w-full border-b border-stone-200 py-3 text-sm focus:border-black outline-none">
              </div>
              <div class="lg:col-span-2">
                <label class="text-[9px] uppercase text-stone-400 font-bold tracking-widest block mb-2">Sizing / Dimensions</label>
                <input v-model="form.size" type="text" class="w-full border-b border-stone-200 py-3 text-sm focus:border-black outline-none">
              </div>
            </div>
          </section>

          <div class="flex flex-col sm:flex-row gap-4 pt-6">
            <button @click.prevent="router.push('/admin')" type="button" 
              class="flex-1 border border-stone-200 py-6 text-[10px] font-bold uppercase tracking-[0.5em] text-stone-400 hover:text-black hover:border-black transition-all">
              Discard Changes
            </button>
            <button type="submit" :disabled="loading" 
              class="flex-[2] bg-stone-900 text-white py-6 text-[10px] font-bold uppercase tracking-widest hover:bg-amber-900 transition-all shadow-xl disabled:opacity-50">
              {{ loading ? 'Synchronizing...' : 'Update Archive' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import api from '../../api';

const router = useRouter();
const route = useRoute();
const productId = route.params.id;

const loading = ref(false);
const fetching = ref(true);
const imagePreview = ref(null);
const selectedFile = ref(null);

const form = reactive({
  name: '',
  price: 0,
  image: '',
  category: '',
  countInStock: 0,
  description: '',
  color: '',
  size: ''
});

const handleFileUpload = (e) => {
  const file = e.target.files[0];
  if (file) {
    selectedFile.value = file;
    imagePreview.value = URL.createObjectURL(file);
  }
};

const fetchProductDetails = async () => {
  try {
    fetching.value = true;
    const response = await api.get(`/products/${productId}`);
    Object.assign(form, response.data);
  } catch (err) {
    alert("This item could not be retrieved from the archive.");
    router.push('/admin');
  } finally {
    setTimeout(() => { fetching.value = false; }, 600);
  }
};

const updateProduct = async () => {
  try {
    loading.value = true;
    const formData = new FormData();
    if (selectedFile.value) {
      formData.append('image', selectedFile.value);
    }
    
    formData.append('name', form.name);
    formData.append('price', form.price);
    formData.append('category', form.category);
    formData.append('countInStock', form.countInStock);
    formData.append('description', form.description);
    formData.append('color', form.color);
    formData.append('size', form.size);

    await api.put(`/products/${productId}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });

    router.push('/admin');
  } catch (err) {
    alert(err.response?.data?.message || "Modification failed.");
  } finally {
    loading.value = false;
  }
};

onMounted(fetchProductDetails);
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');
.font-serif { font-family: 'Playfair Display', serif; }

.animate-reveal { 
  animation: reveal 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; 
}

@keyframes reveal { 
  from { opacity: 0; transform: translateY(10px); } 
  to { opacity: 1; transform: translateY(0); } 
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>