type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

function page({ searchParams }: Props) {
  const searchTerm = searchParams.search;
  return <div>{searchTerm}</div>;
}
export default page;
