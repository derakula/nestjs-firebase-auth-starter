export interface PaginationResultInterface<PaginationEntity> {
  records: PaginationEntity[];
  total: number;
  next?: string;
  previous?: string;
}
