<template>
  <div class="w-full bg-[#f9f9f9] min-h-screen font-sans selection:bg-black selection:text-white pb-32">
    
    <header class="relative h-[45vh] w-full overflow-hidden flex items-center justify-center">
      <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000" 
           class="absolute inset-0 w-full h-full object-cover brightness-[0.35] scale-105" alt="Contact Us">
      <div class="relative z-10 text-center px-6">
        <span class="text-white/60 text-[10px] uppercase tracking-[0.6em] mb-4 block animate-fade-in">Private Correspondence</span>
        <h1 class="text-white text-6xl md:text-9xl font-serif uppercase tracking-tighter leading-none">
          The <span class="italic font-light">Concierge</span>
        </h1>
      </div>
    </header>

    <div class="max-w-[1400px] mx-auto px-6 -mt-24 relative z-20">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
        
        <div class="lg:col-span-4 space-y-8 flex flex-col">
          <div class="bg-white p-10 shadow-sm border border-stone-100 relative overflow-hidden group flex-grow">
            <div class="relative z-10">
              <h4 class="text-[10px] uppercase tracking-[0.4em] font-black text-stone-900 mb-8">Our Maison</h4>
              <p class="font-serif text-3xl text-stone-900 leading-tight mb-4">
                Shoporia <span class="italic">Archives</span>
              </p>
              <address class="not-italic text-sm text-stone-500 leading-relaxed mb-8">
                Luxury B8 L12, Shoporia HQ<br>
                123 Luxury Lane, Metro Manila<br>
                Philippines, 1200
              </address>
              
              <div class="space-y-2 pt-6 border-t border-stone-50">
                <p class="text-[9px] uppercase tracking-widest text-stone-400 font-bold">Hours of Operation</p>
                <p class="text-xs text-stone-600 uppercase tracking-tighter">Mon — Fri: 10:00 - 19:00</p>
                <p class="text-xs text-stone-600 uppercase tracking-tighter">Sat: By Appointment Only</p>
              </div>
            </div>
            <span class="absolute -bottom-10 -right-4 text-[12rem] font-serif text-stone-50 pointer-events-none group-hover:-translate-y-4 transition-transform duration-1000">S</span>
          </div>

          <div class="bg-stone-900 p-10 text-white shadow-2xl relative overflow-hidden">
             <h4 class="text-[9px] uppercase tracking-[0.4em] font-bold text-stone-500 mb-6">Immediate Assistance</h4>
             <div class="space-y-6">
               <a href="mailto:concierge@shoporia.com" class="block group">
                 <p class="text-[9px] uppercase tracking-widest text-stone-400 mb-1">Email</p>
                 <p class="font-serif text-xl italic group-hover:text-stone-300 transition-colors">concierge@shoporia.com</p>
               </a>
               <a href="tel:+639000000000" class="block group">
                 <p class="text-[9px] uppercase tracking-widest text-stone-400 mb-1">Direct Line</p>
                 <p class="font-serif text-xl italic group-hover:text-stone-300 transition-colors">+63 900 000 0000</p>
               </a>
             </div>
          </div>
        </div>

        <div class="lg:col-span-8 bg-white shadow-2xl p-10 md:p-20 border border-stone-50">
          <div class="mb-16">
            <h2 class="text-4xl md:text-6xl font-serif text-stone-900 mb-6 uppercase tracking-tighter leading-none">
              Inquire <br> <span class="italic font-light text-stone-300">With Us</span>
            </h2>
            <div class="w-16 h-[1px] bg-stone-900 mb-8"></div>
            <p class="text-stone-400 text-sm font-light leading-relaxed max-w-lg">
              Whether you are seeking a specific archive piece or require personal shopping assistance, our concierge team is at your disposal.
            </p>
          </div>

          <form @submit.prevent="handleSubmit" class="space-y-10">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div class="group relative">
                <label class="text-[9px] uppercase tracking-[0.3em] font-black text-stone-400 group-focus-within:text-stone-900 transition-colors">Full Name</label>
                <input v-model="form.fullName" type="text" required 
                       class="w-full border-b border-stone-100 py-4 focus:outline-none focus:border-stone-900 transition-colors text-sm bg-transparent placeholder:text-stone-200"
                       placeholder="Enter your full name">
              </div>
              <div class="group relative">
                <label class="text-[9px] uppercase tracking-[0.3em] font-black text-stone-400 group-focus-within:text-stone-900 transition-colors">Contact Number</label>
                <input v-model="form.contactNumber" type="tel" required 
                       class="w-full border-b border-stone-100 py-4 focus:outline-none focus:border-stone-900 transition-colors text-sm bg-transparent placeholder:text-stone-200"
                       placeholder="+63 --- --- ----">
              </div>
            </div>

            <div class="group relative">
              <label class="text-[9px] uppercase tracking-[0.3em] font-black text-stone-400 group-focus-within:text-stone-900 transition-colors">Email Address</label>
              <input v-model="form.email" type="email" required 
                     class="w-full border-b border-stone-100 py-4 focus:outline-none focus:border-stone-900 transition-colors text-sm bg-transparent placeholder:text-stone-200"
                     placeholder="email@example.com">
            </div>

            <div class="group relative">
              <label class="text-[9px] uppercase tracking-[0.3em] font-black text-stone-400 group-focus-within:text-stone-900 transition-colors">Your Message</label>
              <textarea v-model="form.message" rows="4" required 
                        class="w-full border-b border-stone-100 py-4 focus:outline-none focus:border-stone-900 transition-colors text-sm resize-none bg-transparent placeholder:text-stone-200"
                        placeholder="How may we assist you today?"></textarea>
            </div>

            <div class="pt-8 flex flex-col md:flex-row items-center gap-10">
              <button type="submit" :disabled="loading"
                      class="relative group overflow-hidden bg-stone-900 text-white px-16 py-5 uppercase tracking-[0.4em] text-[10px] font-bold transition-all disabled:bg-stone-200">
                <span class="relative z-10">{{ loading ? 'Transmitting...' : 'Send Inquiry' }}</span>
                <div class="absolute inset-0 bg-stone-700 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
              </button>
              
              <transition name="fade">
                <div v-if="submitted" class="flex items-center gap-3 text-stone-900">
                   <span class="text-xl">✓</span>
                   <p class="font-serif italic text-sm">Our concierge has been notified.</p>
                </div>
              </transition>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import api from '../api';

const submitted = ref(false);
const loading = ref(false);

const form = reactive({
  fullName: '',
  contactNumber: '',
  email: '',
  message: ''
});

const handleSubmit = async () => {
  try {
    loading.value = true;
    await api.post('/contacts', form);
    
    submitted.value = true;
    Object.assign(form, { fullName: '', contactNumber: '', email: '', message: '' });
    
    setTimeout(() => { submitted.value = false; }, 6000);
  } catch (error) {
    console.error("Transmission Error:", error);
    alert("Concierge servers are currently busy. Please try again.");
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');

.font-serif { font-family: 'Playfair Display', serif; }

.fade-enter-active, .fade-leave-active { transition: opacity 0.8s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

@keyframes fade-in {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in { animation: fade-in 1.5s ease-out forwards; }

/* Custom Underline for Form inputs */
input, textarea {
  border-radius: 0;
}
</style>