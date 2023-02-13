<script lang="ts">
    import { Router, Route } from "svelte-routing";

    import Register from "./routes/Register/+page.svelte";
    import Chat from "./routes/Chat/+page.svelte";
    // import NotFound from './NotFound.svelte'

    export let url = "/";
</script>

<main>
    <Router {url}>
        <Route path="/">
            <Register />
        </Route>

        <Route path="chat">
            <Chat />
        </Route>
    </Router>
</main>
