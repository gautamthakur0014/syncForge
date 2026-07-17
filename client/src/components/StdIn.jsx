import React, { useRef } from 'react'
import useEditorStore from '../store/useEditorStore';

const StdIn = () => {

  const input = useEditorStore((s)=>s.input);
  const setInput = useEditorStore((s)=>s.actions.setInput);

  return (
    <div className='bg-amber-50 w-1/2 h-full'>
        <textarea className='h-full'value={input} onChange={(e)=> setInput(e.target.value)}>

        </textarea>
      
    </div>
  )
}

export default StdIn
