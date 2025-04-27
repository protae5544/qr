-- สร้างตาราง receipt_metadata สำหรับเก็บข้อมูลเมตาดาต้าของใบเสร็จ
CREATE TABLE IF NOT EXISTS receipt_metadata (
  id SERIAL PRIMARY KEY,
  request_number VARCHAR(50) NOT NULL UNIQUE,
  file_path VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  metadata JSONB DEFAULT '{}'::jsonb
);

-- สร้าง index สำหรับการค้นหาด้วย request_number
CREATE INDEX IF NOT EXISTS idx_receipt_metadata_request_number ON receipt_metadata(request_number);

-- สร้าง function สำหรับอัปเดต updated_at เมื่อมีการอัปเดตข้อมูล
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- สร้าง trigger สำหรับอัปเดต updated_at
CREATE TRIGGER update_receipt_metadata_updated_at
BEFORE UPDATE ON receipt_metadata
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
