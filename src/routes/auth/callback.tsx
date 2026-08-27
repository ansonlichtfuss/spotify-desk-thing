import { createFileRoute } from "@tanstack/solid-router";
import { z } from "zod";
import { FinishingAuthentication } from "../../components/auth/FinishingAuthentication";

const searchSchema = z.object({
	code: z.string().default(""),
});

export const Route = createFileRoute("/auth/callback")({
	component: AuthCallback,
	validateSearch: searchSchema,
});

function AuthCallback() {
	return <FinishingAuthentication />;
}
