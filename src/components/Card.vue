<template>
    <div class="card" style="width: 18rem;">
        <div class="card-header">
            <slot name="cardHeader"></slot>
        </div>
        <div class="card-body">
            <slot name="cardBody"></slot>
  </div>
</div>
</template>
<script>
export default {
    name: "CardComp",
    components: {
        
    }
}
</script>
<style scoped>
 .card {
  width: 18rem;
  padding-block: 9px;
  background-image: linear-gradient(180deg, black 65%,#232323);
  color: white;
  border: 2px solid silver;
}
.card-header {
  border: 2px solid silver;
  background-color: white;
}   
</style>