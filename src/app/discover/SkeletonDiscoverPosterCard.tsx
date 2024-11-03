import { Card, CardHeader, CardBody, CardFooter, Skeleton } from "@nextui-org/react";

export const SkeletonDiscoverPosterCard = () => {
  return (
    <Card fullWidth shadow="md">
      <CardHeader className="flex content-center justify-center">
        <Skeleton className="aspect-[2/3] max-h-max w-full rounded-lg" />
      </CardHeader>
      <CardBody className="gap-3 overflow-visible py-2">
        <Skeleton className="h-3 w-full rounded-full" />
      </CardBody>
      <CardFooter className="justify-between">
        <Skeleton className="h-3 w-12 rounded-full" />
        <Skeleton className="h-3 w-12 rounded-full" />
      </CardFooter>
    </Card>
  );
};
