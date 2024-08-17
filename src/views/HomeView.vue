<template>
  <!-- Options API -->
  <div class="container-fluid">
    <div class="row">
      <h2 class="display-2">Welcome to our Store</h2>
    </div>
    <div class="row gap-3 justify-content-center" v-if="recentProducts" recent>
      <Card v-for="(content, productID) in recentProducts" :key="productID">
        <template #cardHeader>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIJLFRet2IQkVVL06nYhAyg6aMrSgb-AYQWg&s" loading="lazy" alt="logo">
        </template>
        <template #cardBody>
          <h5>{{ content.prodName }}</h5>
          <p>{{ content.prodDescription }}</p>
          <p class="lead text-success">R{{ content.amount }}</p>
        </template>
      </Card>
    </div>
    <Spinner v-else/>
  </div>
</template>

<script>
import Card from '../components/Card.vue'
import Spinner from '../components/Spinner.vue'

export default {
  name: 'HomeView',
  components: {
    Card, Spinner
  },
  computed: {
    recentProducts() {
      return this.$store.state.recentProducts
    }
  },
  mounted() {
    this.$store.dispatch('fetchRecentProducts')
  }
}
</script>
