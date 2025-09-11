import rehypeCitation from "rehype-citation"
import { PluggableList } from "unified"
import { visit } from "unist-util-visit"
import { QuartzTransformerPlugin } from "../types"

export interface Options {
  bibliographyFile: string
  suppressBibliography: boolean
  linkCitations: boolean
  csl: string
}

const defaultOptions: Options = {
  bibliographyFile: "./bibliography.bib",
  suppressBibliography: false,
  linkCitations: false,
  csl: "apa",
}

export const Citations: QuartzTransformerPlugin<Partial<Options>> = (userOpts) => {
  const opts = { ...defaultOptions, ...userOpts }
  return {
    name: "Citations",
    htmlPlugins(ctx) {
      const plugins: PluggableList = []

      // Add rehype-citation to the list of plugins
      plugins.push([
        rehypeCitation,
        {
          bibliography: opts.bibliographyFile,
          suppressBibliography: opts.suppressBibliography,
          linkCitations: opts.linkCitations,
          csl: opts.csl,
          lang: ctx.cfg.configuration.locale ?? "en-US",
        },
      ])

      // Transform the HTML of the citations; add data-no-popover property to the citation links
      // using https://github.com/syntax-tree/unist-util-visit as they're just anchor links
      plugins.push(() => {
        return (tree, _file) => {
          let headingAdded = false;

          visit(tree, "element", (node) => {
            // Check if the node is the bibliography container
            if (!headingAdded && node.tagName === "div" && node.properties?.id === "refs" && node.properties?.className?.includes("references")) {
              headingAdded = true;

              // Create the "Works Cited:" heading
              const headingNode = {
                type: "element",
                tagName: "h3",
                properties: {
                  style: "text-align: center;"
                },
                children: [{ type: "text", value: "Works Cited" }],
              };

              // Prepend the heading to the bibliography container
              node.children.unshift(headingNode);
            }

            // Add data-no-popover property to citation links
            if (node.tagName === "a" && node.properties?.href?.startsWith("#bib")) {
              node.properties["data-no-popover"] = true;
            }
          });
        };
      });

      return plugins
    },
  }
}
