import { QSelectOption } from 'quasar';
import { Mood } from 'src/enums/mood';

type Option = QSelectOption<string> & {
  icon?: string;
};
export const moodOptions: Option[] = [
  { label: 'All', value: Mood.All, icon: '🌍' },
  { label: 'Happy', value: Mood.Happy, icon: '😊' },
  { label: 'Calm', value: Mood.Calm, icon: '😌' },
  { label: 'Excited', value: Mood.Excited, icon: '🤩' },
  { label: 'Relaxed', value: Mood.Relaxed, icon: '😌' },
  { label: 'Grateful', value: Mood.Grateful, icon: '🙏' },
  { label: 'Sad', value: Mood.Sad, icon: '😢' },
  { label: 'Irritable', value: Mood.Irritable, icon: '😡' },
  { label: 'Anxious', value: Mood.Anxious, icon: '😰' },
  { label: 'Bored', value: Mood.Bored, icon: '🥱' },
  { label: 'Lonely', value: Mood.Lonely, icon: '😔' },
];
