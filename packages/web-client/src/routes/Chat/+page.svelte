<script>
    import { onMount } from "svelte";
    import { io } from "socket.io-client";
    import { getUsers } from "../../services/users";
    import { sendMessage } from "../../services/messages";

    import { user } from "../../store/user";

    import { socketHost, socketPath } from "../../configs/configs";

    let message = "";

    function connectSocketServer() {
        const socket = io(socketHost, {
            path: socketPath,
            reconnectionDelayMax: 10000,
            query: {
                username: user.username,
            },
        });

        socket.on("message", (msgItem) => {
            if (msgItem.sender_username === user.username) {
                return;
            }

            // THIS IS FOR DEMO
            updateUsersList();

            messages = [...messages, msgItem];
        });
    }

    connectSocketServer();

    export let users = [];
    export let messages = [];
    export let selectedUserUsername = "";

    async function updateUsersList() {
        users = await getUsers();
    }

    onMount(async () => {
        await updateUsersList();
    });

    export function selectUser(username) {
        selectedUserUsername = username;
    }

    export async function onSend() {
        await sendMessage(message, user.username, selectedUserUsername);
        messages = [
            ...messages,
            {
                message,
                receiver_username: selectedUserUsername,
                sender_username: user.username,
                date: Date.now(),
            },
        ];
        message = "";
    }
</script>

<div>
    <h1>Hi {user.username}</h1>

    {#if selectedUserUsername}
        <p>Send message to: <b>{selectedUserUsername}</b></p>

        <input bind:value={message} />
        <button on:click={onSend}> Send </button>
    {:else}
        <p>Choose a user to send a message.</p>
    {/if}

    <div class="chat">
        <div class="users">
            {#each users as user}
                <div class="user" on:click={() => selectUser(user.username)}>
                    <div
                        class="availability-status {user.available
                            ? 'online'
                            : 'offline'}"
                    />
                    <p class="username">{user.username}</p>
                </div>
            {/each}
        </div>
        <div class="messages">
            {#each messages as mesageItem}
                <div class="message">
                    <p>
                        {new Date(mesageItem.date).toLocaleDateString("en-US")}
                    </p>
                    <b
                        >{mesageItem.sender_username}->{mesageItem.receiver_username}</b
                    >
                    <i>{mesageItem.message}</i>
                </div>
            {/each}
        </div>
    </div>
</div>

<style>
    .users {
        width: 100px;
    }

    .user {
        background: lightgray;
        padding: 5px;
        display: flex;
        align-items: center;
        border: 1px solid white;
        height: 20px;
        overflow: hidden;
    }

    .availability-status {
        width: 10px;
        height: 10px;
        border-radius: 5px;
        margin-right: 5px;
    }

    .online {
        background: lightgreen;
    }

    .offline {
        background: gray;
    }

    .chat {
        display: flex;
        widows: 600px;
    }

    .messages {
        width: 400px;
        background: lightgray;
        height: inherit;
    }

    .message {
        width: 100%;
        background: lightyellow;
        border: 1px white solid;
    }
</style>
