<template>
    <div class="row">
        <div class="col-md-12">
            <h1 class="my-3">Menu Items</h1>
        </div>
        <div class="col-md-6 offset-md-3">
            <ul v-if="isDishes" class="list-group list-group-flush">
                <li v-for="item in dishes.data.data" :key="item._id" class="list-group-item">
                    <div class="card mb-3">
                        <div class="row g-0">
                            <div class="col-md-4">
                                <img src="https://placehold.co/500x500?text=Food+Placeholder+Photo" class="img-fluid rounded-start m-2" alt="Food image">
                            </div>
                            <div class="col-md-8">
                                <div class="card-body">
                                    <h4 class="card-title">
                                        <router-link :to="`/menu/${item._id}`" class="card-title-link">{{ item.name }}</router-link>
                                    </h4>
                                    
                                    <h6 class="card-title">Description</h6>
                                    <p class="card-text">{{ item.description }}</p>
                                    
                                    <h6 class="card-title">
                                        Price: <span class="card-text">{{ item.price }} $</span>
                                    </h6>
                                    
                                    <h6 class="card-title">
                                        Category: <span class="card-text text-capitalize">{{ item.category }}</span>
                                    </h6>

                                    <h6 class="card-title">
                                        Available on: <span class="card-text text-capitalize">{{ item.available }}</span>
                                    </h6>
                                    
                                    <p class="card-text"><small class="text-body-secondary">Estimated time to prepare {{ item.eta }} mins</small></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
            <h3 v-else>There is no dishes in the menu right now, please add it.</h3>
        </div>
    </div>
</template>

<script setup>
import ApiService from "@/services/ApiService"
import { ref, computed } from 'vue'

const dishes = ref(null)

dishes.value = await ApiService.getAllDishes()
console.log('DISH ', dishes.value.data.data.length)
// a computed ref
const isDishes = computed(() => {
  return  dishes.value.status === 200 && dishes.value.data.data.length > 0
})
</script>

<style scoped>
    .card-title-link {
        color: black;
        text-decoration: none;
        transition: color 200ms ease-in-out;
    }

    .card-title-link:hover {
        color: #333;
        text-decoration: underline;
    }
</style>