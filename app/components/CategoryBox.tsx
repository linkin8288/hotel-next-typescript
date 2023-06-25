'use client';

// import router to link to separate route.
// Query strings are a way to pass data in the form of key-value pairs within a URL.
// Query Logic

import qs from 'query-string';
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { IconType } from "react-icons";

interface CategoryBoxProps {
  icon: IconType,
  label: string;
  selected?: boolean;
}

// use Icon as a component
const CategoryBox: React.FC<CategoryBoxProps> = ({
  icon: Icon,
  label,
  selected,
}) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    let currentQuery = {};

    // add params of string to query object
    if (params) {
      currentQuery = qs.parse(params.toString())
    }

    // a new object updatedQuery is created by spreading the 
    // properties of currentQuery and adding or updating the 
    // category property with the value of the label variable.
    const updatedQuery: any = {
      ...currentQuery,
      category: label
    }

    // remove the query if the query has already existed
    if (params?.get('category') === label) {
      delete updatedQuery.category;
    }

    // creates a URL string by combining the base URL '/' with 
    // the updated query parameters stored in the updatedQuery object. 
    const url = qs.stringifyUrl({
      url: '/',
      query: updatedQuery
    }, { skipNull: true });

     // The resulting URL string is then passed to router.push(url) to navigate to the specified URL
    router.push(url);
  }, [label, router, params]);

  return (
    // render CSS check if the page url is the main page with Categories component  
    <div
      onClick={handleClick}
      className={`
        flex 
        flex-col 
        items-center 
        justify-center 
        gap-2
        p-3
        border-b-2
        hover:text-neutral-800
        transition
        cursor-pointer
        ${selected ? 'border-b-neutral-800' : 'border-transparent'}
        ${selected ? 'text-neutral-800' : 'text-neutral-500'}
      `}
    >
      <Icon size={26} />
      <div className="font-medium text-sm">
        {label}
      </div>
    </div>
   );
}
 
export default CategoryBox;