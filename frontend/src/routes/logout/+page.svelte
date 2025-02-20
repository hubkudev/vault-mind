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
				class="px-10 py-24 lg:py-8 flex flex-col items-center w-fit gap-8 shadow-lg min-h-screen lg:min-h-fit border-gray-400"
			>
				<p class="text-sm text-muted-foreground">
					Are you sure you want to log out?
				</p>

				<div class="flex gap-4 items-center">
					<Button variant="ghost" asChild>
						<a href={`${PUBLIC_SERVER_URL}/api/auth/logout`}
							>Yes, confirm logout</a
						>
					</Button>
					<Button>
						<a href="/vault"> Wait no, Take me back! </a>
					</Button>
				</div>
			</Card.Root>
		</div>
	</div>
</main>
