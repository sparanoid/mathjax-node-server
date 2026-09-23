// The `mathjax` package ships prebuilt components without type definitions,
// so this declares only the parts of its Node API that index.ts uses.
declare module 'mathjax' {
  interface LiteElement {
    kind: string;
  }

  interface MathJaxObject {
    startup: {
      adaptor: {
        innerHTML(node: LiteElement): string;
        outerHTML(node: LiteElement): string;
      };
    };
    tex2svg(math: string, options?: { display?: boolean }): LiteElement;
  }

  const mathjax: {
    init(config: Record<string, unknown>): Promise<MathJaxObject>;
  };

  export = mathjax;
}
