import React from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { DataTable } from '@/components/shared/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { CardHeaderType } from '@/components/shared/type';
import { ProductItemState } from '@/store/type/product';
import { MaterialItemState } from '@/store/type/material';
import { CoatingItemState } from '@/store/type/coating';
import { SpecialTechnicItemState } from '@/store/type/specialTechnic';
import PaginationTable from '@/components/shared/pagination-table';
import { OrderListItemState } from '@/store/type/order';
import { BrandItemState } from '@/store/type/brand';

interface CardTableDataProps {
  header: CardHeaderType;
  dada:
    | ProductItemState[]
    | BrandItemState[]
    | MaterialItemState[]
    | CoatingItemState[]
    | SpecialTechnicItemState[]
    | OrderListItemState[];
  columns: ColumnDef<any>[];
  fetch: (data?: any) => void;
}

const CardTableData = ({
  header,
  dada,
  columns,
  fetch,
}: CardTableDataProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{header.title}</CardTitle>
        <CardDescription>{header.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable data={dada} columns={columns} />
      </CardContent>
      <CardHeader>
        <PaginationTable fetch={fetch} />
      </CardHeader>
    </Card>
  );
};

export default CardTableData;
