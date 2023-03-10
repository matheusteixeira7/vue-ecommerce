<template>
  <NavigationBar />

  <isLoading v-if="isLoading" />
  <main v-else>
    <div class="bg-white">
      <div
        class="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8"
      >
        <div class="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
          <!-- Image gallery -->
          <TabGroup as="div" class="flex flex-col-reverse">
            <!-- Image selector -->
            <div
              class="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none"
            >
              <TabList class="grid grid-cols-4 gap-6">
                <Tab
                  v-for="image in product.images"
                  :key="image.id"
                  v-slot="{ selected }"
                  class="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                >
                  <span class="sr-only">
                    {{ image.name }}
                  </span>
                  <span class="absolute inset-0 overflow-hidden rounded-md">
                    <img
                      :src="image.src"
                      alt=""
                      class="h-full w-full object-cover object-center"
                    />
                  </span>
                  <span
                    :class="[
                      selected ? 'ring-indigo-500' : 'ring-transparent',
                      'pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2',
                    ]"
                    aria-hidden="true"
                  />
                </Tab>
              </TabList>
            </div>
            <TabPanels class="aspect-w-1 aspect-h-1 w-full">
              <TabPanel v-for="image in product.images" :key="image.id">
                <img
                  :alt="image.alt"
                  :src="image.src"
                  class="h-full w-full object-cover object-center sm:rounded-lg"
                />
              </TabPanel>
            </TabPanels>
          </TabGroup>

          <!-- Product info -->
          <div class="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            <h1 class="text-3xl font-bold tracking-tight text-gray-900">
              {{ product.name }}
            </h1>
            <div class="mt-3">
              <h2 class="sr-only">Product information</h2>
              <p class="text-3xl tracking-tight text-gray-900">
                {{ product.price }}
              </p>
            </div>
            <!-- Reviews -->
            <div class="mt-3">
              <h3 class="sr-only">Reviews</h3>
              <div class="flex items-center">
                <div class="flex items-center">
                  <StarIcon
                    v-for="rating in [0, 1, 2, 3, 4]"
                    :key="rating"
                    :class="[
                      product.rating > rating
                        ? 'text-indigo-500'
                        : 'text-gray-300',
                      'h-5 w-5 flex-shrink-0',
                    ]"
                    aria-hidden="true"
                  />
                </div>
                <p class="sr-only">{{ product.rating }} out of 5 stars</p>
              </div>
            </div>
            <div class="mt-6">
              <h3 class="sr-only">Description</h3>
              <div
                class="space-y-6 text-base text-gray-700"
                v-html="product.description"
              />
            </div>
            <form class="mt-6">
              <!-- Colors -->
              <div>
                <h3 class="text-sm text-gray-600">Color</h3>
                <RadioGroup v-model="selectedColor" class="mt-2">
                  <RadioGroupLabel class="sr-only">
                    Choose a color
                  </RadioGroupLabel>
                  <span class="flex items-center space-x-3">
                    <RadioGroupOption
                      v-for="color in product.colors"
                      :key="color.name"
                      v-slot="{ active, checked }"
                      :value="color"
                      as="template"
                    >
                      <div
                        :class="[
                          color.selectedColor,
                          active && checked ? 'ring ring-offset-1' : '',
                          !active && checked ? 'ring-2' : '',
                          '-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none',
                        ]"
                      >
                        <RadioGroupLabel as="span" class="sr-only">
                          {{ color.name }}
                        </RadioGroupLabel>
                        <span
                          :class="[
                            color.bgColor,
                            'h-8 w-8 border border-black border-opacity-10 rounded-full',
                          ]"
                          aria-hidden="true"
                        />
                      </div>
                    </RadioGroupOption>
                  </span>
                </RadioGroup>
              </div>
              <div class="sm:flex-col1 mt-10 flex">
                <button
                  class="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
                  type="submit"
                >
                  Add to bag
                </button>
                <button
                  class="ml-4 flex items-center justify-center rounded-md py-3 px-3 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                  type="button"
                >
                  <HeartIcon aria-hidden="true" class="h-6 w-6 flex-shrink-0" />
                  <span class="sr-only">Add to favorites</span>
                </button>
              </div>
            </form>
            <section aria-labelledby="details-heading" class="mt-12">
              <h2 id="details-heading" class="sr-only">Additional details</h2>
              <div class="divide-y divide-gray-200 border-t">
                <Disclosure
                  v-for="detail in product.details"
                  :key="detail.name"
                  v-slot="{ open }"
                  as="div"
                >
                  <h3>
                    <DisclosureButton
                      class="group relative flex w-full items-center justify-between py-6 text-left"
                    >
                      <span
                        :class="[
                          open ? 'text-indigo-600' : 'text-gray-900',
                          'text-sm font-medium',
                        ]"
                        >{{ detail.name }}</span
                      >
                      <span class="ml-6 flex items-center">
                        <PlusIcon
                          v-if="!open"
                          aria-hidden="true"
                          class="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                        />
                        <MinusIcon
                          v-else
                          aria-hidden="true"
                          class="block h-6 w-6 text-indigo-400 group-hover:text-indigo-500"
                        />
                      </span>
                    </DisclosureButton>
                  </h3>
                  <DisclosurePanel as="div" class="prose prose-sm pb-6">
                    <ul role="list">
                      <li v-for="item in detail.items" :key="item">
                        {{ item }}
                      </li>
                    </ul>
                  </DisclosurePanel>
                </Disclosure>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  </main>

  <FooterNavigation />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  RadioGroup,
  RadioGroupLabel,
  RadioGroupOption,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from "@headlessui/vue";
import { StarIcon } from "@heroicons/vue/20/solid";
import { HeartIcon, MinusIcon, PlusIcon } from "@heroicons/vue/24/outline";

import axios from "@/services/axios";

import NavigationBar from "@/components/NavigationBar.vue";
import FooterNavigation from "@/components/FooterNavigation.vue";
import IsLoading from "@/components/IsLoading.vue";

import type { ProductInterface } from "@/interfaces";

export default defineComponent({
  name: "ProductView",
  components: {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    RadioGroup,
    RadioGroupLabel,
    RadioGroupOption,
    Tab,
    TabGroup,
    TabList,
    TabPanel,
    TabPanels,
    StarIcon,
    HeartIcon,
    MinusIcon,
    PlusIcon,
    NavigationBar,
    FooterNavigation,
    IsLoading,
  },
  data() {
    return {
      product: {} as ProductInterface,
      selectedColor: {},
      isLoading: true,
    };
  },
  async mounted() {
    const { data } = await axios.get(`/products/${this.$route.params.id}`);
    this.product = data;

    this.selectedColor = this.product.colors[0];
    this.isLoading = false;
  },
});
</script>
