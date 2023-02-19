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
                        <li
                            v-for="breadcrumb in breadcrumbs"
                            :key="breadcrumb.id"
                        >
                            <div class="flex items-center">
                                <a
                                    :href="breadcrumb.href"
                                    class="mr-4 text-sm font-medium text-gray-900"
                                    >{{ breadcrumb.name }}</a
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
                                >New Arrivals</a
                            >
                        </li>
                    </ol>
                </nav>
            </div>

            <main class="mx-auto max-w-2xl px-4 lg:max-w-7xl lg:px-8">
                <div class="border-b border-gray-200 pt-24 pb-10">
                    <h1 class="text-4xl font-bold tracking-tight text-gray-900">
                        New Arrivals
                    </h1>
                    <p class="mt-4 text-base text-gray-500">
                        Checkout out the latest release of Basic Tees, new and
                        improved with four openings!
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
                            <span class="text-sm font-medium text-gray-700"
                                >Filters</span
                            >
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
                                        <legend
                                            class="block text-sm font-medium text-gray-900"
                                        >
                                            {{ section.name }}
                                        </legend>
                                        <div class="space-y-3 pt-6">
                                            <div
                                                v-for="(
                                                    option, optionIdx
                                                ) in section.options"
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
                                        :src="product.imageSrc"
                                        :alt="product.imageAlt"
                                        class="h-full w-full object-cover object-center sm:h-full sm:w-full"
                                    />
                                </div>
                                <div class="flex flex-1 flex-col space-y-2 p-4">
                                    <h3
                                        class="text-sm font-medium text-gray-900"
                                    >
                                        <a :href="product.href">
                                            <span
                                                aria-hidden="true"
                                                class="absolute inset-0"
                                            />
                                            {{ product.name }}
                                        </a>
                                    </h3>
                                    <p class="text-sm text-gray-500">
                                        {{ product.description }}
                                    </p>
                                    <div
                                        class="flex flex-1 flex-col justify-end"
                                    >
                                        <p class="text-sm italic text-gray-500">
                                            {{ product.options }}
                                        </p>
                                        <p
                                            class="text-base font-medium text-gray-900"
                                        >
                                            {{ product.price }}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>

            <footer
                aria-labelledby="footer-heading"
                class="border-t border-gray-200 bg-white"
            >
                <h2 id="footer-heading" class="sr-only">Footer</h2>
                <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div class="py-20">
                        <div
                            class="grid grid-cols-1 md:grid-flow-col md:auto-rows-min md:grid-cols-12 md:gap-x-8 md:gap-y-16"
                        >
                            <!-- Image section -->
                            <div
                                class="col-span-1 md:col-span-2 lg:col-start-1 lg:row-start-1"
                            >
                                <img
                                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                    alt=""
                                    class="h-8 w-auto"
                                />
                            </div>

                            <!-- Sitemap sections -->
                            <div
                                class="col-span-6 mt-10 grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-8 md:col-start-3 md:row-start-1 md:mt-0 lg:col-span-6 lg:col-start-2"
                            >
                                <div
                                    class="grid grid-cols-1 gap-y-12 sm:col-span-2 sm:grid-cols-2 sm:gap-x-8"
                                >
                                    <div>
                                        <h3
                                            class="text-sm font-medium text-gray-900"
                                        >
                                            Products
                                        </h3>
                                        <ul role="list" class="mt-6 space-y-6">
                                            <li
                                                v-for="item in footerNavigation.products"
                                                :key="item.name"
                                                class="text-sm"
                                            >
                                                <a
                                                    :href="item.href"
                                                    class="text-gray-500 hover:text-gray-600"
                                                    >{{ item.name }}</a
                                                >
                                            </li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h3
                                            class="text-sm font-medium text-gray-900"
                                        >
                                            Company
                                        </h3>
                                        <ul role="list" class="mt-6 space-y-6">
                                            <li
                                                v-for="item in footerNavigation.company"
                                                :key="item.name"
                                                class="text-sm"
                                            >
                                                <a
                                                    :href="item.href"
                                                    class="text-gray-500 hover:text-gray-600"
                                                    >{{ item.name }}</a
                                                >
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div>
                                    <h3
                                        class="text-sm font-medium text-gray-900"
                                    >
                                        Customer Service
                                    </h3>
                                    <ul role="list" class="mt-6 space-y-6">
                                        <li
                                            v-for="item in footerNavigation.customerService"
                                            :key="item.name"
                                            class="text-sm"
                                        >
                                            <a
                                                :href="item.href"
                                                class="text-gray-500 hover:text-gray-600"
                                                >{{ item.name }}</a
                                            >
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <!-- Newsletter section -->
                            <div
                                class="mt-12 md:col-span-8 md:col-start-3 md:row-start-2 md:mt-0 lg:col-span-4 lg:col-start-9 lg:row-start-1"
                            >
                                <h3 class="text-sm font-medium text-gray-900">
                                    Sign up for our newsletter
                                </h3>
                                <p class="mt-6 text-sm text-gray-500">
                                    The latest deals and savings, sent to your
                                    inbox weekly.
                                </p>
                                <form class="mt-2 flex sm:max-w-md">
                                    <label for="email-address" class="sr-only"
                                        >Email address</label
                                    >
                                    <input
                                        id="email-address"
                                        type="text"
                                        autocomplete="email"
                                        required="true"
                                        class="w-full min-w-0 appearance-none rounded-md border border-gray-300 bg-white py-2 px-4 text-base text-gray-900 placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                    />
                                    <div class="ml-4 flex-shrink-0">
                                        <button
                                            type="submit"
                                            class="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                        >
                                            Sign up
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div class="border-t border-gray-100 py-10 text-center">
                        <p class="text-sm text-gray-500">
                            &copy; 2021 Your Company, Inc. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    </div>
</template>

<script lang="ts">
import { PlusIcon } from "@heroicons/vue/20/solid";
import NavigationBar from "@/components/NavigationBar.vue";

export default {
    name: "CategoryView",
    components: {
        PlusIcon,
        NavigationBar,
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
            breadcrumbs: [{ id: 1, name: "Men", href: "#" }],
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
            products: [
                {
                    id: 1,
                    name: "Basic Tee 8-Pack",
                    href: "#",
                    price: "$256",
                    description:
                        "Get the full lineup of our Basic Tees. Have a fresh shirt all week, and an extra for laundry day.",
                    options: "8 colors",
                    imageSrc:
                        "https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-01.jpg",
                    imageAlt:
                        "Eight shirts arranged on table in black, olive, grey, blue, white, red, mustard, and green.",
                },
                {
                    id: 2,
                    name: "Basic Tee",
                    href: "#",
                    price: "$32",
                    description:
                        "Look like a visionary CEO and wear the same black t-shirt every day.",
                    options: "Black",
                    imageSrc:
                        "https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-02.jpg",
                    imageAlt: "Front of plain black t-shirt.",
                },
                // More products...
            ],
            footerNavigation: {
                products: [
                    { name: "Bags", href: "#" },
                    { name: "Tees", href: "#" },
                    { name: "Objects", href: "#" },
                    { name: "Home Goods", href: "#" },
                    { name: "Accessories", href: "#" },
                ],
                company: [
                    { name: "Who we are", href: "#" },
                    { name: "Sustainability", href: "#" },
                    { name: "Press", href: "#" },
                    { name: "Careers", href: "#" },
                    { name: "Terms & Conditions", href: "#" },
                    { name: "Privacy", href: "#" },
                ],
                customerService: [
                    { name: "Contact", href: "#" },
                    { name: "Shipping", href: "#" },
                    { name: "Returns", href: "#" },
                    { name: "Warranty", href: "#" },
                    { name: "Secure Payments", href: "#" },
                    { name: "FAQ", href: "#" },
                    { name: "Find a store", href: "#" },
                ],
            },
            mobileMenuOpen: false,
            mobileFiltersOpen: false,
        };
    },
};
</script>
