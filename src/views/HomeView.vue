<template>
    <div class="row">
        <div class="col-md-12">
            <div class="d-flex justify-content-between align-items-center">
                <h1 class="my-3">Menu Items</h1>
                <button v-if="dishes.length" type="button" class="btn btn-warning clear-btn" @click="clearMenu()">Clear Menu</button>
            </div>
        </div>
        <div class="col-md-6 offset-md-3">
            <ul v-if="isDishes" class="list-group list-group-flush">
                <li v-for="item in dishes" :key="item._id" class="list-group-item">
                    <div class="card mb-3" :class="{ 'bg-body-secondary': item.active }">
                        <div class="row g-0">
                            <div class="col-md-4">
                                <img :src="getImageUrl(item.img)" class="img-fluid rounded-start m-2" alt="Food image">
                            </div>
                            <div class="col-md-8">
                                <div class="card-body ms-2">
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
                                    <p v-if="item.active" class="card-text"><small class="text-body-secondary text-uppercase fw-bold">Dish is out of menu</small></p>
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

const dishes = ref([])

// Computed check
const isDishes = computed(() => {
  return dishes.value.length > 0
})

// Clear menu items
const clearMenu = async () => {
    let res = await ApiService.clearAllDishes()
    if (res.status === 200) {
        dishes.value = []
    }
}

const getImageUrl = (imgName) => {
    return new URL(`/src/assets/img/${imgName}.svg`, import.meta.url).href;
}

const getAllMenuItems = async () => {
    let res = await ApiService.getAllDishes()
    if (res.status === 200) {
        dishes.value = res.data.data
    }
}

getAllMenuItems()

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