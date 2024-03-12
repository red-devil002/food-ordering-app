import ChevronDown from "@/components/icons/ChevronDown";
import ChevronUp from "@/components/icons/ChevronUp";
import Plus from "@/components/icons/Plus";
import Trash from "@/components/icons/Trash";
import {useState} from "react";

export default function MenuItemPriceProps({name,addLabel,props,setProps}) {

  const [sizes, setSizes] = useState([]);



  function addProp() {
    setProps(oldProps => {
      // Check if oldProps is an array before spreading
      if (!Array.isArray(oldProps)) {
        // If not an array, initialize it as an empty array
        oldProps = [];
      }
      return [...oldProps, { name: '', price: 0 }];
    });
  }
  function editProp(ev, index, prop) {
    const newValue = ev.target.value;
    setProps(prevSizes => {
      const newSizes = [...prevSizes];
      newSizes[index][prop] = newValue;
      return newSizes;
    });
  }

  function removeProp(indexToRemove) {
    setProps(prev => prev.filter((v,index) => index !== indexToRemove));
  }

  return (
    <div className="bg-gray-300 mt-4 p-2 rounded-lg mb-2">
      <label>{name}</label>
        {props?.length > 0 && props.map((size, index) => (
        <div className="flex items-end gap-2">
          <div>
            <label>Name</label>
            <input className="bg-gray-100 w-full mt-2 rounded-lg px-4 py-1" type="text" placeholder="Size name" 
                    value={size.name}
                    onChange={ev => editProp(ev, index, 'name')} />
            </div>
            <div>
              <label>Extra Price</label>
              <input className="bg-gray-100 w-full mt-2 rounded-lg px-4 py-1" type="text" placeholder="Extra Price" 
                      value={size.price}
                      onChange={ev => editProp(ev, index, 'price')} />
            </div>
            <div>
              <button type="button" className="bg-white w-full rounded-lg px-4 py-1"
                    onClick={() => removeProp(index)}>
                      <Trash />
              </button>
            </div>
          </div>
        ))}
        <button type="button" onClick={addProp} className="bg-white flex items-center justify-center w-full mt-2 rounded-lg px-4 py-1">
          <Plus className="w-4 h-4" />
            <span>
                {addLabel}
            </span>
        </button>
    </div>
  );
}