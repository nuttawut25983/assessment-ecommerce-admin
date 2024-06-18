import React from 'react';
import { FileSliders, PackageSearch } from 'lucide-react';

export function getIcon(name: string) {
  switch (name) {
    case 'จัดการข้อมูลสินค้า':
      return <PackageSearch className="h-4 w-4" />;
    case 'แบรนด์':
      return <FileSliders className="h-4 w-4" />;
    default:
      return <PackageSearch className="h-4 w-4" />;
  }
}
