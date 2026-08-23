import { os } from "@orpc/server";
import * as z from "zod";

export const listPlanets = os.handler(async () => {
	// replace with your database query
	return [
		{ id: 1, name: "Earth" },
		{ id: 2, name: "Mars" },
	];
});

export const findPlanet = os
	.input(z.object({ id: z.number() }))
	.handler(async ({ input }) => {
		// replace with your database query
		return { id: input.id, name: "Earth" };
	});

export const createPlanet = os
	.input(z.object({ name: z.string(), description: z.string().optional() }))
	.handler(async ({ input }) => {
		// replace with your database insert
		return { id: 3, ...input };
	});

export const planet = {
	list: listPlanets,
	find: findPlanet,
	create: createPlanet,
};
