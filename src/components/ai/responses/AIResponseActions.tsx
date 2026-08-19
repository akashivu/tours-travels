interface Action {
  label: string;
  prompt: string;
}

interface Props {
  actions: Action[];
  onAction?: (prompt: string) => void;
}

export function AIResponseActions(_props: Props) {
  return null;
}