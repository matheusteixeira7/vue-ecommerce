<template>
  <div class="bg-white">
    <NavigationBar />

    <div>
      <!-- Mobile filter dialog -->
      <div class="border-b border-gray-200">
        <nav
          aria-label="Breadcrumb"
          class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          <ol role="list" class="flex items-center space-x-4 py-4">
            <li v-for="breadcrumb in breadcrumbs" :key="breadcrumb.id">
              <div class="flex items-center">
                <a
                  :href="breadcrumb.href"
                  class="mr-4 text-sm font-medium text-gray-900"
                  >{{ capitalizeWords(breadcrumb.name as string) }}</a
                >
                <svg
                  viewBox="0 0 6 20"
                  aria-hidden="true"
                  class="h-5 w-auto text-gray-300"
                >
                  <path
                    d="M4.878 4.34H3.551L.27 16.532h1.327l3.281-12.19z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </li>
            <li class="text-sm">
              <a
                href="#"
                aria-current="page"
                class="font-medium text-gray-500 hover:text-gray-600"
              >
                {{ capitalizeWords($route.query.subcategory as string[]) }}
              </a>
            </li>
          </ol>
        </nav>
      </div>

      <IsLoading v-if="isLoading" />
      <NotFoundError404 v-else-if="NotFound" />
      <main v-else class="mx-auto max-w-2xl px-4 lg:max-w-7xl lg:px-8">
        <div class="border-b border-gray-200 pt-24 pb-10">
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
              type="button"
              class="inline-flex items-center lg:hidden"
              @click="mobileFiltersOpen = true"
            >
              <span class="text-sm font-medium text-gray-700">Filters</span>
              <PlusIcon
                class="ml-1 h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true"
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
                          :name="`${section.id}[]`"
                          :value="option.value"
                          type="checkbox"
                          class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
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
                    :src="product.images[0].src"
                    :alt="product.images[0].alt"
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
                      {{ product.size }}
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
import { PlusIcon } from "@heroicons/vue/20/solid";

import axios from "@/services/axios";

import FooterNavigation from "@/components/FooterNavigation.vue";
import NavigationBar from "@/components/NavigationBar.vue";
import NotFoundError404 from "@/components/NotFoundError404.vue";
import IsLoading from "@/components/IsLoading.vue";

import type { ProductInterface } from "@/interfaces";

export default {
  name: "CategoryView",
  components: {
    PlusIcon,
    NavigationBar,
    FooterNavigation,
    NotFoundError404,
    IsLoading,
  },
  data() {
    return {
      breadcrumbs: [{ id: 1, name: this.$route.query.category, href: "#" }],
      filters: [
        {
          id: "color",
          name: "Color",
          options: [
            { value: "white", label: "White" },
            { value: "beige", label: "Beige" },
            { value: "blue", label: "Blue" },
            { value: "brown", label: "Brown" },
            { value: "green", label: "Green" },
            { value: "purple", label: "Purple" },
          ],
        },
        {
          id: "category",
          name: "Category",
          options: [
            { value: "new-arrivals", label: "All New Arrivals" },
            { value: "tees", label: "Tees" },
            { value: "crewnecks", label: "Crewnecks" },
            { value: "sweatears", label: "Sweaters" },
            { value: "pants-shorts", label: "Pants & Shorts" },
          ],
        },
        {
          id: "sizes",
          name: "Sizes",
          options: [
            { value: "xs", label: "XS" },
            { value: "s", label: "S" },
            { value: "m", label: "M" },
            { value: "l", label: "L" },
            { value: "xl", label: "XL" },
            { value: "2xl", label: "2XL" },
          ],
        },
      ],
      products: {} as ProductInterface[],
      mobileFiltersOpen: false,
      isLoading: true,
      NotFound: false,
      title: this.capitalizeWords(this.$route.query.category),
    };
  },
  async mounted() {
    this.getQueryParams();
    await this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        this.isLoading = true;
        const url = `/products?${this.getQueryParams()}`;
        const response = await axios.get<ProductInterface[]>(url);
        this.products = response.data;

        if (this.products.length === 0) {
          this.NotFound = true;
        }
      } catch (error) {
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },
    getQueryParams() {
      const searchParams = new URLSearchParams(window.location.search);
      const queryParams = [];

      for (const [key, value] of searchParams) {
        queryParams.push(`${key}=${value}`);
      }

      return queryParams.join("&");
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
};
</script>
