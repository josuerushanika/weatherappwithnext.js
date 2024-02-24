'use client'

import React from "react";
import { MdWbSunny } from "react-icons/md";
import { MdMyLocation } from "react-icons/md";
import { MdOutlineLocationOn } from "react-icons/md";

import SearchBox from "./SearchBox";
import { useState} from "react";

import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_KEY;

type Props = {};


export default function Navbar({}: Props) {
   const [city, setCity] = useState("");
   const [error, setError] = useState("");

   const [suggestions, setSuggestions] = useState<string[]>([]);
   const [showSuggestions, setSuggestions] = useState (false);

   async function handleInputChange(value: string) {
    setCity(value);
    if (value.length >= 3) {
      try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/find?q=${value}&appid=${API_KEY}`);
      
        const suggestions = response.data.list.map((item:any)=> item.name )
        setSuggestions(suggestions);
        setError("");
        setShowSuggestions(true);
      } catch(error) {
        setSuggestions([]);
        setShowSuggestions(true);
      }
    } 
    else {
      setSuggestions([]);
      setShowSuggestions(true);
    }
   }

  return (
    <nav className="shadow-sm sticky top-0 left-0 z-50 bg-white">
      <div className="h-[80px] w-full flex justify-between items-center max-w-7x1 px-3 mx-auto">
        <p className="flex items-center justify-center gap-2 ">
          <h2 className="text-gray-500 text-3xl"> Weater</h2>
          <MdWbSunny className="text-3x1 mt-1 text-yellow-300" />
        </p>
        <section className="flex gap-2 items-center">
          <MdMyLocation className="text-2x1 text-gray-400 hover:opacity-80 cursor-pointer" />
          <MdOutlineLocationOn  className="text-3xl"/>
          <p className="text-slate-900/80 text-sm">India</p>
          <div>
            {/*Search Box Components*/}
            <SearchBox 
            value={city}
            // onSubmit={}
            onChange={(e) => handleInputChange(e.target.value)}
            />
          </div>
          <suggestionBox/>
        </section>
      </div>
    </nav>
  );
}

function suggestionBox() {
  return (
    <ul className="mb-4 bg-white absolute border top-[44px] left-0 border-gray-300 rounded-md min-w-[200px] flex flex-col gap-1 py-2 px-2">
        <li></li>
    </ul>
  )
}