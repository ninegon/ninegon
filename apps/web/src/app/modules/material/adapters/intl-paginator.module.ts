import { MatPaginatorIntl } from "@angular/material/paginator";

const spanishRangeLabel = (page: number, pageSize: number, length: number) => {
  // if (length === 0 || pageSize === 0) { return `no hay elementos`; }
  
  length = Math.max(length, 0);

  const startIndex = page * pageSize;

  const endIndex = startIndex < length ?
      Math.min(startIndex + pageSize, length) :
      startIndex + pageSize;

  return `${startIndex + 1} - ${endIndex}`;
}


export function getSpanishPaginatorIntl() {
  const paginatorIntl = new MatPaginatorIntl();


  paginatorIntl.itemsPerPageLabel = '';
  paginatorIntl.nextPageLabel = '';
  paginatorIntl.previousPageLabel = '';
  paginatorIntl.getRangeLabel = spanishRangeLabel;
  
  return paginatorIntl;
}

