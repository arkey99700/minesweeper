import { CSSProperties } from 'react';
import style from '../../assets/css/app.module.css';
import FieldTile from '../FieldTile/FieldTile';
import { MinefieldTile } from '../../lib/minefield';

type Props = {
  minefield: MinefieldTile[][];
};

export default function Field({ minefield }: Props) {
  const fieldTiles = minefield.map((row, rowIndex) =>
    row.map((tile, index) => (
      <FieldTile key={String(rowIndex) + index} tile={tile} />
    ))
  );

  return (
    <div
      id="minefield"
      className={`${style.field} ${style['field--' + minefield[0].length]} ${
        style.borderInset
      }`}
      style={
        {
          '--field-x': minefield[0].length,
          '--field-y': minefield.length,
        } as CSSProperties
      }
    >
      {fieldTiles}
    </div>
  );
}
