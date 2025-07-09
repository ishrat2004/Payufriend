export function Inputbox({label,placeholder,onChange}){ 
    return <div className="mb-3"> 
       <div className="text-2xl font-medium text-left ">
        {label}
        </div> 
     <input onChange={onChange} placeholder={ placeholder} input="text" className="w-full h-8 outline-none text-2xl "/>
    </div>
}