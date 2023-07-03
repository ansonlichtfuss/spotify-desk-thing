import { router } from "../utils";
import actions from "./actions";
import auth from "./auth";
import metadata from "./metadata";

export const appRouter = router({
  actions,
  auth,
  metadata
});

export type IAppRouter = typeof appRouter;
