export interface Pageable<T> {
  data: T[];
  page: number;
  limit: number;
  totalElements: number;
}

export type UploadFileResponse = {
  src: string;
};
