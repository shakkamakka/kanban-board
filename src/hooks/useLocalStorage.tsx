import {FC, useState, useEffect} from 'react'

const getSavedValue = (key :string, initialValue:Function | string) => {
  const savedValue = JSON.parse(localStorage.getItem(key) || "")
  if(savedValue) return savedValue;

  if(initialValue instanceof Function) return initialValue();
  return initialValue;

}

const useLocalStorage = (key :string, initialValue:FC | string) => {
  const [value, setValue] = useState(()=>{
    return getSavedValue(key, initialValue);
  })

  useEffect(()=>{
    localStorage.setItem(key,JSON.stringify(value))
  }, [value])

  return [value, setValue];
}

export default useLocalStorage;
