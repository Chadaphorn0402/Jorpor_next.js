'use client'
import React, { useState , useEffect} from 'react';
import Link from 'next/link'
import '../globals.css'
// import '@fontsource/ntr'
// import '@fontsource/mitr';
import { BsPlusCircleFill } from 'react-icons/bs';
import CompNavbar from './compNavbar/role_1';
import {BsCalendar2Minus} from 'react-icons/bs';
import { BsTrash } from 'react-icons/bs'; // Add this import for the trash can icon
import { BsPencilSquare } from 'react-icons/bs'; // Add this import for the edit button
import { PiPencilSimpleFill } from 'react-icons/pi';
import {BsCheckCircle} from 'react-icons/bs';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import {RxCross2} from 'react-icons/rx'
import { CompLanguageProvider, useLanguage } from './compLanguageProvider';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n'; 
import { initReactI18next } from 'react-i18next';


function ChecklistEmployee() {
  return (
    <CompLanguageProvider>
      <App />
    </CompLanguageProvider>
  );
}

function App() {
  const { language, toggleLanguage } = useLanguage();
  const { t } = useTranslation();

    const router = useRouter();


    const [id, setId] = useState('');
    const [message, setMessage] = useState('');
    const currentDate = new Date().toLocaleDateString();
    const [showPopup, setShowPopup] = useState(false); // if using React state
    const [isEditing, setIsEditing] = useState(false);
    const [ShowPopupDelete, setShowPopupDelete] = useState(false);
    const [checklistname, setChecklistname] = useState(''); // เพิ่ม state สำหรับ todo
    const [index, setIndex] = useState(''); // เพิ่ม state สำหรับ index
    const [input, setInput] = useState("");
    const [details, setDetails] = useState("");
    const [lastname, setlastname] = useState("");
    const [todoList, setTodoList] = useState([]);
    const [reloadData, setReloadData] = useState(false); // เพิ่ม state นี้
    const [deletemessage, setdeleteMessage] = useState(false);
    const [addmessage, setaddMessage] = useState(false);
    const [showAddSuccessPopup, setShowAddSuccessPopup] = useState(false);
    const [showEditPopup, setShowEditPopup] = useState(false); // เพิ่ม state เพื่อควบคุมการแสดง/ซ่อน popup
    const [showDeleteSuccessPopup, setShowDeleteSuccessPopup] = useState(false);
    const [selectedItems, setSelectedItems] = useState({});
    const [IsLoading, setIsLoading] = useState(false);
    const [useEmployee, setUseEmployee] = useState(false);
    const [examinename, setExaminename] = useState(''); // สร้าง state เพื่อเก็บค่าที่เลือก
    const [employee_Id, setEmployee_Id] = useState(''); // สร้าง state เพื่อเก็บค่าที่เลือก
    const [idemployee, setidEmployee] = useState(''); // สร้าง state เพื่อเก็บค่าที่เลือก
    const [examinelist_Id, setexaminelist_Id] = useState('');
    const [examine_Id, setexamine_Id] = useState('');
    const [todoStatus, setTodoStatus] = useState({});
    const [examinelist_name, setexaminelist_name] = useState('');

    useEffect(() => {
      const storedId = localStorage.getItem('id');
      if (storedId) {
        setId(storedId);
        console.log("Stored: ",storedId)
      }
    }, []);

    useEffect(() => {
      console.log("STARTChecklist: ",useEmployee);

      if (typeof window !== 'undefined') {
        const searchParams = new URLSearchParams(window.location.search);
        const checklistnameValue = searchParams.get('checklistname') ; // กำหนดค่าเริ่มต้นว่างไว้ถ้าไม่มีค่า
        // const indexValue = searchParams.get('index') ; // กำหนดค่าเริ่มต้นว่างไว้ถ้าไม่มีค่า
        const examinenameValue = searchParams.get('examinename') ; // กำหนดค่าเริ่มต้นว่างไว้ถ้าไม่มีค่า
        const employeeValue = searchParams.get('employee_Id') ; // กำหนดค่าเริ่มต้นว่างไว้ถ้าไม่มีค่า
        const idemployeeValue = searchParams.get('idemployee') ; // กำหนดค่าเริ่มต้นว่างไว้ถ้าไม่มีค่า
        const examinelist_IdValue = searchParams.get('examinelist_Id') ; // กำหนดค่าเริ่มต้นว่างไว้ถ้าไม่มีค่า
        const examine_IdValue = searchParams.get('examine_Id') ; // กำหนดค่าเริ่มต้นว่างไว้ถ้าไม่มีค่า
        const examinelist_nameValue = searchParams.get('examinelist_name') ; // กำหนดค่าเริ่มต้นว่างไว้ถ้าไม่มีค่า

       
        console.log("queryData: ",{checklistnameValue,examine_IdValue,examinenameValue ,employeeValue ,idemployeeValue,examinelist_nameValue })

       
      
        const fetchData = async () => {
          try {
           

            console.log("TODO: ", examinenameValue ,examine_IdValue)
            const editedData = { examinenameValue ,examine_IdValue};
            const datasend = JSON.stringify(editedData)
            console.log("checkboxDataEmployee: ",datasend)
            const response = await axios.post('/api/checklistemployee', datasend, {
              headers: { 'Content-Type': 'application/json' },
            });          
            
            const data = response.data;
    
            if (response.status === 200) {
              if (data.success === true) {
                console.log("AllDataChecklist: ",data)
                console.log("Datachecklist1: ",data.dbchecklist[0])
                setTodoList(data.dbchecklist);
              } else {
                setMessage(data.error);
              }
            } else {
              setMessage(data.error);
            }
          } catch (error) {
            console.error('Error fetching data:', error);
            setMessage('');
          }
        
        };

        setexamine_Id(examine_IdValue)
        setexaminelist_Id(examinelist_IdValue);
        setChecklistname(checklistnameValue);
        setExaminename(examinenameValue);
        setEmployee_Id(employeeValue);
        setidEmployee(idemployeeValue);
        setexaminelist_name(examinelist_nameValue)
        fetchData();
      }
    }, [reloadData]); // โหลดข้อมูลเมื่อค่า state reloadData เปลี่ยนแปลง

    
   

  
  
  // const handleCheckboxChange = (todo, isChecked) => {
  //   setSelectedItems((prevSelectedItems) => ({
  //     ...prevSelectedItems,
  //     [todo]: isChecked,
  //   }));
  // };

  const handleCheckboxChange = (todo, passChecked, failChecked, details) => {
    // สร้างค่าเริ่มต้นของสถานะสำหรับเครื่องจักร A และ B
    const updatedTodoStatus = { ...todoStatus };
    
    // กำหนดค่า "pass" หรือ "fail" ตามเครื่องจักรที่เลือก
    if (passChecked) {
      updatedTodoStatus[todo] = { name: todo, pass: true,status: "pass", details: details || "-" };
    } else if (failChecked) {
      updatedTodoStatus[todo] = { name: todo, fail: true,status: "fail", details: details || "-" };
    } else {
      updatedTodoStatus[todo] = {}; // ล้างสถานะถ้าไม่เลือกใดๆ และตั้ง details เป็น ' ' หรือค่าที่ถูกส่งมา
    }
    
    setTodoStatus(updatedTodoStatus);
    console.log("State: ", updatedTodoStatus);
  };
  



    const handleSubmit = async () => {
      try {
        // const selectedItemsArray = Object.entries(selectedItems)
        //   .filter(([_, isSelected]) => isSelected)
        //   .map(([todo]) => todo);
    

        const editedData = {todoStatus , checklistname ,examine_Id,examinelist_Id,examinename,examinelist_name, employee_Id ,currentDate,idemployee, id, details, checkbox: true };
        console.log("checkbox: ",editedData)
        const data = JSON.stringify(editedData)
        console.log("checkboxDataEmployee: ",data)
    
        // ส่งข้อมูลไปยัง API โดยใช้ axios หรือวิธีอื่น ๆ ตามที่คุณใช้
        const response = await axios.post('/api/checklistemployee', data, {
          headers: { 'Content-Type': 'application/json' },
        });    
        
        const resdata = response.data;
    
        if (response.status === 200) {
          if (resdata.success === true) {

            console.log("Messageemployee: ", resdata);
            setShowDeleteSuccessPopup(true);
            setdeleteMessage(resdata.message);

            setTimeout(() => {
              setIsLoading(true); 
                router.push(resdata.redirect); 
            }, 1000); 
          } else {
            setMessage(resdata.error);
          }
        } else {
          setMessage(resdata.error);
        }
        setSelectedItems({});


      } catch (error) {
        console.error('Error:', error);
        // ดำเนินการเมื่อเกิดข้อผิดพลาดในการส่งข้อมูลไปยัง API
      }
    };
    
    

     
    

  return (
    <div>
      
      <CompNavbar/>

        <div className=' bg-[url("/bg1.png")] overflow-auto bg-cover bg-no-repeat absolute z-[-1] top-0 left-0 w-full h-full bg-center   '>
          <div className='md:w-[1000px] mx-auto '>
            <div className=' w-[280px] mx-auto md:w-[963px]'>
              <div className='left-0 md:ml-[90px] w-[600px]  flex items-center md:mt-[100px] mt-[90px] '>
                  <h1 className=' text-[#5A985E] text-[25px] md:text-[40px]  mr-[10px] '>Examine</h1>
                  <p className='text-black   w-[400px] text-sm md:text-[20px] mt-[2px] '>({checklistname})</p>
              </div>
              <div className='flex items-center text-center  w-[110px] h-[24px] md:w-[140px] md:h-[30px] rounded-[5px] text-[#fff] border-[#000] bg-[#000] md:ml-[90px] '>
                    <div className=' md:ml-[10px] ml-[10px] '><BsCalendar2Minus/></div>
                    <p className="  mt-[2px] ml-[8px]  md:text-[17px] text-[12px] md:ml-[8px] ">{currentDate}</p>
              </div>            
              
            </div>

            <div className={`mx-auto w-[300px]  font-blod md:w-[800px] border ${isEditing ? 'h-[500px]' : 'h-[560px]'} mb-[50px] text-black flex flex-col bg-[#FFF] ${isEditing ? 'rounded-[10px]' : 'rounded-[30px] md:rounded-[50px]'} mt-[10px] `}>
            <div className='  mx-auto w-[280px]   md:w-[800px] h-[500px] text-black flex flex-col  bg-[#FFF] rounded-[30px] md:rounded-[50px] mt-[10px] overflow-auto'>

            {todoList.map((todo, index) => (
              <div key={index}>
                {!useEmployee ? (
                  <div className=' text-sm md:text-[20px] mt-[10px] w-[250px] rounded-[10px] md:w-[340px] py-2 md:py-4 bg-[#F5F5F5] mx-auto'>
                    <div className='flex px-3'>
                    <div >
                      <p className='text-[#000] md:text-[17px]   w-[210px] '>{todo} </p>
                      <div className="mt-[8px] border-t border-gray-300"></div> 
                      <div className='flex items-center mt-[8px]'> 
                      <div className='flex items-center'>
                        <input
                          type="checkbox"
                          className='mr-[8px] md:ml-[5px] items-center'
                          checked={todoStatus[todo]?.pass || false}
                          onChange={(e) => handleCheckboxChange(todo, e.target.checked, !e.target.checked ? todoStatus[todo]?.fail : false)}
                          /><span className='text-[13px] md:text-[15px] '>ผ่าน</span>
                      </div>
                      <div className='flex items-center'>
                        <input
                          type="checkbox"
                          className='mr-[8px] ml-[10px] md:ml-[20px] items-center'
                          checked={todoStatus[todo]?.fail || false}
                          onChange={(e) => handleCheckboxChange(todo, !e.target.checked ? todoStatus[todo]?.pass : false, e.target.checked)}
                          /><span className='text-[13px] md:text-[15px] '>ไม่ผ่าน</span>
                        </div>
                        </div>
                        <input
                            type='text'
                            className='rounded-md mt-[8px] p-2 border text-[13px] w-[225px] md:w-[315px] h-[30px]'
                            placeholder='รายละเอียด'
                            onChange={(e) => {
                              handleCheckboxChange(todo, todoStatus[todo]?.pass, todoStatus[todo]?.fail, e.target.value);
                            }}
                          />                      
                          </div>
                      {isEditing && (
                        <div className='flex items-center justify-end space-x-2 w-[50px] md:w-[50px] ml-[1px] md:ml-[60px] mt-20px '>
                          <BsTrash
                            onClick={(e) => {
                              e.stopPropagation();
                              openEditPopup(todo, checklistname);
                            }}
                            className='text-[#5A985E] hover:text-[#64CE3F]'
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className=' justify-center items-center   flex'> 
                  <Link href={`/checklistEmployee?checklistname=${todo}&index=${index}`} key={index}>

                  <div className=' text-sm md:text-[20px] mt-[10px] w-[250px] rounded-[10px] md:w-[740px] py-2 md:py-4 bg-[#F5F5F5] mx-auto'>
                    <div className='flex px-3'>
                      <input type="checkbox" className='mr-[10px]' />
                      <p className='text-[#000] text-[14px] w-[180px]  whitespace-nowrap overflow-hidden overflow-ellipsis'>{todo}</p>
                      {/* <Link href='' className='text-[#000]'>{todo}  {index}</Link> */}
                    </div>
                  </div>
                  </Link>
                  {isEditing && (
                    <div className='  text-[10px] h-[10px] items-center justify-end ml-[-20px] w-[20px] md:w-[50px]  md:ml-[60px] mt-[10px] '>
                      <RxCross2
                        onClick={(e) => {
                          e.stopPropagation();
                          openEditPopup(todo, checklistname);
                        }}
                        className='text-[#5A985E] hover:text-[#64CE3F]'
                      />
                    </div>
                  )}
                  </div>
                )}
              </div>
            ))}

              

                    {showAddSuccessPopup && (
                      <div className="text-center fixed top-0 left-0 w-full h-full flex items-center justify-center ">
                        <div className="text-center  bg-white text-[#5A985E] p-8  rounded-lg border-black shadow-lg md:w-[400px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <BsCheckCircle className=' text-[50px] mx-auto mb-[10px]'/>
                        {addmessage}
                        </div>
                      </div>
                    )}
                    {showDeleteSuccessPopup && (
                      <div className="text-center fixed top-0 left-0 w-full h-full flex items-center justify-center ">
                        <div className=" text-center bg-white text-[#5A985E] p-8  rounded-lg border-black shadow-lg md:w-[400px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <BsCheckCircle className=' text-[50px] mx-auto mb-[10px]'/>
                        {deletemessage}
                        </div>
                      </div>
                    )}

                    {showEditPopup.isOpen && (
                      <div className="text-center fixed top-0 left-0 w-full h-full flex items-center justify-center ">
                        <div className="bg-white p-4 rounded-lg border-black shadow-lg md:w-[380px] md:h-[150px] ">
                          {/* เนื้อหาของ popup */}
                          <div className='md:text-[30px] text-[22px] flex justify-center items-center'>
                          <h2 className='text-[18px] md:text-[20px] text-[#5A985E] mt-[10px]  font-bold'>Do you want to delete <span style={{ color: '#FF6B6B' }}>{showEditPopup.todo}</span> ?</h2>
                          </div>
                          <div className="flex justify-center mt-[10px]  md:mt-[30px]">
                            <button className="flex justify-center items-center bg-[#93DD79] text-white px-4 py-2 ml-[5px] rounded hover:bg-green-600" onClick={() => deleteChecklist(showEditPopup.todo, showEditPopup.checklistname)} >Yes</button>
                            <button className="flex justify-center items-center bg-[#FF6B6B] text-white px-4 py-2 ml-[10px] rounded hover:bg-red-600" onClick={() => closeEditPopup(false)}>Cancel</button>
                          </div>
                        </div>
                      </div>
                    )}  
                      
                    </div>
                   
                    
                    {showPopup && (
                      <div className="text-center fixed top-0 left-0 w-full h-full flex items-center justify-center ">
                        <div className="bg-white p-4 rounded-lg border-black shadow-lg md:w-[400px] ">
                          {/* เนื้อหาของ popup */}
                          <h2 className='text-[30px] text-[#5A985E]  font-bold'>Add Examine</h2>
                            <div className="mt-1">
                              {/* <label htmlFor="name" className="md:text-[18px] font-mitr block text-sm font-medium text-gray-700">ชื่อ-นามสกุล</label> */}
                              <input className='mt-1 p-2 w-full border border-gray-300 rounded-md'value={input} onChange={(e) => setInput(e.target.value)} placeholder="add checklist"/>
                            </div>
                            {/* <div>
                            <input className='mt-1 p-2 w-full border border-gray-300 rounded-md'value={lastname} onChange={(e) => setlastname(e.target.value)}placeholder="Lastname"/>
                            </div> */}
                          <div className="flex justify-center mt-[10px]">
                            <button className="flex justify-center items-center bg-[#93DD79] text-white px-4 py-2 ml-[5px] rounded hover:bg-green-600" onClick={addTodo}>Add</button>
                            <button className="flex justify-center items-center bg-[#FF6B6B] text-white px-4 py-2 ml-[10px] rounded hover:bg-red-600" onClick={() => closePopup(false)}>Cancel</button>
                          </div>
                          {message && (
                            <p className='mt-3 text-red-500 text-xs py-2 bg-[#f9bdbb] rounded-[10px] inline-block px-4 w-[210px] md:w-[410px] mx-auto md:text-lg md:mt-[30px]'>
                              {message}
                            </p>
                          )}
                        </div>
                      </div>
                    )}

                    <div className=' text-center w-full'>
                      {/* {!isEditing && (
                        <div className='w-[250px] h-[100px] mt-[20px] mx-auto'>
                          <p className='font-mitr text-sm mb-2'>รายละเอียด</p>
                          <textarea
                            value={details}
                            onChange={(e) => setDetails(e.target.value)}
                            className='border border-gray-300 rounded-md bg-[#F5F5F5] w-[250px] h-[100px] text-sm pl-2 pt-2'
                          />
                        </div>
                      )} */}
                     
                        <button onClick={handleSubmit} className= ' text-md md:text-[18px]   border-[#64CE3F] bg-[#64CE3F] px-10 py-1 rounded-[20px] text-[#fff] hover:-translate-y-0.5 duration-200 '>Submit</button>
                        
                    
                  </div>
                 
              </div>

            </div>
        </div>
      </div>
   
    
  )
  
}
export default  ChecklistEmployee;