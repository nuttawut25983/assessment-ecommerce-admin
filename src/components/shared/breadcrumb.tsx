import React, { Fragment } from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import Link from 'next/link';

export type BreadcrumbProps = {
  pathName: string;
};

const PageBreadcrumb = ({ pathName }: BreadcrumbProps) => {
  const pathList: string[] = pathName.split('/').filter((path) => path !== '');

  return (
    <Breadcrumb className="hidden md:flex">
      <BreadcrumbList>
        {pathList.map((path, index) => {
          return (
            <Fragment key={`${path}-${index}`}>
              <BreadcrumbItem
                className={index === pathList.length - 1 && 'text-black'}
              >
                <BreadcrumbLink asChild>
                  <Link href={`/${path}`}>{path}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              {index === pathList.length - 1 ? null : <BreadcrumbSeparator />}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default PageBreadcrumb;
