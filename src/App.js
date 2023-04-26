import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import NumberPuzzle from './numberPuzzle/NumberPuzzle';
import TowersOfHanoi  from './towersOfHanoi/TowersOfHanoi';
import React from 'react';
import {DndProvider} from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
class App extends React.Component {

    // shuffle numbers in numberpuzzle
    shuffle2darray(numbers){
        let randomI = -1
        let randomJ = -1

        for ( let i = 0; i < numbers.length; i++){
            for ( let j = 0; j < numbers[i].length; j++){
                while(randomI !== i && randomJ !== j){
                    randomI = Math.floor(Math.random()*4)
                    randomJ = Math.floor(Math.random()*4)
                }

                const holder = numbers[randomI][randomJ]
                numbers[randomI][randomJ] = numbers[i][j]
                numbers[i][j] = holder

                randomI = -1
                randomJ = -1
            }
        }

        return numbers
    }
    render() {
        return (
            <div className="App">
                <h1>Choose a game</h1>
                <Router>
                    <nav>
                        <ul>
                            <li>
                                <Link to="/numberPuzzle">Number Puzzle</Link>
                            </li>
                            <li>
                                <Link to="/towersOfHanoi">Towers of Hanoi</Link>
                            </li>
                        </ul>
                    </nav>
                    <Routes>
                        <Route path="/numberPuzzle" element={
                            <DndProvider backend={HTML5Backend}>
                                <NumberPuzzle shuffle2darray={this.shuffle2darray} />
                            </DndProvider>
                            } />

                        <Route path="/towersOfHanoi" element={
                            <DndProvider backend={HTML5Backend}>
                                <TowersOfHanoi />
                            </DndProvider>
                        } />

                    </Routes>
                </Router>
            </div>
        );
    }
}

export default App;
