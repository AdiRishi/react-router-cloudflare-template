import { Welcome } from "~/pages/welcome/welcome";
import { Route } from "./+types/home";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
};

export function loader({ context }: Route.LoaderArgs) {
  return { message: "hello" };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return <Welcome message={loaderData.message} />;
}
