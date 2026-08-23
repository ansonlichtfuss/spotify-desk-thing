import { os } from "@orpc/server";
import type {
	RequestHeadersHandlerPluginContext,
	ResponseHeadersHandlerPluginContext,
} from "@orpc/server/plugins";

interface ServerContext
	extends RequestHeadersHandlerPluginContext,
		ResponseHeadersHandlerPluginContext {}

export const base = os.$context<ServerContext>();
