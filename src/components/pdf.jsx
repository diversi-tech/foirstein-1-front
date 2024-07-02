import React from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

const TableToPDF = () => {
  const downloadPdf = () => {
    const element = document.getElementById('myTable');
    html2canvas(element).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 10, 10);
      pdf.save('table.pdf');
    });
  };

  return (
    <div>
      <table id="myTable">
        <thead>
          <tr>
            <th>Header 1</th>
            <th>Header 2</th>
            <th>Header 3</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Data 1</td>
            <td>Data 2</td>
            <td>Data 3</td>
          </tr>
          {/* Add more rows as needed */}
        </tbody>
      </table>
      <button onClick={downloadPdf}>Download PDF</button>
    </div>
  );
};

export default TableToPDF;
