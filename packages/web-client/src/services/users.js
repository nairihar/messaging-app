import { user } from "../store/user";
import { apiHost } from "../configs/configs";

export async function getUsers() {
    const url = `${apiHost}/users`;

    try {
        const res = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "performer-username": user.username,
            },
        });

        if (res.status !== 200) {
            return [];
        }

        return await res.json();
    } catch (err) {
        console.log(err);
        return [];
    }
}
