export interface Query {
    [key: string]: string | string[] | undefined
}

export type TSearchParams = Promise<{
    [key: string]: string | string[] | number | undefined;
}>;

export type ChangeInput =
    | React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    | { name: string; value: string };