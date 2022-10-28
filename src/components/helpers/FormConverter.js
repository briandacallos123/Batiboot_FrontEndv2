function FormConverter(data) {
    const form = new FormData();
    Object.entries(data).map(([key,value])=>{
      if(Array.isArray(value)){
          value.map((v,i)=>(
              form.append(`${key}[]`,v)
          ))
      }else{
          form.append(key,value)
      }
       return true
     });

   return form;
}

export default FormConverter