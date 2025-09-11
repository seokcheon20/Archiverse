import 'dotenv/config';

import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"
import { SimpleSlug } from "./quartz/util/path";
import { QuartzPluginData } from "./quartz/plugins/vfile"
import { FileTrieNode } from './quartz/util/fileTrie';
import { FileNode } from "./quartz/components/_ExplorerNodeOld";

// Constants for config that are reused a lot
const homepageTitle = "🪴Archiverse : 삶은 기록 너머 우주"
const modifiedListTitle = "All-files-chronologically-modified"

const mapTitle = "Map"
const tagsToRemove = ["graph-exclude", "explorer-exclude", "backlinks-exclude", "recents-exclude", "search-exclude", "listing-exclude"]
const graphConfig = {
  localGraph: {
    removeTags: tagsToRemove,
    excludeTags: ["graph-exclude"]
  },
  globalGraph: {
    removeTags: tagsToRemove,
    excludeTags: ["graph-exclude"]
  }
};
const tagListConfig = { 
  excludeTags: tagsToRemove
}
const explorerConfig = {
  filterFn: (node: FileTrieNode) => {
    const omit = new Set(["tags"]);
    const hasExcludedTag = node.data?.tags?.includes("explorer-exclude") === true;
    const isOmitted = omit.has(node.displayName?.toLowerCase());
    return !hasExcludedTag && !isOmitted;
  },
  mapFn: (node: FileTrieNode) => {
    // dont change name of root node
    if (!node.isFolder) {
      // set emoji for file/folder      
        node.displayName = "⊹ " + node.displayName
    }
  },
}
const recentNotesConfig = { 
  showTags: false, 
  title: "Recently edited notes:", 
  showDate: true,
  linkToMore: "meta/" + modifiedListTitle as SimpleSlug,
  excludeTags: ["recents-exclude", "slurp", "external"],
  filter: (f: QuartzPluginData) => !f.slug!.startsWith("tags/") && !f.slug!.endsWith("/index")
}
const backlinksConfig = {
  excludeTags: ["backlinks-exclude"],
  hideWhenEmpty: false
}

const breadcrumbsConfig = {
  rootName: "🏡Home"
}

const oldexplorerConfig = {
  filterFn: (node: FileNode) => node.name !== "tags" &&
  !(node.file?.frontmatter?.tags?.includes("explorer-exclude") === true),
  mapFn: (node: FileNode) => {
    // dont change name of root node
    if (node.depth > 0) {
      // set emoji for file/folder
      if (node.file) {
        node.displayName = "✾ " + node.displayName
      } else {
        // node.displayName = "📁 " + node.displayName
      }
  }
}}
const githubSourceConfig = { 
  repoLink: "https://github.com/seokcheon20/Archiverse"
}
///////////////////////////////////////////////////
// components shared across all pages  
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [
  Component.OnlyFor(
    { titles: [mapTitle]},
    Component.RecentNotes({...recentNotesConfig, limit: 8})
  ),
],
  footer: Component.Footer({
    links: {}}),
}

// components for pages that display a single page (e.g. a single note) 
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(breadcrumbsConfig),
    // Component.ConditionalRender({
    //   component: Component.Breadcrumbs(),
    //   condition: (page) => page.fileData.slug !== "index",
    // }),
    Component.ArticleTitle(),
    Component.ContentMeta(githubSourceConfig),
    Component.ConditionalRender({
      component: Component.Properties(),
      condition: (page) => page.fileData.frontmatter?.slurped !== undefined,
    }),
    Component.TagList(tagListConfig),
    Component.MobileOnly(Component.TableOfContents()),
    // Component.MobileOnly(Component.OnlyFor({titles: [mapTitle]}, Component.ExplorerOld(explorerConfig)))
  ],
  left: [
    Component.MobileOnly(Component.OverlayExplorer(oldexplorerConfig)),
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Row([
      Component.Map(),
      Component.Darkmode(),
      Component.Search(),
    ]),
    // Component.DesktopOnly(Component.OnlyFor({titles: [homepageTitle, mapTitle]}, Component.ExplorerOld(explorerConfig))),
    Component.Explorer({
      sortFn: (a, b) => {
        const emojis =
          /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g
        const a_name = a.data?.title.replace(emojis, "").trim()
        const a_dname = a.displayName.replace(emojis, "").trim()
        const b_name = b.data?.title.replace(emojis, "").trim()
        const b_dname = b.displayName.replace(emojis, "").trim()
        // Sort order: folders first, then files. Sort folders and files alphabetically
        if (/^.*Home$/.test(a_dname)) {
          return -1
        }
        if (/^.*Home$/.test(b_dname)) {
          return 1
        }
        if ((!a.isFolder && !b.isFolder) || (a.isFolder && b.isFolder)) {
          // numeric: true: Whether numeric collation should be used, such that "1" < "2" < "10"
          // sensitivity: "base": Only strings that differ in base letters compare as unequal. Examples: a ≠ b, a = á, a = A
          return a_dname.localeCompare(b_dname, undefined, {
            numeric: true,
            sensitivity: "base",
          })
        }

        if (!a.isFolder && b.isFolder) {
          return 1
        } else {
          return -1
        }
      },
    }),
    //Component.TableOfContents(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.DesktopOnly(Component.OnlyFor({titles: [homepageTitle, mapTitle]}, Component.Explorer(explorerConfig))),
    Component.FloatingButtons({position: 'right'}),
    // Component.DesktopOnly(Component.PageTitle()),
    // Component.DesktopOnly(
    //   Component.Row([
    //     Component.Map(),
    //     Component.Darkmode(),
    //     Component.Search(),
    //   ])),
    // Component.DesktopOnly(Component.TableOfContents()),
    // Component.OnlyFor({titles: [homepageTitle, mapTitle]}, Component.Explorer(explorerConfig)),
    // Component.FloatingButtons({position: 'right'}),
    
    // Component.MobileOnly(
    //   Component.Flex({
    //     components: [
    //       {Component: Component.PageTitle(),
    //         justify: "around",
    //       },
    //       // {Component: Component.Spacer()},
    //       {Component: Component.Row([
    //         Component.Map(),
    //         Component.Darkmode(),
    //         Component.Search(),
    //         ]),
    //         justify: "around",
    //       },
    //     ]}
    //   )
    // ),
  ],
  right: [
    Component.Graph(graphConfig),
    Component.Backlinks(backlinksConfig),
  ],
}
// components for pages that display lists of pages  (e.g. tags or folders) 
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(breadcrumbsConfig), Component.ArticleTitle()],
  left: [
    Component.MobileOnly(Component.OverlayExplorer()),
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Row([
      Component.Map(),
      Component.Darkmode(),
      Component.Search(),
    ]),
    Component.FloatingButtons({position: 'right'}),
  ],
  right: [
    Component.HiddenGlobalGraph(graphConfig),
  ],
}