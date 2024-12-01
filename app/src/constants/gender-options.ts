import { QSelectOption } from 'quasar';
import { Gender } from 'src/enums/gender';

export const genderOptions: QSelectOption<string>[] = [
  { label: 'Male', value: Gender.Male },
  { label: 'Female', value: Gender.Female },
];
