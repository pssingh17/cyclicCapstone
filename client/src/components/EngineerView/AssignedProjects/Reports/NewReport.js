import './NewReport.css'



export const NewReport=()=>{

return(
  <div className='custom-nrep-container'>
<div className="custom">
<div className='"leftSideNRep'>
<form className='custom_form' style={{
  display: "flex",
  flexDirection: "column"
}}
    >

<div className="mb-3 customColor">
  <label for="reportNumber" className="form-label"> *Report Number</label>
  <input type="reportNumber" className="form-control custom_txtbox" id="reportNumber" required/>
</div>
<div className="mb-3 customColor">
  <label for="dateIssued" className="form-label"> *Date Issued</label>
  <input type="dateIssued" className="form-control custom_txtbox" id="dateIssued" placeholder="MM/YY/XXXX" required/>
</div>
<div className="mb-3 customColor">
  <label for="tags" className="form-label">Tags</label>
  <input type="tags" className="form-control custom_txtbox" id="tags" placeholder="Select Report Tags"/>
</div>
<div className="mb-3 customColor">
  <label for="receivingContacts" className="form-label"> *Receiving Contacts</label>
  <input type="receivingContacts" className="form-control custom_txtbox" id="receivingContacts" placeholder="Choose a receiving contact" required/>
</div>

<div>
    <label className="custom_label">Report Standards</label><br></br>
    <label className="custom_label1">*Click(+) to add some Standards</label>
</div>


<div className="mb-3 customColor">
  <label for="availableReviewers" className="form-label">*Available Reviewers</label>
  <input type="availableReviewers" className="form-control custom_txtbox" id="availableReviewers"/>
</div>
<div className="mb-3 customColor">
  <textarea className="form-control custom_txtbox" id="exampleFormControlTextarea1" placeholder="Review Comments" rows="3"></textarea>
</div>
</form>
 </div>
 <div className='rightsifeNrep'>
<form className='custom_form'>
<div className="mb-3 customColor">
  <label for="productsCovered" className="form-label"> *Products Covered</label> 
  <textarea className="form-control custom_txtbox" id="productsCovered" rows="2" required></textarea>
</div>
<div className="mb-3 customColor">
  <label for="models" className="form-label">Models</label>
  <textarea className="form-control custom_txtbox" id="models" rows="2" ></textarea>
</div>
<div className="mb-3 customColor">
  <label for="tags" className="form-label">Tags</label>
  <input type="tags" className="form-control custom_txtbox" id="tags" placeholder="Select Report Tags"/>
</div>

<div className="container">
    <input type="file" className ="upload_hide" id="uploadReport"/>
    <label for="uploadReport" className="upload_label">
        <button className="choose_file">Drag n' Drop or Browse</button>
        <i className="fas fa-cloud-upload-alt"/>
        <p className="drag_text">Max File Size: 25MB: Max Files: 1/Type: .doc,.docx,.xls,.xlsx,.xlsm,.xlsb</p>
    </label>

</div>

<div className='custom3btn'>
<button className="btn btn-primary btn_custom " type="submit">SAVE AS DRAFTS</button>
<button className="btn btn-primary btn_custom1 mx-2" type="submit">SUBMIT REVIEW</button>
<button className="btn btn-primary btn_custom2" type="submit">CANCEL</button>
</div>
</form>
</div>
</div>
</div>

    )
}