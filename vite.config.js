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

      const sharedShell = `${header.trim()}\n${footer.trim()}`;
      const scriptTag = '<script type="module" src="/src/main.js"></script>';

      let nextHtml = html;

      nextHtml = nextHtml.replace(/<header\b[^>]*>[\s\S]*?<\/header>/i, header.trim());
      nextHtml = nextHtml.replace(/<footer\b[^>]*>[\s\S]*?<\/footer>/i, footer.trim());

      if (!/<header\b/i.test(nextHtml)) {
        nextHtml = nextHtml.replace(/<body[^>]*>/i, (match) => `${match}\n${header.trim()}`);
      }

      if (!/<footer\b/i.test(nextHtml)) {
        nextHtml = nextHtml.replace(/<\/body>/i, `${footer.trim()}\n</body>`);
      }

      if (!/<script[^>]+src=["']\/src\/main\.js["'][^>]*><\/script>/i.test(nextHtml)) {
        nextHtml = nextHtml.replace(/<\/body>/i, `${scriptTag}\n</body>`);
      }

      return nextHtml;
    },
  };
}

export default defineConfig({
  plugins: [sharedSiteShell()],
  build: {
    rollupOptions: {
      input: {
        home: page("index"),
        homeOnePage: page("index-one-page"),
        homeTwo: page("index2"),
        homeTwoOnePage: page("index2-one-page"),
        homeThree: page("index3"),
        homeThreeOnePage: page("index3-one-page"),
        homeFour: page("index4"),
        homeFourOnePage: page("index4-one-page"),
        homeDark: page("index-dark"),
        homeTemplates: page("home-templates"),
        homeCreative: page("home-creative"),
        homeCampus: page("home-campus"),
        homeMinimal: page("home-minimal"),
        courses: page("courses"),
        course: page("course"),
        courseCarousel: page("course-carousel"),
        courseList: page("course-list"),
        courseDetails: page("course-detail"),
        products: page("products"),
        productDetails: page("product-details"),
        cart: page("cart"),
        checkout: page("checkout"),
        wishlist: page("wishlist"),
        signUp: page("sign-up"),
        blog: page("blog"),
        blogCarousel: page("blog-carousel"),
        blogList: page("blog-list"),
        blogDetails: page("blog-details"),
        about: page("about"),
        pricing: page("pricing"),
        faq: page("faq"),
        contact: page("contact"),
        instructor: page("instructor"),
        instructorCarousel: page("instructor-carousel"),
        instructorDetails: page("instructor-details"),
        events: page("events"),
        eventsCarousel: page("events-carousel"),
        eventDetails: page("event-details"),
        becomeTeacher: page("become-a-teacher"),
        testimonials: page("testimonials"),
        testimonialsCarousel: page("testimonials-carousel"),
        gallery: page("gallery"),
        comingSoon: page("coming-soon"),
        error404: page("404"),
        login: page("login"),
        register: page("register"),
        resetPassword: page("reset-password"),
      },
    },
  },
});
