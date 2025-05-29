import { Size } from "@/types";
import qs from "query-string";

interface Query {
  department?: "Male" | "Female";
}

const URL = `${process.env.NEXT_PUBLIC_API_URL}/sizes`;
const getSizes = async (query: Query): Promise<Size[]> => {
  const url = qs.stringifyUrl({
    url: URL,
    query: {
      department: query.department,
    },
  });
  const resp = await fetch(`${url}`);
  return resp.json();
};

export default getSizes;
