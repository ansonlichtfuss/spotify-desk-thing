import { QueryClient } from "@tanstack/solid-query";
import type { IAppRouter } from "../server/trpc/router/_app";
import { createTRPCSolid } from "solid-trpc";
import { httpBatchLink } from "@trpc/client";

export const trpc = createTRPCSolid<IAppRouter>();

export const queryClient = new QueryClient();