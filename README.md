# Retrieve interest rate

## Proposed flow

```mermaid
graph TB
    subgraph A[Scraper Workflow]
        A1[Start] --> A2[Get list of banks]
        A2 --> A3[Search for interest saving page]
        
        subgraph A4[For each bank]
            A3 --> A5['crawler' Fetch page info]
            A5 --> A6[Process & Extract interest rate info using AI]
        end
        A6 --> A7[End]
    end
    subgraph B[Data Flow]
        A2 --> |store| B1[Bank List Data]
        B1 --> B2[Historical Data]
        A6 --> |store| B3[Interest Rate Data]
        B3 --> B2
        A1 --> |store run data| B2
    end
    subgraph C[Analytic Flow]
        C1[Display interest rate comparison] --> |read| B2
    end
```

## Components

Connect to each other like this: Retriever > Extractor > Viewer

### Retriever
Input: list of banks (fixed in code for now)\
Process: search for first result and get HTML content\
Output: raw HTML of interest rate pages

* Install

```sh
# current directory: `retriever` folder
npm i
```

* Run

```sh
# current directory: `retriever` folder
npm run dev
```

### Extractor
Input: raw HTML of interest rate pages\
Process: extracst interest rate data\
Output: store interest rate data

### Viewer
Input: interest rate data\
Process: View\
No output
