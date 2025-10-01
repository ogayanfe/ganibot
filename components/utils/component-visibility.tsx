interface IProps {
  show: boolean;
  children: React.ReactNode;
}

export default function ComponentVisiblity({ show, children }: IProps) {
  if (!show) return null;
  return <>{children}</>;
}
