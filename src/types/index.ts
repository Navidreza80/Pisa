// Page props

export default interface PageProps {
  params: {
    [key: string]: string | string[] | undefined;
  };
}
