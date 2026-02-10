# Angular New Features Demo

> **[Live Demo](https://kbrilla.github.io/nativeoptional_chaning_and_template_features_upgrade/)**

Interactive demo showcasing two proposed Angular features:

## PR 1: Native Optional Chaining Semantics

Angular's `?.` safe navigation operator has always returned `null` on short-circuit (legacy behavior). Native ECMAScript optional chaining returns `undefined`. This PR adds:

- **Per-component override**: `optionalChainingSemantics: 'legacy' | 'native'` in `@Component`
- **Project-wide setting**: `strictOptionalChainingSemantics: true` in tsconfig `angularCompilerOptions`
- **Extended diagnostic**: `legacySafeNavigationUsage` warns about expressions affected by the change
- **Migration schematic**: `ng generate @angular/core:optional-chaining-semantics-migration`

### Demo Components

- **Legacy User Card** — shows `?.` returning `null` when the user is nullish
- **Native User Card** — shows `?.` returning `undefined` when the user is nullish
- **Side-by-side comparison** — same data, different semantics, proving mix-and-match works
- **Behavioral differences table** — strict equality, typeof, string concatenation

## PR 2: TypeScript Features in Angular Templates

Brings standard TypeScript/ECMAScript syntax to Angular templates:

| Feature | Example | Live in Demo |
|---------|---------|:---:|
| `@let` destructuring | `@let { name, price } = product` | Yes |
| Hex/Octal/Binary literals | `{{ 0xFF }}`, `{{ 0o77 }}`, `{{ 0b1010 }}` | Yes |
| Computed property names | `{{ {['key']: value} }}` | Yes |
| BigInt literals | `{{ 1n }}`, `{{ 100n + 200n }}` | Yes |
| Arrow rest parameters | `items.reduce((...args) => args[0] + args[1])` | Yes |
| Block comments | `{{ 5 /* ignored */ + 3 }}` = 8 | Yes |

## Built With

This app uses a **custom Angular build** (21.2.0-next.2) from a combined branch that merges:
- `main` (includes inlay hints)
- `copilot/implement-optional-chaining`
- `copilot/implement-ts-features-in-angular-templates`

Custom VSIX for the Angular Language Service extension is also built from this branch.

## Development

```bash
pnpm install
ng serve        # Runs on http://localhost:4200
ng build        # Production build
```
