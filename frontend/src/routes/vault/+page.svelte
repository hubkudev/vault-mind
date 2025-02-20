<script lang="ts">
	import Navbar from "../../components/navbar/Navbar.svelte";
	import * as Card from "$lib/components/ui/card/index.js";
	import type { PageProps } from "../$types";
	import type { UserProfile } from "../../types/user";
	import type { Vault } from "../../types/vault";
	import { PUBLIC_SERVER_URL } from "$env/static/public";

	let { data }: PageProps = $props();
	const user: UserProfile = data.user;
	const vaults: Vault[] = $state<Vault[]>(data.vaults);

	let nameInput = $state("");
	let descInput = $state("");
	let errorOutput = $state("");
	let dialogOpen = $state(false);

	async function onVaultSubmit() {
		errorOutput = "";
		if (!nameInput) {
			return (errorOutput = "Error: name is required");
		}

		try {
			const req = await fetch(`${PUBLIC_SERVER_URL}/api/vault/create`, {
				method: "POST",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name: nameInput,
					desc: descInput,
				}),
			});

			const res = await req.json();
			if (res.error) return (errorOutput = `${res.error}`);

			vaults.push(res.data);
			dialogOpen = false;
		} catch (error: any) {
			errorOutput = `Error: ${error.message}`;
		}
	}
</script>

<Navbar
	{user}
	bind:nameInput
	bind:descInput
	bind:dialogOpen
	{onVaultSubmit}
	{errorOutput}
/>

<div class="min-h-screen" id="draggable-canvas">
	<main
		class="max-h-screen overflow-x-hidden px-12 py-10 flex flex-wrap gap-6"
	>
		{#each vaults as item}
			<a
				href={`/vault/${item.id}`}
				id={item.id.toString()}
				class="w-fit h-fit"
			>
				<Card.Root class="shadow border-gray-400">
					<Card.Header>
						<Card.Title>{item.name}</Card.Title>
						<Card.Description>{item.desc}</Card.Description>
					</Card.Header>
					<Card.Content>
						<p class="text-xs">
							Vault Created At: {new Date(
								item.created_at,
							).toUTCString()}
						</p>
					</Card.Content>
				</Card.Root>
			</a>
		{/each}
	</main>
</div>
