import React, { Component } from "react";
import ReactDOM from "react-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// Fake data generator
const getItems = (count) =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `item-${k}`,
    imageURL:
      "https://ci3.googleusercontent.com/meips/ADKq_NZoNSsoeca5R2ZpTjzU_Hqc43Te1lWRCPqEyKFsR4hpWr-Z3yQ0bj0_as8Qrs6r8tlw7rIh5UsZ-ScBTfj2KplVDdSHoLYw3aVpTfjVokSIbnP3aWd6jCnXkvAv=s0-d-e1-ft#https://news.bundesliga.com/imgproxy/img/2041575200/xavi_wittz_600.jpg", // Ensure this key is consistent with the usage in the render method
    header: "Hey Moksh,",
    content:
      "Subplots abound when RB Leipzig host Bundesliga leaders Bayer Leverkusen in Matchday 18's headline fixture on Saturday. Can Leipzig get back on track? Will Leverkusen stay unbeaten? Who will win out between respective December Rookie and Player of the Month winners Xavi and Florian Wirtz? You do not want to miss it!",
  }));

// Function to reorder the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle, height = 568) => ({
  // Styles for each item
  userSelect: "none",
  padding: grid,
  height: `${height}px`,
  margin: `0 0 ${grid}px 0`,
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start", // Align items to the start vertically
  alignItems: "flex-start", // Align items to the start horizontally
  background: isDragging ? "lightgreen" : "white",
  ...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 600,
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: getItems(10),
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    );
    this.setState({ items });
  }

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {this.state.items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      <img
                        src={item.imageURL} // Make sure this matches the key in getItems
                        alt={`Item ${index}`}
                        style={{
                          width: "100%",
                          height: "auto",
                          maxHeight: "300px",
                        }}
                      />
                      <div style={{ textAlign: "center", width: "100%" }}>
                        {" "}
                        {/* Centered text container */}
                        <h2
                          style={{
                            marginTop: "38px 0",
                            marginBottom: "20px 0",
                          }}
                        >
                          {item.header}
                        </h2>
                        <p
                          style={{
                            fontFamily: "DFL-Rg, sans-serif",
                            fontSize: "16px",
                            textAlign: "left",
                            lineHeight: "26px",
                            padding: "0px 50px",
                            color: "rgb(100,104,108)",
                          }}
                        >
                          {item.content}
                        </p>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

export default App; // Exporting the correct component
