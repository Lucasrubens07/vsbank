import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

export interface Column<T> {
  key: keyof T;
  header: string;
  sortable?: boolean;
  render?: (value: T[keyof T], item: T) => React.ReactNode;
  width?: string;
}

export interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  sortColumn?: keyof T;
  sortDirection?: 'asc' | 'desc';
  onSort?: (column: keyof T) => void;
  className?: string;
  emptyMessage?: string;
}

export interface TableHeaderProps<T> {
  columns: Column<T>[];
  sortColumn?: keyof T;
  sortDirection?: 'asc' | 'desc';
  onSort?: (column: keyof T) => void;
}

export interface TableBodyProps<T> {
  data: T[];
  columns: Column<T>[];
  emptyMessage?: string;
}

const TableHeader = <T extends Record<string, any>>({
  columns,
  sortColumn,
  sortDirection,
  onSort
}: TableHeaderProps<T>) => {
  return (
    <thead className="bg-blue-600">
      <tr>
        {columns.map((column) => (
          <th
            key={String(column.key)}
            className={`
              px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider
              ${column.sortable ? 'cursor-pointer hover:bg-blue-500/80 transition-colors duration-200' : ''}
              ${column.width ? column.width : ''}
            `}
            onClick={() => column.sortable && onSort?.(column.key)}
          >
            <div className="flex items-center space-x-1">
              <span>{column.header}</span>
              {column.sortable && (
                <div className="flex flex-col">
                  <ChevronUp
                    className={`w-3 h-3 ${
                      sortColumn === column.key && sortDirection === 'asc'
                        ? 'text-white'
                        : 'text-blue-200'
                    }`}
                  />
                  <ChevronDown
                    className={`w-3 h-3 -mt-1 ${
                      sortColumn === column.key && sortDirection === 'desc'
                        ? 'text-white'
                        : 'text-blue-200'
                    }`}
                  />
                </div>
              )}
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
};

const TableBody = <T extends Record<string, any>>({
  data,
  columns,
  emptyMessage = 'Nenhum dado encontrado'
}: TableBodyProps<T>) => {
  if (data.length === 0) {
    return (
      <tbody>
        <tr>
          <td
            colSpan={columns.length}
            className="px-6 py-12 text-center text-gray-500 bg-gray-50"
          >
            {emptyMessage}
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody className="bg-white divide-y divide-gray-200">
      {data.map((item, index) => (
        <tr
          key={index}
          className="hover:bg-gray-50 transition-colors duration-200"
        >
          {columns.map((column) => (
            <td
              key={String(column.key)}
              className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
            >
              {column.render
                ? column.render(item[column.key], item)
                : String(item[column.key] || '')}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

const Table = <T extends Record<string, any>>({
  data,
  columns,
  sortColumn,
  sortDirection,
  onSort,
  className = '',
  emptyMessage
}: TableProps<T>) => {
  return (
    <div className={`overflow-hidden shadow-lg ring-1 ring-gray-200 rounded-xl ${className}`}>
      <table className="min-w-full divide-y divide-gray-200">
        <TableHeader
          columns={columns}
          sortColumn={sortColumn}
          sortDirection={sortDirection}
          onSort={onSort}
        />
        <TableBody
          data={data}
          columns={columns}
          emptyMessage={emptyMessage}
        />
      </table>
    </div>
  );
};

export default Table; 