import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"
import { customImageStructure } from "./quartz/util/og"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    defaultDateType: "modified",
    pageTitle: "🌱Archiverse : 삶은 기록 너머 우주🌓",
    enableSPA: true,
    enablePopovers: true,
    analytics: null,
    locale: "ko-KR",
    baseUrl: "archiverse.pages.dev",
    ignorePatterns: ["private", "**/templates"],
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Orbit",
        body: "Gowun Batang",
        code: "Fira Code",
      },
      colors: {
        lightMode: {
          light: "#fffdfa", // Backg
          lightgray: "#d1caba", // Code Backg
          gray: "#9c9384", // Unread nodes and subtitles
          darkgray: "#2A354B", // Text
          dark: "#08142C", // Code text
          secondary: "#274B75", // Links, title, and current node
          tertiary: "#84a59d", // Visited nodes
          highlight: "rgba(255, 178, 42, 0.15)",
          textHighlight: "#fff23688",
        },
        darkMode: {
          light: "#0c0f14", // Backg
          lightgray: "#1D232D", // Code Backg
          gray: "#5A657B", // Unread nodes and subtitles
          darkgray: "#d4d4d4", // Text
          dark: "#ebebec", // Code text
          secondary: "#7188A9", // Links, title, and current node
          tertiary: "#84a59d", // Visited nodes
           highlight: "rgba(255, 178, 42, 0.15)",
          textHighlight: "#b3aa0288",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({
        markdownLinkResolution: "shortest",
      }),
      Plugin.Description(),
      Plugin.Remark42({
        host: "https://archiverse.pages.dev/comments",
        site_id: "remark",
        theme: "dark",
        no_footer: true,
      }),
      Plugin.Latex({ renderEngine: "katex" }),
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
        rssFullHtml: true,
        rssLimit: 50,
        feedDirectories: ["index", "Updates"], // For a feed for only pages in content/Folder/, add "Folder" to the array
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages({
        colorScheme: "lightMode", // what colors to use for generating image, same as theme colors from config, valid values are "darkMode" and "lightMode"
        width: 1200, // width to generate with (in pixels)
        height: 630, // height to generate with (in pixels)
        excludeRoot: false, // wether to exclude "/" index path to be excluded from auto generated images (false = use auto, true = use default og image)
        imageStructure: customImageStructure,
      }),
    ],
  },
}

export default config
