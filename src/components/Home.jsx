import React, { useEffect, useState } from "react";

// to get the data from localstrorage

const getLocalItems = () => {
  let list = localStorage.getItem('lists');
  if(list){
    return JSON.parse(localStorage.getItem('lists'));
  }
  else{
    return [];
  }
}

export const Home = () => {
  let nextId = 0;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [array, setArray] = useState(getLocalItems());

  const handleArrays = () => {
    setArray([
      ...array,
      { id: nextId++, title: title, description: description, checked: false },
    ]);
    setTitle("");
    setDescription("");
  };

  const handleDelete = (id) => {
    const updatedArray = array.filter((item, ind) => {
      return id != ind;
    });
    setArray(updatedArray);
  };

  const handleCheck = (id) => {
    const updatedArray = array.map((item, ind) => {
      if (id == ind) {
        return { ...item, checked: !item.checked };
      }
      return item;
    });
    setArray(updatedArray);
  }

  useEffect(() => {
    localStorage.setItem('lists',JSON.stringify(array));
  }, [array])
  




return (
  <div className="home w-sceen min-h-screen bg-[#EADDCA]">
    <div className="flex flex-col gap-20 items-center">
      {/* Header */}
      <div className="flex justify-between items-center mt-5 w-full">
        <div className="sm:ml-10 ml-4">
          <h1 className="text-4xl text-[#05386b]">TASK MANAGER</h1>
        </div>
        <div className="sm:mr-10 mr-4">
          <a href="#tasks">
            <button className="px-4 py-2 bg-[#05386b] mr-4 rounded-lg text-white">
              TASKS
            </button>
          </a>
        </div>
      </div>

      {/* Main Section*/}
      <div className="sm:w-[50%] bg-[#5CDB95] px-10 py-20 rounded-xl">
        <div className="flex flex-col justify-center gap-10">
          <input
            type="text"
            className="w-full h-8 bg-[#1e3d59] text-white px-3 py-2"
            placeholder="Enter Title for your Task..."
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            cols={30}
            rows={5}
            className="bg-[#1e3d59] text-white px-3 py-2"
            placeholder="Enter description of the above task..."
            value={description}
          ></textarea>
          <button
            className="ml-5 rounded-full p-2 bg-[#1e3d59] text-white border-4 border-[white]"
            onClick={handleArrays}
          >
            Add
          </button>
        </div>
      </div>
    </div>

    {/* display tasks */}
    <div id="tasks" className="flex flex-col mt-20">
      {array.map((item, ind) => {
        return (
          <div className=" bg-[#5CDb95] px-10 pt-8 mx-auto sm:w-[50%] rounded-md">
            <div className={'text-2xl text-white font-bold'}>
              {item.title}
            </div>
            <div className=" text-xl bg-[#1e3d59] pb-2 my-3 px-2 py-2 flex items-center" key={ind}>
              <input type="checkbox" defaultChecked={item.checked} onClick={() => handleCheck(ind)} className="mr-4 items-center" />
              <div className="w-[90%]" key={ind}>
                <div className={`${ item.checked ? "line-through text-white break-words" : "text-[#EDE5E1] text-lg break-words"}`}>
                  {item.description}
                </div>
              </div>
              <i
                className="fa-solid fa-trash fa cursor-pointer"
                style={{ color: "#ffffff" }}
                title="Delete item"
                onClick={() => handleDelete(ind)}
              ></i>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);}
      
