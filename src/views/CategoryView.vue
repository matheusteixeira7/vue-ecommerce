<template>
  <div class="bg-white">
    <NavigationBar />

    <div>
      <!-- Mobile filter dialog -->
      <IsLoading v-if="isLoading" />
      <main v-else class="mx-auto max-w-2xl px-4 lg:max-w-7xl lg:px-8">
        <div class="border-b border-gray-200 pt-10 pb-10">
          <h1 class="text-4xl font-bold tracking-tight text-gray-900">
            {{ title }}
          </h1>
          <p class="mt-4 text-base text-gray-500">
            Checkout out the latest release of Basic Tees, new and improved with
            four openings!
          </p>
        </div>

        <div
          class="pt-12 pb-24 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4"
        >
          <aside>
            <h2 class="sr-only">Filters</h2>

            <button
              class="inline-flex items-center lg:hidden"
              type="button"
              @click="mobileFiltersOpen = true"
            >
              <span class="text-sm font-medium text-gray-700">Filters</span>
              <PlusIcon
                aria-hidden="true"
                class="ml-1 h-5 w-5 flex-shrink-0 text-gray-400"
              />
            </button>

            <div class="hidden lg:block">
              <form class="space-y-10 divide-y divide-gray-200">
                <div
                  v-for="(section, sectionIdx) in filters"
                  :key="section.name"
                  :class="sectionIdx === 0 ? null : 'pt-10'"
                >
                  <fieldset>
                    <legend class="block text-sm font-medium text-gray-900">
                      {{ section.name }}
                    </legend>
                    <div class="space-y-3 pt-6">
                      <div
                        v-for="(option, optionIdx) in section.options"
                        :key="option.value"
                        class="flex items-center"
                      >
                        <input
                          :id="`${section.id}-${optionIdx}`"
                          v-model="option.isSelected"
                          :name="`${section.id}[]`"
                          :value="option.value"
                          class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          type="checkbox"
                        />
                        <label
                          :for="`${section.id}-${optionIdx}`"
                          class="ml-3 text-sm text-gray-600"
                          >{{ option.label }}</label
                        >
                      </div>
                    </div>
                  </fieldset>
                </div>
              </form>
            </div>
          </aside>

          <section
            aria-labelledby="product-heading"
            class="mt-6 lg:col-span-2 lg:mt-0 xl:col-span-3"
          >
            <h2 id="product-heading" class="sr-only">Products</h2>

            <div
              class="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 xl:grid-cols-3"
            >
              <div
                v-for="product in products"
                :key="product.id"
                class="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
              >
                <div
                  class="aspect-w-3 aspect-h-4 bg-gray-200 group-hover:opacity-75 sm:aspect-none sm:h-96"
                >
                  <img
                    :alt="product.images[0].alt"
                    :src="product.images[0].src"
                    class="h-full w-full object-cover object-center sm:h-full sm:w-full"
                  />
                </div>
                <div class="flex flex-1 flex-col space-y-2 p-4">
                  <h3 class="text-sm font-medium text-gray-900">
                    <a :href="`/product/${product.id}`">
                      <span aria-hidden="true" class="absolute inset-0" />
                      {{ product.name }}
                    </a>
                  </h3>
                  <p class="text-sm text-gray-500">
                    {{ product.description }}
                  </p>
                  <div class="flex flex-1 flex-col justify-end">
                    <p class="text-sm italic text-gray-500">
                      {{ capitalizeWords(product.size!) }}
                    </p>
                    <p class="text-base font-medium text-gray-900">
                      {{
                        product.price.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })
                      }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <FooterNavigation />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { PlusIcon } from "@heroicons/vue/20/solid";

import FooterNavigation from "@/components/FooterNavigation.vue";
import NavigationBar from "@/components/NavigationBar.vue";
import IsLoading from "@/components/IsLoading.vue";

import type { ProductInterface } from "@/interfaces";
import axios from "@/services/axios";

interface FiltersInterface {
  id: string;
  name: string;
  category: string;
  options: {
    value: string;
    label: string;
    isSelected: boolean;
  }[];
}

export default defineComponent({
  components: {
    PlusIcon,
    NavigationBar,
    FooterNavigation,
    IsLoading,
  },

  data() {
    return {
      breadcrumbs: [{ id: 1, name: this.$route.params.category, href: "#" }],
      filters: [] as FiltersInterface[],
      isChecked: false,
      products: {} as ProductInterface[],
      mobileFiltersOpen: false,
      isLoading: true,
      title: this.capitalizeWords(this.$route.params.category),
    };
  },
  methods: {
    async fetchData() {
      try {
        this.isLoading = true;
        const filtersResponse = await axios.get<FiltersInterface[]>(
          `/filters?category=${this.$route.params.category}`
        );
        this.filters = filtersResponse.data;

        const response = await axios.get<ProductInterface[]>(
          `/products?category=${this.getSelectedOptions(this.filters)}`
        );
        this.products = response.data;
      } catch (error) {
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },

    async fetchProducts() {
      try {
        this.isLoading = true;
        const response = await axios.get<ProductInterface[]>(
          `/products?category=${this.getSelectedOptions(this.filters)}`
        );
        this.products = response.data;
      } catch (error) {
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },

    getSelectedOptions(filters: FiltersInterface[]) {
      const selectedOptions = [] as {
        key: string;
        value: string;
      }[];
      filters.forEach((filter) => {
        filter.options.forEach((option) => {
          if (option.isSelected) {
            selectedOptions.push({
              key: filter.name,
              value: option.value,
            });
          }
        });
      });

      const queryParams = [];
      for (const item of selectedOptions) {
        queryParams.push(
          `${item.key.toLocaleLowerCase()}=${item.value.toLocaleLowerCase()}`
        );
      }

      const query = queryParams.join("&");

      return query.length > 0
        ? `${this.$route.params.category}&${query}`
        : `${this.$route.params.category}`;
    },

    capitalizeWords(input: string | string[]) {
      if (typeof input === "string") {
        // Converte a string em um array de palavras
        input = input.split(", ");
      }
      // Mapeia o array de palavras, convertendo a primeira letra de cada uma em maiúscula
      const capitalized = input.map(
        (word) => word.charAt(0).toUpperCase() + word.slice(1)
      );
      // Juntando as palavras com " & " caso haja mais de uma
      return capitalized.length > 1 ? capitalized.join(" & ") : capitalized[0];
    },
  },
  async mounted() {
    await this.fetchData();
    await this.fetchProducts();
  },

  watch: {
    filters: {
      deep: true,
      handler() {
        this.getSelectedOptions(this.filters);
        this.fetchProducts();
      },
    },
  },
});
</script>
