// netlify/functions/receipt.js
exports.handler = async (event, context) => {
  try {
    // ดึงพารามิเตอร์จาก query string
    const requestNumber = event.queryStringParameters.requestNumber

    if (!requestNumber) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "ต้องระบุเลขคำขอ (requestNumber)" }),
        headers: { "Content-Type": "application/json" },
      }
    }

    // สร้าง HTML ที่จะเปลี่ยนเส้นทางไปยัง PDF
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>กำลังเปิดใบเสร็จ PDF</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            text-align: center;
            padding: 20px;
            background-color: #f5f5f5;
          }
          .container {
            max-width: 500px;
            margin: 0 auto;
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          }
          h1 {
            color: #333;
          }
          .loading {
            display: inline-block;
            width: 50px;
            height: 50px;
            border: 3px solid rgba(0,0,0,.3);
            border-radius: 50%;
            border-top-color: #4CAF50;
            animation: spin 1s ease-in-out infinite;
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>กำลังเปิดใบเสร็จ PDF</h1>
          <div class="loading"></div>
          <p>กรุณารอสักครู่...</p>
        </div>
        <script>
          // เปลี่ยนเส้นทางไปยัง PDF หลังจากโหลดหน้า
          window.onload = function() {
            setTimeout(function() {
              window.location.href = "/.netlify/functions/get-receipt-pdf?requestNumber=${encodeURIComponent(requestNumber)}";
            }, 1500); // รอ 1.5 วินาทีก่อนเปลี่ยนเส้นทาง
          };
        </script>
      </body>
      </html>
    `

    return {
      statusCode: 200,
      headers: { "Content-Type": "text/html" },
      body: html,
    }
  } catch (error) {
    console.error("Error:", error)
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "เกิดข้อผิดพลาดในการประมวลผล" }),
    }
  }
}
