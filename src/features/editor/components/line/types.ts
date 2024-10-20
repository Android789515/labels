export type LineFocusState = [
   'focus' | 'blur' | '',
   number,
];

export interface LineAction {
   key: string;
   onPress: () => void;
   state: LineFocusState;
}
