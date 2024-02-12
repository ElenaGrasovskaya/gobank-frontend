<script>
	import '../app.css';
	import { page } from '$app/stores';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<body class="flex flex-col min-h-screen bg-indigo-100">
	<Header />
	<main class="bg-indigo-100"><div class="container px-6 py-8 mx-auto"><slot /></div></main>

	<Footer />
</body>


