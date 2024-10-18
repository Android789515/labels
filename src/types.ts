import { type Dispatch, type SetStateAction } from 'react';

export type ClassName = string;

export type UUID = string;

export interface Label {
   id: UUID;
   text: string;
   amount: number;
}

export type SetLabels = Dispatch<SetStateAction<Label[]>>;
