<script>
	import {
		useForm,
		Hint,
		HintGroup,
		validators,
		required,
		minLength,
		email
	} from 'svelte-use-form';
	import { passwordMatch, containNumbers } from './customValidators';
	const form = useForm();

	const requiredMessage = 'This field is required';

	let first_name = '';
	let last_name = '';
	let password = '';
	let email_form = '';

	let userData = {
		first_name: first_name,
		last_name: last_name,
		password: password,
		email: email_form
	};

	async function registerUser() {
		try {
			console.log('Starting register with ', userData);
			const response = await fetch('https://gobank-api.onrender.com/register', {
				method: 'POST', // Specify the method
				headers: {
					'Content-Type': 'application/json' // Specify the content type
				},
				body: JSON.stringify(userData) // Convert the JavaScript object to a JSON string
			});

			if (!response.ok) {
				// If the server response is not ok, throw an error
				throw new Error(`Error: ${response.statusText}`);
			}

			const result = await response.json(); // Assuming the server responds with JSON
			console.log(result); // Handle the response data as needed
		} catch (error) {
			console.error('Error registering user:', error);
		}
	}
</script>

<div class="bg-indigo-100 flex justify-center">
	<div class="lg:w-2/5 md:w-1/2 w-2/3">
		<form
			class="bg-white p-10 rounded-lg shadow-lg min-w-full"
			use:form
			method="POST"
			action="/register"
			on:submit|preventDefault={registerUser}
		>
			<h1 class="text-center text-2xl mb-6 text-gray-600 font-bold font-sans">
				Register new account
			</h1>
			<div>
				<label class="text-gray-800 font-semibold block my-3 text-md" for="username"
					>First Name</label
				>
				<input
					class="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
					type="text"
					name="firts_name"
					id="first_name"
					placeholder="First name"
					bind:value={userData.first_name}
				/>
			</div>

			<div>
				<label class="text-gray-800 font-semibold block my-3 text-md" for="username"
					>Last Name</label
				>
				<input
					class="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
					type="text"
					name="last_name"
					id="last_name"
					placeholder="Last name"
					bind:value={userData.last_name}
				/>
			</div>
			<div>
				<label class="text-gray-800 font-semibold block my-3 text-md" for="email">Email</label>
				<input
					class="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
					type="text"
					name="email"
					id="email"
					placeholder="@email"
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
					type="password"
					use:validators={[required, minLength(5), containNumbers(2)]}
					class="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
					name="password"
					id="password"
					placeholder="password"
					required
					bind:value={userData.password}
					use:validators={[required, minLength(5), containNumbers(2)]}
				/>
				<HintGroup for="password">
					<Hint on="required">{requiredMessage}</Hint>
					<Hint on="minLength" hideWhenRequired let:value
						>This field must have at least {value} characters.</Hint
					>
					<Hint on="containNumbers" hideWhen="minLength" let:value>
						This field must contain at least {value} numbers.
					</Hint>
				</HintGroup>
			</div>
			<div>
				<label class="text-gray-800 font-semibold block my-3 text-md" for="confirm"
					>Confirm password</label
				>
				<input
					type="password"
					name="passwordConfirmation"
					use:validators={[required, passwordMatch]}
					class="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
					id="confirm"
					placeholder="confirm password"
					required
				/>
				<HintGroup for="passwordConfirmation">
					<Hint on="required">{requiredMessage}</Hint>
					<Hint on="passwordMatch" hideWhenRequired>Passwords do not match</Hint>
				</HintGroup>
			</div>

			<button
				disabled={!$form.valid}
				on:click|preventDefault={registerUser}
				type="submit"
				class="w-full mt-6 bg-teal-500 rounded-lg px-4 py-2 text-lg text-white tracking-wide font-semibold font-sans"
				>Register</button
			>
		</form>
	</div>
</div>
