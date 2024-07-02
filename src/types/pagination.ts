import {
    FindAndCountOptions,
    Model,
    CountOptions,
    FindOptions,
    ModelType,
  } from "sequelize/types";
  
  export interface PageableModel<M> {
    findAndCountAll<M extends Model>(
      options?: FindAndCountOptions<M["_attributes"]>
    ): Promise<{ rows: M[]; count: number }>;
  
    findAll<M extends Model>(
      options?: FindOptions<M["_attributes"]>
    ): Promise<M[]>;
  
    count<M extends Model>(
      options?: CountOptions<M["_attributes"]>
    ): Promise<number>;
  
    unscoped<M extends ModelType>(): any;
  }
  
  export interface PageData {
    page?: number;
    limit?: number;
  }
  
  export interface Paginated<T> {
    numberOfPages: number;
    nextPage?: number;
    previousPage?: number;
    currentPage: number;
    total: number;
    data: T[];
  }
  