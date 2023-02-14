import React from 'react'
import "./Reviewreports.css"
const Reviewreports = () => {
  return (
    <div>
    
<div className='reviewparents'>

    <div className='review'>




<div className='ProjectNumber'>
    <section>Project Number</section>
    <input type={Text} ></input></div>

    <div className='ReviewType'>
        <section>Review Type</section>
       <input type={Text} ></input></div>

        <div className='ReportType'>
            <section>Report Type</section>
            <input type={Text}></input></div>

            <div className='RecievingContact'>
            <section>Recieving Contact</section>
            <input type={Text}></input></div>

            <div className='ResponsiblePerson'>
            <section>Responsible Person /Date Created</section>
            <input type={Text}></input></div>

            <div className='ReviewerDate'>
            <section>Reviewer /Review Date</section>
            <input type={Text}></input></div>

</div>
<div className='reportsreceivingcontainer'>

            <div className='ReportRecieving'>
            <section>Report Recieving Customer</section>
            <input type={Text}></input></div>


            <div className='ReportReview'>
            <section>Report Review Status:</section>
            <input type={Text}></input></div>



            <div className='ProductsCovered'>
            <section>Products Covered</section>
            <input type={Text}></input></div>

            <div className='Models'>
            <section>Models</section>
            <input type={Text}></input></div>

            <div className='Project'>
            <section>Project</section>
            <input type={Text}></input></div>

            <div className='Comments'>
            <section>Comments:</section>
            <input type={Text}></input></div>


            </div>

<div className='Reportsstandards'>
    <section>Reportsstandards</section>    
</div>

            </div>

        
            
<div className='DocumentsParents'>
    <section>Documents</section>
<input type="submit" ></input>    
</div>


<div className='AddReviewDocuments'>
    <section>Report</section>
    <section>Model</section>
    <section>ValidationStatus</section>
    <section>Review Status</section>
    </div>

    <div className='ReportsandModel'>
        <section>Report02</section>
        <section>XYZ</section>
        <section>Document Verified</section>
        <section>Pending</section>
    </div>


</div>
    
  )
}

export default Reviewreports
