import Image from 'next/image';

export default function LichImage(props: any) {
  return (
    <a href={`${props.src}?auto=format`} target="_blank" rel="noopener noreferrer"><Image {...props} alt="picture"/></a>
  );
}