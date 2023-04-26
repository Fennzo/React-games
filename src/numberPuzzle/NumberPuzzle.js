import React, { useState,useEffect } from "react";
import { useDrag, useDrop } from "react-dnd";

const NumberPuzzle = ({shuffle2darray}) => {

    const [numbers, setNumbers] = useState([]);

    useEffect(() => {
        // Shuffle the numbers once when the component is mounted for the first time
        const shuffledNumbers = shuffle2darray([
            [1, 2, 3, 4],
            [5, 6, 7, 8],
            [9, 10, 11, 12],
            [13, 14, 15, -1],
        ]);
        setNumbers(shuffledNumbers)
    }, []);

    const handleDragEnd = (source, destination) => {
        // console.log("source", source)
        // console.log("destination", destination)
        const source_row = source.row
        const source_col = source.col
        const destination_row = destination[0]
        const destination_col = destination[1]
        //console.log(source_col, source_row, destination_col, destination_row)
        if (!((source_row === destination_row && source_col === destination_col-1) ||
            (source_row === destination_row+1 && source_col === destination_col) ||
            (source_row === destination_row && source_col === destination_col+1) ||
            (source_row === destination_row-1 && source_col === destination_col))){
           // console.log("Not adjacent cell!")
            return;
        }


        const newNumbers = numbers.map((row) => [...row]);
        // Swap the numbers in the source and destination cells
        const temp = newNumbers[source_row][source_col];
        newNumbers[source_row][source_col] = newNumbers[destination_row][destination_col];
        newNumbers[destination_row][destination_col] = temp;
        setNumbers(newNumbers);

        let counter = 1;
        for ( let i = 0; i < numbers.length; i++){
            for ( let j = 0; j < numbers[i].length; j++){
                if ( numbers[i][j] === counter)
                    counter++
                else
                    return;
            }
        }

        if(counter === 16){
            alert("You win!")
            window.location.reload();
        }
    };

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            Instructions: Solve the puzzle by displaying the cells in ascending order from 1 to 15 and ensure the last cell is the empty cell
            {numbers.map((row, rowIndex) => (
                <div key={rowIndex} style={{ display: "flex" }}>
                    {row.map((number, colIndex) => (
                        <Cell
                            key={colIndex}
                            row={rowIndex}
                            col={colIndex}
                            number={number}
                            handleDragEnd={handleDragEnd}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};

// cell

const Cell = ({ row, col, number, handleDragEnd }) => {
    const [{ isDragging }, drag] = useDrag({
        type: "cell",
        item: { row, col } ,
        canDrag: () => number !== -1,
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        }),
    });

    const [{ canDrop, isOver }, drop] = useDrop({
        accept: "cell",
        canDrop: () => number === -1,
        drop: (item) =>handleDragEnd(item, [row, col]),
        collect: (monitor) => ({
            canDrop: !!monitor.canDrop(),
            isOver: !!monitor.isOver()
        })
    });

    return (
        <div
            ref={drop}
            style={{
                width: "60px",
                height: "60px",
                margin: "5px",
                backgroundColor: isOver ? (canDrop ? "lightblue" : "red") : "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid black",
                cursor: "move",
                opacity: isDragging ? 0.5 : 1,
                transition: "opacity 0.2s"
            }}
        >
            <div ref={drag} style={{ opacity: number === -1 ? 0 : 1 }}>
                {number === -1 ? "" : number}
            </div>
        </div>
    );
};

export default NumberPuzzle;
