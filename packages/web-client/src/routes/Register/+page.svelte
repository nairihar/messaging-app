<script>
    import { navigate } from "svelte-routing";
    import { apiHost } from "../../configs/configs";
    import { user } from "../../store/user";

    let userNameValue = "";
    let registerDisabled = false;

    async function register() {
        registerDisabled = true;

        const url = `${apiHost}/users/register`;

        try {
            const res = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: userNameValue,
                }),
            });

            const data = await res.json();

            if (res.status !== 201) {
                return alert(data.message);
            }

            user.username = userNameValue;
            userNameValue = "";

            navigate("chat");
        } catch (err) {
            alert("Something wrong!");
        } finally {
            registerDisabled = false;
        }
    }
</script>

<h1>Register a user in Messaging-app</h1>

<p>Please enter your username.</p>

<input bind:value={userNameValue} />

<button on:click={register} disabled={registerDisabled}> Register </button>
