export interface IAppProps {
  url: string;
  className: string;
}

export default function Image({ url, className }: IAppProps) {
  return <img className={className} src={url} alt="Product Image" />;
}
