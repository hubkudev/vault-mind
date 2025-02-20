<script lang="ts">
    import Menu from "../menu/Menu.svelte";
    import * as Avatar from "$lib/components/ui/avatar/index.js";
    import * as Dialog from "$lib/components/ui/dialog/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
    import { Button } from "$lib/components/ui/button";
    import { Textarea } from "$lib/components/ui/textarea";
    import type { UserProfile } from "../../types/user";
    import CircleAlert from "lucide-svelte/icons/circle-alert";
    import * as Alert from "$lib/components/ui/alert/index.js";

    interface Props {
        user: UserProfile;
        nameInput: string;
        descInput: string;
        errorOutput: string;
        dialogOpen: boolean;
        onVaultSubmit: () => void;
    }

    let {
        user,
        nameInput = $bindable<string>(),
        descInput = $bindable<string>(),
        errorOutput = $bindable<string>(),
        dialogOpen = $bindable<boolean>(),
        onVaultSubmit,
    }: Props = $props();
</script>

<nav class="w-full flex items-center justify-between px-12 py-2 shadow">
    <div class="flex items-center">
        <span class="font-semibold text-2xl font-[orbitron]">VaultMind</span>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="size-7 -ml-3 text-amber-500"
            style="clip-path: inset(0 0 0 50%);"
        >
            <path
                fill-rule="evenodd"
                d="M11.828 2.25c-.916 0-1.699.663-1.85 1.567l-.091.549a.798.798 0 0 1-.517.608 7.45 7.45 0 0 0-.478.198.798.798 0 0 1-.796-.064l-.453-.324a1.875 1.875 0 0 0-2.416.2l-.243.243a1.875 1.875 0 0 0-.2 2.416l.324.453a.798.798 0 0 1 .064.796 7.448 7.448 0 0 0-.198.478.798.798 0 0 1-.608.517l-.55.092a1.875 1.875 0 0 0-1.566 1.849v.344c0 .916.663 1.699 1.567 1.85l.549.091c.281.047.508.25.608.517.06.162.127.321.198.478a.798.798 0 0 1-.064.796l-.324.453a1.875 1.875 0 0 0 .2 2.416l.243.243c.648.648 1.67.733 2.416.2l.453-.324a.798.798 0 0 1 .796-.064c.157.071.316.137.478.198.267.1.47.327.517.608l.092.55c.15.903.932 1.566 1.849 1.566h.344c.916 0 1.699-.663 1.85-1.567l.091-.549a.798.798 0 0 1 .517-.608 7.52 7.52 0 0 0 .478-.198.798.798 0 0 1 .796.064l.453.324a1.875 1.875 0 0 0 2.416-.2l.243-.243c.648-.648.733-1.67.2-2.416l-.324-.453a.798.798 0 0 1-.064-.796c.071-.157.137-.316.198-.478.1-.267.327-.47.608-.517l.55-.091a1.875 1.875 0 0 0 1.566-1.85v-.344c0-.916-.663-1.699-1.567-1.85l-.549-.091a.798.798 0 0 1-.608-.517 7.507 7.507 0 0 0-.198-.478.798.798 0 0 1 .064-.796l.324-.453a1.875 1.875 0 0 0-.2-2.416l-.243-.243a1.875 1.875 0 0 0-2.416-.2l-.453.324a.798.798 0 0 1-.796.064 7.462 7.462 0 0 0-.478-.198.798.798 0 0 1-.517-.608l-.091-.55a1.875 1.875 0 0 0-1.85-1.566h-.344ZM12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z"
                clip-rule="evenodd"
            />
        </svg>
    </div>

    <div class="flex items-center gap-6">
        <div>
            <Dialog.Root bind:open={dialogOpen}>
                <Dialog.Trigger>
                    <Button>Create Vault</Button>
                </Dialog.Trigger>
                <Dialog.Content>
                    <Dialog.Header>
                        <Dialog.Title>Create New Vault</Dialog.Title>
                        <Dialog.Description>
                            Your mind deserves a place where you can put piece
                            by piece.
                        </Dialog.Description>
                    </Dialog.Header>
                    <div class="grid gap-4 py-4">
                        <div class="grid grid-cols-4 items-center gap-4">
                            <Label for="name" class="text-right">Name*</Label>
                            <Input
                                id="name"
                                class="col-span-3"
                                bind:value={nameInput}
                            />
                        </div>
                        <div class="grid grid-cols-4 items-center gap-4">
                            <Label for="description" class="text-right"
                                >Description</Label
                            >
                            <Textarea
                                class="col-span-3"
                                bind:value={descInput}
                            />
                        </div>
                    </div>
                    {#if errorOutput}
                        <div class="pl-2 mb-6">
                            <Alert.Root variant="destructive">
                                <CircleAlert class="h-4 w-4" />
                                <Alert.Title>{errorOutput}</Alert.Title>
                            </Alert.Root>
                        </div>
                    {/if}
                    <Dialog.Footer>
                        <Button onclick={onVaultSubmit}>Save Vault</Button>
                    </Dialog.Footer>
                </Dialog.Content>
            </Dialog.Root>
        </div>

        <!-- Navigation Links -->
        <Menu>
            <Avatar.Root>
                <Avatar.Image src={user.profilePicture} alt={user.username} />
                <Avatar.Fallback>{user.username[0]}</Avatar.Fallback>
            </Avatar.Root>
        </Menu>
    </div>
</nav>
