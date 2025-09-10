import { visit } from "unist-util-visit";
import type { Plugin } from "unified";
import { escapeRegExp } from "../regex";

type Concept = { name: string; slug: string; aliases?: string[] };

type Options = {
  concepts: Concept[];
  /** Cap links per term to reduce noise (0 = unlimited). Default: 1 */
  maxLinksPerTerm?: number;
};

const EXCLUDE_PARENTS = new Set([
  "code",
  "definition",
  "image",
  "imageReference",
  "inlineCode",
  "link",
  "linkReference",
]);

export const remarkAutolinkConcepts: Plugin<[Options]> = function ({
  concepts,
  maxLinksPerTerm = 1,
}) {
  // Build a map of lowercase term -> slug, and a list of terms
  const termToSlug = new Map<string, string>();
  const terms: string[] = [];

  for (const c of concepts) {
    const add = (t: string) => {
      if (!t) return;
      const key = t.toLocaleLowerCase();
      if (!termToSlug.has(key)) {
        termToSlug.set(key, c.slug);
        terms.push(t);
      }
    };
    add(c.name);
    for (const a of c.aliases ?? []) add(a);
  }

  if (terms.length === 0) {
    // nothing to do
    return () => {};
  }

  // Prefer longest matches first to avoid partial overlaps
  terms.sort((a, b) => b.length - a.length);

  // \b doesn't always behave nicely with diacritics—this is a pragmatic boundary:
  // - Start boundary: (^|[^\\p{L}\\p{N}_])
  // - End boundary:   ($|[^\\p{L}\\p{N}_])
  // Uses Unicode mode (u).
  const pattern = terms.map((t) => escapeRegExp(t)).join("|");
  const re = new RegExp(
    `(^|[^\\p{L}\\p{N}_])(${pattern})(?=($|[^\\p{L}\\p{N}_]))`,
    "giu",
  );

  // Track how many times we've linked each term (lowercased)
  const linkCounts = new Map<string, number>();

  return (tree: any) => {
    visit(tree, "text", (node: any, index: number | null, parent: any) => {
      if (!parent || EXCLUDE_PARENTS.has(parent.type)) return;

      const value: string = node.value;
      if (!value) return;

      const outNodes: any[] = [];
      let lastIndex = 0;
      let m: RegExpExecArray | null;

      while ((m = re.exec(value))) {
        const preBoundary = m[1] ?? "";
        const matchText = m[2];
        const matchStart = m.index + preBoundary.length;
        const matchEnd = matchStart + matchText.length;

        // Push preceding text if any
        if (matchStart > lastIndex) {
          outNodes.push({
            type: "text",
            value: value.slice(lastIndex, matchStart),
          });
        }

        const lc = matchText.toLocaleLowerCase();
        const slug = termToSlug.get(lc);
        const currentCount = linkCounts.get(lc) ?? 0;

        if (slug && (maxLinksPerTerm === 0 || currentCount < maxLinksPerTerm)) {
          // Link it
          outNodes.push({
            type: "link",
            url: `/conceptos/${slug}`, // your TanStack route base
            title: null,
            children: [{ type: "text", value: matchText }],
          });
          linkCounts.set(lc, currentCount + 1);
        } else {
          // No link (limit reached or not found), keep text
          outNodes.push({ type: "text", value: matchText });
        }

        lastIndex = matchEnd;
      }

      // Trailing text
      if (lastIndex < value.length) {
        outNodes.push({ type: "text", value: value.slice(lastIndex) });
      }

      if (outNodes.length > 0) {
        parent.children.splice(index!, 1, ...outNodes);
        // Adjust visitor index automatically—unist-util-visit handles this safe enough here
      }
    });
  };
};
