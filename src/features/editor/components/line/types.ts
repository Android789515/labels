import { type Dispatch, type SetStateAction, type KeyboardEvent } from 'react';

import { type UUID } from 'types'

export interface Line {
   id: UUID;
   number: number;
   active: boolean;
   content: string;
   cursorPosition: number;
}

export type SetLines = Dispatch<SetStateAction<Line[]>>;

export type PreventDefault = boolean;
export type KeyHandler = (event: KeyboardEvent) => PreventDefault;

export interface KeyMap {
   [key: string]: KeyHandler
}
