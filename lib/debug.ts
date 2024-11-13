type DebugInfo =
  | {
      componentName: string;
      fileName: string;
    }
  | undefined;

export function getDebugInfo(): DebugInfo {
  if (process.env.NODE_ENV !== "development") {
    return undefined;
  }

  try {
    const stack = new Error().stack?.split("\n");
    if (!stack) return undefined;

    // Find the component file line - it's usually after the element() call
    // Looking for lines containing .tsx or .jsx
    const componentLine = stack[3];

    if (!componentLine) return undefined;

    // Extract filename
    // Example: "at ./src/components/Select.tsx"
    const fileMatch = componentLine.match(/\/([^/]+?\.[jt]sx)/);
    const fileName = fileMatch?.[1] || "unknown";

    // Extract component name from filename
    // Select.tsx -> Select
    const componentName = fileName.replace(/\.[jt]sx$/, "");

    return {
      componentName,
      fileName,
    };
  } catch (e) {
    console.debug("Debug info extraction failed:", e);
    return undefined;
  }
}
