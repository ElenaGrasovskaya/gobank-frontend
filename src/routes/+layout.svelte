<script>
  import "../app.css";
  import { page } from '$app/stores';
</script>

<body class="flex flex-col min-h-screen bg-indigo-100">
  <header
    class="w-full text-gray-700 bg-white border-t border-gray-100 shadow-sm body-font"
  >
    <div
      class="container flex flex-col flex-wrap items-center p-5 mx-auto md:flex-row"
    >
      <nav class="flex flex-wrap items-center text-base lg:w-2/5 md:ml-auto">
        <a href="/" class="px-4 py-2 text-xs font-bold  text-gray-900 uppercase mr-5 hover:bg-blue-300 transition-all rounded" class:active={$page.url.pathname === '/'}>Home</a>
        <a href="/clients" class="px-4 py-2 text-xs font-bold  text-gray-900 uppercase mr-5 hover:bg-blue-300 transition-all rounded" class:active={$page.url.pathname === '/clients'}>Clients</a>
        <a href="/invoices" class="px-4 py-2 text-xs font-bold  text-gray-900 uppercase mr-5 hover:bg-blue-300 transition-all rounded" class:active={$page.url.pathname === '/invoices'}>Invoices</a>
      </nav>
      <a
        class="flex items-center sansSerif order-first mb-4 font-medium text-gray-900 text-lg lg:order-none lg:w-1/5 title-font lg:items-center lg:justify-center md:mb-0"
        href ="/"
      > GoBank
        
      </a>
      <div
        class="inline-flex items-center h-full ml-5 lg:w-2/5 lg:justify-end lg:ml-0"
      >
        <a href="/login" class="mr-5 px-4 py-2 text-xs font-bold text-gray-900 uppercase  hover:bg-blue-300 transition-all rounded" class:active={$page.url.pathname === '/login'}>Login</a>
        <a
          href="/signup"
          class="px-4 py-2 text-xs font-bold  text-gray-900 uppercase transition-all duration-150 focus:outline-none hover:bg-blue-300 rounded"
          class:active={$page.url.pathname === '/signup'}
        >
          Sign Up
        </a>
      </div>
    </div>
  </header>
  <main class = "bg-indigo-100"><div class="container px-6 py-8 mx-auto"><slot></slot></div></main>

  <footer class="bg-indigo-100 dark:bg-gray-900 mt-auto">
    <div class="container px-6 py-8 mx-auto">
      <div class="flex flex-col items-center text-center">
        <a href="/" class="text-gray-100 sansSerif">
          GoBank
        </a>

        <p class="max-w-md mx-auto mt-4 text-gray-500 dark:text-gray-400">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>

        <div
          class="flex flex-col mt-4 sm:flex-row sm:items-center sm:justify-center"
        >
          <button
            class="flex items-center justify-center order-1 w-full px-2 py-2 mt-3 text-sm tracking-wide text-gray-600 capitalize transition-colors duration-300 transform border rounded-md sm:mx-2 dark:border-gray-400 dark:text-gray-300 sm:mt-0 sm:w-auto hover:bg-gray-50 focus:outline-none focus:ring dark:hover:bg-gray-800 focus:ring-gray-300 focus:ring-opacity-40"
          >
            <svg
              class="w-5 h-5 mx-1"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C21.9939 17.5203 17.5203 21.9939 12 22ZM4 12.172C4.04732 16.5732 7.64111 20.1095 12.0425 20.086C16.444 20.0622 19.9995 16.4875 19.9995 12.086C19.9995 7.68451 16.444 4.10977 12.0425 4.086C7.64111 4.06246 4.04732 7.59876 4 12V12.172ZM10 16.5V7.5L16 12L10 16.5Z"
                fill="currentColor"
              ></path>
            </svg>

            <span class="mx-1">View Demo</span>
          </button>

          <button
            class="w-full px-5 py-2 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-teal-500 rounded-md sm:mx-2 sm:order-2 sm:w-auto hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
            >Get started</button
          >
        </div>
      </div>

      <hr class="my-10 border-gray-200 dark:border-gray-700" />

      <div class="flex flex-col items-center sm:flex-row sm:justify-between">
        <p class="text-sm text-gray-500">
          © Copyright 2024. All Rights Reserved.
        </p>

        <div class="flex mt-3 -mx-2 sm:mt-0">
          <a
            href="#"
            class="mx-2 text-sm text-gray-500 transition-colors duration-300 hover:text-gray-500 dark:hover:text-gray-300"
            aria-label="Reddit"
          >
            Teams
          </a>

          <a
            href="#"
            class="mx-2 text-sm text-gray-500 transition-colors duration-300 hover:text-gray-500 dark:hover:text-gray-300"
            aria-label="Reddit"
          >
            Privacy
          </a>

          <a
            href="#"
            class="mx-2 text-sm text-gray-500 transition-colors duration-300 hover:text-gray-500 dark:hover:text-gray-300"
            aria-label="Reddit"
          >
            Cookies
          </a>
        </div>
      </div>
    </div>
  </footer>
</body>


<style lang="postcss">
a.active {
  @apply px-4 py-2 text-xs font-bold text-white uppercase bg-teal-400 rounded shadow outline-none hover:shadow-md focus:outline-none;

}

a.active:hover {
  --tw-bg-opacity: 1;
    background-color: rgb(147 197 253 / var(--tw-bg-opacity));
}
</style>

