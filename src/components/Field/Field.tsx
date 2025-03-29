import { CSSProperties, memo } from 'react';
import style from '../../assets/css/app.module.scss';
import FieldTile from '../FieldTile/FieldTile';
import { MinefieldTile } from '../../lib/minefield';

type Props = {
  minefield: MinefieldTile[][];
};

function Field({ minefield }: Props) {
  const fieldTiles = minefield.map((row, rowIndex) =>
    row.map((tile, index) => (
      <FieldTile
        key={`${rowIndex}:${index}`}
        isRevealed={tile.isRevealed}
        isMined={tile.isMined}
        isFlagged={tile.isFlagged}
        number={tile.number}
        x={tile.x}
        y={tile.y}
      />
    ))
  );

  return (
    <div
      id="minefield"
      className={`${style.field} ${style.borderInset}`}
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

export default memo(Field, (a, b) => JSON.stringify(a) === JSON.stringify(b));
