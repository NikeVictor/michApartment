import { PageableModel, PageData, Paginated } from "../types/pagination";
import Phone from "../types/phone";
import { FindAndCountOptions, Model as SeqModel } from "sequelize/types";
import { Op } from "sequelize";
interface Model {
    set: (key: string, val: any) => void;
}
export function updateModel<T extends Model, D>(data: D, model: T) {
    Object.entries(data as Record<string, unknown>).forEach(([key, val]: any[]) => {
        model.set(key, val);
    });
    return model;
}

export function isUUID(str: string) {
    const regexExp =
        /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

    return regexExp.test(str);
}

/**
 *
 * @param model
 * @param options
 * @param pageData containing limit and number of pages. If the value of pageData.limit is -1 this function returns all rows that match
 * @returns Promise<Paginated>
 */
export async function paginate<M extends SeqModel>(
    model: PageableModel<M>,
    options: FindAndCountOptions<M["_attributes"]>,
    pageData: PageData
): Promise<Paginated<M>> {
    const { page } = pageData;
    const normalized =
        pageData.limit == -1
            ? ({} as { limit: number; offset: number })
            : normalizePageData(pageData);

    const _count = model.count({ ...normalized, ...options });
    const _rows = model.findAll({ ...normalized, ...options });

    const [count, rows] = await Promise.all([_count, _rows]);
    const totalPagesCount = normalized.limit
        ? totalPages(count, normalized.limit)
        : count;
    return {
        data: rows as any,
        total: count,
        ...pageMeta(page as number, totalPagesCount),
    };
}

function pageMeta(page: number, total: number) {
    const nextPage = page < total ? page + 1 : undefined;
    const previousPage = page > 1 ? page - 1 : undefined;
    return {
        nextPage,
        previousPage,
        currentPage: page,
        numberOfPages: total,
    };
}

function totalPages(count: number, limit: number) {
    return Math.ceil(count / limit);
}

function normalizePageData({ limit, page }: PageData) {
    const normalLimit = limit || 20;
    const normalPage = page?? 1;
    return {
      limit: normalLimit,
      offset: normalPage * normalLimit - normalLimit,
    };
  }

export function buildPhoneNumber(phone: Phone) {
    return `${phone?.dialCode ?? ""}${phone?.number ?? ""}`;
}

export function buildComparator(q: string) {
    const query = `%${q}%`;
    const comparator = { [Op.iLike]: query };
    return comparator;
}

export function transformPagedData<TInput, TOutput>(
    paged: Paginated<TInput>,
    mapper: (val: TInput) => TOutput
): Paginated<TOutput> {
    return {
        ...paged,
        data: paged.data.map(mapper),
    };
}
