import {FC, useState, useEffect} from 'react'

const getSavedValue = (key :string, initialValue:Function | string) => {
  const savedValue= localStorage.getItem(key);
  const parsedValue = savedValue ? JSON.parse(savedValue): "{}";
  if(parsedValue) return parsedValue;

  if(initialValue instanceof Function) return initialValue();
  return initialValue;

}

const useLocalStorage = (key :string, initialValue:FC | string) => {
  const [localValue, setLocalValue] = useState(()=>{
    return getSavedValue(key, initialValue);
  })

  useEffect(()=>{
    localStorage.setItem(key,JSON.stringify(localValue))
  }, [localValue])

  return [localValue, setLocalValue];
}

export default useLocalStorage;
