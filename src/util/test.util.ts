import { MongoPagination } from '@algoan/nestjs-pagination';

export const createEmptyPagination = (): MongoPagination => {
  return { filter: {}, limit: 100, skip: 0, project: {}, sort: {} };
};
