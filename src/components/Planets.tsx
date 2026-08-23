import { useQuery } from "@tanstack/solid-query";
import { orpc } from "../lib/orpc/client.ts";

export const Planets = () => {
	const planets = useQuery(() => orpc.planet.listPlanets.queryOptions());
	return <p>Planets: {JSON.stringify(planets.data)}</p>;
};
