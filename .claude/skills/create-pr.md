# Create Pull Request

When creating pull requests for this repository, use the following format:

## PR Title Format

Classify your PR by prefixing the title with one of these types:

- **[Refactoring]** - Code restructuring without changing functionality
- **[Feature]** - Adding or updating functionality
- **[Bug Fix]** - Fixing broken or incorrect behavior
- **[Documentation]** - Updates to docs, comments, or README

**Example titles:**
- `[Feature] Add interactive timeline to Background page`
- `[Bug Fix] Resolve mobile navigation overflow issue`
- `[Refactoring] Extract reusable Card component`
- `[Documentation] Update deployment instructions in README`

## PR Body Format

```
### Context
[Explain WHY this change is being made. Include background, motivation, and any relevant links or references.]

### Changes
[List WHAT changes were made. Use bullet points to describe the specific modifications.]
```

## Example

```
### Context
The Background page needed content to showcase professional experience. A timeline format was chosen to clearly present career progression and highlight expertise in ML systems and AI safety.

### Changes
- Added interactive timeline component with 5 career milestones
- Implemented neural network SVG background pattern
- Added animated entry transitions for visual polish
- Included tags for each role showing relevant skills
```

## Guidelines

1. **Context section**: Focus on the "why" - business reasoning, user needs, or technical motivation
2. **Changes section**: Focus on the "what" - concrete modifications made in this PR
3. Keep both sections concise but informative
4. Use bullet points in the Changes section for readability
