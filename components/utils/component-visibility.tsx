interface IProps {
  show: boolean;
  children: React.ReactNode;
}

export default function ComponentVisiblity({ show, children }: IProps) {
  // Displays component is some condition is true

  if (!show) return null;
  return <>{children}</>;
}
