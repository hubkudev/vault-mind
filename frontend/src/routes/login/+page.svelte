<script>
	import { PUBLIC_SERVER_URL } from "$env/static/public";
	import { Button } from "$lib/components/ui/button/index";
	import * as Card from "$lib/components/ui/card";
</script>

<main class="w-full min-h-screen flex items-center">
	<div class="w-full min-h-screen">
		<!-- LOGIN CARDS -->
		<div class="flex min-h-screen items-center justify-center">
			<Card.Root
				class="px-10 py-24 lg:py-8 flex flex-col w-full lg:w-[400px] gap-8 shadow-lg min-h-screen lg:min-h-fit border-gray-400"
			>
				<div class="grid gap-1">
					<div class="flex items-center">
						<span class="font-semibold text-4xl font-[orbitron]"
							>VaultMind</span
						>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							class="size-10 -ml-4 text-amber-500"
							style="clip-path: inset(0 0 0 50%);"
						>
							<path
								fill-rule="evenodd"
								d="M11.828 2.25c-.916 0-1.699.663-1.85 1.567l-.091.549a.798.798 0 0 1-.517.608 7.45 7.45 0 0 0-.478.198.798.798 0 0 1-.796-.064l-.453-.324a1.875 1.875 0 0 0-2.416.2l-.243.243a1.875 1.875 0 0 0-.2 2.416l.324.453a.798.798 0 0 1 .064.796 7.448 7.448 0 0 0-.198.478.798.798 0 0 1-.608.517l-.55.092a1.875 1.875 0 0 0-1.566 1.849v.344c0 .916.663 1.699 1.567 1.85l.549.091c.281.047.508.25.608.517.06.162.127.321.198.478a.798.798 0 0 1-.064.796l-.324.453a1.875 1.875 0 0 0 .2 2.416l.243.243c.648.648 1.67.733 2.416.2l.453-.324a.798.798 0 0 1 .796-.064c.157.071.316.137.478.198.267.1.47.327.517.608l.092.55c.15.903.932 1.566 1.849 1.566h.344c.916 0 1.699-.663 1.85-1.567l.091-.549a.798.798 0 0 1 .517-.608 7.52 7.52 0 0 0 .478-.198.798.798 0 0 1 .796.064l.453.324a1.875 1.875 0 0 0 2.416-.2l.243-.243c.648-.648.733-1.67.2-2.416l-.324-.453a.798.798 0 0 1-.064-.796c.071-.157.137-.316.198-.478.1-.267.327-.47.608-.517l.55-.091a1.875 1.875 0 0 0 1.566-1.85v-.344c0-.916-.663-1.699-1.567-1.85l-.549-.091a.798.798 0 0 1-.608-.517 7.507 7.507 0 0 0-.198-.478.798.798 0 0 1 .064-.796l.324-.453a1.875 1.875 0 0 0-.2-2.416l-.243-.243a1.875 1.875 0 0 0-2.416-.2l-.453.324a.798.798 0 0 1-.796.064 7.462 7.462 0 0 0-.478-.198.798.798 0 0 1-.517-.608l-.091-.55a1.875 1.875 0 0 0-1.85-1.566h-.344ZM12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z"
								clip-rule="evenodd"
							/>
						</svg>
					</div>
					<p class="text-muted-foreground text-balance">
						Artificial Intelligence Powered Mind Vault
					</p>
				</div>
				<div class="grid gap-4">
					<a
						href={`${PUBLIC_SERVER_URL}/api/auth/google`}
						class="border-sm btn-ghost btn flex w-full items-center gap-2 border-black"
					>
						<Button
							class="font-semibold w-full flex gap-2 shadow-md"
						>
							<svg
								class="w-5 h-5 text-white dark:text-white"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								fill="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									fill-rule="evenodd"
									d="M12.037 21.998a10.313 10.313 0 0 1-7.168-3.049 9.888 9.888 0 0 1-2.868-7.118 9.947 9.947 0 0 1 3.064-6.949A10.37 10.37 0 0 1 12.212 2h.176a9.935 9.935 0 0 1 6.614 2.564L16.457 6.88a6.187 6.187 0 0 0-4.131-1.566 6.9 6.9 0 0 0-4.794 1.913 6.618 6.618 0 0 0-2.045 4.657 6.608 6.608 0 0 0 1.882 4.723 6.891 6.891 0 0 0 4.725 2.07h.143c1.41.072 2.8-.354 3.917-1.2a5.77 5.77 0 0 0 2.172-3.41l.043-.117H12.22v-3.41h9.678c.075.617.109 1.238.1 1.859-.099 5.741-4.017 9.6-9.746 9.6l-.215-.002Z"
									clip-rule="evenodd"
								/>
							</svg>

							Login with Google Account
						</Button>
					</a>
				</div>
				<div>
					<p class="text-sm text-muted-foreground">
						We provide a seamless login process with your favorite
						providers that automatically registers new users, i.e <strong
							>no password stored!</strong
						>
						<span>🥳🎉</span>
					</p>

					<div class="flex items-center mt-2">
						<p class="text-center text-sm text-muted-foreground">
							By login you agree with our
							<a href="/misc/pp.html" class="underline"
								>Privacy Policy</a
							>
							and
							<a href="/misc/tos.html" class="underline"
								>Terms of Service</a
							>
						</p>
					</div>
				</div>
			</Card.Root>
		</div>
	</div>
</main>
