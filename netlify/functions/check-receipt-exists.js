// netlify/functions/check-receipt-exists.js
const { createClient } = require("@supabase/supabase-js")

// สร้าง Supabase client
const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

exports.handler = async (event, context) => {
  try {
    // ดึงพารามิเตอร์จาก query string
    const requestNumber = event.queryStringParameters.requestNumber

    if (!requestNumber) {
      return {
        statusCode: 400,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "ต้องระบุเลขคำขอ (requestNumber)" }),
      }
    }

    // ค้นหาข้อมูลเมตาดาต้าจากฐานข้อมูล
    const { data, error } = await supabase
      .from("receipt_metadata")
      .select("file_path, created_at")
      .eq("request_number", requestNumber)
      .single()

    if (error) {
      // ถ้าเกิดข้อผิดพลาดที่ไม่ใช่ "ไม่พบข้อมูล"
      if (error.code !== "PGRST116") {
        console.error("Error checking receipt:", error)
        return {
          statusCode: 500,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ error: "เกิดข้อผิดพลาดในการตรวจสอบใบเสร็จ" }),
        }
      }

      // ไม่พบใบเสร็จ
      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ exists: false }),
      }
    }

    // ตรวจสอบว่าไฟล์มีอยู่จริงใน storage
    const { data: fileExists } = await supabase.storage.from("receipts").getPublicUrl(data.file_path)

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        exists: true,
        url: fileExists.publicUrl,
        created_at: data.created_at,
      }),
    }
  } catch (error) {
    console.error("Error checking receipt:", error)
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "เกิดข้อผิดพลาดในการตรวจสอบใบเสร็จ" }),
    }
  }
}
