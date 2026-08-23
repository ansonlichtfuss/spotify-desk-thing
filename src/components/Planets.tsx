import { useQuery } from "@tanstack/solid-query";
import { orpc } from "../lib/orpc/client.ts";

export const Planets = () => {
	// const planets = createMemo(async () => {
	// 	const res = await orpc.planet.list();
	// 	console.log("hey tiff res", res);
	// 	return res;
	// });

	const planets = useQuery(() => orpc.planet.list.queryOptions());
	return <p>Planets: {JSON.stringify(planets.data)}</p>;
};
