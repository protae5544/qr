// netlify/functions/store-pdf.js
const { createClient } = require("@supabase/supabase-js")

// สร้าง Supabase client
const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

exports.handler = async (event, context) => {
  // ตรวจสอบว่าเป็น POST request
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" }),
      headers: { "Content-Type": "application/json" },
    }
  }

  try {
    // แปลงข้อมูลจาก request body
    const { requestNumber, pdfBase64, metadata } = JSON.parse(event.body)

    if (!requestNumber || !pdfBase64) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "ต้องระบุเลขคำขอและข้อมูล PDF" }),
        headers: { "Content-Type": "application/json" },
      }
    }

    // แปลง Base64 เป็น Buffer
    const pdfBuffer = Buffer.from(pdfBase64, "base64")

    // สร้างชื่อไฟล์
    const filename = `receipts/${requestNumber.replace(/[^\w]/g, "")}.pdf`

    // อัปโหลดไฟล์ไปยัง Supabase Storage
    const { data, error } = await supabase.storage.from("receipts").upload(filename, pdfBuffer, {
      contentType: "application/pdf",
      upsert: true, // อัปเดตถ้ามีไฟล์อยู่แล้ว
    })

    if (error) {
      console.error("Error uploading to Supabase:", error)
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "เกิดข้อผิดพลาดในการบันทึกไฟล์" }),
        headers: { "Content-Type": "application/json" },
      }
    }

    // บันทึกข้อมูลเมตาดาต้าลงในฐานข้อมูล
    const { error: dbError } = await supabase.from("receipt_metadata").upsert(
      [
        {
          request_number: requestNumber,
          file_path: filename,
          created_at: new Date().toISOString(),
          metadata: metadata || {},
        },
      ],
      { onConflict: "request_number" },
    )

    if (dbError) {
      console.error("Error saving metadata:", dbError)
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "เกิดข้อผิดพลาดในการบันทึกข้อมูลเมตาดาต้า" }),
        headers: { "Content-Type": "application/json" },
      }
    }

    // สร้าง URL สำหรับเข้าถึงไฟล์
    const { data: urlData } = supabase.storage.from("receipts").getPublicUrl(filename)

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: "บันทึกไฟล์ PDF สำเร็จ",
        url: urlData.publicUrl,
      }),
      headers: { "Content-Type": "application/json" },
    }
  } catch (error) {
    console.error("Error processing request:", error)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "เกิดข้อผิดพลาดในการประมวลผล" }),
      headers: { "Content-Type": "application/json" },
    }
  }
}
