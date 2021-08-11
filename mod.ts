import axiod from "https://deno.land/x/axiod/mod.ts";
import * as log from "https://deno.land/std@0.104.0/log/mod.ts";
import { AppRating, Review } from "./ratings.ts";

export default function getApps(): { [name: string]: AppRating } {
  axiod
    .get("https://odrs.gnome.org/1.0/reviews/api/ratings")
    .then((response) => {
      // Deno.writeTextFileSync(
      //   "./data/appRatings.json",
      //   JSON.stringify(response.data)
      // );

      return response.data as { [name: string]: AppRating };
    })
    .catch((error) => {
      log.warning(error);
    });
  return {};
}

function getApp(appId: string): Review | undefined {
  axiod
    .get(`https://odrs.gnome.org/1.0/wws/api/app/${appId}`)
    .then((response) => {
      Deno.writeTextFileSync(
        `./data/${appId}.json`,
        JSON.stringify(response.data)
      );

      return response.data as Review;
    })
    .catch((error) => {
      log.warning(error);
    });
  return undefined;
}

const apps = getApps();
log.warning(apps);

for (const app in apps) {
  if (Object.prototype.hasOwnProperty.call(apps, app)) {
    log.warning(app);
    const element = getApp(app);
    log.warning(element);
  }
}
