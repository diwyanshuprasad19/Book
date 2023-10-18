import React,{useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import Axios  from 'axios';
import './invoice.css';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import { useNavigate } from 'react-router-dom';






const generatePDF = () => {
    const input = document.getElementById('invoice-content');
  
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      let  k =1;
      if(window.width <=900)
      {
        k=2;
      }
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height*k * pdfWidth) / imgProps.width;
  
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('invoice.pdf');
    });
  };

  const printContent = () => {
    const content = document.getElementById('invoice-content');
    const printWindow = window.open('', '_blank');
    printWindow.document.write(content.innerHTML);
    printWindow.document.close();
    printWindow.print();
  };



 const numberToWords = (number)=> {
    const words = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten",
        "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
    const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

    if (number < 20) {
        return words[number];
    } else if (number < 100) {
        return tens[Math.floor(number / 10)] + " " + words[number % 10];
    } else if (number < 1000) {
        return words[Math.floor(number / 100)] + " Hundred " + numberToWords(number % 100);
    } else if (number < 10000) {
        return words[Math.floor(number / 1000)] + " Thousand " + numberToWords(number % 1000);
    } else {
        return "Number out of range";
    }
}


function Invoice() {

  const { id } = useParams();
  const [list123,setlist123] = useState({});
  const [error,seterror] = useState('');
  const token = localStorage.getItem('Book-User');



  const navigate = useNavigate();

  useEffect(() => {
  let token = localStorage.getItem('Book-User');
   if(!token){
   navigate('/');
   }
  }, []);
  


  useEffect(() => {
    Axios.post('http://localhost:3001/Invoice',{
      token:token,
      id:id,
     }).then(res=>{
       if(res.data.type ==='Success')
       {
           setlist123(res.data.order);
       }
     else if(res.data.type ==='error')
     {
          seterror(res.data.errors);
     }
 }).catch(err =>{
   console.log(err);
 });
  }, [list123]);







const handletotal =(list123)=>{
  let total = list123.Price*list123.Count;
  return total;
}





  return (
<>
<div className="invoice-box" id="invoice-content" >
      <table cellPadding="0" cellSpacing="0">
        <tr className="top_rw">
          <td colSpan={2}>
            <h2 style={{ marginBottom: '0px' }} className='set111'>
              Invoice(Original for Recipient)
            </h2>
            <span className='set222'>
            Invoice No:{list123._id}
            </span>
          </td>
          <td style={{ width: '30%', marginRight: '10px' }} className='set333'>
            OrderId:#{list123.OrderId}
          </td>
        </tr>
        <tr className="top">
          <td colSpan={2}>
            <table>
              <tr>
                <td>
                  <b> Sold By: Publix Enterprise</b> <br />
                  Viraj khand,Gomti Nagar<br />
                  Lucknow, UP - 226010<br />
                  India <br />
                  +0651-908-090-009<br />
                  PAN: AALFN0535C <br />
                  GSTIN: 27AALFN0535C1ZK <br />
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td colSpan={3}>
            <table cellSpacing="0" cellPadding="2">
              <tr className="heading">
                <td style={{ width: '25%' }}> ITEM </td>
                <td style={{ width: '10%', textAlign: 'center' }}> QTY. </td>
                <td style={{ width: '10%', textAlign: 'center' }}>
                  UNIT PRICE(₹)
                </td>
                <td style={{ width: '15%', textAlign: 'center' }}>
                Genre
                </td>
                <td style={{ width: '15%', textAlign: 'center' }}>
                Author
                </td>
                <td style={{ width: '15%', textAlign: 'center' }}>
                  TOTAL AMOUNT (₹)
                </td>
              </tr>
              <tr className="item">
                <td style={{ width: '25%' }}>
                  {list123.Title}
                </td>
                <td style={{ width: '10%', textAlign: 'center' }}> {list123.Count} </td>
                <td style={{ width: '10%', textAlign: 'center' }}> {list123.Price} </td>
                <td style={{ width: '15%', textAlign: 'center' }}> {list123.Genre}</td>
                <td style={{ width: '15%', textAlign: 'center' }}> {list123.Author} </td>
                <td style={{ width: '15%', textAlign: 'center' }}> {handletotal(list123)} </td>
              </tr>
              <tr className="item">
                <td style={{ width: '25%' }}> <b> Grand Total </b> </td>
                <td style={{ width: '10%', textAlign: 'center' }}></td>
                <td style={{ width: '10%', textAlign: 'right' }}> </td>
                <td style={{ width: '15%', textAlign: 'right' }}> </td>
                <td style={{ width: '15%', textAlign: 'right' }}> </td>
                <td style={{ width: '15%', textAlign: 'center' }}> {handletotal(list123)} </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr className="total">
          <td colSpan={2} align="right">
            Total Amount in Words :{' '}
            <b> {numberToWords(handletotal(list123))} </b>
          </td>
        </tr>
        <tr>
          <td colSpan={3}>
            <table cellSpacing="0px" cellPadding="2px">
              <tr>
                <td width="50%">
                  <b> Declaration: </b> <br />
                  We declare that this invoice shows the actual price of
                  the goods described above and that all particulars are
                  true and correct. The goods sold are intended for end
                  user consumption and not for resale.
                </td>
                <td>
                  * This is a computer generated invoice and does not
                  require a physical signature
                </td>
              </tr>
              <tr>
                <td width="50%"></td>
                <td>
                  <b> Authorized Signature </b>
                  <br />
                  <br />
                  
                 <div className="signature">Publix</div>
                 
                  ...................................
                  <br />
                  <br />
                  <br />
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>

    <div class="button-container1">
    <button class="print-button" onClick={printContent}>Print</button>
    <button class="download-button" onClick={generatePDF}>Download</button>
</div>

</>
  );
}

export default Invoice;