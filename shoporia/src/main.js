import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './style.css'

// Customer Views
import landingview from './views/landingview.vue'
import featureview from './views/featureview.vue'
import productsview from './views/productsview.vue'
import contactview from './views/contactview.vue'
import cartview from './views/cartview.vue'
import checkoutview from './views/checkoutview.vue'
import ordersview from './views/ordersview.vue' 
import profileview from './views/profileview.vue'
import signupview from './views/signupview.vue'
import loginview from './views/loginview.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: landingview },
    { path: '/feature', component: featureview },
    { path: '/products', component: productsview },
    { 
      path: '/product/:id', 
      name: 'ProductDetail', 
      component: () => import('./views/productdetail.vue') 
    },
    { path: '/contact', component: contactview },
    { path: '/cart', component: cartview },
    { path: '/checkout', component: checkoutview },
    { path: '/orders', component: ordersview },
    { path: '/profile', component: profileview },
    { path: '/signup', component: signupview },
    { path: '/login', component: loginview },
    {
      path: '/rate/:orderId?',
      name: 'Rate',
      component: () => import('./views/ratepage.vue'),
      meta: { requiresAuth: true }
    },

    // --- ADMIN SECTION ---
    { 
      path: '/admin', 
      component: () => import('./views/admin/adminview.vue'),
      meta: { requiresAdmin: true } 
    },
    { 
      path: '/admin/add-product', 
      component: () => import('./views/admin/addproductview.vue'),
      meta: { requiresAdmin: true } 
    },
    { 
      path: '/admin/edit-product/:id', 
      name: 'EditProduct',
      component: () => import('./views/admin/editproductview.vue'),
      meta: { requiresAdmin: true } 
    },
    { 
      path: '/admin/order/:id', 
      name: 'OrderDetail', 
      component: () => import('./views/admin/editorderview.vue') 
    },
    { 
      path: '/admin/add-admin', 
      component: () => import('./views/admin/addadminview.vue'),
      meta: { requiresAdmin: true } 
    },
  ],
})

router.beforeEach((to, from, next) => {
  try {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (to.meta.requiresAdmin) {
      user.role === 'admin' ? next() : (alert("Access Denied"), next('/login'));
    } else if (to.meta.requiresAuth) {
      user._id ? next() : (alert("Login required"), next('/login'));
    } else {
      next();
    }
  } catch (e) { next('/login'); }
});

const app = createApp(App);
app.use(router);
app.mount('#app');