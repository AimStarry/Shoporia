<template>
  <div class="min-h-screen bg-[#0a0a0a] flex items-stretch overflow-hidden font-sans selection:bg-amber-500/30">
    
    <div class="hidden lg:flex lg:w-5/12 relative overflow-hidden">
      <img 
        src="https://images.unsplash.com/photo-1539109132314-34a9366817f1?q=80&w=1000&auto=format&fit=crop" 
        class="absolute inset-0 w-full h-full object-cover grayscale brightness-50 contrast-125 transition-transform duration-[15s] hover:scale-110" 
        alt="Maison Aesthetic"
      >
      <div class="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-80"></div>
      <div class="relative z-10 self-end p-16">
        <span class="text-[10px] uppercase tracking-[0.8em] text-amber-500 mb-4 block animate-reveal">The Inner Circle</span>
        <h2 class="text-5xl font-serif italic text-white leading-tight animate-reveal">Request <br> Archive Access</h2>
      </div>
    </div>

    <div class="w-full lg:w-7/12 bg-white flex items-center justify-center p-8 md:p-16 lg:p-24 relative overflow-y-auto">
      
      <router-link to="/login" class="absolute top-8 right-8 text-stone-300 hover:text-black transition-colors p-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </router-link>

      <div class="max-w-2xl w-full animate-reveal">
        <header class="mb-12">
          <span class="text-[9px] uppercase tracking-[0.6em] text-stone-400 block mb-2 font-bold">New Membership</span>
          <h1 class="text-4xl font-serif uppercase tracking-tighter text-stone-900 leading-none">Create <span class="italic font-light text-stone-400">Identity</span></h1>
        </header>

        <form @submit.prevent="handleRegister" class="space-y-12">
          <div class="space-y-8">
            <h3 class="text-[10px] uppercase tracking-[0.4em] text-amber-700 font-black border-b border-stone-100 pb-2">01. Account Credentials</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div class="relative group">
                <label class="text-[9px] uppercase text-stone-400 font-bold tracking-widest block mb-1">Username</label>
                <input v-model="form.username" type="text" placeholder="archivist_01" required 
                       class="w-full border-b border-stone-200 py-2 text-sm focus:outline-none bg-transparent focus:border-black transition-all peer">
                <div class="absolute bottom-0 left-0 h-[1px] bg-black w-0 peer-focus:w-full transition-all duration-500"></div>
              </div>
              <div class="relative group">
                <label class="text-[9px] uppercase text-stone-400 font-bold tracking-widest block mb-1">Electronic Mail</label>
                <input v-model="form.email" type="email" placeholder="name@domain.com" required 
                       class="w-full border-b border-stone-200 py-2 text-sm focus:outline-none bg-transparent focus:border-black transition-all peer">
                <div class="absolute bottom-0 left-0 h-[1px] bg-black w-0 peer-focus:w-full transition-all duration-500"></div>
              </div>
              <div class="relative group md:col-span-2">
                <label class="text-[9px] uppercase text-stone-400 font-bold tracking-widest block mb-1">Secret Password</label>
                <input v-model="form.password" type="password" placeholder="••••••••••••" required 
                       class="w-full border-b border-stone-200 py-2 text-sm focus:outline-none bg-transparent focus:border-black transition-all peer">
                <div class="absolute bottom-0 left-0 h-[1px] bg-black w-0 peer-focus:w-full transition-all duration-500"></div>
              </div>
            </div>
          </div>

          <div class="space-y-8">
            <h3 class="text-[10px] uppercase tracking-[0.4em] text-amber-700 font-black border-b border-stone-100 pb-2">02. Personal Identity</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div class="relative">
                <label class="text-[9px] uppercase text-stone-400 font-bold tracking-widest block mb-1">Given Name</label>
                <input v-model="form.firstName" type="text" placeholder="First Name" required 
                       class="w-full border-b border-stone-200 py-2 text-sm focus:outline-none bg-transparent focus:border-black transition-all peer">
              </div>
              <div class="relative">
                <label class="text-[9px] uppercase text-stone-400 font-bold tracking-widest block mb-1">Surname</label>
                <input v-model="form.lastName" type="text" placeholder="Last Name" required 
                       class="w-full border-b border-stone-200 py-2 text-sm focus:outline-none bg-transparent focus:border-black transition-all peer">
              </div>
              <div class="relative">
                <label class="text-[9px] uppercase text-stone-400 font-bold tracking-widest block mb-1">Biological Sex</label>
                <select v-model="form.gender" class="w-full border-b border-stone-200 py-2 text-sm focus:outline-none bg-transparent focus:border-black transition-all appearance-none cursor-pointer">
                  <option value="" disabled>Select Orientation</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other / Private</option>
                </select>
              </div>
              <div class="relative">
                <label class="text-[9px] uppercase text-stone-400 font-bold tracking-widest block mb-1">Date of Birth</label>
                <input v-model="form.birthDate" type="date" 
                       class="w-full border-b border-stone-200 py-2 text-sm focus:outline-none bg-transparent focus:border-black transition-all">
              </div>
              <div class="relative md:col-span-2">
                <label class="text-[9px] uppercase text-stone-400 font-bold tracking-widest block mb-1">Contact Terminal</label>
                <input v-model="form.contactNumber" type="tel" placeholder="+63 XXX XXX XXXX" 
                       class="w-full border-b border-stone-200 py-2 text-sm focus:outline-none bg-transparent focus:border-black transition-all">
              </div>
            </div>
          </div>

          <div class="pt-6">
            <button 
              type="submit" 
              :disabled="loading" 
              class="group relative w-full overflow-hidden bg-black text-white py-5 text-[10px] font-bold uppercase tracking-[0.5em] transition-all disabled:bg-stone-300"
            >
              <span class="relative z-10">{{ loading ? 'Processing Enrollment...' : 'Submit Request' }}</span>
              <div class="absolute inset-0 bg-amber-900 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
            </button>
            <p class="mt-8 text-center text-[10px] uppercase tracking-[0.2em] text-stone-400">
              Already have an identity? 
              <router-link to="/login" class="text-black font-black ml-2 border-b border-stone-200 hover:border-black transition-all">Authenticate</router-link>
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import api from '../api';
import { useRouter } from 'vue-router';

const router = useRouter();
const loading = ref(false);

const form = ref({
  username: '',
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  gender: '',
  birthDate: '',
  contactNumber: ''
});

const handleRegister = async () => {
  try {
    loading.value = true;
    const response = await api.post('/users/register', form.value);
    
    // Smooth transition
    router.push({ 
      path: '/login', 
      query: { registered: 'true' } 
    });
  } catch (error) {
    alert(error.response?.data?.message || "Registration encountered an error.");
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

/* Custom Date and Select styling */
input[type="date"]::-webkit-calendar-picker-indicator {
  filter: invert(0.5);
  cursor: pointer;
}

/* Hide scrollbar for form side but keep functionality */
.w-full::-webkit-scrollbar {
  width: 4px;
}
.w-full::-webkit-scrollbar-thumb {
  background: #e5e7eb;
}
</style>