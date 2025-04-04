// ฟังก์ชันที่ใช้ในการสร้าง QR Code
function generateQRCode(data) {
    // ใช้ qrcode.js ที่มีอยู่แล้วในเทมเพลต
    const qrDiv = document.getElementById('qrcode');
    if (!qrDiv) return;
    
    // เคลียร์ QR Code เดิม (ถ้ามี)
    qrDiv.innerHTML = '';
    
    // สร้าง QR Code ใหม่
    QRCode.toCanvas(qrDiv, data, function(error) {
        if (error) console.error(error);
    });
}

// ฟังก์ชันที่ใช้ในการแก้ไขเอกสาร
function modifyReceipt(personIndex) {
    // ข้อมูลคนงาน
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
    
    // ตรวจสอบว่า index อยู่ในช่วงที่ถูกต้อง
    if (personIndex < 0 || personIndex >= names.length) {
        console.error('ดัชนีบุคคลไม่ถูกต้อง');
        return;
    }
    
    // ค้นหาและแก้ไขข้อมูลในเอกสาร
    // ชื่อผู้ชำระเงิน
    const nameElement = document.querySelector('span.t.s5[style*="left:196px;bottom:944px"]');
    if (nameElement) {
        nameElement.textContent = names[personIndex];
    }
    
    // เลขรับคำขอ
    const wpElement = document.querySelector('span.t.s6[style*="left:196px;bottom:984px"]');
    if (wpElement) {
        wpElement.textContent = wpNumbers[personIndex];
    }
    
    // เลขที่ใบชำระเงิน
    const ivElement = document.querySelector('span.t.s6[style*="left:649px;bottom:1029px"]');
    if (ivElement) {
        ivElement.textContent = ivNumbers[personIndex];
    }
    
    // เลขที่ใบเสร็จ
    const receiptElement = document.querySelector('span.t.s6[style*="left:649px;bottom:1198px"]');
    if (receiptElement) {
        receiptElement.textContent = receiptNumbers[personIndex];
    }
    
    // เลขอ้างอิงคนต่างด้าว
    const foreignerRefElement = document.querySelector('span.t.s6[style*="left:196px;bottom:899px"]');
    if (foreignerRefElement) {
        foreignerRefElement.textContent = foreignerRefs[personIndex];
    }
    
    // หมายเลขประจำตัวคนต่างด้าว
    const foreignerIdElement = document.querySelector('span.t.s6[style*="left:622px;bottom:899px"]');
    if (foreignerIdElement) {
        foreignerIdElement.textContent = foreignerIds[personIndex];
    }
    
    // สร้าง QR Code สำหรับดาวน์โหลดเอกสาร
    const currentUrl = window.location.href;
    generateQRCode(currentUrl);
}

// เรียกใช้ฟังก์ชั่นเมื่อโหลดหน้า
window.addEventListener('DOMContentLoaded', function() {
    // รับพารามิเตอร์ index จาก URL (ถ้ามี)
    const urlParams = new URLSearchParams(window.location.search);
    const personIndex = parseInt(urlParams.get('index') || '0', 10);
    
    // แก้ไขเอกสาร
    modifyReceipt(personIndex);
});

// ฟังก์ชันสำหรับการบันทึกเอกสารปัจจุบันแบบ HTML
function saveCurrentDocument() {
    // ลบ script ที่ใช้งานในปัจจุบันเพื่อไม่ให้ปรากฏในเอกสารที่บันทึก
    const tempScripts = document.querySelectorAll('script:not([id="metadata"]):not([id="annotations"])');
    const scriptContents = [];
    
    // เก็บสคริปต์ชั่วคราว
    tempScripts.forEach((script, index) => {
        scriptContents.push({
            parentNode: script.parentNode,
            nextSibling: script.nextSibling,
            script: script
        });
        script.parentNode.removeChild(script);
    });
    
    // บันทึกเนื้อหา HTML
    const html = '<!DOCTYPE html>\n' + document.documentElement.outerHTML;
    
    // คืนค่าสคริปต์
    scriptContents.forEach(item => {
        if (item.nextSibling) {
            item.parentNode.insertBefore(item.script, item.nextSibling);
        } else {
            item.parentNode.appendChild(item.script);
        }
    });
    
    // สร้าง Blob และดาวน์โหลด
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `receipt_${new Date().getTime()}.html`;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    
    setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, 100);
}

// เพิ่มปุ่มสำหรับบันทึกเอกสาร
function addSaveButton() {
    const saveButton = document.createElement('button');
    saveButton.textContent = 'บันทึกเอกสาร';
    saveButton.style.position = 'fixed';
    saveButton.style.bottom = '20px';
    saveButton.style.right = '20px';
    saveButton.style.zIndex = '9999';
    saveButton.style.padding = '10px 15px';
    saveButton.style.backgroundColor = '#4CAF50';
    saveButton.style.color = 'white';
    saveButton.style.border = 'none';
    saveButton.style.borderRadius = '5px';
    saveButton.style.cursor = 'pointer';
    saveButton.style.boxShadow = '0 2px 5px rgba(0,0,0,0.3)';
    
    saveButton.addEventListener('click', saveCurrentDocument);
    document.body.appendChild(saveButton);
}

// เพิ่มปุ่มบันทึกเมื่อโหลดหน้า
window.addEventListener('load', addSaveButton);
