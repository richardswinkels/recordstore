import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      cart: []
    }
  },
  mutations: {
    addToCart(state, product) {
      const existingProduct = state.cart.find((item) => item.id === product.id);
      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        state.cart.push({
          id: product.id,
          name: product.name,
          thumb: product.thumb,
          price: product.price,
          quantity: 1,
        });
      }
    },
    removeFromCart(state, product) {
      const index = state.cart.findIndex((item) => item.id === product.id);
      console.log(index);
      if (index !== -1) {
        state.cart.splice(index, 1);
      }
    },
    updateQuantity(state, product) {
      const existingProduct = state.cart.find((item) => item.id === product.id);
      if (existingProduct) {
        existingProduct.quantity = product.quantity;
      }
    },
    clearCart(state) {
      state.cart = [];
    },
    initializeStateFromStorage(state) {
      const storedCart = localStorage.getItem('cart');
      if (storedCart) {
        state.cart = JSON.parse(storedCart);
      }
    }
  },
  actions: {
    addToCart(context, product) {
      context.commit('addToCart', product);
    },
    removeFromCart(context, product) {
      context.commit('removeFromCart', product);
    },
    updateQuantity(context, product) {
      context.commit('updateQuantity', product);
    },
    clearCart(context) {
      context.commit('clearCart');
    },
    saveStateToStorage(context) {
      const cartJson = JSON.stringify(context.state.cart);
      localStorage.setItem('cart', cartJson);
    }
  },
});

store.commit('initializeStateFromStorage');

store.subscribe(() => {
  store.dispatch('saveStateToStorage');
});

export default store;