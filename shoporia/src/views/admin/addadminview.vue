<template>
  <div class="min-h-screen bg-white text-black font-sans pb-20">
    <header class="py-10 border-b border-gray-100 mb-12 px-6 md:px-12 flex justify-between items-center">
      <div>
        <h1 class="text-4xl font-serif uppercase tracking-tighter">Personnel Management</h1>
        <p class="text-[10px] uppercase tracking-[0.4em] text-gray-400 mt-2">Grant Administrative Privileges</p>
      </div>
      <router-link to="/admin" class="text-[10px] font-bold uppercase tracking-widest border-b border-black pb-1 hover:text-amber-700 hover:border-amber-700 transition-colors">
        Back to Dashboard
      </router-link>
    </header>

    <div class="max-w-[600px] mx-auto px-6">
      <div class="border border-gray-100 p-10 bg-[#fafafa] shadow-2xl">
        <h2 class="text-2xl font-serif uppercase mb-8 border-b border-black pb-4">New Admin Registration</h2>
        
        <form @submit.prevent="handleRegisterAdmin" class="space-y-6">
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-2">
              <label class="text-[10px] uppercase font-bold tracking-widest text-gray-400">First Name</label>
              <input v-model="form.firstName" type="text" required
                class="w-full border-b border-gray-300 bg-transparent py-2 focus:border-black outline-none transition-colors text-sm">
            </div>
            <div class="space-y-2">
              <label class="text-[10px] uppercase font-bold tracking-widest text-gray-400">Last Name</label>
              <input v-model="form.lastName" type="text" required
                class="w-full border-b border-gray-300 bg-transparent py-2 focus:border-black outline-none transition-colors text-sm">
            </div>
          </div>

          <div class="space-y-2">
            <label class="text-[10px] uppercase font-bold tracking-widest text-gray-400">Username</label>
            <input v-model="form.username" type="text" required
              class="w-full border-b border-gray-300 bg-transparent py-2 focus:border-black outline-none transition-colors text-sm">
          </div>

          <div class="space-y-2">
            <label class="text-[10px] uppercase font-bold tracking-widest text-gray-400">Email Address</label>
            <input v-model="form.email" type="email" required
              class="w-full border-b border-gray-300 bg-transparent py-2 focus:border-black outline-none transition-colors text-sm">
          </div>

          <div class="space-y-2">
            <label class="text-[10px] uppercase font-bold tracking-widest text-gray-400">Access Password</label>
            <input v-model="form.password" type="password" required
              class="w-full border-b border-gray-300 bg-transparent py-2 focus:border-black outline-none transition-colors text-sm">
          </div>

          <div class="pt-6">
            <button type="submit" :disabled="loading"
              class="w-full bg-black text-white py-4 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-amber-800 transition-all disabled:bg-gray-400">
              {{ loading ? 'Authenticating...' : 'Authorize New Admin' }}
            </button>
          </div>
        </form>

        <transition name="fade">
          <p v-if="successMsg" class="mt-6 text-center text-green-600 text-[10px] font-bold uppercase tracking-widest">
            Success: Admin privileges granted to {{ form.username }}
          </p>
        </transition>
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
const successMsg = ref(false);

const form = reactive({
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  password: '',
  role: 'admin' 
});

const handleRegisterAdmin = async () => {
  try {
    loading.value = true;
    // FIX: Pointing to the secure admin registration route instead of public register
    await api.post('/users/register-admin', form);
    
    successMsg.value = true;
    setTimeout(() => {
      router.push('/admin'); 
    }, 2000);
  } catch (error) {
    console.error("Registration Error:", error);
    alert(error.response?.data?.message || "Failed to register admin. Check server logs.");
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.font-serif { font-family: 'Playfair Display', serif; }
.fade-enter-active, .fade-leave-active { transition: opacity 0.5s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>