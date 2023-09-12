"use client";
import { useState } from "react";
import { TPaginateMeta, TPaginateOptions } from "types/pagination.type";
import { debounce } from "lodash";
import { Input } from "@components/ui/input";
import { TExpertQuery } from "types/expert.type";
import useExpert from "@hooks/useExpert";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@components/ui/card";
import { Button } from "@components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Expert = () => {
  const router = useRouter();
  const [query, setQuery] = useState<TExpertQuery>({
    page: 1,
    limit: 2,
  });
  const {
    data: expertResponse,
    isLoading,
    refetch,
  } = useExpert().getExpertList(query);

  const debouncedSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery((pre) => ({ ...pre, search_term: e.target.value.toLowerCase() }));
    refetch();
  };

  const debouncedOnChange = debounce(debouncedSearch, 300);

  const Paginate = (meta: TPaginateMeta) => {
    const { currentPage, itemCount, itemsPerPage, totalItems, totalPages } =
      meta;

    const totalPagesArr = new Array(totalPages)
      .fill(0)
      .map((_, idx) => idx + 1);

    return (
      <div className="flex items-center">
        <Button
          variant="secondary"
          className="mx-1 hover:bg-inherit"
          onClick={() => setQuery((pre) => ({ ...pre, page: currentPage - 1 }))}
          disabled={currentPage === 1}
        >
          <span className="">{`<`}</span>
        </Button>
        {totalPagesArr.map((page) => (
          <Button
            key={page}
            variant="secondary"
            className={`mx-1 hover:bg-inherit ${
              currentPage === page && "bg-primary"
            }`}
            onClick={() => setQuery((pre) => ({ ...pre, page }))}
          >
            {page}
          </Button>
        ))}
        <Button
          variant="secondary"
          className="mx-1 hover:bg-inherit"
          onClick={() => setQuery((pre) => ({ ...pre, page: currentPage + 1 }))}
          disabled={currentPage === totalPages}
        >
          <span className="">{`>`}</span>
        </Button>
      </div>
    );
  };

  return (
    <div className="grid gap-4">
      <h4 className="text-xl text-foreground font-semibold">Expert</h4>
      <Input
        placeholder="Search expert"
        onChange={(e) => debouncedOnChange(e)}
      />
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
        {expertResponse?.data.items.map((expert) => (
          <Card key={expert.id}>
            <CardHeader>
              <CardTitle className="line-clamp-1">{expert.name}</CardTitle>
              <CardDescription className="line-clamp-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam,
                nam tenetur, laborum error officiis totam mollitia amet ipsa
                exercitationem quaerat porro dignissimos, saepe ducimus velit
                repellat facilis quidem nulla quibusdam?
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Image
                className="mx-auto"
                width={200}
                height={200}
                alt="expert photo"
                src={
                  expert && expert.photoUrl
                    ? expert.photoUrl
                    : "/assets/200.svg"
                }
              />
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button
                variant="secondary"
                onClick={() => router.push(`/expert/${expert.id}`)}
              >
                reserve
              </Button>
            </CardFooter>
          </Card>
        ))}
      </section>
      <section>
        {expertResponse?.data.meta && <>{Paginate(expertResponse.data.meta)}</>}
      </section>
    </div>
  );
};

export default Expert;
