// netlify/functions/get-receipt-pdf.js
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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ error: "ต้องระบุเลขคำขอ (requestNumber)" }),
      }
    }

    // ค้นหาข้อมูลเมตาดาต้าจากฐานข้อมูล
    const { data: metadata, error: metadataError } = await supabase
      .from("receipt_metadata")
      .select("file_path")
      .eq("request_number", requestNumber)
      .single()

    if (metadataError || !metadata) {
      console.error("Error fetching metadata:", metadataError)
      return {
        statusCode: 404,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ error: "ไม่พบใบเสร็จสำหรับเลขคำขอนี้" }),
      }
    }

    // ดาวน์โหลดไฟล์จาก Supabase Storage
    const { data: fileData, error: fileError } = await supabase.storage.from("receipts").download(metadata.file_path)

    if (fileError || !fileData) {
      console.error("Error downloading file:", fileError)
      return {
        statusCode: 404,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ error: "ไม่สามารถดาวน์โหลดไฟล์ใบเสร็จได้" }),
      }
    }

    // แปลง Blob เป็น Buffer
    const arrayBuffer = await fileData.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // ส่ง PDF กลับไป
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="receipt_${requestNumber}.pdf"`,
        "Cache-Control": "public, max-age=86400",
      },
      body: buffer.toString("base64"),
      isBase64Encoded: true,
    }
  } catch (error) {
    console.error("Error retrieving PDF:", error)
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ error: "เกิดข้อผิดพลาดในการดึงข้อมูล PDF" }),
    }
  }
}
