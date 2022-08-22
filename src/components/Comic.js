import React, { useState } from 'react';
import { Document, Page,pdfjs } from 'react-pdf';
import samplePDF from '../assets/Gargoyles Vol 1.pdf';
import styled from "styled-components";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PdfDiv = styled.div`
    display: flex;
    flexFlow: column nowrap;
    justify-content: center;
    vertical-align:middle;
    width: 100%;
    min-height: 50px;
    background-color: var(--black);
    border-bottom: 3px solid #d4af37;
`;
const PageDiv = styled.div`
    color:var(--gray)
`;

export  function Comic() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset) {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  return (
    <>
    <PdfDiv>
      <Document
        file={samplePDF}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber}/>
      </Document>
    </PdfDiv>
      <PageDiv>
        <p>
          Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
        </p>
        <button
          type="button"
          disabled={pageNumber <= 1}
          onClick={previousPage}
        >
          Previous
        </button>
        <button
          type="button"
          disabled={pageNumber >= numPages}
          onClick={nextPage}
        >
          Next
        </button>
      </PageDiv>
    </>
  );
}