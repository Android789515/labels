export interface LineAction {
   key: string;
   onPress: () => void;
   state: [
      'focus' | 'blur',
      number,
   ];
}
