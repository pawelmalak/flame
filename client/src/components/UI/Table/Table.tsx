import classes from './Table.module.css';

interface ComponentProps {
  children: JSX.Element | JSX.Element[];
  headers: string[];
  innerRef?: any;
}

const Table = (props: ComponentProps): JSX.Element => {
  return (
    <div className={classes.TableContainer} ref={props.innerRef}>
      <table className={classes.Table}>
        <thead className={classes.TableHead}>
          <tr>
            {props.headers.map((header: string, index: number): JSX.Element => (<th key={index}>{header}</th>))}
          </tr>
        </thead>
        <tbody className={classes.TableBody}>
          {props.children}
        </tbody>
      </table>
    </div>
  )
}

export default Table;