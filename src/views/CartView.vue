<template>
  <div class="bg-white">
    <NavigationBar />

    <main
      class="mx-auto max-w-2xl px-4 pt-16 pb-24 sm:px-6 lg:max-w-7xl lg:px-8"
    >
      <h1 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Shopping Cart
      </h1>

      <form
        class="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16"
        @submit.prevent="handleSubmit"
      >
        <section aria-labelledby="cart-heading" class="lg:col-span-7">
          <h2 id="cart-heading" class="sr-only">Items in your shopping cart</h2>

          <ul
            class="divide-y divide-gray-200 border-t border-b border-gray-200"
            role="list"
          >
            <li
              v-for="(product, productIdx) in products"
              :key="product.id"
              class="flex py-6 sm:py-10"
            >
              <div class="flex-shrink-0">
                <img
                  :alt="product.imageAlt"
                  :src="product.imageSrc"
                  class="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
                />
              </div>

              <div class="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                <div
                  class="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0"
                >
                  <div>
                    <div class="flex justify-between">
                      <h3 class="text-sm">
                        <a
                          :href="product.href"
                          class="font-medium text-gray-700 hover:text-gray-800"
                          >{{ product.name }}</a
                        >
                      </h3>
                    </div>
                    <div class="mt-1 flex text-sm">
                      <p class="text-gray-500">
                        {{ product.color }}
                      </p>
                      <p
                        v-if="product.size"
                        class="ml-4 border-l border-gray-200 pl-4 text-gray-500"
                      >
                        {{ product.size }}
                      </p>
                    </div>
                    <p class="mt-1 text-sm font-medium text-gray-900">
                      {{ product.price }}
                    </p>
                  </div>

                  <div class="mt-4 sm:mt-0 sm:pr-9">
                    <label :for="`quantity-${productIdx}`" class="sr-only"
                      >Quantity, {{ product.name }}</label
                    >
                    <select
                      :id="`quantity-${productIdx}`"
                      v-model="product.quantity"
                      :name="`quantity-${productIdx}`"
                      class="max-w-full rounded-md border border-gray-300 py-1.5 text-left text-base font-medium leading-5 text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                      @change="handleChangeProductQuantity(product)"
                    >
                      <option
                        v-for="(item, index) in qtdOptions"
                        :key="index"
                        :value="item"
                      >
                        {{ item }}
                      </option>
                    </select>

                    <div class="absolute top-0 right-0">
                      <button
                        class="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
                        type="button"
                        @click="handleRemoveProduct(product)"
                      >
                        <span class="sr-only">Remove</span>
                        <XMarkIconMini aria-hidden="true" class="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>

                <p class="mt-4 flex space-x-2 text-sm text-gray-700">
                  <CheckIcon
                    v-if="product.inStock"
                    aria-hidden="true"
                    class="h-5 w-5 flex-shrink-0 text-green-500"
                  />
                  <ClockIcon
                    v-else
                    aria-hidden="true"
                    class="h-5 w-5 flex-shrink-0 text-gray-300"
                  />
                  <span>{{
                    product.inStock
                      ? "In stock"
                      : `Ships in ${product.leadTime}`
                  }}</span>
                </p>
              </div>
            </li>
          </ul>
        </section>

        <!-- Order summary -->
        <section
          aria-labelledby="summary-heading"
          class="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
        >
          <h2 id="summary-heading" class="text-lg font-medium text-gray-900">
            Order summary
          </h2>

          <dl class="mt-6 space-y-4">
            <div class="flex items-center justify-between">
              <dt class="text-sm text-gray-600">Subtotal</dt>
              <dd class="text-sm font-medium text-gray-900">
                ${{ calculateSubtotal() }}
              </dd>
            </div>
            <div
              class="flex items-center justify-between border-t border-gray-200 pt-4"
            >
              <dt class="flex items-center text-sm text-gray-600">
                <span>Shipping estimate</span>
                <a
                  class="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500"
                  href="#"
                >
                  <span class="sr-only"
                    >Learn more about how shipping is calculated</span
                  >
                  <QuestionMarkCircleIcon aria-hidden="true" class="h-5 w-5" />
                </a>
              </dt>
              <dd class="text-sm font-medium text-gray-900">
                {{
                  calculateShippingCost().toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })
                }}
              </dd>
            </div>
            <div
              class="flex items-center justify-between border-t border-gray-200 pt-4"
            >
              <dt class="flex text-sm text-gray-600">
                <span>Tax estimate</span>
                <a
                  class="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500"
                  href="#"
                >
                  <span class="sr-only"
                    >Learn more about how tax is calculated</span
                  >
                  <QuestionMarkCircleIcon aria-hidden="true" class="h-5 w-5" />
                </a>
              </dt>
              <dd class="text-sm font-medium text-gray-900">
                {{
                  calculateTax().toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })
                }}
              </dd>
            </div>
            <div
              class="flex items-center justify-between border-t border-gray-200 pt-4"
            >
              <dt class="text-base font-medium text-gray-900">Order total</dt>
              <dd class="text-base font-medium text-gray-900">
                {{
                  calculateTotal().toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })
                }}
              </dd>
            </div>
          </dl>

          <div class="mt-6">
            <button
              class="w-full rounded-md border border-transparent bg-indigo-600 py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
              type="submit"
            >
              Checkout
            </button>
          </div>
        </section>
      </form>

      <!-- Related products -->
      <section aria-labelledby="related-heading" class="mt-24">
        <h2 id="related-heading" class="text-lg font-medium text-gray-900">
          You may also like&hellip;
        </h2>

        <div
          class="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8"
        >
          <div
            v-for="relatedProduct in relatedProducts"
            :key="relatedProduct.id"
            class="group relative"
          >
            <div
              class="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md group-hover:opacity-75 lg:aspect-none lg:h-80"
            >
              <img
                :alt="relatedProduct.images[0].alt"
                :src="relatedProduct.images[0].src"
                class="h-full w-full object-cover object-center lg:h-full lg:w-full"
              />
            </div>
            <div class="mt-4 flex justify-between">
              <div>
                <h3 class="text-sm text-gray-700">
                  <a :href="`/product/${relatedProduct.id}`">
                    <span aria-hidden="true" class="absolute inset-0" />
                    {{ relatedProduct.name }}
                  </a>
                </h3>
                <p class="mt-1 text-sm text-gray-500">
                  {{ relatedProduct.colors[0].name }}
                </p>
              </div>
              <p class="text-sm font-medium text-gray-900">
                {{
                  relatedProduct.price.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })
                }}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  CheckIcon,
  ClockIcon,
  QuestionMarkCircleIcon,
  XMarkIcon as XMarkIconMini,
} from "@heroicons/vue/20/solid";
import NavigationBar from "@/components/NavigationBar.vue";
import axios from "@/services/axios";
import type { CartInterface, ProductInterface } from "@/interfaces";

export default defineComponent({
  name: "CartView",
  components: {
    CheckIcon,
    ClockIcon,
    QuestionMarkCircleIcon,
    XMarkIconMini,
    NavigationBar,
  },

  data() {
    return {
      relatedProducts: [] as ProductInterface[],
      open: false,
      products: [] as CartInterface[],
      qtdOptions: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    };
  },

  methods: {
    async fetchData() {
      const cartData = await axios.get("/cart");
      this.products = cartData.data;

      const relatedProductsData = await axios.get("/products");
      this.relatedProducts = relatedProductsData.data;
    },

    async handleChangeProductQuantity(product: CartInterface) {
      await axios.put(`/cart/${product.id}`, product);
      await this.fetchData();
    },

    async handleRemoveProduct(product: CartInterface) {
      await axios.delete(`/cart/${product.id}`);
      await this.fetchData();
    },

    handleSubmit(event: Event) {
      event.preventDefault();
      this.$router.push("/checkout");
    },

    calculateSubtotal() {
      return this.products.reduce(
        (total, product) => total + product.price * product.quantity,
        0
      );
    },

    calculateShippingCost() {
      return this.calculateSubtotal() > 100 ? 0 : 25;
    },

    calculateTotal() {
      return (
        this.calculateSubtotal() +
        this.calculateShippingCost() +
        this.calculateTax()
      );
    },

    calculateTax() {
      return this.calculateSubtotal() * 0.08;
    },
  },

  async mounted() {
    await this.fetchData();
  },
});
</script>
