/** @type {import("prettier").Config} */
export default {
  plugins: ["@trivago/prettier-plugin-sort-imports", "prettier-plugin-tailwindcss"],
  importOrder: ["<THIRD_PARTY_MODULES>", "^[./]"],
  tailwindFunctions: ["clsx", "cn", "cva"],
};
