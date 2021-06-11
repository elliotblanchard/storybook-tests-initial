import useDimensions from '../useDimensions';

export default function useHeight() {
  const { width } = useDimensions();

  return width;
}
