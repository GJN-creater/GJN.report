const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
const port = 4000;

const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(uploadDir));

// ✅ memoryStorage 사용 (파일 이름 직접 처리)
const upload = multer({ storage: multer.memoryStorage() });

app.post("/upload", upload.array("files"), (req, res) => {
  const files = req.files;
  let filenames = [];

  try {
    filenames = JSON.parse(req.body.filenames);
  } catch (err) {
    return res.status(400).json({ message: "❌ 파일명 JSON 파싱 오류" });
  }

  if (!files || files.length !== filenames.length) {
    return res.status(400).json({ message: "❌ 파일 수와 이름 수가 일치하지 않습니다" });
  }

  const fileInfos = files.map((file, i) => {
    const originalName = path.basename(filenames[i]); // ✅ 경로 문제 방지
    const timestamp = Date.now();
    const safeName = `${timestamp}-${originalName}`;
    const fullPath = path.join(uploadDir, safeName);
    fs.writeFileSync(fullPath, file.buffer);

    return {
      name: originalName,
      url: `http://localhost:${port}/uploads/${encodeURIComponent(safeName)}` // ✅ 인코딩 처리
    };
  });

  res.json({ files: fileInfos });
});

app.listen(port, () => {
  console.log(`✅ 파일 업로드 서버 실행 중: http://localhost:${port}`);
});
