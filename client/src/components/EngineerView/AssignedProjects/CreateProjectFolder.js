import React from 'react'
import "./AssignedProjects.css"
const CreateProjectFolder = () => {
  return (
    <div>

<div className='CustomFormComtainer'>
<div className='formDetailsParent'>
      <div className='FormDetails'>

        <div className="FormLeft">

          
          <div className="lefttb1">
            <section>*The Lab Performing the work</section>
            <div className="w1">
            <input type="Text" placeholder="Lab Name" required></input>
          </div></div>



          <div className="lefttb2"> 
          <section>*Project Type</section>
          <div className='moveright'>
          <section> *Project Number</section></div></div>
          
          <div className="w3">
          <input type="Text" placeholder="Enter Project Type" required></input>
          <div className='w4'>
          <input type="Text"  placeholder="Enter Project Number" required></input></div></div>
          
          
         

          <div className="lefttb3">
            <section>*Transacting Customer</section>
            <div className="w5">
            <input type="Text" placeholder="Lab Name" Required></input>
            <input className="Btnm1"  type="Submit" value="Find Customer"></input>
          </div></div>


          <div className="lefttb4">
            <section>*Report Recieving Customer</section>
            <div className="w6">
            <input type="Text" placeholder="Lab Name" Required></input>
            <input className="Btnm1"  type="Submit" value="Find Customer"></input>
            </div> </div>          
          


          <div className="lefttb5">
            <section>*Project Name</section>
            <div className="w1">
            <input type="Text" placeholder="Enter Project Name" required></input>
          </div></div>

          <div classsname="lefttb6">
            <section> *Description</section>
           <div className='sam'>
            <textarea type= "text" /> 
          </div></div>


          <div classanme="lefttb7">
            <section>*Purchase Order Number</section>
            <div className='w1'>
            <input type="Text" placeholder="Enter Purchase order number" required></input>
          </div></div>

        
        </div>



            <div className='FormRight'>

          <div className="righttb1">
            <section>*Product Covered</section> </div>
            <div className='productcovered'>
            <input type="Text" required ></input>
          </div>

          <div className="righttb2">
            <section>*Models</section></div>
            <div className='models'>
            <input type="Text" required></input>
          </div>


          <div className="righttb3">
          <section>*Project Type</section>
          <div className='moveright1'>
          <section> *Project Number</section></div></div>
          
          
          
          <div className="w3">
            <input type="Text" placeholder="Enter Purchase Type" required></input>
            <div className="w4">
            <input type="Text" placeholder="Enter Purchase Number" required></input>
          </div></div>


          
          <div className="righttb3">
          <section>*Project Type</section>
          <div className='moveright1'>
          <section> *Project Number</section></div></div>

          <div className="w3">
            <input type="Text" placeholder="Enter Purchase Type" required></input>
            <div className="w4">
            <input type="Text" placeholder="Enter Purchase Number" required></input>
          </div></div>


        
          <div className="righttb4">
          <section>*Date Client Ready</section>
          <div className='moveright2'>
          <section>*Date Promised Complete</section></div></div>



          <div className="w3">
            <input type="Date"  required></input>
            <div className="w4">
            <input type="Date"  required></input>
          </div></div>


          
          <div className="righttb5"> 
            <section>*Date Project Starts</section>
            <div className='moveright3'>
            <section>*Date Project Ends</section></div></div>

            
          <div className="w3">
          <input type="Date"  required></input>
            <div className="w4">
            <input type="Date"  required></input>
          </div></div>




        </div>
            
             
        

        </div>
         </div>
</div>
    <div className="finalbuttons text-end">
      <input type="Submit" value="Create Project Folder"></input>
      
      <div className='cancel'> 
      < input type="Submit"  value="Cancel" ></input></div>
      </div>
  
    </div>
  )
}

export default CreateProjectFolder
