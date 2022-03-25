import { ReactNode } from 'react';
import classes from './CompactTable.module.css';

interface Props {
  headers: string[];
  children?: ReactNode;
}

export const CompactTable = ({ headers, children }: Props): JSX.Element => {
  return (
    <div
      className={classes.CompactTable}
      style={{ gridTemplateColumns: `repeat(${headers.length}, 1fr)` }}
    >
      {headers.map((h, idx) => (
        <span key={idx}>{h}</span>
      ))}

      <div
        className={classes.Separator}
        style={{ gridColumn: `1 / ${headers.length + 1}` }}
      ></div>

      {children}
    </div>
  );
};
