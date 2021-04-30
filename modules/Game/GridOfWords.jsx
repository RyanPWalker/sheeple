import React, { useMemo } from 'react';
import Table from 'react-bootstrap/Table';
import useIsMobile from '../../hooks/useIsMobile';
import styles from './game.module.scss';

const toMatrix = (arr, width) =>
  arr.reduce(
    (rows, key, index) => (index % width == 0 ? rows.push([key]) : rows[rows.length - 1].push(key)) && rows,
    []
  );

const gameColumns = ['', 'A', 'B', 'C', 'D'];
const gameColumnsMobile = ['', 'A', 'B'];

const GridOfWords = ({ gameState, isChameleon }) => {
  const { grid, gridTitle, keyWord } = gameState;
  const isMobile = useIsMobile();
  const fourByFour = useMemo(() => toMatrix(grid, isMobile ? 2 : 4), [grid, isMobile]);
  const tableHeaders = isMobile ? gameColumnsMobile : gameColumns;
  return (
    <>
      <div className={styles['table-title']}>
        <h2>{gridTitle}</h2>
        <h5>{isChameleon ? 'You are the Chameleon!' : `Keyword: ${keyWord}`}</h5>
      </div>
      <Table variant="light" className={styles['grid-table']}>
        <thead>
          <tr>
            {tableHeaders.map((col, i) => (
              <th key={i}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {fourByFour.map((matrix, i) => (
            <tr key={i}>
              <td className={styles['table-vertical']}>{i + 1}</td>
              {matrix.map((word) => (
                <td key={word} className={keyWord === word && !isChameleon ? styles['key-word'] : ''}>
                  {word}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default GridOfWords;
