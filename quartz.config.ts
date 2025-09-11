import 'dotenv/config';
import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"


// const myGoatcounterCode = process.env.GOATCOUNTER_CODE as string;

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */

const config: QuartzConfig = {
  configuration: {
    pageTitle:"🪴Archiverse : 삶은 기록 너머 우주",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "goatcounter",
      websiteId: "GOATCOUNTER_CODE_PLACEHOLDER",
    },
    locale: "ko-KR",
    baseUrl: "archiverse.pages.dev",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    passProtected: {
      enabled: true,
      iteration: 2e6,
    },
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: {
          name: "Gowun Batang",
          weights: [400],
        },
           body: "Gowun Batang",
        code: "JetBrains Mono",
      },
      colors: {
        lightMode: {
          light: "#fffdfa",
          lightgray: "#d1caba",
          gray: "#9c9384",
          darkgray: "#2A354B",
          dark: "#08142C",
          secondary: "#274B75",
          tertiary: "#84a59d",
          highlight: "rgba(255, 178, 42, 0.15)",
          textHighlight: "#fff23688",
        },
        darkMode: {
          light: "#0c0f14",
          lightgray: "#1D232D",
          gray: "#5A657B",
          darkgray: "#d4d4d4",
          dark: "#ebebec",
          secondary: "#7188A9",
          tertiary: "#84a59d",
          highlight: "rgba(255, 178, 42, 0.15)",
          textHighlight: "#b3aa0288",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.Staticrypt(),
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.FancyText(),
      // Plugin.StickyNotes(),
      Plugin.TelescopicText(),
      Plugin.MusicABCPlugin(),
      Plugin.ezTextReplacer(),
      Plugin.BlurText(), // this NEEDS to be in the later half, like right before syntax highlighting
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.Citations({ bibliographyFile: "./content/bibliography.bib", linkCitations: true }),
      Plugin.Carousel2({showDots: true}),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.TableOfContents2(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }), // this is links.tsx
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
      // Plugin.ClickableImages(),
      Plugin.Carousel({showDots: true}),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

// Wishful thinking/TODO: make it so that it refreshes on each DOMContentLoaded
// document.addEventListener('DOMContentLoaded', () => {
//   const title = getRandomPageTitle();
//   // document.title = title + config.configuration.pageTitleSuffix;
//   config.configuration.pageTitle = title; // Update the config object
// });
export default config