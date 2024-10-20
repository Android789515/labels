import { type KeyboardEvent } from 'react';

export type LineFocusState = [
   'focus' | 'blur' | '',
   number,
];

export interface LineAction {
   key: string;
   onPress: (event: KeyboardEvent) => void;
   state: LineFocusState;
}
