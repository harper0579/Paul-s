import sharp from "sharp";
import path from "path";

async function processImage() {
  const inputPath = path.resolve("public/assets/aistudio/Gemini_Generated_Image_ng9u37ng9u37ng9u.jpg_7925fa25_2K_999feaf3.jpg");
  const outputPath = path.resolve("public/images/header-logo.png");

  console.log("Processing header-only logo", inputPath);
  
  await sharp(inputPath)
    .trim({
      threshold: 15,
    })
    .png()
    .toFile(outputPath);

  console.log("Saved processed header logo to", outputPath);
}

processImage().catch(console.error);
