export interface LineAction {
   key: string;
   onPress: () => void;
   state: 'focusPrev' | 'blurCurrent' | '';
}
