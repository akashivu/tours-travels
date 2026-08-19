interface Props {
  children: React.ReactNode;
}

export function AIResponseIntro({ children }: Props) {
  return (
    <p
      className="max-w-[760px] text-[15.5px] leading-[1.75] tracking-[-0.005em]"
      style={{ color: "#4F4F4A" }}
    >
      {children}
    </p>
  );
}
