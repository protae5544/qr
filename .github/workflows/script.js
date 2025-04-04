// ฟังก์ชันสำหรับสร้าง QR Code
function generateQRCode() {
  // ใช้ URL ปัจจุบันเป็นข้อมูลสำหรับ QR Code
  const currentUrl = window.location.href;
  
  // ตรวจสอบว่ามีไลบรารี QRCode.js หรือไม่
  if (typeof QRCode !== 'undefined') {
    // หา element ที่จะใส่ QR Code
    const qrElement = document.getElementById('qrcode');
    if (qrElement) {
      // ล้าง QR Code เดิม (ถ้ามี)
      qrElement.innerHTML = '';
      
      // สร้าง QR Code ใหม่
      new QRCode(qrElement, {
        text: currentUrl,
        width: 69,
        height: 69,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
      });
    }
  } else {
    console.error("QRCode.js library is not loaded.");
    
    // โหลดไลบรารี QRCode.js ถ้ายังไม่มี
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js';
    script.onload = function() {
      generateQRCode(); // เรียกตัวเองเมื่อโหลดเสร็จ
    };
    document.head.appendChild(script);
  }
}

// ฟังก์ชันสำหรับแปลง HTML เป็น PDF และดาวน์โหลด
function downloadAsPDF(personName) {
  // ตรวจสอบว่ามีไลบรารี html2pdf หรือไม่
  if (typeof html2pdf === 'undefined') {
    // โหลดไลบรารี html2pdf.js
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
    script.onload = function() {
      processDownload(personName);
    };
    document.head.appendChild(script);
  } else {
    processDownload(personName);
  }
}

// ฟังก์ชันประมวลผลการดาวน์โหลด PDF
function processDownload(personName) {
  // สร้างชื่อไฟล์จากชื่อบุคคล หรือใช้ชื่อเริ่มต้นถ้าไม่มีชื่อ
  const filename = personName ? `receipt_${personName.replace(/\s+/g, '_')}.pdf` : 'receipt.pdf';
  
  // กำหนดตัวเลือกสำหรับ html2pdf
  const options = {
    margin: 10,
    filename: filename,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };
  
  // สร้าง Element ที่จะแปลงเป็น PDF (ใช้หน้าเอกสารทั้งหมด)
  const element = document.querySelector('.page-container');
  
  // แปลงเป็น PDF และเริ่มดาวน์โหลด
  html2pdf().from(element).set(options).save();
}

// ฟังก์ชันสร้างใบเสร็จรับเงิน 
function generateReceipt(templateHTML, personIndex) {
  // คัดลอก HTML ต้นฉบับ
  let receiptHTML = templateHTML;
    
  // แบ่งข้อมูลเป็นรายการต่างๆ
  const names = [
    "MR. AUNG KYAW", "MRS. KHIN MARLAR", "MR. TUN NAING", "MR. ZAW HTET", "MR. SOE HLA", 
    "MR. HTAY LIN", "MR. MOE KYAW", "MRS. MYA THANDAR", "MR. HLA WIN", "MR. KYAW ZAW", 
    "MRS. NWE YINMAR", "MRS. SU HLAING", "MR. NYUNT THURA", "MRS. THET KHINE", "MRS. AYE SHWE", 
    "MR. PHYO NAING", "MR. HLA TUN", "MR. SHWE MOE", "MR. NYI ZAW", "MRS. THIDA YADANAR", 
    "MRS. SAN HNIN", "MRS. YIN THAZIN", "MRS. CHO NANDAR", "MR. AUNG SHWE", "MR. KAUNG KHANT", 
    "MR. THWE ZA", "MRS. EI MONTHA", "MR. PYAE SONE", "MR. NANDAR CHO", "MR. THANT ZIN", 
    "MR. KYI SHIN", "MRS. SHWE YINMAR", "MR. YE HTUT", "MR. CHAN MAUNG", "MR. THURA YE", 
    "MR. SAW HTAY", "MR. PAING SOE", "MR. TIN HLA", "MR. MYAT THWE", "MR. SITHU TUN"
  ];
    
  const wpNumbers = [
    "WP-68-366-150", "WP-68-366-151", "WP-68-366-152", "WP-68-366-153", "WP-68-366-154", 
    "WP-68-366-155", "WP-68-366-156", "WP-68-366-157", "WP-68-366-158", "WP-68-366-159", 
    "WP-68-366-160", "WP-68-366-161", "WP-68-366-162", "WP-68-366-163", "WP-68-366-164", 
    "WP-68-366-165", "WP-68-366-166", "WP-68-366-167", "WP-68-366-168", "WP-68-366-169", 
    "WP-68-366-170", "WP-68-366-171", "WP-68-366-172", "WP-68-366-173", "WP-68-366-174", 
    "WP-68-366-175", "WP-68-366-176", "WP-68-366-177", "WP-68-366-178", "WP-68-366-179", 
    "WP-68-366-180", "WP-68-366-181", "WP-68-366-182", "WP-68-366-183", "WP-68-366-184", 
    "WP-68-366-185", "WP-68-366-186", "WP-68-366-187", "WP-68-366-188", "WP-68-366-189"
  ];
    
  const ivNumbers = [
    "IV680210/002350", "IV680210/002353", "IV680210/002352", "IV680210/002353", "IV680210/002356", 
    "IV680210/002355", "IV680210/002356", "IV680210/002359", "IV680210/002358", "IV680210/002359", 
    "IV680210/002362", "IV680210/002361", "IV680210/002362", "IV680210/002365", "IV680210/002364", 
    "IV680210/002365", "IV680210/002368", "IV680210/002367", "IV680210/002368", "IV680210/002371", 
    "IV680210/002370", "IV680210/002371", "IV680210/002374", "IV680210/002373", "IV680210/002376", 
    "IV680210/002377", "IV680210/002380", "IV680210/002379", "IV680210/002383", "IV680210/002382", 
    "IV680210/002383", "IV680210/002386", "IV680210/002386", "IV680210/002389", "IV680210/002388", 
    "IV680210/002389", "IV680210/002392", "IV680210/002395", "IV680210/002394", "IV680210/002395"
  ];
    
  const receiptNumbers = [
    "2100680001130", "2100680001131", "2100680001132", "2100680001133", "2100680001134", 
    "2100680001135", "2100680001136", "2100680001137", "2100680001138", "2100680001139", 
    "2100680001140", "2100680001141", "2100680001142", "2100680001143", "2100680001144", 
    "2100680001145", "2100680001146", "2100680001147", "2100680001148", "2100680001149", 
    "2100680001150", "2100680001151", "2100680001152", "2100680001153", "2100680001156", 
    "2100680001157", "2100680001158", "2100680001159", "2100680001161", "2100680001162", 
    "2100680001163", "2100680001164", "2100680001166", "2100680001167", "2100680001168", 
    "2100680001169", "2100680001172", "2100680001173", "2100680001174", "2100680001175"
  ];
    
  const nationalities = Array(40).fill("เมียนมา");
    
  const foreignerRefs = [
    "2492102076212", "2492102076519", "2492102076411", "2492102076315", "2492101928614", 
    "2492101928713", "2492101928812", "2492101928910", "2492101929017", "2492101929117", 
    "2492101929610", "2492101929219", "2492101929319", "2492101929414", "2492101928510", 
    "2492101929519", "2492101840071", "2492101840178", "2492101840279", "2492101840578", 
    "2492101840676", "2492101840378", "2492101840473", "2495400051574", "2495400051675", 
    "2492101355169", "2492101356866", "2492101355368", "2492101355560", "2492101355663", 
    "2492101355760", "2492101355866", "2492101356066", "2492101356161", "2492101356262", 
    "2492101356367", "2492101356663", "2492101356766", "2492101355266", "2494100029176"
  ];
    
  const foreignerIds = [
    "6682190000472", "6682190000473", "6682190000474", "6682190000475", "6682190000476", 
    "6682190000477", "6682190000478", "6682190000479", "6682190000480", "6682190000481", 
    "6682190000482", "6682190000483", "6682190000484", "6682190000485", "6682190000486", 
    "6682190000487", "6682190000488", "6682190000489", "6682190000490", "6682190000491", 
    "6682190000492", "6682190000493", "6682190000494", "6682190000495", "6682190000496", 
    "6682190000497", "6682190000498", "6682190000499", "6682190000500", "6682190000501", 
    "6682190000502", "6682190000503", "6682190000504", "6682190000505", "6682190000506", 
    "6682190000507", "6682190000508", "6682190000509", "6682190000510", "6682190000511"
  ];
    
  // ตรวจสอบว่า index ที่ระบุอยู่ในช่วงที่ถูกต้อง
  if (personIndex < 0 || personIndex >= names.length) {
    return "ดัชนีบุคคลไม่ถูกต้อง";
  }
    
  // แทนที่ข้อมูลในแต่ละตำแหน่ง
  receiptHTML = receiptHTML.replace(/<span class="t s5" style="left:196px;bottom:944px;letter-spacing:-0.01px;"> <\/span>/, 
    `<span class="t s5" style="left:196px;bottom:944px;letter-spacing:-0.01px;">${names[personIndex]}</span>`);
    
  receiptHTML = receiptHTML.replace(/<span class="t s6" style="left:196px;bottom:984px;letter-spacing:-0.01px;"> <\/span>/, 
    `<span class="t s6" style="left:196px;bottom:984px;letter-spacing:-0.01px;">${wpNumbers[personIndex]}</span>`);
    
  receiptHTML = receiptHTML.replace(/<span class="t s6" style="left:649px;bottom:1029px;letter-spacing:-0.01px;"> <\/span>/, 
    `<span class="t s6" style="left:649px;bottom:1029px;letter-spacing:-0.01px;">${ivNumbers[personIndex]}</span>`);
    
  receiptHTML = receiptHTML.replace(/<span class="t s6" style="left:649px;bottom:1198px;letter-spacing:-0.01px;"> <\/span>/, 
    `<span class="t s6" style="left:649px;bottom:1198px;letter-spacing:-0.01px;">${receiptNumbers[personIndex]}</span>`);
    
  receiptHTML = receiptHTML.replace(/<span class="t s6" style="left:543px;bottom:944px;letter-spacing:-0.01px;">เมียนมา <\/span>/, 
    `<span class="t s6" style="left:543px;bottom:944px;letter-spacing:-0.01px;">${nationalities[personIndex]}</span>`);
    
  receiptHTML = receiptHTML.replace(/<span class="t s6" style="left:196px;bottom:899px;letter-spacing:-0.01px;"> <\/span>/, 
    `<span class="t s6" style="left:196px;bottom:899px;letter-spacing:-0.01px;">${foreignerRefs[personIndex]}</span>`);
    
  receiptHTML = receiptHTML.replace(/<span class="t s6" style="left:622px;bottom:899px;"> <\/span>/, 
    `<span class="t s6" style="left:622px;bottom:899px;">${foreignerIds[personIndex]}</span>`);
    
  // เพิ่มสคริปต์การโหลด QRCode library
  const qrcodeScript = `
  <script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"></script>
  <script>
    // เมื่อเอกสารโหลดเสร็จ ให้สร้าง QR Code
    window.addEventListener('DOMContentLoaded', function() {
      // สร้าง QR Code ที่มี URL ของเอกสารนี้
      new QRCode(document.getElementById("qrcode"), {
        text: window.location.href,
        width: 69,
        height: 69,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
      });

      // เพิ่มปุ่มดาวน์โหลด PDF
      const downloadButton = document.createElement('button');
      downloadButton.textContent = 'ดาวน์โหลดเป็น PDF';
      downloadButton.style.position = 'fixed';
      downloadButton.style.top = '10px';
      downloadButton.style.right = '10px';
      downloadButton.style.zIndex = '9999';
      downloadButton.style.padding = '10px';
      downloadButton.style.backgroundColor = '#4CAF50';
      downloadButton.style.color = 'white';
      downloadButton.style.border = 'none';
      downloadButton.style.borderRadius = '5px';
      downloadButton.style.cursor = 'pointer';
      
      downloadButton.onclick = function() {
        // โหลด html2pdf library ถ้ายังไม่มี
        if (typeof html2pdf === 'undefined') {
          const script = document.createElement('script');
          script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
          script.onload = function() {
            downloadPDF();
          };
          document.head.appendChild(script);
        } else {
          downloadPDF();
        }
      };
      
      function downloadPDF() {
        const element = document.querySelector('.page-container');
        const options = {
          margin: 10,
          filename: 'receipt_${names[personIndex].replace(/\s+/g, '_')}.pdf',
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2, useCORS: true },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };
        
        html2pdf().from(element).set(options).save();
      }
      
      document.body.appendChild(downloadButton);
    });
  </script>
  `;
  
  // เพิ่มสคริปต์ QR Code เข้าไปก่อน </body>
  receiptHTML = receiptHTML.replace('</body>', qrcodeScript + '</body>');
  
  return receiptHTML;
}

// เริ่มสร้างไฟล์ในเครื่อง
function saveToFile(html, filename) {
  const blob = new Blob([html], {type: 'text/html'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  URL.revokeObjectURL(url);
  document.body.removeChild(a);
}

// สร้างใบเสร็จรับเงินทั้งหมด
function generateAllReceipts(templateHTML) {
  for (let i = 0; i < 40; i++) {
    const receipt = generateReceipt(templateHTML, i);
    const filename = `receipt_${i+1}.html`;
    saveToFile(receipt, filename);
  }
}

// ฟังก์ชันสร้าง ZIP
async function generateReceiptsZip(templateHTML) {
  if (typeof JSZip === 'undefined') {
    alert('กรุณาโหลดไลบรารี JSZip ก่อน');
    return;
  }
  
  const zip = new JSZip();
  
  for (let i = 0; i < 40; i++) {
    const receipt = generateReceipt(templateHTML, i);
    zip.file(`receipt_${i+1}.html`, receipt);
  }
  
  const content = await zip.generateAsync({type: 'blob'});
  
  const url = URL.createObjectURL(content);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'receipts.zip';
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  URL.revokeObjectURL(url);
  document.body.removeChild(a);
}

// สร้าง UI สำหรับการใช้งาน
function createUI() {
  // สร้าง QR Code สำหรับหน้าปัจจุบัน
  generateQRCode();
  
  // สร้างกล่อง UI
  const uiContainer = document.createElement('div');
  uiContainer.style.position = 'fixed';
  uiContainer.style.top = '20px';
  uiContainer.style.left = '20px';
  uiContainer.style.zIndex = '9999';
  uiContainer.style.backgroundColor = '#f0f0f0';
  uiContainer.style.padding = '20px';
  uiContainer.style.borderRadius = '10px';
  uiContainer.style.boxShadow = '0 0 10px rgba(0,0,0,0.5)';
  uiContainer.style.maxWidth = '400px';
  uiContainer.style.fontFamily = 'Arial, sans-serif';
  
  // เพิ่มหัวข้อ
  const title = document.createElement('h2');
  title.textContent = 'เครื่องมือสร้างใบเสร็จ';
  title.style.marginTop = '0';
  uiContainer.appendChild(title);
  
  // เพิ่มคำอธิบาย
  const description = document.createElement('p');
  description.textContent = 'เลือกวิธีการสร้างใบเสร็จจากเทมเพลต';
  uiContainer.appendChild(description);
  
  // ปุ่มดาวน์โหลด PDF สำหรับหน้าปัจจุบัน
  const pdfButton = document.createElement('div');
  pdfButton.style.marginBottom = '20px';
  
  const pdfGenerateButton = document.createElement('button');
  pdfGenerateButton.textContent = 'ดาวน์โหลด PDF หน้านี้';
  pdfGenerateButton.style.width = '100%';
  pdfGenerateButton.style.padding = '10px';
  pdfGenerateButton.style.backgroundColor = '#4CAF50';
  pdfGenerateButton.style.color = 'white';
  pdfGenerateButton.style.border = 'none';
  pdfGenerateButton.style.borderRadius = '5px';
  pdfGenerateButton.style.cursor = 'pointer';
  
  pdfGenerateButton.onclick = function() {
    // หาชื่อที่ปรากฏในใบเสร็จปัจจุบัน
    const nameElement = document.querySelector('span[style*="left:196px;bottom:944px"]');
    const name = nameElement ? nameElement.textContent.trim() : null;
    downloadAsPDF(name);
  };
  
  pdfButton.appendChild(pdfGenerateButton);
  uiContainer.appendChild(pdfButton);
  
  // ปุ่มสร้างใบเสร็จเดี่ยว
  const singleButton = document.createElement('div');
  singleButton.style.marginBottom = '10px';
  
  const singleLabel = document.createElement('label');
  singleLabel.textContent = 'สร้างใบเสร็จเดี่ยว: ';
  singleButton.appendChild(singleLabel);
  
  const singleInput = document.createElement('input');
  singleInput.type = 'number';
  singleInput.min = '1';
  singleInput.max = '40';
  singleInput.value = '1';
  singleInput.style.marginRight = '10px';
  singleInput.style.width = '60px';
  singleButton.appendChild(singleInput);
  
  const singleGenerateButton = document.createElement('button');
  singleGenerateButton.textContent = 'สร้าง';
  singleGenerateButton.onclick = function() {
    const index = parseInt(singleInput.value) - 1;
    if (index >= 0 && index < 40) {
      const receipt = generateReceipt(document.documentElement.outerHTML, index);
      saveToFile(receipt, `receipt_${index+1}.html`);
    } else {
      alert('กรุณาระบุหมายเลขระหว่าง 1-40');
    }
  };
  singleButton.appendChild(singleGenerateButton);
  
  uiContainer.appendChild(singleButton);
  
  // ปุ่มสร้างใบเสร็จทั้งหมด
  const allButton = document.createElement('div');
  allButton.style.marginBottom = '10px';
  
  const allGenerateButton = document.createElement('button');
  allGenerateButton.textContent = 'สร้างใบเสร็จทั้งหมด (แยกไฟล์)';
  allGenerateButton.style.width = '100%';
  allGenerateButton.style.padding = '5px';
  allGenerateButton.onclick = function() {
    if (confirm('การดำเนินการนี้จะสร้างไฟล์ 40 ไฟล์ ต้องการดำเนินการต่อหรือไม่?')) {
      generateAllReceipts(document.documentElement.outerHTML);
    }
  };
  allButton.appendChild(allGenerateButton);
  
  uiContainer.appendChild(allButton);
  
  // ปุ่มสร้างไฟล์ ZIP
  const zipButton = document.createElement('div');
  
  const loadJSZipButton = document.createElement('button');
  loadJSZipButton.textContent = 'โหลด JSZip (จำเป็นสำหรับสร้างไฟล์ ZIP)';
  loadJSZipButton.style.width = '100%';
  loadJSZipButton.style.padding = '5px';
  loadJSZipButton.style.marginBottom = '10px';
  loadJSZipButton.onclick = function() {
    if (typeof JSZip === 'undefined') {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js';
      script.onload = function() {
        alert('โหลด JSZip สำเร็จแล้ว');
        loadJSZipButton.disabled = true;
        loadJSZipButton.textContent = 'โหลด JSZip สำเร็จแล้ว';
      };
      document.head.appendChild(script);
    } else {
      alert('โหลด JSZip ไว้แล้ว');
      loadJSZipButton.disabled = true;
      loadJSZipButton.textContent = 'โหลด JSZip สำเร็จแล้ว';
    }
  };
  zipButton.appendChild(loadJSZipButton);
  
  const zipGenerateButton = document.createElement('button');
  zipGenerateButton.textContent = 'สร้างใบเสร็จทั้งหมด (ZIP)';
  zipGenerateButton.style.width = '100%';
  zipGenerateButton.style.padding = '5px';
  zipGenerateButton.onclick = function() {
    if (typeof JSZip === 'undefined') {
      alert('กรุณาโหลด JSZip ก่อน');
      return;
    }
    
    if (confirm('การดำเนินการนี้จะสร้างไฟล์ ZIP ที่มีใบเสร็จ 40 ใบ ต้องการดำเนินการต่อหรือไม่?')) {
      generateReceiptsZip(document.documentElement.outerHTML);
    }
  };
  zipButton.appendChild(zipGenerateButton);
  
  uiContainer.appendChild(zipButton);
  
  // ปุ่มปิด
  const closeButton = document.createElement('button');
  closeButton.textContent = 'ปิด';
  closeButton.style.marginTop = '10px';
  closeButton.style.width = '100%';
  closeButton.style.padding = '5px';
  closeButton.onclick = function() {
    document.body.removeChild(uiContainer);
  };
  uiContainer.appendChild(closeButton);
  
  document.body.appendChild(uiContainer);
}

// เมื่อเอกสารโหลดเสร็จ สร้าง UI และ QR Code
window.addEventListener('DOMContentLoaded', function() {
  // โหลด QRCode.js library
  if (typeof QRCode === 'undefined') {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js';
    script.onload = function() {
      // เรียกสร้าง QR Code เมื่อโหลดไลบรารีเสร็จ
      generateQRCode();
      // สร้าง UI
      createUI();
    };
    document.head.appendChild(script);
  } else {
    // หากมีไลบรารีอยู่แล้ว เรียกใช้ฟังก์ชันได้เลย
    generateQRCode();
    createUI();
  }
});
