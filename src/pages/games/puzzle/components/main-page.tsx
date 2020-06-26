import React, { useState, useEffect, useRef } from 'react';
import getPhrase from '../ts/api.phrase';
import RunPuzzle from './RunPuzzle';
import { Game, GameNode } from '../ts/Game';
import GameRounds from './main-page.rounds';
import '../dragHandler';

const MainPage = () => {
  const [level, setLevel] = useState('0');
  const [page, setPage] = useState('0');
  const [data, setData] = useState<null | GameNode>(null);
  const [dataRun, setDataRun] = useState(null);

  useEffect(() => {
    async function phrase() {
      const res = await getPhrase(level, page);
      setData(new Game(res));
      setDataRun(null);
    }
    phrase();
  }, [level, page]);

  const updateData = (value: any) => {
    if (value === 'get') {
      return data;
    }
    setDataRun(value);
    return 'set';
  };

  function handleChangeLevel(e: { target: HTMLSelectElement; }) {
    const { target } = e;
    setLevel(target.value);
  }

  function handleChangePage(e: { target: HTMLSelectElement; }) {
    const { target } = e;
    setPage(target.value);
  }

  if (data) {
    return (
      <div className="main-page">
        <nav className="main-page-nav">
          <div className="wrapper-level">
            <label htmlFor="level">
              Level:
              <select
                id="level"
                onChange={handleChangeLevel}
                className="select-level"
              >
                <option value="0">1</option>
                <option value="1">2</option>
                <option value="2">3</option>
                <option value="3">4</option>
                <option value="4">5</option>
                <option value="5">6</option>
              </select>
            </label>
          </div>
          <div className="wrapper-level-page">
            <label htmlFor="level-page">
              level page:
              <select
                id="level-page"
                onChange={handleChangePage}
                className="select-level-page"
              >
                <option value="0">1</option>
                <option value="1">2</option>
                <option value="2">3</option>
                <option value="3">4</option>
                <option value="4">5</option>
                <option value="5">6</option>
                <option value="6">7</option>
                <option value="7">8</option>
                <option value="8">9</option>
                <option value="9">10</option>
                <option value="10">11</option>
                <option value="11">12</option>
                <option value="12">13</option>
                <option value="13">14</option>
                <option value="14">15</option>
                <option value="15">16</option>
                <option value="16">17</option>
                <option value="17">18</option>
                <option value="18">19</option>
                <option value="19">20</option>
                <option value="20">21</option>
                <option value="21">22</option>
                <option value="22">23</option>
                <option value="23">24</option>
                <option value="24">25</option>
                <option value="25">26</option>
                <option value="26">27</option>
                <option value="27">28</option>
                <option value="28">29</option>
                <option value="29">30</option>
              </select>
            </label>
          </div>
          <div className="wrapper-prompt">
            <div className="audio-prompt prompt" title="on / off audio prompt" />
            <div className="translate-prompt prompt" title="on / off translate prompt" />
            <div className="volume-prompt prompt" title="on / off volume prompt" />
            <div className="image-card-prompt prompt" title="on / off card image prompt" />
            <div className="image-all-prompt prompt" title="on / off cell image prompt" />
          </div>
        </nav>
        {dataRun && <GameRounds data={dataRun} />}
        <div className="wrapper-game">
          <RunPuzzle updateData={updateData} />
        </div>
      </div>
    );
  }
  return <div>Loading...</div>;
};

export default MainPage;
