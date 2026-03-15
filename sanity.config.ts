import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./src/sanity/schemas";
import { projectId, dataset } from "./src/sanity/env";

export default defineConfig({
  name: "stora-sundby-gatukok",
  title: "Stora Sundby Gatukök",
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Innehåll")
          .items([
            // Site settings as a singleton
            S.listItem()
              .title("Webbplatsinställningar")
              .id("siteSettings")
              .child(
                S.document()
                  .schemaType("siteSettings")
                  .documentId("siteSettings")
              ),
            S.divider(),
            S.documentTypeListItem("menuCategory").title("Menykategorier"),
            S.documentTypeListItem("menuItem").title("Menyobjekt"),
            S.divider(),
            S.documentTypeListItem("dailySpecial").title("Dagens Lunch"),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
});
