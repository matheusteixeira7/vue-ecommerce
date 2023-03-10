<template>
  <div>
    <!-- Mobile menu -->
    <TransitionRoot :show="mobileMenuOpen" as="template">
      <DialogHeadlessUI
        as="div"
        class="relative z-40 lg:hidden"
        @close="mobileMenuOpen = false"
      >
        <TransitionChild
          as="template"
          enter="transition-opacity ease-linear duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>

        <div class="fixed inset-0 z-40 flex">
          <TransitionChild
            as="template"
            enter="transition ease-in-out duration-300 transform"
            enter-from="-translate-x-full"
            enter-to="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leave-from="translate-x-0"
            leave-to="-translate-x-full"
          >
            <DialogPanel
              class="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl"
            >
              <div class="flex px-4 pt-5 pb-2">
                <button
                  class="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                  type="button"
                  @click="mobileMenuOpen = false"
                >
                  <span class="sr-only">Close menu</span>
                  <XMarkIcon aria-hidden="true" class="h-6 w-6" />
                </button>
              </div>

              <!-- Links -->
              <TabGroup as="div" class="mt-2">
                <div class="border-b border-gray-200">
                  <TabList class="-mb-px flex space-x-8 px-4">
                    <Tab
                      v-for="category in navigation.categories"
                      :key="category.name"
                      v-slot="{ selected }"
                      as="template"
                    >
                      <button
                        :class="[
                          selected
                            ? 'text-indigo-600 border-indigo-600'
                            : 'text-gray-900 border-transparent',
                          'flex-1 whitespace-nowrap border-b-2 py-4 px-1 text-base font-medium',
                        ]"
                      >
                        {{ category.name }}
                      </button>
                    </Tab>
                  </TabList>
                </div>
                <TabPanels as="template">
                  <TabPanel
                    v-for="category in navigation.categories"
                    :key="category.name"
                    class="space-y-10 px-4 pt-10 pb-8"
                  >
                    <div class="grid grid-cols-2 gap-x-4">
                      <div
                        v-for="item in category.featured"
                        :key="item.name"
                        class="group relative text-sm"
                      >
                        <div
                          class="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75"
                        >
                          <img
                            :alt="item.imageAlt"
                            :src="item.imageSrc"
                            class="object-cover object-center"
                          />
                        </div>
                        <a
                          :href="item.href"
                          class="mt-6 block font-medium text-gray-900"
                        >
                          <span
                            aria-hidden="true"
                            class="absolute inset-0 z-10"
                          />
                          {{ item.name }}
                        </a>
                        <p aria-hidden="true" class="mt-1">Shop now</p>
                      </div>
                    </div>
                    <div
                      v-for="section in category.sections"
                      :key="section.name"
                    >
                      <p
                        :id="`${category.id}-${section.id}-heading-mobile`"
                        class="font-medium text-gray-900"
                      >
                        {{ section.name }}
                      </p>
                      <ul
                        :aria-labelledby="`${category.id}-${section.id}-heading-mobile`"
                        class="mt-6 flex flex-col space-y-6"
                        role="list"
                      >
                        <li
                          v-for="item in section.items"
                          :key="item.name"
                          class="flow-root"
                        >
                          <a
                            :href="item.href"
                            class="-m-2 block p-2 text-gray-500"
                            >{{ item.name }}</a
                          >
                        </li>
                      </ul>
                    </div>
                  </TabPanel>
                </TabPanels>
              </TabGroup>

              <div class="space-y-6 border-t border-gray-200 py-6 px-4">
                <div
                  v-for="page in navigation.pages"
                  :key="page.name"
                  class="flow-root"
                >
                  <a
                    :href="page.href"
                    class="-m-2 block p-2 font-medium text-gray-900"
                    >{{ page.name }}</a
                  >
                </div>
              </div>

              <div class="space-y-6 border-t border-gray-200 py-6 px-4">
                <div class="flow-root">
                  <a class="-m-2 block p-2 font-medium text-gray-900" href="#"
                    >Sign in</a
                  >
                </div>
                <div class="flow-root">
                  <a class="-m-2 block p-2 font-medium text-gray-900" href="#"
                    >Create account</a
                  >
                </div>
              </div>

              <div class="border-t border-gray-200 py-6 px-4">
                <a class="-m-2 flex items-center p-2" href="/">
                  <img
                    alt=""
                    class="block h-auto w-5 flex-shrink-0"
                    src="https://tailwindui.com/img/flags/flag-canada.svg"
                  />
                  <span class="ml-3 block text-base font-medium text-gray-900"
                    >CAD</span
                  >
                  <span class="sr-only">, change currency</span>
                </a>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </DialogHeadlessUI>
    </TransitionRoot>

    <header class="relative bg-white">
      <p
        class="flex h-10 items-center justify-center bg-indigo-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8"
      >
        Get free delivery on orders over $100
      </p>

      <nav aria-label="Top" class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="border-b border-gray-200">
          <div class="flex h-16 items-center">
            <button
              class="rounded-md bg-white p-2 text-gray-400 lg:hidden"
              type="button"
              @click="mobileMenuOpen = true"
            >
              <span class="sr-only">Open menu</span>
              <Bars3Icon aria-hidden="true" class="h-6 w-6" />
            </button>

            <!-- Logo -->
            <div class="ml-4 flex lg:ml-0">
              <a href="/">
                <span class="sr-only">Your Company</span>
                <img
                  alt=""
                  class="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                />
              </a>
            </div>

            <!-- Flyout menus -->
            <PopoverGroup class="hidden lg:ml-8 lg:block lg:self-stretch">
              <div class="flex h-full space-x-8">
                <Popover
                  v-for="category in navigation.categories"
                  :key="category.name"
                  v-slot="{ open }"
                  class="flex"
                >
                  <div class="relative flex">
                    <PopoverButton
                      :class="[
                        open
                          ? 'border-indigo-600 text-indigo-600'
                          : 'border-transparent text-gray-700 hover:text-gray-800',
                        'relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out',
                      ]"
                    >
                      {{ category.name }}
                    </PopoverButton>
                  </div>

                  <transition
                    enter-active-class="transition ease-out duration-200"
                    enter-from-class="opacity-0"
                    enter-to-class="opacity-100"
                    leave-active-class="transition ease-in duration-150"
                    leave-from-class="opacity-100"
                    leave-to-class="opacity-0"
                  >
                    <PopoverPanel
                      class="absolute inset-x-0 top-full z-10 text-sm text-gray-500"
                    >
                      <!-- Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow -->
                      <div
                        aria-hidden="true"
                        class="absolute inset-0 top-1/2 bg-white shadow"
                      />

                      <div class="relative bg-white">
                        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                          <div class="grid grid-cols-2 gap-y-10 gap-x-8 py-16">
                            <div class="col-start-2 grid grid-cols-2 gap-x-8">
                              <div
                                v-for="item in category.featured"
                                :key="item.name"
                                class="group relative text-base sm:text-sm"
                              >
                                <div
                                  class="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75"
                                >
                                  <img
                                    :alt="item.imageAlt"
                                    :src="item.imageSrc"
                                    class="object-cover object-center"
                                  />
                                </div>
                                <a
                                  :href="item.href"
                                  class="mt-6 block font-medium text-gray-900"
                                >
                                  <span
                                    aria-hidden="true"
                                    class="absolute inset-0 z-10"
                                  />
                                  {{ item.name }}
                                </a>
                                <p aria-hidden="true" class="mt-1">Shop now</p>
                              </div>
                            </div>
                            <div
                              class="row-start-1 grid grid-cols-3 gap-y-10 gap-x-8 text-sm"
                            >
                              <div
                                v-for="section in category.sections"
                                :key="section.name"
                              >
                                <p
                                  :id="`${section.name}-heading`"
                                  class="font-medium text-gray-900"
                                >
                                  {{ section.name }}
                                </p>
                                <ul
                                  :aria-labelledby="`${section.name}-heading`"
                                  class="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                  role="list"
                                >
                                  <li
                                    v-for="item in section.items"
                                    :key="item.name"
                                    class="flex"
                                  >
                                    <a
                                      :href="item.href"
                                      class="hover:text-gray-800"
                                      >{{ item.name }}</a
                                    >
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </PopoverPanel>
                  </transition>
                </Popover>

                <a
                  v-for="page in navigation.pages"
                  :key="page.name"
                  :href="page.href"
                  class="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                  >{{ page.name }}</a
                >
              </div>
            </PopoverGroup>

            <div class="ml-auto flex items-center">
              <div
                class="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6"
              >
                <a
                  class="text-sm font-medium text-gray-700 hover:text-gray-800"
                  href="#"
                  >Sign in</a
                >
                <span aria-hidden="true" class="h-6 w-px bg-gray-200" />
                <a
                  class="text-sm font-medium text-gray-700 hover:text-gray-800"
                  href="#"
                  >Create account</a
                >
              </div>

              <div class="hidden lg:ml-8 lg:flex">
                <a
                  class="flex items-center text-gray-700 hover:text-gray-800"
                  href="#"
                >
                  <img
                    alt=""
                    class="block h-auto w-5 flex-shrink-0"
                    src="https://tailwindui.com/img/flags/flag-canada.svg"
                  />
                  <span class="ml-3 block text-sm font-medium">CAD</span>
                  <span class="sr-only">, change currency</span>
                </a>
              </div>

              <!-- Search -->
              <div class="flex lg:ml-6">
                <a class="p-2 text-gray-400 hover:text-gray-500" href="#">
                  <span class="sr-only">Search</span>
                  <MagnifyingGlassIcon aria-hidden="true" class="h-6 w-6" />
                </a>
              </div>

              <!-- Cart -->
              <div class="ml-4 flow-root lg:ml-6">
                <a class="group -m-2 flex items-center p-2" href="/cart">
                  <ShoppingBagIcon
                    aria-hidden="true"
                    class="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                  />
                  <span
                    class="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800"
                    >{{ cart.length }}</span
                  >
                  <span class="sr-only">items in cart, view bag</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  </div>

  <TransitionRoot :show="mobileFiltersOpen" as="template">
    <DialogHeadlessUI
      as="div"
      class="relative z-40 lg:hidden"
      @close="mobileFiltersOpen = false"
    >
      <TransitionChild
        as="template"
        enter="transition-opacity ease-linear duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="transition-opacity ease-linear duration-300"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 z-40 flex">
        <TransitionChild
          as="template"
          enter="transition ease-in-out duration-300 transform"
          enter-from="translate-x-full"
          enter-to="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leave-from="translate-x-0"
          leave-to="translate-x-full"
        >
          <DialogPanel
            class="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl"
          >
            <div class="flex items-center justify-between px-4">
              <h2 class="text-lg font-medium text-gray-900">Filters</h2>
              <button
                class="-mr-2 flex h-10 w-10 items-center justify-center p-2 text-gray-400 hover:text-gray-500"
                type="button"
                @click="mobileFiltersOpen = false"
              >
                <span class="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" class="h-6 w-6" />
              </button>
            </div>

            <!-- Filters -->
            <form class="mt-4">
              <Disclosure
                v-for="section in filters"
                :key="section.name"
                v-slot="{ open }"
                as="div"
                class="border-t border-gray-200 pt-4 pb-4"
              >
                <fieldset>
                  <legend class="w-full px-2">
                    <DisclosureButton
                      class="flex w-full items-center justify-between p-2 text-gray-400 hover:text-gray-500"
                    >
                      <span class="text-sm font-medium text-gray-900">{{
                        section.name
                      }}</span>
                      <span class="ml-6 flex h-7 items-center">
                        <ChevronDownIcon
                          :class="[
                            open ? '-rotate-180' : 'rotate-0',
                            'h-5 w-5 transform',
                          ]"
                          aria-hidden="true"
                        />
                      </span>
                    </DisclosureButton>
                  </legend>
                  <DisclosurePanel class="px-4 pt-4 pb-2">
                    <div class="space-y-6">
                      <div
                        v-for="(option, optionIdx) in section.options"
                        :key="option.value"
                        class="flex items-center"
                      >
                        <input
                          :id="`${section.id}-${optionIdx}-mobile`"
                          :name="`${section.id}[]`"
                          :value="option.value"
                          class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          type="checkbox"
                        />
                        <label
                          :for="`${section.id}-${optionIdx}-mobile`"
                          class="ml-3 text-sm text-gray-500"
                          >{{ option.label }}</label
                        >
                      </div>
                    </div>
                  </DisclosurePanel>
                </fieldset>
              </Disclosure>
            </form>
          </DialogPanel>
        </TransitionChild>
      </div>
    </DialogHeadlessUI>
  </TransitionRoot>
</template>

<script lang="ts">
import type { CartInterface } from "@/interfaces";
import axios from "@/services/axios";
import {
  Dialog as DialogHeadlessUI,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import {
  Bars3Icon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/vue/24/outline";

export default {
  name: "NavigationBar",
  components: {
    Bars3Icon,
    MagnifyingGlassIcon,
    ShoppingBagIcon,
    XMarkIcon,
    ChevronDownIcon,
    DialogHeadlessUI,
    DialogPanel,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Popover,
    PopoverButton,
    PopoverGroup,
    PopoverPanel,
    Tab,
    TabGroup,
    TabList,
    TabPanel,
    TabPanels,
    TransitionChild,
    TransitionRoot,
  },
  data() {
    return {
      navigation: {
        categories: [
          {
            id: "women",
            name: "Women",
            featured: [
              {
                name: "New Arrivals",
                href: "#",
                imageSrc:
                  "https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg",
                imageAlt:
                  "Models sitting back to back, wearing Basic Tee in black and bone.",
              },
              {
                name: "Basic Tees",
                href: "#",
                imageSrc:
                  "https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg",
                imageAlt:
                  "Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.",
              },
            ],
            sections: [
              {
                id: "clothing",
                name: "Clothing",
                items: [
                  { name: "Tops", href: "#" },
                  { name: "Dresses", href: "#" },
                  { name: "Pants", href: "#" },
                  { name: "Denim", href: "#" },
                  {
                    name: "Sweaters",
                    href: "/category?category=women&subcategory=sweaters",
                  },
                  { name: "T-Shirts", href: "#" },
                  { name: "Jackets", href: "#" },
                  { name: "Activewear", href: "#" },
                  { name: "Browse All", href: "#" },
                ],
              },
              {
                id: "accessories",
                name: "Accessories",
                items: [
                  { name: "Watches", href: "#" },
                  { name: "Wallets", href: "#" },
                  { name: "Bags", href: "#" },
                  { name: "Sunglasses", href: "#" },
                  { name: "Hats", href: "#" },
                  { name: "Belts", href: "#" },
                ],
              },
              {
                id: "brands",
                name: "Brands",
                items: [
                  { name: "Full Nelson", href: "#" },
                  { name: "My Way", href: "#" },
                  { name: "Re-Arranged", href: "#" },
                  { name: "Counterfeit", href: "#" },
                  { name: "Significant Other", href: "#" },
                ],
              },
            ],
          },
          {
            id: "men",
            name: "Men",
            featured: [
              {
                name: "New Arrivals",
                href: "#",
                imageSrc:
                  "https://tailwindui.com/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg",
                imageAlt:
                  "Drawstring top with elastic loop closure and textured interior padding.",
              },
              {
                name: "Artwork Tees",
                href: "#",
                imageSrc:
                  "https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-06.jpg",
                imageAlt:
                  "Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.",
              },
            ],
            sections: [
              {
                id: "clothing",
                name: "Clothing",
                items: [
                  { name: "Tops", href: "#" },
                  { name: "Pants", href: "#" },
                  { name: "Sweaters", href: "#" },
                  { name: "T-Shirts", href: "#" },
                  { name: "Jackets", href: "#" },
                  { name: "Activewear", href: "#" },
                  { name: "Browse All", href: "#" },
                ],
              },
              {
                id: "accessories",
                name: "Accessories",
                items: [
                  { name: "Watches", href: "#" },
                  { name: "Wallets", href: "#" },
                  { name: "Bags", href: "#" },
                  { name: "Sunglasses", href: "#" },
                  { name: "Hats", href: "#" },
                  { name: "Belts", href: "#" },
                ],
              },
              {
                id: "brands",
                name: "Brands",
                items: [
                  { name: "Re-Arranged", href: "#" },
                  { name: "Counterfeit", href: "#" },
                  { name: "Full Nelson", href: "#" },
                  { name: "My Way", href: "#" },
                ],
              },
            ],
          },
        ],
        pages: [
          { name: "Company", href: "#" },
          { name: "Stores", href: "#" },
        ],
      },
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
            { value: "sweatshirts", label: "Sweatshirts" },
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
      mobileMenuOpen: false,
      mobileFiltersOpen: false,
      cart: [] as CartInterface[],
    };
  },
  async mounted() {
    const { data } = await axios.get("/cart");
    this.cart = data;
  },
};
</script>
