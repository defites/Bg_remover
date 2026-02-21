const form = document.getElementById("uploadForm");
const loader = document.getElementById("loader");
const result = document.getElementById("result");
const outputImage = document.getElementById("outputImage");
const downloadBtn = document.getElementById("downloadBtn");
const button = form.querySelector("button");
const uploadBox = document.getElementById("uploadBox");
const imageInput = document.getElementById("imageInput");
const previewImage = document.getElementById("previewImage");

/* Preview Image */
imageInput.addEventListener("change", () => {
    const file = imageInput.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
        previewImage.src = reader.result;
        previewImage.style.display = "block";
        uploadBox.querySelector(".upload-content").style.display = "none";
    };
    reader.readAsDataURL(file);
});

/* Drag & Drop */
uploadBox.addEventListener("dragover", (e) => {
    e.preventDefault();
    uploadBox.classList.add("dragover");
});

uploadBox.addEventListener("dragleave", () => {
    uploadBox.classList.remove("dragover");
});

uploadBox.addEventListener("drop", (e) => {
    e.preventDefault();
    uploadBox.classList.remove("dragover");

    const file = e.dataTransfer.files[0];
    if (!file || !file.type.startsWith("image/")) return;

    imageInput.files = e.dataTransfer.files;
    imageInput.dispatchEvent(new Event("change"));
});
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const fileInput = document.getElementById("imageInput");
    if (!fileInput.files.length) return;

    loader.style.display = "flex";
    button.disabled = true;
    result.style.display = "none";

    const formData = new FormData();
    formData.append("image", fileInput.files[0]);

    const response = await fetch("/remove-bg", {
        method: "POST",
        body: formData
    });

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);

    outputImage.src = url;
    downloadBtn.href = url;

    loader.style.display = "none";
    button.disabled = false;
    result.style.display = "block";
});