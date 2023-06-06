<template>
    <div class="row">
        <div class="col-md-12">
            <h1 class="my-3">Add New Menu Item</h1>
        </div>
        <div class="col-md-4 offset-md-4">
            <div class="card">
                <div class="card-body">
                    <form @submit.prevent="handleSubmit()">
                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label">Dish name</label>
                            <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Margarita Pizza" v-model="formData.name">
                        </div>
                        <div class="mb-3">
                            <label for="exampleFormControlTextarea1" class="form-label">Dish Description</label>
                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Simple dish description ..." v-model="formData.description"></textarea>
                        </div>
                        <div class="mb-3">
                            <label for="exampleFormControlInput6" class="form-label">Dish price</label>
                            <input type="text" class="form-control" id="exampleFormControlInput6" placeholder="Dish price in $" v-model="formData.price">
                        </div>
                        <div class="mb-3">
                            <label for="exampleFormControlInput2" class="form-label">Dish category</label>
                            <select class="form-select" aria-label="Default select menu" id="exampleFormControlInput2" v-model="formData.category">
                                <option selected>Open this select menu</option>
                                <option value="starter">Starter</option>
                                <option value="main course">Main course</option>
                                <option value="dessert">Dessert</option>
                                <option value="beverage">Beverage</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="exampleFormControlInput3" class="form-label">Dish avialibility</label>
                            <select class="form-select" aria-label="Default select available" id="exampleFormControlInput3" v-model="formData.available">
                                <option selected>Open this select menu</option>
                                <option value="breakfast">Breakfast</option>
                                <option value="dinner">Dinner</option>
                                <option value="lunch">Lunch</option>
                                <option value="weekdays">Weekdays</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="exampleFormControlInput4" class="form-label">Dish time to prepare</label>
                            <input type="text" class="form-control" id="exampleFormControlInput4" placeholder="ETA 30min" v-model="formData.eta">
                        </div>
                        <div class="mb-3 d-flex align-items-center">
                            <input class="form-check-input mt-0" type="checkbox" value="" id="exampleFormControlInput5" v-model="formData.active">
                            <label for="exampleFormControlInput5" class="form-label ms-3 mb-0">Deactivate Dish</label>
                        </div>
                        <div class="mb-3">
                            <button type="submit" class="btn btn-primary">Add</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import ApiService from "@/services/ApiService"

const formData = ref({
    name: '',
    description: '',
    price: '',
    category: '',
    available: '',
    eta: '',
    active: false
})


// Function for handlig form and sending data to API
const handleSubmit = async () => {
    await ApiService.createOrUpdateDishes(formData.value)
}

</script>