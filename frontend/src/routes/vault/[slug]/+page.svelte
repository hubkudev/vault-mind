<script lang="ts">
	import snarkdown from "snarkdown";
	import DOMPurify from "dompurify";
	import * as Card from "$lib/components/ui/card/index.js";
	import type { PageProps } from "../$types";
	import type { UserProfile } from "../../../types/user";
	import type { IKnowledge, IVault } from "../../../types/vault";
	import { PUBLIC_SERVER_URL } from "$env/static/public";
	import VaultDetailNavbar from "../../../components/navbar/VaultDetailNavbar.svelte";
	import { onMount } from "svelte";
	import Button from "$lib/components/ui/button/button.svelte";
	import * as Dialog from "$lib/components/ui/dialog/index.js";
	import { Input } from "$lib/components/ui/input";

	let { data }: PageProps = $props();
	const user: UserProfile = data.user;
	const vault: IVault = data.vault;
	let knowledges: IKnowledge[] = $state<IKnowledge[]>([]);

	let typeInput = $state("text");
	let contentInput = $state("");
	let fileInput = $state("");
	let errorOutput = $state("");
	let dialogOpen = $state(false);

	onMount(async () => {
		try {
			const req = await fetch(`${PUBLIC_SERVER_URL}/api/knowledge/all`, {
				method: "POST",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					vaultId: data.slug,
				}),
			});

			const res = await req.json();
			if (res.data && res.data.length) {
				knowledges = res.data;
			}
		} catch (error) {}
	});

	async function onVaultSubmit() {
		errorOutput = "";

		try {
			const req = await fetch(
				`${PUBLIC_SERVER_URL}/api/knowledge/create`,
				{
					method: "POST",
					credentials: "include",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						vaultId: data.slug,
						type: typeInput,
						content: contentInput,
						file: fileInput,
					}),
				},
			);

			const res = await req.json();
			if (res.error) return (errorOutput = `${res.error}`);

			knowledges.push(res.data);
			dialogOpen = false;
		} catch (error: any) {
			errorOutput = `Error: ${error.message}`;
		}
	}

	let chatInput = $state("");
	let chatHistories = $state<
		{
			message: string;
			html: string;
			isUser: boolean;
		}[]
	>([]);

	async function handleChatSubmit() {
		if (!chatInput) return;
		const chatQuery = chatInput;
		chatInput = "";

		chatHistories.push({
			message: chatQuery,
			html: "",
			isUser: true,
		});

		try {
			const req = await fetch(`${PUBLIC_SERVER_URL}/api/chat`, {
				method: "POST",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					vaultId: data.slug,
					query: chatQuery,
				}),
			});

			const res = await req.json();
			if (res.error) return (errorOutput = `${res.error}`);
			if (res.data) {
				const parsed = DOMPurify.sanitize(snarkdown(res.data));

				chatHistories.push({
					message: res.data,
					html: parsed,
					isUser: false,
				});
			}
		} catch (error) {}
	}
</script>

<VaultDetailNavbar
	{user}
	{vault}
	bind:typeInput
	bind:contentInput
	bind:fileInput
	bind:dialogOpen
	{onVaultSubmit}
	{errorOutput}
/>

<div class="min-h-screen relative" id="draggable-canvas">
	<main
		class="max-h-screen overflow-x-hidden px-12 py-10 flex flex-wrap gap-6"
	>
		{#each knowledges as item}
			<div id={item.id.toString()} class="w-fit h-fit">
				<Card.Root class="shadow border-gray-400">
					<Card.Header>
						<Card.Description
							class="text-black whitespace-pre-wrap"
						>
							<div>{item.content}</div></Card.Description
						>
					</Card.Header>
					<Card.Content>
						<hr class="mb-4" />
						<p class="text-xs text-muted-foreground">
							CreatedAt: {new Date(item.createdAt).toDateString()}
						</p>
					</Card.Content>
				</Card.Root>
			</div>
		{/each}
	</main>

	<div class="w-fit fixed bottom-10 left-0 right-0 m-auto">
		<Dialog.Root>
			<Dialog.Trigger>
				<Button
					class="border-black rounded-full px-8"
					variant="outline"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="currentColor"
						class="size-6 text-amber-600"
					>
						<path
							fill-rule="evenodd"
							d="M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813A3.75 3.75 0 0 0 7.466 7.89l.813-2.846A.75.75 0 0 1 9 4.5ZM18 1.5a.75.75 0 0 1 .728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 0 1 0 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 0 1-1.456 0l-.258-1.036a2.625 2.625 0 0 0-1.91-1.91l-1.036-.258a.75.75 0 0 1 0-1.456l1.036-.258a2.625 2.625 0 0 0 1.91-1.91l.258-1.036A.75.75 0 0 1 18 1.5ZM16.5 15a.75.75 0 0 1 .712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 0 1 0 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 0 1-1.422 0l-.395-1.183a1.5 1.5 0 0 0-.948-.948l-1.183-.395a.75.75 0 0 1 0-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0 1 16.5 15Z"
							clip-rule="evenodd"
						/>
					</svg>

					<span>|</span>
					<p>Chat with Your AI Agent</p>
				</Button>
			</Dialog.Trigger>
			<Dialog.Content class="min-w-[55vw]">
				<Dialog.Header>
					<Dialog.Title>AI Agent</Dialog.Title>
				</Dialog.Header>

				<div class="min-h-[70vh] max-h-[75vh] overflow-y-auto">
					{#each chatHistories as item}
						<div
							class={`flex w-full px-6 mb-4 ${item.isUser ? "justify-end" : "justify-start"}`}
						>
							{#if item.isUser}
								<div
									class="max-w-[80%] font-inherit p-3 rounded-lg overflow-x-auto whitespace-pre-wrap bg-blue-500 text-white text-sm rounded-br-none"
								>
									{item.message}
								</div>
							{:else}
								<div
									class="max-w-[80%] font-inherit p-3 rounded-lg overflow-x-auto whitespace-pre-wrap bg-gray-200 dark:bg-gray-600 text-sm text-gray-900 dark:text-white rounded-bl-none"
								>
									{@html item.html}
								</div>
							{/if}
						</div>
					{/each}
				</div>

				<div class="flex items-center gap-2">
					<Input
						class="rounded-full"
						bind:value={chatInput}
						onkeydown={(e) => {
							if (e.key === "Enter") {
								handleChatSubmit();
							}
						}}
					/>
					<Button
						class="rounded-full px-4"
						size="icon"
						onclick={handleChatSubmit}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							class="size-6"
						>
							<path
								d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z"
							/>
						</svg>
					</Button>
				</div>
			</Dialog.Content>
		</Dialog.Root>
	</div>
</div>
