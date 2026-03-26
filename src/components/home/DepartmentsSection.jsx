import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DepartmentsSection = () => {

const [departments,setDepartments] = useState([]);
const navigate = useNavigate();

useEffect(()=>{

fetch("/data/departments.json")
.then(res=>res.json())
.then(data=>setDepartments(data.slice(0,6)))
.catch(err=>console.error(err));

},[])

return (

<section className="py-16 bg-gray-50 overflow-hidden">

<div className="max-w-7xl mx-auto px-4">

<h2 className="text-3xl font-bold text-center mb-10 shake-text">
Departments
</h2>

<div className="flex gap-6 animate-scroll">

{departments.map(dep => (

<div
key={dep.id}
className="min-w-[260px] bg-white rounded-xl shadow-lg hover:-translate-y-2 transition duration-300"
>

<div className="overflow-hidden rounded-t-xl">

<img
src={dep.image}
alt={dep.name}
className="w-full h-48 object-cover transform hover:scale-110 transition duration-500"
/>

</div>

<div className="p-4 text-center">

<h3 className="font-semibold text-lg mb-3">
{dep.name}
</h3>

</div>

</div>

))}

</div>
<button
onClick={()=>navigate("/departments")}
className="bg-yellow-300 text-black px-4 py-2 rounded hover:bg-blue-700 transition bg-center hero-btn mt-10 block mx-auto"
>

Read More

</button>

</div>

</section>

)

}

export default DepartmentsSection;