export const CreateCodeSnippetInputs = [
  {
    name: "type",
    label: "Type",
    type: "select",
    options: [
      { label: "Code Snippet", value: "code_snippet" },
      { label: "Problem Solving", value: "problem_solving" },
    ],
    occupyMode: "1/2",
  },
  { name: "isFeatured", label: "Is Featured ?", type: "switch", occupyMode: "1/2" },
  { name: "name", label: "Name", type: "text", occupyMode: "full" },
  { name: "purpose", label: "Purpose", type: "text", occupyMode: "full" },
  { name: "tags", label: "Tags", type: "tags", occupyMode: "1/3" },
  {
    name: "language",
    label: "Language",
    type: "select",
    options: [
      { label: "Plain Text", value: "plaintext" },
      { label: "Bat", value: "bat" },
      { label: "C", value: "c" },
      { label: "C++", value: "cpp" },
      { label: "C#", value: "csharp" },
      { label: "CSS", value: "css" },
      { label: "Go", value: "go" },
      { label: "Graphql", value: "graphql" },
      { label: "HTML", value: "html" },
      { label: "Java", value: "java" },
      { label: "JavaScript", value: "javascript" },
      { label: "Kotlin", value: "kotlin" },
      { label: "MySql", value: "mysql" },
      { label: "PgSql", value: "pgsql" },
      { label: "PHP", value: "php" },
      { label: "PowerShell", value: "powershell" },
      { label: "Python", value: "python" },
      { label: "Redis", value: "redis" },
      { label: "SQL", value: "sql" },
      { label: "TypeScript", value: "typescript" },
      { label: "JSON", value: "json" },
    ],
    occupyMode: "1/3",
  },
  { name: "source", label: "Source", type: "text", occupyMode: "1/3" },
  { name: "codes", label: "Code Snippet", type: "codeEditor", occupyMode: "full" },
  { name: "output", label: "Output", type: "richTextEditor", occupyMode: "full" },
];