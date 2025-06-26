import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrl: './report.component.scss',
})
export class ReportComponent implements OnInit {
  reportData: any;

  constructor() {
    // Sample data for the report
    this.reportData = {
      sampleId: 'S12345',
      jobNo: 'J98765',
      brand: 'BrandX',
      steelType: 'TMT Fe500',
      receiptDate: '2025-05-30',
      testDetails: {
        diameter: '20 mm',
        weight: '2.47 kg',
        length: '1 m',
        massPerMeter: '2.47 kg/m',
        crossSectionalArea: '314.16 mm²',
        initialGaugeLength: '56.5 mm',
        yieldPoint: '40 kN',
        ultimateTensileLoad: '60 kN',
        yieldStress: '127.3 N/mm²',
        ultimateTensileStrength: '190.9 N/mm²',
        originalGaugeLength: '56.5 mm',
        elongationPercentage: '20%',
        bendTest: 'Pass',
      },
      testedBy: 'John Doe',
      checkedBy: 'Jane Smith',
      witnessBy: 'Mike Johnson',
    };
  }

  ngOnInit(): void {}

  // downloadReportAsPDF(): void {
  //   const element = document.getElementById('lawReportTable');
  //   if (element) {
  //     html2canvas(element, { scale: 2 })
  //       .then((canvas) => {
  //         const imgData = canvas.toDataURL('image/png');
  //         const pdf = new jsPDF('p', 'mm', 'a4');
  //         const imgWidth = 190; // Width in mm (A4 width is 210mm, leaving 10mm margins on each side)
  //         const pageHeight = 297; // A4 height in mm
  //         const imgHeight = (canvas.height * imgWidth) / canvas.width;
  //         let heightLeft = imgHeight;
  //         let position = 10; // Start 10mm from the top

  //         pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
  //         heightLeft -= pageHeight - 20; // Account for margins

  //         // Add additional pages if the content exceeds one page
  //         while (heightLeft > 0) {
  //           position = heightLeft - imgHeight + 10; // Adjust position for the next page
  //           pdf.addPage();
  //           pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
  //           heightLeft -= pageHeight - 20;
  //         }

  //         pdf.save('case-report.pdf');
  //       })
  //       .catch((error) => {
  //         console.error('Error generating PDF:', error);
  //       });
  //   } else {
  //     console.error('Report table element not found');
  //   }
  // }
  downloadReportAsPDF() {
    // Ensure the target element exists (e.g., the entire body or a specific container)
    const element = document.getElementById('lawReportTable'); // Use document.body to include header, table, and footer
    if (!element) {
      console.error('No valid element found for PDF generation');
      alert('Error: Unable to generate PDF. Please try again.');
      return;
    }

    // Check if html2canvas and jsPDF are available
    if (typeof html2canvas === 'undefined' || typeof jsPDF === 'undefined') {
      console.error('Required libraries (html2canvas or jsPDF) are not loaded');
      alert(
        'Error: PDF generation libraries are missing. Please include html2canvas and jsPDF.'
      );
      return;
    }

    html2canvas(element, {
      scale: 2, // High quality rendering
      useCORS: true, // Handle cross-origin images if any
      logging: true, // Enable logs for debugging
    })
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgWidth = 190; // Width in mm (A4 width is 210mm, 10mm margins on each side)
        const pageHeight = 277; // A4 height (297mm) minus 20mm for top and bottom margins
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 10; // Start 10mm from the top

        // Add the first page
        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        // Add additional pages if content exceeds one page
        while (heightLeft > 0) {
          position = heightLeft - imgHeight + 10; // Adjust for the next page
          pdf.addPage();
          pdf.addImage(
            imgData,
            'PNG',
            10,
            position < 0 ? 10 : position,
            imgWidth,
            imgHeight
          );
          heightLeft -= pageHeight;
        }

        // Save the PDF
        pdf.save('case-report.pdf');
      })
      .catch((error) => {
        console.error('Error generating PDF:', error);
        alert('Error generating PDF. Please check the console for details.');
      });
  }
}
