import * as z from "zod";
import { base } from "../handler";

export const listPlanets = base.handler(async () => {
	// replace with your database query
	return [
		{ id: 1, name: "Earth" },
		{ id: 2, name: "Mars" },
	];
});

export const findPlanet = base
	.input(z.object({ id: z.number() }))
	.handler(async ({ input }) => {
		// replace with your database query
		return { id: input.id, name: "Earth" };
	});

export const createPlanet = base
	.input(z.object({ name: z.string(), description: z.string().optional() }))
	.handler(async ({ input }) => {
		// replace with your database insert
		return { id: 3, ...input };
	});
