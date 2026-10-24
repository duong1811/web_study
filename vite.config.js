import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import { readFile } from "node:fs/promises";

const page = (name) => fileURLToPath(new URL(`./${name}.html`, import.meta.url));
const sharedHeaderPath = new URL("./src/partials/header.html", import.meta.url);
const sharedFooterPath = new URL("./src/partials/footer.html", import.meta.url);

function sharedSiteShell() {
  return {
    name: "northstar-shared-site-shell",
    async transformIndexHtml(html) {
      const [header, footer] = await Promise.all([
        readFile(sharedHeaderPath, "utf8"),
        readFile(sharedFooterPath, "utf8"),
      ]);

      return html
        .replace(/<header\b[^>]*>[\s\S]*?<\/header>/i, header.trim())
        .replace(/<footer\b[^>]*>[\s\S]*?<\/footer>/i, footer.trim());
    },
  };
}

export default defineConfig({
  plugins: [sharedSiteShell()],
  build: {
    rollupOptions: {
      input: {
        home: page("index"),
        homeTemplates: page("home-templates"),
        homeCreative: page("home-creative"),
        homeCampus: page("home-campus"),
        homeMinimal: page("home-minimal"),
        courses: page("courses"),
        courseDetails: page("course-detail"),
        about: page("about"),
        pricing: page("pricing"),
        faq: page("faq"),
        contact: page("contact"),
      },
    },
  },
});
