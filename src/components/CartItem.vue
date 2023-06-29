<template>
  <tr>
    <td class="w-1/6 pr-6 py-2">
      <img :src="product.image" />
    </td>
    <td class="w-2/6 pr-2">{{ product.name }}</td>
    <td class="w-1/6 pr-10"><input type="number" :value="product.quantity"
        @change="updateProductQuantity($event.target.value)" min="1" max="999"></td>
    <td class="w-1/6">{{ formatEuro(product.price) }}</td>
    <td class="w-1/6">{{ formatEuro(subtotal) }}</td>
    <td class="font-bold w-1/6"><button @click="deleteCartItem">X</button></td>
  </tr>
</template>
    
<script>
import { formatEuro } from '@/helpers';

export default {
  name: 'CartItem',
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  computed: {
    subtotal() {
      return this.product.price * this.product.quantity;
    }
  },
  methods: {
    updateProductQuantity(value) {
      const qty = parseInt(value);
      if (qty > 0 && qty < 1000) {
        const updatedProduct = { ...this.product, quantity: qty };
        this.$emit('updateQuantity', updatedProduct);
      }
    },
    deleteCartItem() {
      this.$emit('deleteCartItem', this.product);
    },
    formatEuro,
  }
}
</script>
    
<style></style>