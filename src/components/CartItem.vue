<template>
  <tr>
    <td class="w-1/6 pr-6 py-2">
      <img :src="product.thumb" :alt="product.name" class="min-w-[100px]"/>
    </td>
    <td class="w-2/6 pr-4">{{ product.name }}</td>
    <td class="w-1/6 pr-2"><input type="number" class="w-20" :value="product.quantity"
        @change="updateProductQuantity($event.target.value)" min="1" max="999"></td>
    <td class="w-1/6 pr-2 whitespace-nowrap">{{ formatEuro(product.price) }}</td>
    <td class="w-1/6 pr-2 whitespace-nowrap">{{ formatEuro(subtotal) }}</td>
    <td class="font-bold w-1/6"><button @click="deleteCartItem" aria-label="Delete item from cart">X</button></td>
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