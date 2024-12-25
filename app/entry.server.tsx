import { isbot } from "isbot";
import { renderToReadableStream } from "react-dom/server";
import type { AppLoadContext, EntryContext } from "react-router";
import { ServerRouter } from "react-router";

// Reject all pending promises from handler functions after 10 seconds
export const streamTimeout = 10000;

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  routerContext: EntryContext,
  // This parameter is kept in the template for visibility, feel free to remove it if you don't need it
  loadContext: AppLoadContext,
) {
  let shellRendered = false;
  let userAgent = request.headers.get("user-agent");

  const controller = new AbortController();
  const abortTimeout = setTimeout(() => {
    controller.abort();
  }, streamTimeout);

  const stream = await renderToReadableStream(<ServerRouter context={routerContext} url={request.url} />, {
    signal: controller.signal,
    onError(error, errorInfo) {
      responseStatusCode = 500;
      // Log streaming rendering errors from inside the shell.  Don't log
      // errors encountered during initial shell rendering since they'll
      // reject and get logged in handleDocumentRequest.
      if (shellRendered) {
        console.error(error, errorInfo);
      }
    },
  });
  shellRendered = true;

  stream.allReady.then(() => clearTimeout(abortTimeout));

  // Ensure requests from bots and SPA Mode renders wait for all content to load before responding
  // https://react.dev/reference/react-dom/server/renderToPipeableStream#waiting-for-all-content-to-load-for-crawlers-and-static-generation
  if ((userAgent && isbot(userAgent)) || routerContext.isSpaMode) {
    await stream.allReady;
  }

  responseHeaders.set("Content-Type", "text/html");
  return new Response(stream, {
    headers: responseHeaders,
    status: responseStatusCode,
  });
}
