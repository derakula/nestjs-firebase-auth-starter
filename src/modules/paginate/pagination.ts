import { PaginationResultInterface } from './pagination.results.interface';

export class Pagination<PaginationEntity> {
  public records: PaginationEntity[];
  public page_total: number;
  public total: number;

  constructor(paginationResults: PaginationResultInterface<PaginationEntity>) {
    this.records = paginationResults.records;
    this.page_total = paginationResults.records.length;
    this.total = paginationResults.total;
  }
}
