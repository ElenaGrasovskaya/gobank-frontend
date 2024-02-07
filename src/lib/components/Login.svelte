<script lang="ts">
	import { useForm, Hint, HintGroup, validators, required, email } from 'svelte-use-form';
	import { goto } from '$app/navigation';
	import { writable } from 'svelte/store';

	export const account_email = writable('');

	const form = useForm();

	const requiredMessage = 'This field is required';

	let userData = {
		email: '',
		password: ''
	};
	async function loginUser() {
		try {
			console.log('Starting login');
			const response = await fetch('https://gobank-api.onrender.com/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(userData),
				credentials: 'include'
			});

			if (!response.ok) {
				throw new Error(`Error: ${response.statusText}`);
			}

			const result = await response.json();
			console.log(result);
			goto('/expenses');
			$account_email = userData.email;
		} catch (error) {
			console.error('Error logging user:', error);
		}
	}
</script>

<div class="bg-indigo-100 flex justify-center">
	<div class="lg:w-2/5 md:w-1/2 w-2/3">
		<form
			class="bg-white p-10 rounded-lg shadow-lg min-w-full"
			action="/login"
			on:submit|preventDefault={loginUser}
			use:form
			method="POST"
		>
			<h1 class="text-center text-2xl mb-6 text-gray-600 font-bold font-sans">
				Sign in to your account
			</h1>

			<div>
				<label class="text-gray-800 font-semibold block my-3 text-md" for="email">Email</label>
				<input
					class="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
					type="text"
					name="email"
					id="email"
					placeholder="@email"
					required
					bind:value={userData.email}
					use:validators={[required, email]}
				/>
				<HintGroup for="email">
					<Hint on="required">{requiredMessage}</Hint>
					<Hint on="email" hideWhenRequired>This must be a valid email</Hint>
				</HintGroup>
			</div>
			<div>
				<label class="text-gray-800 font-semibold block my-3 text-md" for="password">Password</label
				>
				<input
					class="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
					type="text"
					name="password"
					id="password"
					placeholder="password"
					required
					bind:value={userData.password}
					use:validators={[required]}
				/>
				<HintGroup for="password">
					<Hint on="required">{requiredMessage}</Hint>
				</HintGroup>
			</div>

			<button
				type="submit"
				class="w-full mt-6 bg-teal-500 rounded-lg px-4 py-2 text-lg text-white tracking-wide font-semibold font-sans"
				on:click|preventDefault={loginUser}>Login</button
			>
		</form>
	</div>
</div>
