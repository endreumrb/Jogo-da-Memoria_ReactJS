import { useEffect, useState } from 'react';
import * as C from './App.styles';
import logoImage from './assets/devmemory_logo.png';
import RestartIcon from './svgs/restart.svg';
import { InfoItem } from './components/InfoItem/index';
import { Button } from './components/Button';
import { GridItem } from './components/gridItem';
import { GridItemType } from './types/GridItemType';
import { formatTimeElapsed } from './helpers/formatTimeElapsed';
import { items } from './data/items';

const App = () => {
  const [playing, setPlaying] = useState<boolean>(false);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [moveCount, setMoveCount] = useState<number>(0);
  const [showCount, setShowCount] = useState<number>(0);
  const [gridItems, setGridItems] = useState<GridItemType[]>([]);

  useEffect(() => resetAndCreateGrid(), []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (playing) {
        setTimeElapsed(timeElapsed + 1);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [playing, timeElapsed]);

  const resetAndCreateGrid = () => {
    // 1º - Resetar o jogo
    setTimeElapsed(0);
    setMoveCount(0);
    setShowCount(0);

    // 2º - Criar o grid
    let tmpGrip: GridItemType[] = [];
    for (let i = 0; i < items.length * 2; i++) {
      tmpGrip.push({
        item: null,
        shown: false,
        permanentShown: false,
      });
    }

    for (let w = 0; w < 2; w++) {
      for (let i = 0; i < items.length; i++) {
        let pos = -1;
        while (pos < 0 || tmpGrip[pos].item !== null) {
          pos = Math.floor(Math.random() * (items.length * 2));
        }
        tmpGrip[pos].item = i;
      }
    }

    setGridItems(tmpGrip);

    // 3º - Começar o jogo
    setPlaying(true);
  };

  const handleItemClick = (index: number) => {};

  return (
    <C.Container>
      <C.Info>
        <C.LogoLink href=''>
          <img src={logoImage} width='200' alt='' />
        </C.LogoLink>
        <C.InfoArea>
          <InfoItem label='Tempo' value={formatTimeElapsed(timeElapsed)} />
          <InfoItem label='Movimentos' value='0' />
        </C.InfoArea>
        <Button
          label='Reiniciar'
          icon={RestartIcon}
          onClick={resetAndCreateGrid}
        />
      </C.Info>
      <C.GridArea>
        <C.Grid>
          {gridItems.map((item, index) => (
            <GridItem
              key={index}
              item={item}
              onClick={() => handleItemClick(index)}
            />
          ))}
        </C.Grid>
      </C.GridArea>
    </C.Container>
  );
};

export default App;
