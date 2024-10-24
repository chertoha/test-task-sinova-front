export interface Pageable<T> {
 data: T[];
 page: number;
 limit: number;
 totalElements: number;
}
