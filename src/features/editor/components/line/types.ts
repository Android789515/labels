import { type Dispatch, type SetStateAction, type KeyboardEvent } from 'react';

import { type UUID } from 'types'

export interface Line {
   id: UUID;
   content: string;
   number: number;
}

export type SetLines = Dispatch<SetStateAction<Line[]>>;

export type KeyHandler = (event: KeyboardEvent) => void;

export interface KeyMap {
   [key: string]: KeyHandler
}
