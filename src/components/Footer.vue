<template>
    <div class="container-fluid">
        <div class="row">
            <p class="lead">AC's Store &copy; <span id="currYear">{{ currYear }}</span></p>
        </div>
    </div>
</template>
<script>
export default {
    name: "FooterComp",
    data() {
    return {
      currYear: new Date().getUTCFullYear(),
    };
  }
}
</script>
<style scoped>
    
</style>