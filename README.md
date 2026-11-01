# KTAG — iXBRL Tagging Proof of Concept

A proof of concept for **KTAG**, an in-house iXBRL data preparation tool, built during a summer 2024 internship at KPMG (June 27 – July 12, 2024).

> **Status: archived.** This is a minimum viable PoC and is no longer maintained.

## Background

Hong Kong's Inland Revenue Department (IRD) accepts Profits Tax supporting documents in **inline XBRL (iXBRL)** format, and plans to make e-filing mandatory by 2030. To produce an iXBRL file, each figure in a financial statement or tax computation is tagged with a concept from the IRD Taxonomy Package (IRD FS for financial statements, IRD TC for tax computations).

The IRD provides a free tagging tool, but its auto-tagging is weak and its workflow is cumbersome. KTAG was proposed as a better in-house alternative. This PoC tested whether the core workflow was feasible.

## What it does

1. **Import** a `.docx` (financial statement) or `.xlsx` (tax computation). The server converts it to HTML: Word files with Mammoth, Excel files with ExcelJS (merged cells supported).
2. **Tag**: highlight text in the rendered document, click **Tag**, and pick a taxonomy concept. The selection is wrapped in an `<ix:nonFraction …>` element, highlighted, and shows the concept name on hover.
3. **Preview** all tags in a table. Click one to see its documentation label.
4. **Export** an iXBRL-style XHTML file with the required namespaces and a `schemaRef` to the 2024-04-01 IRD FS or TC entry point, chosen by file type.

## Tech stack

Next.js 14 (App Router) · React 18 · TypeScript · Tailwind CSS · Mammoth · ExcelJS · FileSaver · react-tooltip

## Project layout

```
app/page.tsx              Main page: state, tagging logic, XHTML export
app/api/docx/route.ts     .docx → HTML (Mammoth)
app/api/xlsx/route.ts     .xlsx → HTML table (ExcelJS)
components/FileUpload     Import button and upload
components/HighlightableHTML  Renders the document and captures text selection
components/TagModal       Taxonomy concept picker
components/PreviewModal   Tagged values and documentation labels
taxonomyData.json         Taxonomy concepts used for tagging
```

## Running locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Known limitations

- **Incomplete taxonomy data.** The IRD packages provide readable labels but not machine-readable tag attributes. `taxonomyData.json` has full attributes (`contextRef`, `unitRef`, `id`, etc.) for only 3 IRD FS concepts (Revenue, Equity, ProfitLossBeforeTax), taken from the IRD's own tool. The 103 mandatory IRD TC concepts are listed by name only, with all attributes set to `null`.
- **The export is not fully valid iXBRL.** It has no `ix:header`, contexts, or units, so it will not pass IRD validation as-is.
- **Simple tagging.** Tags are inserted by string replacement, so the first matching occurrence of the selected text gets tagged. Tags cannot be edited or removed.
- **No persistence or authentication.** All state lives in the browser and is lost on refresh.

## Outcome and proposed next steps

The PoC delivered upload, tagging, preview, and export, and was deployed on an internal KPMG server. The full KTAG proposal also included:

- user authentication and workspaces
- importing client data from internal systems
- AI-assisted auto-tagging
- carrying tags over between document versions
- validation with manual correction
- real-time collaboration
- maintaining the taxonomy as the IRD updates it

Pilot testing with clients and a go-to-market plan were proposed as the steps after that.
