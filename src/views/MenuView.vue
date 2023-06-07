<template>
    <div class="row">
        <div class="col-md-12">
            <h1 class="my-3">Add New Menu Item</h1>
        </div>
        <div class="col-md-4 offset-md-4">
            <div class="card">
                <div class="card-body">
                    <div v-if="infoMsg" class="alert alert-success" role="alert">
                        {{ infoMsg }}
                    </div>

                    <form @submit.prevent="handleSubmit()">
                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label">Dish name</label>
                            <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Margarita Pizza" v-model="formData.name">
                            <!-- Error Message -->
                            <div class="input-errors" v-for="(error, index) of v$.name.$errors" :key="index">
                                <div class="text-danger">{{ error.$message }}</div>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="exampleFormControlTextarea1" class="form-label">Dish Description</label>
                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Simple dish description ..." v-model="formData.description"></textarea>
                            <!-- Error Message -->
                            <div class="input-errors" v-for="(error, index) of v$.description.$errors" :key="index">
                                <div class="text-danger">{{ error.$message }}</div>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="exampleFormControlInput6" class="form-label">Dish price</label>
                            <input type="number" class="form-control" id="exampleFormControlInput6" placeholder="Dish price in $" v-model="formData.price">
                            <!-- Error Message -->
                            <div class="input-errors" v-for="(error, index) of v$.price.$errors" :key="index">
                                <div class="text-danger">{{ error.$message }}</div>
                            </div>
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
                            <!-- Error Message -->
                            <div class="input-errors" v-for="(error, index) of v$.category.$errors" :key="index">
                                <div class="text-danger">{{ error.$message }}</div>
                            </div>
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
                            <!-- Error Message -->
                            <div class="input-errors" v-for="(error, index) of v$.available.$errors" :key="index">
                                <div class="text-danger">{{ error.$message }}</div>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="exampleFormControlInput3" class="form-label">Dish image</label>
                            <select class="form-select" aria-label="Default select available" id="exampleFormControlInput3" v-model="formData.img">
                                <option selected>Open this select menu</option>
                                <option value="pizza">Pizza</option>
                                <option value="burger">Burger</option>
                                <option value="muffin">Muffin</option>
                                <option value="beer">Beer</option>
                            </select>
                            <!-- Error Message -->
                            <div class="input-errors" v-for="(error, index) of v$.img.$errors" :key="index">
                                <div class="text-danger">{{ error.$message }}</div>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="exampleFormControlInput4" class="form-label">Dish time to prepare</label>
                            <input type="number" class="form-control" id="exampleFormControlInput4" placeholder="ETA 30min" v-model="formData.eta">
                            <!-- Error Message -->
                            <div class="input-errors" v-for="(error, index) of v$.eta.$errors" :key="index">
                                <div class="text-danger">{{ error.$message }}</div>
                            </div>
                        </div>
                        <div class="mb-3 d-flex align-items-center">
                            <input class="form-check-input mt-0" type="checkbox" value="" id="exampleFormControlInput5" v-model="formData.active">
                            <label for="exampleFormControlInput5" class="form-label ms-3 mb-0">Deactivate Dish</label>
                        </div>
                        <div class="mb-3">
                            <button type="submit" class="btn btn-primary">{{ isEditMode ? 'Edit': 'Add' }}</button>
                            <button v-if="isEditMode" @click="deleteSingleDishItem()" type="button" class="btn btn-danger ms-3">Delete</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useVuelidate } from '@vuelidate/core'
import { required, minLength, maxLength } from '@vuelidate/validators'
import { ref, reactive, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ApiService from "@/services/ApiService"

// Variable section
const initialFormData = () => ({
    name: '',
    description: '',
    price: '',
    category: '',
    available: '',
    eta: '',
    img: '',
    active: false
})

let formData = reactive(initialFormData())
const resetUserForm = () => Object.assign(formData, initialFormData()),
    route = useRoute(),
    router = useRouter(),
    infoMsg = ref(''),
    // Validation of the form fields
    rules = computed(() => {
        return {
            name: { required, minLength: minLength(3), maxLength: maxLength(20) },
            description: { required, minLength: minLength(5), maxLength: maxLength(200)},
            price: { required, minLength: minLength(1), maxLength: maxLength(20) },
            category: { required },
            available: { required },
            eta: { required,minLength: minLength(1), maxLength: maxLength(20) },
            img: { required }
        }
    }),
    v$ = useVuelidate(rules, formData)

// Computed section
// If we have ID we are able to edit
const isEditMode = computed(() => {
  return route.params.id !== undefined
})

// Functions section
// Function for handlig form and sending data to API
const handleSubmit = async (event) => {
    let result = await v$.value.$validate()

    if (result) {
        await ApiService.createOrUpdateDishes(formData)
        resetUserForm()
        v$.value.$reset()
        infoMsg.value = isEditMode.value ? 'Menu item edited.' : 'Menu item created.'
    }
}

const getSingleDishesData = async () => {
    if (isEditMode.value) {
        let singleDish = await ApiService.getSingleDishes(route.params.id)
        Object.assign(formData, singleDish.data.data)
    }
}

const deleteSingleDishItem = async () => {
    let res = await ApiService.deleteSingleDishes(route.params.id)

    if (res.status === 200 && res.data.message === 'Dish deleted') {
        router.push({ name: 'home' });
    }
}

getSingleDishesData()

</script>