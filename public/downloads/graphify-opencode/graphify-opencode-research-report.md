# Solving AI Amnesia: The Definitive Guide to Graphify and Persistent Memory Layers

### 1. The "Token Tax" and the Problem with Stateless AI

In the current landscape of agentic AI, tools like Claude Code and Codex suffer from a structural deficit I call **AI Amnesia**. Standard LLM workflows are fundamentally stateless; every time a developer initiates a new session, the agent's architectural context resets to zero. To compensate, agents perform a brute-force exploration of the codebase using `grep`, `find`, and `read`—a process that triggers **In-context Learning (ICL) fatigue** and a massive **"Token Tax."**

Lacking a persistent map, an agent must repeatedly re-read the same files to resolve dependencies or understand call paths. This inefficiency isn't just annoying; it’s a reliability crisis. Verified benchmarks from the Karpathy repository corpus show that structural retrieval via a knowledge graph provides a **71.5x reduction in token consumption** compared to raw file scanning. Without a memory layer, you aren't just paying more; you're inviting the agent to hallucinate architecture through a keyhole view of your code.

> **Problem/Solution: The Persistent Memory Layer**
>
> - **The Problem:** Stateless agents spend 90% of their context window on "exploration slop"—repeatedly grepping and reading raw text to rediscover relationships they found ten minutes ago.
> - **The Solution:** A persistent Knowledge Graph (KG) that serves as a "Structural Memory." By offloading relationship tracking to an external graph, the agent transitions from "text-searching" to **"Architecture-first reasoning."**

---

### 2. What is Graphify? (Karpathy’s "LLM Wiki" Realized)

Graphify is an AI coding assistant skill that transforms any directory into a searchable, traversable knowledge graph. It is the technical realization of Andrej Karpathy’s proposed "/raw folder" workflow: a system where disparate inputs—source code, research papers, diagrams, and meeting transcripts—are decoded into a single, unified "Digital Twin" of your knowledge.

Unlike standard RAG (Retrieval-Augmented Generation) which relies on flat vector embeddings, Graphify focuses on **Structural Retrieval**. It supports 25+ languages via Tree-Sitter and handles multimodal inputs including PDFs, images (via Vision), and YouTube videos (via `yt-dlp` and `faster-whisper`).

| Platform               | Install Command                        |
| :--------------------- | :------------------------------------- |
| **Claude Code**        | `graphify install`                     |
| **Codex**              | `graphify install --platform codex`    |
| **OpenCode**           | `graphify install --platform opencode` |
| **Cursor**             | `graphify cursor install`              |
| **GitHub Copilot CLI** | `graphify install --platform copilot`  |
| **Aider**              | `graphify install --platform aider`    |

---

### 3. Under the Hood: The Three-Pass Pipeline

The Graphify engine executes a sophisticated multi-phase pipeline to ensure that the graph is both deterministic and semantically rich.

1.  **Pass 1 (Deterministic AST):** The engine uses **Tree-Sitter** to perform local, LLM-free extraction of classes, functions, and imports. The Python core parses 25 languages, while the statically linked C/Rust binary scales to **66 languages**. This pass builds the "Hard Graph" with 1.0 confidence.
2.  **Pass 2 (Local Transcription):** Audio and video files are processed via a local Whisper model. To ensure high accuracy for technical jargon, Graphify uses a **"domain-aware prompt"** derived from the "God Nodes" (highest-centrality entities) identified in Pass 1.
3.  **Pass 3 (Semantic Extraction):** Parallel subagents (Claude/GPT) identify design rationale and "Surprising Connections" (e.g., a React component implementing a logic pattern described in a PDF research paper).

**The Distinction: Structure over Embeddings**
Graphify utilizes **Leiden community detection** for clustering. Unlike vector databases that require expensive re-embedding of thousands of chunks on every change, Leiden clusters nodes based on **graph-topology and edge density**. This captures the "functional neighborhoods" of your code without the "stale context" of vector RAG.

- **EXTRACTED (1.0 confidence):** Facts found directly in code (e.g., `TraceCallPath`).
- **INFERRED (0.4-0.9 confidence):** Semantic links identified by subagents (e.g., `SimilarLogicPattern`).

---

### 4. Technical Guide: Getting Started and "Always-On" Mode

For single-user setups, installation is streamlined via `uv` or `pip`.

```bash
# Recommended: Install via uv tool for automatic PATH management
uv tool install graphifyy

# Or via pip (ensure you use the double 'y')
pip install graphifyy
```

#### The "Always-On" Intercept

The true "Aha!" moment comes when you enable **Always-On mode**. Running `graphify claude install` does more than write documentation; it installs a **`PreToolUse` hook** in your `settings.json`.

This hook intercepts standard AI search calls (like `grep` or `rg`). When the agent attempts a blind search, the hook injects a reminder: _"Graphify: Knowledge graph exists. Read GRAPH_REPORT.md for God Nodes before searching."_ This forces the agent to consult the map before it starts burning your token quota.

---

### 5. Leveraging the Model Context Protocol (MCP)

Graphify exposes its knowledge graph as a **"USB port for AI"** via the Model Context Protocol. This allows the AI to perform structured, typed queries with sub-millisecond latency.

To enable this locally, your `.mcp.json` configuration should point to the Graphify server:

```json
{
  "mcpServers": {
    "graphify": {
      "command": "python",
      "args": ["-m", "graphify.serve", "graphify-out/graph.json"]
    }
  }
}
```

| MCP Tool            | Real-world Query Example                                |
| :------------------ | :------------------------------------------------------ |
| `trace_call_path`   | "Trace the path from the Login button to the DB write." |
| `get_impact_radius` | "What modules break if I refactor the Auth middleware?" |
| `query_graph`       | "Find all functions using gRPC that lack docstrings."   |
| `get_community`     | "Explain the architecture of the memory subsystem."     |
| `god_nodes`         | "Identify the 5 most critical classes in this repo."    |

---

### 6. Team Collaboration: CI/CD and Shared Memory

In a team setting, the Knowledge Graph is a **Single Source of Truth**. Because LLMs are non-deterministic, different developers running Graphify locally will produce slightly different graphs, leading to merge conflicts.

**The "Build Artifact" Blueprint:**
Treat the graph like a compiled binary. One entity (CI or a designated maintainer) generates it; everyone else consumes it.

- [ ] **Designate a CI job:** Run `graphify .` on every merge to `main`.
- [ ] **Commit core artifacts:** Check in `graph.json`, `graph.html`, and `GRAPH_REPORT.md`.
- [ ] **Commit `cache/`:** Now safe for sharing, as keys are content-addressed (SHA256).
- [ ] **Gitignore local state:** Ensure `manifest.json` is ignored (it tracks local `mtimes`).
- [ ] **Use Always-On Hooks:** Run `graphify hook install` to update the AST instantly on every commit.

---

### 7. Performance Benchmarks: Python vs. Rust (`graphify-rs`)

For enterprise-scale repositories like the Linux kernel (2.1M nodes indexed in ~3 mins), the legacy Python implementation is insufficient. We have introduced `graphify-rs`, a high-performance rewrite that delivers a massive leap in efficiency.

| Metric                 | Python Core | Rust Engine (`graphify-rs`)    | Improvement       |
| :--------------------- | :---------- | :----------------------------- | :---------------- |
| **Indexing Speed**     | ~204ms      | **~24ms**                      | **8.5x Faster**   |
| **Memory Usage**       | ~48MB       | **~1MB**                       | **48x Reduction** |
| **Parsing Capability** | Regex-based | **66 Languages (Tree-Sitter)** | **Robustness**    |
| **Clustering**         | Louvain     | **Leiden (with Refinement)**   | **Accuracy**      |

---

### 8. Security and Trust: The 8-Layer Audit

Running autonomous agents with MCP server access presents a supply-chain risk. To address this, Graphify employs a defense-in-depth security framework detailed in our recent ArXiv paper. Every release undergoes an **8-Layer CI Audit**:

1.  **VirusTotal Multi-Engine Scan:** Verification by 70+ antivirus engines.
2.  **Binary String Audit:** Automated scanning for hardcoded URLs or malicious payloads.
3.  **Network Egress Monitoring:** REST API usage restricted to authorized endpoints (localhost/GitHub).
4.  **SQLite Authorizer Callbacks:** Hardened at the engine level to block SQL-injection file creation.
5.  **Path Traversal Protection:** `realpath()` containment checks on all get_code_snippet calls.
6.  **Sigstore/SLSA Signing:** Cryptographic build provenance for binary integrity.
7.  **Adversarial JSON-RPC Testing:** Stress-testing against malformed payloads.
8.  **Dependency Integrity:** SHA-256 checksums for all 66 vendored Tree-Sitter grammars.

---

### 9. Conclusion: Next Steps for Your Knowledge Vault

By shifting to a graph-first workflow, you are no longer asking an AI to guess; you are providing it with a verified map. This transition yields a **71.5x token reduction** and enables the AI to identify **"God Nodes"**—the architectural pillars that hold your system together.

The evolution of this stack leads to **Penpax**, an enterprise layer designed to act as a persistent "Digital Twin" for your working life, connecting browser history, meetings, and code into a private memory vault.

**Immediate Next Steps:**

1.  **Initialize:** Run `pip install graphifyy && graphify .` in your most complex repo.
2.  **Automate:** Install the `Always-On` hook via `graphify [platform] install`.
3.  **Review:** Open `graphify-out/GRAPH_REPORT.md` to identify your repo's God Nodes.
4.  **Collaborate:** Add `graphify-out/` to your Git tracking to share context with your team.
