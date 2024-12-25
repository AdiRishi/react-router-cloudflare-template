import { PlatformProxy } from "wrangler";

export interface Env {
  VALUE_FROM_CLOUDFLARE: "Hello from Cloudflare";
}

type GetLoadContextArgs = {
  request: Request;
  context: {
    cloudflare: Omit<PlatformProxy<Env>, "dispose" | "caches"> & {
      caches:
        | PlatformProxy<Env, IncomingRequestCfProperties>["caches"]
        | CacheStorage;
    };
  };
};

declare module "react-router" {
  interface AppLoadContext extends ReturnType<typeof getLoadContext> {
    // This will merge the result of `getLoadContext` into the `AppLoadContext`
  }
}

export const getLoadContext = ({ context }: GetLoadContextArgs) => {
  return context;
};
