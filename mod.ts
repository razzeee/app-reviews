import axiod from "https://deno.land/x/axiod/mod.ts";
import * as log from "https://deno.land/std@0.104.0/log/mod.ts";
import { App, AppRating, Review } from "./types.ts";

async function getApps(): Promise<
  { [name: string]: AppRating }
> {
  let result = {};
  try {
    const response = await axiod
      .get("https://odrs.gnome.org/1.0/reviews/api/ratings");
    result = response.data;
  } catch (error) {
    log.warning(error);
  }
  return result;
}

async function getReviews(app: string): Promise<
  Review[]
> {
  let result = [];
  try {
    const response = await axiod
      .get(`https://odrs.gnome.org/1.0/reviews/api/app/${app}`);
    result = response.data;
  } catch (error) {
    log.warning(error);
  }
  return result;
}

const apps = await getApps();

const allApps: App[] = [];
for (const app in apps) {
  if (Object.prototype.hasOwnProperty.call(apps, app)) {
    const reviews = await getReviews(app);
    allApps.push({ reviews, ...apps[app], app_id: app });
  }
}

Deno.writeTextFileSync("./data/apps.json", JSON.stringify(allApps));
