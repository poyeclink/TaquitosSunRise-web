import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

/**
 * Regla de dependencias de Clean Architecture (ver docs/arquitectura.md):
 * las capas internas nunca importan capas externas ni frameworks.
 */
const layer = (name) => [`@/${name}`, `@/${name}/**`, `**/${name}/**`];

const forbid = (layers, message) => ({
  group: layers.flatMap(layer),
  message,
});

const frameworks = {
  group: ["next", "next/**", "react", "react/**", "react-dom", "react-dom/**", "server-only"],
  message: "El núcleo (core) es TypeScript puro: sin Next.js ni React.",
};

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    files: ["src/core/domain/**"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            forbid(
              ["core/application", "infrastructure", "presentation", "di", "app"],
              "domain no depende de ninguna otra capa.",
            ),
            frameworks,
          ],
        },
      ],
    },
  },
  {
    files: ["src/core/application/**"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            forbid(
              ["infrastructure", "presentation", "di", "app"],
              "application solo depende de domain. Define un puerto (interface) y deja que infrastructure lo implemente.",
            ),
            frameworks,
          ],
        },
      ],
    },
  },
  {
    files: ["src/infrastructure/**"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            forbid(["presentation", "di", "app"], "infrastructure no depende de la UI ni del contenedor."),
          ],
        },
      ],
    },
  },
  {
    files: ["src/app/**"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            forbid(
              ["infrastructure"],
              "La UI no usa infraestructura directamente: consume casos de uso desde @/di/container.",
            ),
          ],
        },
      ],
    },
  },
  {
    files: ["src/presentation/**"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            forbid(
              ["infrastructure", "di", "app"],
              "presentation recibe datos por props; las rutas (src/app) llaman a los casos de uso.",
            ),
          ],
        },
      ],
    },
  },
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);

export default eslintConfig;
