export default {
  scripts: {
    export: {
      cmd: "deno run --allow-net --allow-write mod.ts",
      desc: "Runs the scraper to create the apps.json",
    },
    lint: "deno lint",
    format: "deno fmt",
  },
};
