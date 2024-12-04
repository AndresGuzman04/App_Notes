import React from 'react'
import { IoMdClose } from 'react-icons/io'
import { FaMagnifyingGlass } from 'react-icons/fa6'

const SearchBar = ({value, onChange, onClearSearch, hanleSearch}) => {
  return (
    <div className="w-80 flex items-center px-4 bg-slate-100 rounded-md">
        <input 
            type="text"
            placeholder='Search Notes'
            className="w-full text-xs bg-transparent py-[11px] outline-none"
            value={value}
            onChange={onChange}
        />

        {value && (<IoMdClose
        className="text-xl text-slate-500 cursor-pointer hover:text-black"
        onClick={onClearSearch}
        />)}

        <FaMagnifyingGlass 
        className="text-slate-400 cursor-pointer hover:text-black" 
        onClick={hanleSearch} 
        />

    </div>
  )
}

export default SearchBar