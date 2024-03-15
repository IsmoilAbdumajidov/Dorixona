import React from "react";
import { HiOutlineBars3 } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";

const DropCateory = ({ category,dropRef,inputRef }) => {
  // const navigate = 
  const [_,setParam] = useSearchParams()
  const selectHandler = (e)=>{
    inputRef.current.value=""
    if (e.target.value ==="all") {
      setParam({})
    }
    else{
      setParam({filter:`${e.target.value}`})
    }
  }


  // console.log(category);
  return (
    <div className="flex items-center justify-center text-[#008eda]">
      <span>
        <HiOutlineBars3 className="w-6 h-6" />
      </span>
      <select ref={dropRef} onChange={selectHandler} className="rounded-md py-2 text-sm capitalize px-3 w-full border-none text-[#008eda]">
        {
          category?.map((item,i)=>(
            <option key={i} className='w-full text-[#008eda] ' value={item.slug}>{item.name}</option>   
          ))
        }
      </select>
    </div>
  );
};

export default DropCateory;
