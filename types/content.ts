

export interface TContent {
    id: number;
    key: string;
    title: string;
    content: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export type TContents = TContent[];