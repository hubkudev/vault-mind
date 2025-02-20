import { PUBLIC_SERVER_URL } from "$env/static/public";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import type { UserProfile } from "../../types/user";

export const load: PageServerLoad = async ({ fetch, cookies }) => {
	const session_id = cookies.get("connect.sid");

	try {
		// If there is no session cookies - or expired cookies,
		// immediately return user as null, do not proceed further.
		// This way we can save bandwith for the server.
		if (!session_id) throw Error();

		const [userReq, vaultReq] = await Promise.allSettled([
			fetch(`${PUBLIC_SERVER_URL}/api/user/profile`),
			fetch(`${PUBLIC_SERVER_URL}/api/vault/all`),
		]);

		// if request status is not 200 (OK)
		// throw error, the catched error then redirect
		// user to auth page
		if (userReq.status === "rejected" || !userReq.value.ok) throw Error();

		const res = await userReq.value.json();
		if (!res) throw Error();
		const userProfile: UserProfile = res;

		if (vaultReq.status === "rejected")
			return {
				user: userProfile,
				vaults: [],
				error: true
			};

		// convert to JSON
		const { data } = await vaultReq.value.json();

		return {
			user: userProfile,
			vaults: data,
			error: false,
		};
	} catch (error) {
		redirect(307, "/login");
	}
}

