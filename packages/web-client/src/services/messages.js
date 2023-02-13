import { apiHost } from "../configs/configs";

export async function sendMessage(message, sender_username, receiver_username) {
    if (!message.trim()) {
        return true;
    }

    const url = `${apiHost}/messages/users/${receiver_username}`;

    try {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "performer-username": sender_username,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                message,
            }),
        });

        if (res.status !== 200) {
            return false;
        }

        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}
